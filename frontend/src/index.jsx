import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
<<<<<<< HEAD
import { AuthProvider } from './pages/users/auth-provider';
import App from './App';
=======
import App from './App.jsx';
>>>>>>> 738ef58e456ba53f390dd8a33ee250714938da76
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
);