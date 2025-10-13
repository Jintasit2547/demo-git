import React from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DashboardPage = () => {
  const handleLogout = () => {
    fetch(`${API_BASE_URL}/api/auth/logout`, { method: 'POST' })
        .then(() => {
            window.location.href = '/login'; 
        })
        .catch(() => {
            window.location.href = '/login'; 
        });
  };

  return (
    <div className="p-10">
      <h1 className="text-5xl font-extrabold">Welcome!</h1>
      <button onClick={handleLogout} className="mt-6 bg-red-600 text-white py-2.5 px-5 rounded-md">
        Logout
      </button>
    </div>
  );
};
export default DashboardPage;