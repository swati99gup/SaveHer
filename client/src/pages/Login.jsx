import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "https://saveher.onrender.com/api/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      navigate("/dashboard");

    } catch (err) {

      console.log(err);

      alert("Login failed");
    }
  };
return (
  <div className="auth-page">

    <form
      onSubmit={handleSubmit}
      className="auth-card"
    >

      <div className="auth-logo">
        🛡️
      </div>

      <h1 className="auth-title">
        Welcome Back
      </h1>

      <p className="auth-subtitle">
        Sign in to access SafeMe
      </p>

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="auth-input"
      />

      <div className="password-wrapper">

        <input
          type={
            showPassword
              ? "text"
              : "password"
          }
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="auth-input"
        />

      </div>

      <button
        type="submit"
        className="auth-btn"
      >
        Login
      </button>

      <p className="auth-link">

        No account?

        <Link to="/signup">
          Signup
        </Link>

      </p>

    </form>

  </div>
);
}

const styles = {

  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#121212"
  },

  form: {
    width: "320px",
    padding: "25px",
    background: "#1e1e1e",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    boxShadow: "0 0 15px rgba(0,0,0,0.5)"
  },

  input: {
    padding: "12px",
    border: "1px solid #555",
    borderRadius: "6px",
    background: "#2b2b2b",
    color: "white",
    outline: "none"
  },

  button: {
    padding: "12px",
    background: "#ff8fc7",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "8px",
    transition: "0.2s ease",
    fontWeight: "bold",
    fontSize: "16px"
  }
};

export default Login;
