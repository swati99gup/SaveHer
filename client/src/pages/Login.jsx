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

    <div style={styles.container}>

      <form
        onSubmit={handleSubmit}
        style={styles.form}
      >

        <h1 style={{ color: "white" }}>
  SafeHer Login
</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          style={styles.input}
        />

        <div
          style={{
            position: "relative",
            width: "100%"
          }}
        >

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }

            name="password"

            placeholder="Password"

            onChange={handleChange}

            style={{
  ...styles.input,
  width: "100%",
  height: "40px",
  boxSizing: "border-box",
  fontSize: "16px"
}}
          />

          <span

            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }

            style={{
              position: "absolute",
              right: "15px",
              top: "50%",
              transform:
                "translateY(-50%)",
              cursor: "pointer",
              color: "hotpink",
              fontWeight: "bold",
              fontSize: "13px"
            }}
          >
            
          </span>

        </div>

        <button
          style={styles.button}

          onMouseOver={(e) => {
            e.target.style.background =
              "#ff5fa8";

            e.target.style.transform =
              "scale(1.03)";
          }}

          onMouseOut={(e) => {
            e.target.style.background =
              "#ff8fc7";

            e.target.style.transform =
              "scale(1)";
          }}

          onMouseDown={(e) => {
            e.target.style.transform =
              "scale(0.95)";

            e.target.style.background =
              "#ff2f92";
          }}

          onMouseUp={(e) => {
            e.target.style.transform =
              "scale(1.03)";
          }}
        >
          Login
        </button>

        <p style={{ color: "white" }}>
  No account?{" "}

  <Link
    to="/signup"
    style={{
      color: "#ff4da6",
      textDecoration: "none",
      fontWeight: "bold"
    }}
  >
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