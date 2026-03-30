import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // 🔹 LOGIN
  const login = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  // 🔹 LOGOUT
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    /* 🔥 FIX: Yahan 'setUser' ko add kar diya hai taaki PaymentPage isse access kar sake */
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🔹 CUSTOM HOOK
export const useAuth = () => useContext(AuthContext);