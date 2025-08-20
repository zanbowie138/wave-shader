uniform float u_time;
uniform vec3 u_colorA; 
uniform vec3 u_colorB; 
uniform float u_dynamicTimeScale; 
uniform float u_lightBrightnessFactor; 
uniform float u_lightRangeFactor;

varying vec2 vUv;

#define NUM_OCTAVES 15

float rand(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p) {
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u * u * (3.0 - 2.0 * u);

    float res = mix(
        mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
        mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x),
        u.y);
    return res * res;
}

float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(x);
        x = rot * x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

// Used for light influence calculation
float circle(vec2 uv_offset, float r, float blur) {
    return 1.0 - smoothstep(r - blur, r + blur, length(uv_offset));
}

void main() {
    vec2 uv = vUv - 0.5;
    vec2 m = vec2(0.0); 
    float t = u_time * u_dynamicTimeScale * 0.1;

    // Domain warping
    vec2 q = vec2(fbm(uv + t), fbm(uv + vec2(5.2, 1.3) + t));
    vec2 r = vec2(fbm(uv + q * 0.5 + vec2(1.7, 9.2) + t * 0.5),
                  fbm(uv + q * 0.8 + vec2(8.3, 2.8) + t * 0.3));

    float f = fbm(uv + r);

    // Create a pattern from the warped noise
    float pattern = (f * pow(length(uv * 0.8 - m), 0.2)) * 2.5;

    // Mix colors based on the pattern
    vec3 color = mix(u_colorA, u_colorB, smoothstep(0.1, 0.9, pattern));
    
    // Add a subtle darkening towards edges
    color *= (1.0 - length(uv * 0.7));

    // --- Additive Lights ---
    // Base radius and blur values (these were the increased values from before)
    float baseRadius1 = 0.07; float baseBlur1 = 0.3;
    float baseRadius2 = 0.06; float baseBlur2 = 0.25;
    float baseRadius3 = 0.05; float baseBlur3 = 0.28;
    float baseRadius4 = 0.065; float baseBlur4 = 0.32;

    vec3 lightColor1 = vec3(0.0, 0.9, 1.0); 
    vec3 lightColor2 = vec3(0.9, 0.95, 1.0);
    vec3 lightColor3 = vec3(1.0, 0.1, 0.6);
    vec3 lightColor4 = vec3(1.0, 0.8, 0.2);

    // Light 1
    vec2 lightPos1 = vec2(sin(u_time * u_dynamicTimeScale * 0.3) * 0.35, cos(u_time * u_dynamicTimeScale * 0.2) * 0.35);
    float lightInfluence1 = circle(uv - lightPos1, baseRadius1 * u_lightRangeFactor, baseBlur1 * u_lightRangeFactor);
    color += lightInfluence1 * lightColor1 * 0.7 * u_lightBrightnessFactor;

    // Light 2
    vec2 lightPos2 = vec2(cos(u_time * u_dynamicTimeScale * 0.15 + 1.0) * 0.4, sin(u_time * u_dynamicTimeScale * 0.25 + 1.5) * 0.3);
    float lightInfluence2 = circle(uv - lightPos2, baseRadius2 * u_lightRangeFactor, baseBlur2 * u_lightRangeFactor);
    color += lightInfluence2 * lightColor2 * 0.6 * u_lightBrightnessFactor;

    // Light 3
    vec2 lightPos3 = vec2(sin(u_time * u_dynamicTimeScale * 0.5 + 2.0) * 0.45, cos(u_time * u_dynamicTimeScale * 0.4 + 2.5) * 0.3);
    float lightInfluence3 = circle(uv - lightPos3, baseRadius3 * u_lightRangeFactor, baseBlur3 * u_lightRangeFactor);
    color += lightInfluence3 * lightColor3 * 0.55 * u_lightBrightnessFactor;

    // Light 4
    vec2 lightPos4 = vec2(cos(u_time * u_dynamicTimeScale * 0.1 - 1.0) * 0.5, sin(u_time * u_dynamicTimeScale * 0.15 - 0.5) * 0.4);
    float lightInfluence4 = circle(uv - lightPos4, baseRadius4 * u_lightRangeFactor, baseBlur4 * u_lightRangeFactor);
    color += lightInfluence4 * lightColor4 * 0.5 * u_lightBrightnessFactor;

    gl_FragColor = vec4(color, 1.0);
} 