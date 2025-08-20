import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import vertexShader from '../shaders/vertex.glsl?raw';
import fragmentShader from '../shaders/fragment.glsl?raw';

const BASE_SPEED = 1.0;
const BRIGHTNESS_ON = 1.3;
const BRIGHTNESS_OFF = 1.0;
const RANGE_ON = 1.3;
const RANGE_OFF = 1.0;
const LERP_FACTOR = 0.03;

interface WaveBackground {
  areLightsEnhanced?: boolean;
}

export default function WaveBackground({ areLightsEnhanced = false }: WaveBackground) {
  const containerRef = useRef<HTMLDivElement>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef(Date.now());
  
  const targetBrightnessFactorRef = useRef<number>(
    areLightsEnhanced ? BRIGHTNESS_ON : BRIGHTNESS_OFF
  );
  const targetRangeFactorRef = useRef<number>(
    areLightsEnhanced ? RANGE_ON : RANGE_OFF
  );

  useEffect(() => {
    targetBrightnessFactorRef.current = 
      areLightsEnhanced ? BRIGHTNESS_ON : BRIGHTNESS_OFF;
    targetRangeFactorRef.current = 
      areLightsEnhanced ? RANGE_ON : RANGE_OFF;
  }, [areLightsEnhanced]);
  
  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);
    camera.lookAt(scene.position);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    const planeGeometry = new THREE.PlaneGeometry(10, 30, 64, 64);
    const createdMaterial = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_colorA: { value: new THREE.Color(0x0033A0) },
        u_colorB: { value: new THREE.Color(0x00BFFF) },
        u_dynamicTimeScale: { value: BASE_SPEED },
        u_lightBrightnessFactor: { 
          value: areLightsEnhanced ? BRIGHTNESS_ON : BRIGHTNESS_OFF 
        },
        u_lightRangeFactor: { 
          value: areLightsEnhanced ? RANGE_ON : RANGE_OFF 
        },
      },
      vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
      depthWrite: false
    });
    materialRef.current = createdMaterial;

    const plane = new THREE.Mesh(planeGeometry, materialRef.current);
    plane.position.set(-3, 0, 0);
    plane.rotation.set(
      THREE.MathUtils.degToRad(-50),
      THREE.MathUtils.degToRad(-20),
      THREE.MathUtils.degToRad(-75)
    );
    scene.add(plane);

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const elapsed = (Date.now() - startTimeRef.current) / 1000;

      if (materialRef.current) {
        materialRef.current.uniforms.u_time.value = elapsed;

        const currentBrightness = materialRef.current.uniforms.u_lightBrightnessFactor.value;
        const newBrightness = currentBrightness +
          (targetBrightnessFactorRef.current - currentBrightness) * LERP_FACTOR;
        materialRef.current.uniforms.u_lightBrightnessFactor.value = newBrightness;

        const currentRange = materialRef.current.uniforms.u_lightRangeFactor.value;
        const newRange = currentRange +
          (targetRangeFactorRef.current - currentRange) * LERP_FACTOR;
        materialRef.current.uniforms.u_lightRangeFactor.value = newRange;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
      planeGeometry.dispose();
      if (materialRef.current) {
        materialRef.current.dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute w-full h-full top-0 left-0 z-[-5]"
      style={{
        background: `radial-gradient(circle at 10% 10%, rgba(46, 52, 89, 0.5), transparent 30%)`,
      }}
    />
  );
} 