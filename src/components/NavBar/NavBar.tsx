import { useAuth } from "../../lib/context/AuthenticatedContext";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const { user, onLogout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="navbar bg-base-300 mb-10">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-xl">
          CCS Tap And Track
        </a>
      </div>
      {user && (
        <div className="flex-none">
          <nav>
            <ul className="menu menu-horizontal px-1 text-white gap-5">
              <li>
                <NavLink to="/students" className={"text-white"}>
                  Students
                </NavLink>
              </li>
              {/* <li>
                <NavLink to="/reports" className={"text-white"}>
                  Reports
                </NavLink>
              </li> */}
              <li>
                <NavLink to="/admin" className={"text-white"}>
                  Admin
                </NavLink>
              </li>
              <li>
                <div
                  onClick={() => {
                    onLogout();
                    navigate("/");
                  }}
                >
                  Logout
                </div>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default NavBar;
