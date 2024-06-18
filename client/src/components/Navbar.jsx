import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-body">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Jobhunter
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user.isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Álláshirdetések
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profilom
                  </Link>
                </li>
                {user.role === "company" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/add-job">
                      Álláshirdetés hozzáadása
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <button className="btn nav-link" onClick={handleLogout}>
                    Kijelentkezés
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Regisztráció
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Bejelentkezés
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
