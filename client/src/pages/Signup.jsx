import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
if (
  !formData.name ||
  !formData.email ||
  !formData.password
) {
  alert("Please fill all fields");
  return;
}
 console.log("Form Data:", formData);
    try {

      await axios.post(
        "https://saveher.onrender.com/api/auth/signup",
        formData
      );

      alert("Signup successful");

      navigate("/");

    } catch (err) {
      console.log(err);
      alert("Signup failed");
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
        Create Account
      </h1>

      <p className="auth-subtitle">
        Join SafeHer and stay protected
      </p>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="auth-input"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="auth-input"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="auth-input"
      />

      <button
        type="submit"
        className="auth-btn"
      >
        Signup
      </button>

      <p className="auth-link">
        Already have an account?

        <Link to="/">
          Login
        </Link>
      </p>

    </form>

  </div>
);
}


export default Signup;