import React from "react";

const NavBar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-xl">CCS Tap And Track</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/login">LOGIN</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
