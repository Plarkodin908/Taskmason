
import React from 'react';

const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 3D Book Shapes */}
      <div className="book-3d absolute top-20 left-10 opacity-40">
        <div className="book-spine"></div>
        <div className="book-cover"></div>
        <div className="book-pages"></div>
      </div>
      
      <div className="book-3d absolute top-40 right-20 opacity-30 scale-75" style={{ animationDelay: '5s' }}>
        <div className="book-spine"></div>
        <div className="book-cover"></div>
        <div className="book-pages"></div>
      </div>

      <div className="book-3d absolute bottom-32 left-1/3 opacity-35 scale-50" style={{ animationDelay: '10s' }}>
        <div className="book-spine"></div>
        <div className="book-cover"></div>
        <div className="book-pages"></div>
      </div>

      {/* Shopping Cart 3D Elements */}
      <div className="shopping-cart-3d absolute top-60 left-1/4 opacity-50">
        <div className="cart-body"></div>
        <div className="cart-handle"></div>
        <div className="cart-wheels"></div>
      </div>
      
      <div className="shopping-cart-3d absolute bottom-40 right-1/3 opacity-40 scale-75" style={{ animationDelay: '3s' }}>
        <div className="cart-body"></div>
        <div className="cart-handle"></div>
        <div className="cart-wheels"></div>
      </div>

      {/* Graduation Cap 3D Elements */}
      <div className="graduation-cap-3d absolute top-32 right-10 opacity-70">
        <div className="cap-top"></div>
        <div className="cap-base"></div>
        <div className="cap-tassel"></div>
      </div>
      
      <div className="graduation-cap-3d absolute bottom-60 left-20 opacity-60 scale-80" style={{ animationDelay: '7s' }}>
        <div className="cap-top"></div>
        <div className="cap-base"></div>
        <div className="cap-tassel"></div>
      </div>

      {/* School Building 3D Elements */}
      <div className="school-building-3d absolute top-80 left-1/3 opacity-50">
        <div className="building-base"></div>
        <div className="building-roof"></div>
        <div className="building-door"></div>
        <div className="building-windows"></div>
      </div>

      {/* Calculator 3D Elements */}
      <div className="calculator-3d absolute bottom-40 right-10 opacity-65" style={{ animationDelay: '4s' }}>
        <div className="calc-body"></div>
        <div className="calc-screen"></div>
        <div className="calc-buttons"></div>
      </div>

      {/* Pencil 3D Elements */}
      <div className="pencil-3d absolute top-1/2 left-10 opacity-45">
        <div className="pencil-body"></div>
        <div className="pencil-tip"></div>
        <div className="pencil-eraser"></div>
      </div>
      
      {/* Notebook 3D Elements */}
      <div className="notebook-3d absolute top-1/4 left-1/2 opacity-40">
        <div className="notebook-cover"></div>
        <div className="notebook-spiral"></div>
        <div className="notebook-pages"></div>
      </div>
      
      {/* Trophy 3D Elements */}
      <div className="trophy-3d absolute bottom-1/4 right-1/4 opacity-45">
        <div className="trophy-cup"></div>
        <div className="trophy-base"></div>
        <div className="trophy-handles"></div>
      </div>

      {/* Lightbulb (Ideas) 3D Elements */}
      <div className="lightbulb-3d absolute top-1/3 right-1/3 opacity-60" style={{ animationDelay: '2s' }}>
        <div className="bulb-glass"></div>
        <div className="bulb-base"></div>
        <div className="bulb-glow"></div>
      </div>
      
      {/* Certificate 3D Elements */}
      <div className="certificate-3d absolute bottom-1/3 left-1/4 opacity-50">
        <div className="cert-paper"></div>
        <div className="cert-ribbon"></div>
        <div className="cert-seal"></div>
      </div>
    </div>
  );
};

export default FloatingShapes;
