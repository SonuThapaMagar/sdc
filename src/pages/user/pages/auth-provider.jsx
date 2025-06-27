import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing authentication on mount
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("userRole");

    if (token && userId && userRole) {
      try {
        // Create user object from localStorage data
        const userData = {
          id: userId,
          role: userRole,
          fullName: localStorage.getItem("userFullName") || "User",
          email: localStorage.getItem("userEmail") || "",
          profileImage: localStorage.getItem("userProfileImage") || "/placeholder.svg?height=40&width=40"
        };
        setUser(userData);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userFullName");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userProfileImage");
      }
    }

    setIsLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userData.id);
    localStorage.setItem("userRole", userData.role);
    if (userData.fullName) localStorage.setItem("userFullName", userData.fullName);
    if (userData.email) localStorage.setItem("userEmail", userData.email);
    if (userData.profileImage) localStorage.setItem("userProfileImage", userData.profileImage);
    
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userFullName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userProfileImage");
    setUser(null);
    navigate("/");
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 