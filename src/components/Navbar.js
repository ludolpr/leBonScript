import React from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "./UserContext";

const Navbar = () => {
  const { user, logout } = useUser();

  return (
    <nav className="Navbar">
      <h1 className="Logo" to="/">
        Le Bon Script
      </h1>
      <ul className="NavLinks">
        <li>
          <NavLink className="NavItem" to="/">
            Accueil
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink className="NavItem" to="/login">
                Se connecter
              </NavLink>
            </li>
            <li>
              <NavLink className="NavItem" to="/register">
                S'enregistrer
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink className="NavItem" to="/recipes">
                Scripts
              </NavLink>
            </li>
            <li>
              <NavLink className="NavItem" to="/profil">
                Profil
              </NavLink>
            </li>
            {user.role === 2 && (
              <li>
                <NavLink className="NavItem" to="/admin">
                  Admin Panel
                </NavLink>
              </li>
            )}
            <li>
              <button className="NavItem" onClick={logout}>
                Se deconnecter
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
