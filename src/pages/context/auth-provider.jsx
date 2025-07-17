import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    if (token && userRole) {
      setUser({ role: userRole });
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = (userData, token) => {
    const decodedToken = jwtDecode(token);
    let role = decodedToken.role || ''; // Fallback to empty string if role is missing
    if (role.startsWith('ROLE_')) {
      role = role.replace('ROLE_', ''); // Transform ROLE_ADMIN or ROLE_SUPERADMIN
    } else {
      console.warn('Unexpected role format in token:', decodedToken.role);
    }
    if (!['ADMIN', 'SUPERADMIN'].includes(role)) {
      console.error('Invalid role detected:', role);
      return; // Prevent login with invalid role
    }

    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
    localStorage.setItem('userId', userData.id);
    setUser({ ...userData, role });
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);