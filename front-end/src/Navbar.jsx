import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top border-bottom"
      style={{ background: "linear-gradient(45deg, #4facfe, #00f2fe)" }}
    >
      <div className="container-fluid px-4">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/images/note-taking.png"
            alt="NoteGen Logo"
            style={{ width: "2.5rem", marginRight: "0.5rem" }}
          />
          <span className="fw-bold text-white">NoteGen</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex align-items-center gap-3">
            <li className="nav-item">
              <Link className="nav-link active" to="/whyNoteGen">
                Why NoteGen
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/plans">
                Plans
              </Link>
            </li>

            {!isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link active" to="/signup">
                  Signup
                </Link>
              </li>
            )}

            {isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link active" to="/dashboard">
                    MyNotes
                  </Link>
                </li>
            )}

            {!isLoggedIn ? (
              <li className="nav-item">
                <Link className="nav-link active" to="/login">
                  Login
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <button
                  className="btn btn-link nav-link active text-decoration-none"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}

            <li className="nav-item">
              <Link to="/user" className="nav-link">
                <i className="fa-regular fa-user" style={{ fontSize: "1.2rem" }}></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
