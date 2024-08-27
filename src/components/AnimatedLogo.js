import React from 'react';
import './AnimatedLogo.css'; // Create this CSS file for styling

const LogoPage = () => {
  return (
    <div className="logo-page">
      <div className="logo-container">
        <img src="/images/getLooseLogo.png" alt="Logo" className="logo" />
      </div>
      <h1 className="graffiti-headline">Get Loose</h1>
    </div>
  );
};

export default LogoPage;
