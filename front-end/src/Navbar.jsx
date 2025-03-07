import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="navbar sticky-top navbar-expand-lg border-bottom back-color"
      style={{ background: "linear-gradient(45deg, #4facfe, #00f2fe)" }}
    >
      <div className="container p-1" style={{ marginTop: "8px", marginLeft:'17rem' }}>
        <Link className="navbar-brand" to="/">
          <img src="images/note-taking.png" alt="nav-logo" style={{ width: "2.5rem" ,marginRight:'20rem'}} />
        </Link>
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex" role="search">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active"  to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active " to="/plans">
                  Plans
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/signup">
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="" className="nav-link">
                  <i
                    className="fa-regular fa-user"
                    style={{ fontSize: "1.2rem" }}
                  ></i>
                </Link>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
