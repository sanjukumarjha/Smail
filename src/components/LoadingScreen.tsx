import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-screen">
      <div className="loading-screen__content">
        <img src="/logo.png" alt="Smail Logo" className="loading-screen__logo" />
        <div className="loading-screen__progress-wrapper">
          <div className="loading-screen__progress-bar"></div>
        </div>
        <p className="loading-screen__text">
          Portfolio Workspace
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;

