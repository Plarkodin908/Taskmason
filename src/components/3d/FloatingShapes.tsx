
import React from 'react';

const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 3D Floating Cubes */}
      <div className="cube-3d absolute top-20 left-10 opacity-30">
        <div className="cube-face front"></div>
        <div className="cube-face back"></div>
        <div className="cube-face right"></div>
        <div className="cube-face left"></div>
        <div className="cube-face top"></div>
        <div className="cube-face bottom"></div>
      </div>
      
      <div className="cube-3d absolute top-40 right-20 opacity-20 scale-75">
        <div className="cube-face front"></div>
        <div className="cube-face back"></div>
        <div className="cube-face right"></div>
        <div className="cube-face left"></div>
        <div className="cube-face top"></div>
        <div className="cube-face bottom"></div>
      </div>

      {/* 3D Morphing Shapes */}
      <div className="shape-3d absolute top-60 left-1/4 w-20 h-20 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 opacity-40"></div>
      <div className="shape-3d absolute bottom-40 right-1/3 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-600/20 opacity-30" style={{ animationDelay: '2s' }}></div>
      <div className="shape-3d absolute bottom-20 left-1/2 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 opacity-35" style={{ animationDelay: '4s' }}></div>

      {/* 3D Floating Elements */}
      <div className="float-3d absolute top-32 right-10 w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-60"></div>
      <div className="float-3d-delayed absolute bottom-60 left-20 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full opacity-50"></div>
      <div className="float-3d-slow absolute top-80 left-1/3 w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full opacity-40"></div>
    </div>
  );
};

export default FloatingShapes;
