import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {
  const navigate = useNavigate();

  const { darkMode, setDarkMode } =
    useContext(ThemeContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav
      style={{
        ...styles.navbar,
        background: darkMode
          ? "#111827"
          : "linear-gradient(135deg,#ff4f8b,#ff6fa5)",
      }}
    >
      {/* Logo */}
      <div style={styles.logo}>
        🛡️ SafeHer
      </div>

      {/* Menu */}
      <div style={styles.menu}>
        <Link
          to="/dashboard"
          style={styles.link}
        >
          🏠 Dashboard
        </Link>

        <Link
          to="/ai"
          style={styles.link}
        >
          🤖 AI Assistant
        </Link>

        
      </div>

      {/* Right Side */}
      <div style={styles.right}>
        {/* Theme Toggle Circle */}
        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          style={styles.themeBtn}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <button
          onClick={handleLogout}
          style={styles.logoutBtn}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    width: "100%",
    height: "80px",
    padding: "0 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxSizing: "border-box",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.15)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },

  logo: {
    color: "#fff",
    fontSize: "32px",
    fontWeight: "700",
  },

  menu: {
    display: "flex",
    gap: "30px",
  },

  link: {
    textDecoration: "none",
    color: "#fff",
    fontWeight: "600",
    fontSize: "18px",
    transition: "0.3s",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  themeBtn: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    fontSize: "22px",
    background: "#fff",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.2)",
  },

  logoutBtn: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "12px",
    background: "#fff",
    color: "#ff4f8b",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Navbar;