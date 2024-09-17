import { Link } from "react-router-dom";
import classes from "../styles/Account.module.css";
import { useAuth } from "../app/auth/contexts/AuthContext";
import { useSelector } from "react-redux";

export default function Account() {
  const { currentUser,logout } = useAuth();
  const user = useSelector((state) => state.login.user);

  return (
    <div className={classes.account}>
      {user && user.length != 0 ? (
        <>
          <span className="material-icons-outlined" title="Account">
            account_circle
          </span>
          <span>
             <Link to="/dashbord">{user.name}</Link>
          </span>
          <span
            className="material-icons-outlined"
            title="Logout"
            onClick={logout}
          >
            {" "}
            logout{" "}
          </span>
        </>
      ) : (
        <>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
}