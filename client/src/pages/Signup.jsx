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
    <div
  style={{
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#121212"
  }}
>
  <form
   onSubmit={handleSubmit}
    style={{
      width: "320px",
      padding: "25px",
      background: "#1e1e1e",
      borderRadius: "12px",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      boxShadow: "0 0 10px rgba(0,0,0,0.5)"
    }}
  >
    <h1 style={{ color: "white" }}>
      SafeHer Signup
    </h1>

    <input
       placeholder="Name"
  type="text"
  name="name"
  value={formData.name}
  onChange={handleChange}
      style={{
        padding: "12px",
        background: "#2b2b2b",
        color: "white",
        border: "1px solid #555",
        borderRadius: "6px"
      }}
    />

    <input
      placeholder="Email"
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
      style={{
        padding: "12px",
        background: "#2b2b2b",
        color: "white",
        border: "1px solid #555",
        borderRadius: "6px"
      }}
    />
<input
       placeholder="Password"
  type="password"
  name="password"
  value={formData.password}
  onChange={handleChange}
      style={{
        padding: "12px",
        background: "#2b2b2b",
        color: "white",
        border: "1px solid #555",
        borderRadius: "6px"
      }}
    />
        <button
        type="submit"
  style={styles.button}

  onMouseOver={(e) => {
    e.target.style.background = "#ff5fa8";
    e.target.style.transform = "scale(1.03)";
  }}

  onMouseOut={(e) => {
    e.target.style.background = "#ff8fc7";
    e.target.style.transform = "scale(1)";
  }}

  onMouseDown={(e) => {
    e.target.style.transform = "scale(0.95)";
    e.target.style.background = "#ff2f92";
  }}

  onMouseUp={(e) => {
    e.target.style.transform = "scale(1.03)";
  }}
>
  Signup
</button>

        <p style={{color:"white"}}>
          Already have account?
          <Link to="/">
            Login
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
    background: "#f2f2f2"
  },

  form: {
    width: "300px",
    padding: "20px",
    background: "white",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  input: {
    padding: "10px"
  },

  button: {
    padding: "10px",
    background: "hotpink",
    color: "white",
    border: "none",
    cursor: "pointer"
  }
};

export default Signup;