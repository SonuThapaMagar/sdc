// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import SuperAdminRoutes from './routes/SuperAdminRoutes';

function App() {
  return (
    <Routes>
      <Route path="/*" element={<UserRoutes />} />
      <Route path="/superadmin/*" element={<SuperAdminRoutes />} />
    </Routes>
  );
}

export default App;