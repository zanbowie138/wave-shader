# Single-Page Template with Wave Shader

A beautiful, responsive single-page website template featuring an interactive WebGL wave shader background built with Astro, React, and Three.js.

## ✨ Features

- 🌊 **Interactive Wave Shader** - Real-time WebGL wave animations
- 🎨 **Dynamic Lighting** - Hover effects that enhance the wave animation
- ⚛️ **React Integration** - Smooth component interactions with Framer Motion
- 🎯 **Performance Optimized** - Efficient shader rendering with Three.js
- 📱 **Fully Responsive** - Beautiful on all devices
- 🚀 **Modern Stack** - Built with Astro, React, and TailwindCSS
- 📄 **Single Page** - Everything you need in one clean, focused page

## 🎭 Wave Shader Features

The hero section showcases a sophisticated WebGL wave shader that:
- Responds to user interaction (hover effects)
- Features dynamic lighting and color transitions
- Uses custom GLSL shaders for smooth animations
- Integrates seamlessly with React state management

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:4321](http://localhost:4321) in your browser

## 🛠️ Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📁 Project Structure

```
src/
├── components/          # React and Astro components
│   ├── Hero.tsx        # Hero section with wave shader
│   ├── WaveBackground.tsx # WebGL wave shader implementation
│   ├── Services.tsx    # Services showcase section
│   ├── Portfolio.tsx   # Portfolio/work section
│   └── Footer.astro    # Footer component
├── layouts/             # Layout components
├── pages/               # Single index page
│   └── index.astro     # Main page
├── shaders/             # GLSL shader files
│   ├── vertex.glsl      # Vertex shader
│   └── fragment.glsl    # Fragment shader
└── assets/              # Static assets
```

## 🎨 Customization

This template is designed to be easily customizable:
- **Wave Parameters**: Adjust wave frequency, amplitude, and speed in `WaveBackground.tsx`
- **Shader Effects**: Modify GLSL shaders in `src/shaders/`
- **Color Schemes**: Update wave colors and lighting effects
- **Content**: Replace template text with your business content
- **Animation Timing**: Fine-tune animation speeds and transitions

## 🔧 Technical Details

- **WebGL Rendering**: Three.js for efficient 3D graphics
- **Custom Shaders**: GLSL shaders for wave generation and lighting
- **React Integration**: State management for interactive effects
- **Performance**: Optimized rendering with proper cleanup and memory management
- **Single Page**: No routing complexity, just one focused page

## 📚 Learning Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [WebGL Shaders](https://webglfundamentals.org/)
- [GLSL Reference](https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language)
- [Astro Framework](https://docs.astro.build/) 