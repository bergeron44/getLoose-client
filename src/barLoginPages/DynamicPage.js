import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Admin from './Admin'; 
import TheRustyAnchor from './The_Rusty_Anchor'; 

const pages = {
  Admin: <Admin />,
  TheRustyAnchor: <TheRustyAnchor />,
};

const DynamicPage = () => {
  const { path } = useParams();

  // Check if the path exists in the pages object
  if (pages[path]) {
    return pages[path];
  }

  // Redirect to a default page or 404 page
  return <Navigate to="/" />;
};

export default DynamicPage;
