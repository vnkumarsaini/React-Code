import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../navigations/Routes";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ id: null, role: null });

  useEffect(() => {
    let id = localStorage.getItem("id");
    let role = localStorage.getItem("role");
    if (id) setUser({ id: id, role: role });
  }, []);

  function renderMenu() {
    if (user?.role == "admin") {
      return (
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <Link class="nav-link" to={ROUTES.universityAdmin.name}>
              University Management
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" href="#">
              Order Management
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link disabled" href="#">
              User Management
            </Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <Link class="nav-link" to={ROUTES.home.name}>
              Home
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to={ROUTES.about.name}>
              AboutUs
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link disabled" to={ROUTES.contact.name}>
              ContactUs
            </Link>
          </li>
        </ul>
      );
    }
  }
  function renderButtons() {
    if (user?.id) {
      return (
        <div>
          <button
            onClick={() => {
              localStorage.clear();
              navigate(ROUTES.login.name);
            }}
            class="btn btn-outline-success my-2 my-sm-0"
          >
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <Link
            to={ROUTES.register.name}
            class="btn btn-outline-success my-2 my-sm-0"
          >
            Register
          </Link>
          <Link
            to={ROUTES.login.name}
            class="btn btn-outline-success my-2 my-sm-0"
          >
            Login
          </Link>
        </div>
      );
    }
  }
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          {renderMenu()}
          {renderButtons()}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
