"use client";
import React, { use, useEffect } from "react";
import "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGraduate, faBars } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';

const bg = "#1D9DED";
function Header() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <>
      <nav className="nav-link navbar" style={{ backgroundColor: bg }}>
        <div className="container-fluid">
          <a className="navbar-brand text-white fw-bolder" href="#">
            <FontAwesomeIcon
              className="d-inline-block align-text-top"
              icon={faUserGraduate}
              alt="Logo"
              width="30"
              height="24"
            />
            DashboardL
          </a>
          <form className="justify-content-end">
            <button className="btn btn-sm btn-outline-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu" aria-controls="offcanvasMenu">
              <FontAwesomeIcon icon={faBars} alt="Menu" width="30" height="24" />
            </button>
          </form>
        </div>
      </nav>

      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasMenu" aria-labelledby="offcanvasMenuLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasMenuLabel">Menu</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <a className="nav-link" href="#">Home</a>
          <a className="nav-link" href="#">Profile</a>
          <a className="nav-link" href="#">Settings</a>
          <a className="nav-link" href="#">Logout</a>
        </div>
      </div>
    </>
  );
}

export { Header };
