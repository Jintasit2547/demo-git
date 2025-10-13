import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

import Profile from './pages/Profile'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/demo-git">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} /> {/* <--- แก้ไข: ใช้คอมโพเนนต์ที่ import มาถูกต้อง */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)