import React from 'react';
import Dashboard from '../pages/dashboard'; 

export default function Content({ page, onPageChange }) {
  
  const pages = {
    dashboard: Dashboard
  };

  // Get the component for the current page or use Dashboard as default
  const PageComponent = pages[page] || Dashboard;

  return (
    <div>
      {/* Render the current page/component based on the prop */}
      <PageComponent />
    </div>
  );
}
