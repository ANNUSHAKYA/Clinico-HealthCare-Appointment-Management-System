import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("clinico_token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await API.get("/auth/me");
        setUser(data.user);
      } catch (error) {
        console.error("Failed to fetch user", error);
        localStorage.removeItem("clinico_token");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("clinico_token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("clinico_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
