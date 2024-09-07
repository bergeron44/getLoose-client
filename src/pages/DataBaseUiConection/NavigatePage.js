import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract the barName from the URL parameters
    const queryParams = new URLSearchParams(location.search);
    const barName = queryParams.get('barName');

    // Check if barName exists, then navigate
    if (barName) {
      navigate(`/${barName}`);
    }
  }, [location, navigate]);

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

export default HomePage;
