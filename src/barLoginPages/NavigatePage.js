import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract the barName from the URL parameters
    const queryParams = new URLSearchParams(location.search);
    const barName = queryParams.get('barName');
    console.log(barName);

    // Check if barName exists, then navigate
    if (barName) {
      navigate(`/${barName}`);
    }
  }, [location, navigate]);

  return (
    <div>
      <h1>bro this game you have to play in aBar</h1>
    </div>
  );
};

export default NavigatePage;
//https://getloose.onrender.com/?barName=Admin
