import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const logOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <nav className="navbar navbar-expand-lg bg-main shadow">
      <section className="container">
        <Link className="navbar-brand text-white" to="/">
          Notes App
        </Link>
        <button
          className="navbar-toggler border-white border-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon className="text-white" icon={faBars} size="lg" />
        </button>
        <section
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link text-white active"
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>

            <li className="nav-item d-flex justify-content-center align-items-center">
              <Link
                className="btn btn-light-color p-1 logout-btn"
                onClick={logOut}
              >
                Logout
              </Link>
            </li>
          </ul>
        </section>
      </section>
    </nav>
  );
};

export default NavBar;
