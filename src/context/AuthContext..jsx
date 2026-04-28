import { createContext, useContext, useState, useEffect } from "react";
import { getToken, setToken, removeToken } from "../utils/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setAuthToken] = useState(getToken());

  const login = (newToken) => {
    setToken(newToken);
    setAuthToken(newToken);
  };

  const logout = () => {
    removeToken();
    setAuthToken(null);
  };

  useEffect(() => {
    setAuthToken(getToken());
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuth: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);