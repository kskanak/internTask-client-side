import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const { logout, user } = useAuth0();
  return (
    <div>
      <div className="navbar bg-base-100 shadow-md">
        <div className="navbar-start">
          <Link className="normal-case text-xl flex items-center" to="/">
            <img src={logo} alt="sheraspace" className="h-16" />{" "}
            <span>Sheraspace</span>
          </Link>
        </div>

        <div className="navbar-end">
          {user?.name && (
            <button
              className="btn btn-error font-semibold text-white"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
