import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/ProductsContexts";
import { loginUser } from "../apiservices";
import styles from "./Registeration.module.css";

const Login = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 
  const { username, setUsername, password, setPassword } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // جلوگیری از ارسال پیش‌فرض فرم

    try {
      const userData = { username, password }; 
      const result = await loginUser(userData); 
      navigate("/Products"); 
      console.log(result);
      
    } catch {
      setErrorMessage( "نام کاربری یا رمز عبور اشتباه است"); 
      setShowAlert(true); 
    }
  };

  return (
    <div className={styles.container}>
      <header>
        <h1> فرم ورود</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              placeholder="نام کاربری"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              placeholder="رمز عبور"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">ورود</button>
          {showAlert && <p className={styles.err}>{errorMessage}</p>}
        </form>
        <a href="/registeration">حساب کاربری ندارید؟ </a>
      </main>
    </div>
  );
};

export default Login;