import React, { createContext, useContext, useState } from 'react';

// ایجاد Context
const AuthContext = createContext();

// کامپوننت Provider
export const AuthProvider = ({ children }) => {
   const [products,setProducts]=useState([])
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [inputValues, setInputValues] = useState({
    name: "",
    number: "",
    price: "",
  });

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <AuthContext.Provider value={{
      inputValues,
      setInputValues,
      products,
      setProducts,
      isLogin,
      toggleForm,
      username,
      setUsername,
      password,
      setPassword,
      confirmPassword,
      setConfirmPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

 
export const useAuth = () => {
  return useContext(AuthContext);
};