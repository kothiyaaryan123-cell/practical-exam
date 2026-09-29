import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `nav-link ${isActive ? "active fw-bold" : ""}`;

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to={isLoggedIn ? "/students" : "/login"}>
          Student Management
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          {isLoggedIn && (
            <>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className={navClass} to="/students">
                    Student List
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={navClass} to="/students/add">
                    Add Student
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={navClass} to="/profile">
                    User Profile
                  </NavLink>
                </li>
              </ul>

              <button className="btn btn-outline-light btn-sm" onClick={logout}>
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
