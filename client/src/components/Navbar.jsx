import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const { darkMode, setDarkMode } =
    useContext(ThemeContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">

  <div className="logo">
    🛡️ SafeMe
  </div>

  {/* Desktop Menu */}
  <div className="desktop-menu">

    <Link
      to="/dashboard"
      className="nav-link"
    >
      Dashboard
    </Link>

    <Link
      to="/ai"
      className="nav-link"
    >
      AI Assistant
    </Link>

    <button
      className="theme-btn"
      onClick={() =>
        setDarkMode(!darkMode)
      }
    >
      {darkMode ? "☀️" : "🌙"}
    </button>

    <button
      className="logout-btn"
      onClick={handleLogout}
    >
      Logout
    </button>

  </div>

  {/* Mobile Hamburger */}
  <button
    className="menu-btn"
    onClick={() =>
      setMenuOpen(!menuOpen)
    }
  >
    ☰
  </button>

  {/* Mobile Menu */}
  {menuOpen && (
    <div className="mobile-menu">

      <Link
        to="/dashboard"
        className="mobile-link"
      >
        🏠 Dashboard
      </Link>

      <Link
        to="/ai"
        className="mobile-link"
      >
        🤖 AI Assistant
      </Link>

      <button
        className="mobile-button"
        onClick={() =>
          setDarkMode(!darkMode)
        }
      >
        {darkMode
          ? "☀️ Light Mode"
          : "🌙 Dark Mode"}
      </button>

      <button
        className="mobile-button"
        onClick={handleLogout}
      >
        🚪 Logout
      </button>

    </div>
  )}

</nav>
  );
}


export default Navbar;
