import React from "react";
import "./styles.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
  return (
    <div className="navbarContainer">
      <NavLink className="titleIndex" to="/">
        TodoDo List
      </NavLink>
      <br />

      <nav className="navbar navbar-light bg-light">
        <NavLink className="nav-link" to="/">
          <i class="bi bi-arrow-left-circle-fill"></i> Inicio
        </NavLink>

        <NavLink className="nav-link" to="/create">
          Nueva Tarea
        </NavLink>
      </nav>
    </div>
  );
}
