
import React from 'react';

const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Books with Opening/Closing */}
      <div className="book-3d book-opening absolute top-20 left-10 opacity-60">
        <div className="book-spine"></div>
        <div className="book-cover book-cover-left"></div>
        <div className="book-cover book-cover-right"></div>
        <div className="book-pages"></div>
      </div>
      
      <div className="book-3d book-floating absolute top-40 right-20 opacity-50 scale-75" style={{ animationDelay: '3s' }}>
        <div className="book-spine"></div>
        <div className="book-cover"></div>
        <div className="book-pages"></div>
      </div>

      <div className="book-3d book-rotating absolute bottom-32 left-1/3 opacity-55 scale-50" style={{ animationDelay: '6s' }}>
        <div className="book-spine"></div>
        <div className="book-cover"></div>
        <div className="book-pages"></div>
      </div>

      {/* Moving Shopping Carts on Floor */}
      <div className="shopping-floor absolute bottom-0 left-0 w-full h-32 opacity-30">
        <div className="cart-moving cart-1 absolute bottom-8">
          <div className="shopping-cart-realistic">
            <div className="cart-body-realistic"></div>
            <div className="cart-handle-realistic"></div>
            <div className="cart-wheels-realistic"></div>
            <div className="cart-items"></div>
          </div>
        </div>
        
        <div className="cart-moving cart-2 absolute bottom-8" style={{ animationDelay: '4s' }}>
          <div className="shopping-cart-realistic scale-75">
            <div className="cart-body-realistic"></div>
            <div className="cart-handle-realistic"></div>
            <div className="cart-wheels-realistic"></div>
            <div className="cart-items"></div>
          </div>
        </div>
      </div>

      {/* People Silhouettes Shopping */}
      <div className="people-shopping absolute bottom-16 left-1/4 opacity-40">
        <div className="person-silhouette person-browsing">
          <div className="person-head"></div>
          <div className="person-body"></div>
          <div className="person-arms person-arm-left"></div>
          <div className="person-arms person-arm-right"></div>
          <div className="person-legs"></div>
          <div className="shopping-device"></div>
        </div>
      </div>

      <div className="people-shopping absolute bottom-16 right-1/3 opacity-35" style={{ animationDelay: '2s' }}>
        <div className="person-silhouette person-walking">
          <div className="person-head"></div>
          <div className="person-body"></div>
          <div className="person-arms person-arm-left"></div>
          <div className="person-arms person-arm-right"></div>
          <div className="person-legs"></div>
        </div>
      </div>

      {/* Floating School Elements */}
      <div className="graduation-cap-3d cap-floating absolute top-32 right-10 opacity-70">
        <div className="cap-top"></div>
        <div className="cap-base"></div>
        <div className="cap-tassel"></div>
      </div>
      
      <div className="school-building-3d building-with-students absolute top-80 left-1/3 opacity-50">
        <div className="building-base"></div>
        <div className="building-roof"></div>
        <div className="building-door"></div>
        <div className="building-windows"></div>
        <div className="students-entering"></div>
      </div>

      {/* Digital Learning Elements */}
      <div className="laptop-learning absolute top-1/2 left-10 opacity-45">
        <div className="laptop-screen"></div>
        <div className="laptop-keyboard"></div>
        <div className="learning-content"></div>
      </div>
      
      {/* Floating Course Certificates */}
      <div className="certificate-floating absolute top-1/4 left-1/2 opacity-40">
        <div className="certificate-paper"></div>
        <div className="certificate-seal"></div>
        <div className="certificate-ribbon"></div>
        <div className="certificate-text"></div>
      </div>
      
      {/* Knowledge Transfer Visualization */}
      <div className="knowledge-transfer absolute bottom-1/4 right-1/4 opacity-45">
        <div className="brain-icon"></div>
        <div className="knowledge-particles"></div>
        <div className="transfer-arrow"></div>
      </div>

      {/* Marketplace Elements */}
      <div className="digital-marketplace absolute top-1/3 right-1/3 opacity-60" style={{ animationDelay: '1s' }}>
        <div className="marketplace-screen"></div>
        <div className="course-tiles"></div>
        <div className="rating-stars"></div>
      </div>
    </div>
  );
};

export default FloatingShapes;
