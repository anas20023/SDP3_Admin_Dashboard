import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const API = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${API}/auth/me`, {
          withCredentials: true
        });
        // console.log(res.data)
        setIsAuthenticated(true);
        setUser(res.data);
      } catch {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [API]);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = async () => {
    await axios.post(
      `${API}/auth/logout`,
      {},
      { withCredentials: true }
    );

    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);