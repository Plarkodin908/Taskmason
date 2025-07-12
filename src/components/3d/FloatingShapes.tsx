
import React from 'react';

const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Enhanced 3D Floating Cubes */}
      <div className="cube-3d absolute top-20 left-10 opacity-40">
        <div className="cube-face front"></div>
        <div className="cube-face back"></div>
        <div className="cube-face right"></div>
        <div className="cube-face left"></div>
        <div className="cube-face top"></div>
        <div className="cube-face bottom"></div>
      </div>
      
      <div className="cube-3d absolute top-40 right-20 opacity-30 scale-75">
        <div className="cube-face front"></div>
        <div className="cube-face back"></div>
        <div className="cube-face right"></div>
        <div className="cube-face left"></div>
        <div className="cube-face top"></div>
        <div className="cube-face bottom"></div>
      </div>

      <div className="cube-3d absolute bottom-32 left-1/3 opacity-35 scale-50" style={{ animationDelay: '10s' }}>
        <div className="cube-face front"></div>
        <div className="cube-face back"></div>
        <div className="cube-face right"></div>
        <div className="cube-face left"></div>
        <div className="cube-face top"></div>
        <div className="cube-face bottom"></div>
      </div>

      {/* Enhanced 3D Morphing Shapes */}
      <div className="shape-3d absolute top-60 left-1/4 w-24 h-24 bg-gradient-to-br from-indigo-500/30 to-purple-600/30 opacity-50"></div>
      <div className="shape-3d absolute bottom-40 right-1/3 w-20 h-20 bg-gradient-to-br from-purple-500/30 to-pink-600/30 opacity-40" style={{ animationDelay: '3s' }}></div>
      <div className="shape-3d absolute bottom-20 left-1/2 w-16 h-16 bg-gradient-to-br from-blue-500/30 to-indigo-600/30 opacity-45" style={{ animationDelay: '6s' }}></div>
      <div className="shape-3d absolute top-32 right-1/4 w-18 h-18 bg-gradient-to-br from-violet-500/30 to-purple-600/30 opacity-35" style={{ animationDelay: '9s' }}></div>

      {/* Enhanced 3D Floating Elements */}
      <div className="float-3d absolute top-32 right-10 w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-70"></div>
      <div className="float-3d-delayed absolute bottom-60 left-20 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full opacity-60"></div>
      <div className="float-3d-slow absolute top-80 left-1/3 w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full opacity-50"></div>
      <div className="float-3d absolute bottom-40 right-10 w-6 h-6 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full opacity-65" style={{ animationDelay: '4s' }}></div>
      <div className="float-3d-delayed absolute top-1/2 left-10 w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-45"></div>
      
      {/* Additional Geometric Shapes */}
      <div className="absolute top-1/4 left-1/2 w-0 h-0 opacity-40 float-3d" 
           style={{ 
             borderLeft: '15px solid transparent',
             borderRight: '15px solid transparent', 
             borderBottom: '25px solid rgba(99, 102, 241, 0.4)',
             filter: 'drop-shadow(0 5px 10px rgba(99, 102, 241, 0.3))'
           }}>
      </div>
      
      <div className="absolute bottom-1/4 right-1/4 w-8 h-8 opacity-45 float-3d-slow transform rotate-45"
           style={{ 
             background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.4), rgba(168, 85, 247, 0.4))',
             filter: 'drop-shadow(0 8px 16px rgba(139, 92, 246, 0.3))'
           }}>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-1/3 right-1/3 w-4 h-4 rounded-full float-3d opacity-60"
           style={{ 
             background: 'radial-gradient(circle, rgba(99, 102, 241, 0.8), rgba(99, 102, 241, 0.2))',
             boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
             animationDelay: '2s'
           }}>
      </div>
      
      <div className="absolute bottom-1/3 left-1/4 w-6 h-6 rounded-full float-3d-delayed opacity-50"
           style={{ 
             background: 'radial-gradient(circle, rgba(139, 92, 246, 0.8), rgba(139, 92, 246, 0.2))',
             boxShadow: '0 0 25px rgba(139, 92, 246, 0.4)'
           }}>
      </div>
    </div>
  );
};

export default FloatingShapes;
