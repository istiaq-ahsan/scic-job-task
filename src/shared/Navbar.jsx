import { NavLink, useLocation, useNavigate } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import SaveUser from "../hooks/SaveUser";
import UseAxiosPublic from "../hooks/UseAxiosPublic";
import { toast } from "react-toastify";

const Navbar = () => {
  const { signInWithGoogle, loading, user, logOut } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const handleGoogleSignIn = async () => {
    try {
      //Registration google
      const data = await signInWithGoogle();
      await SaveUser(data?.user);

      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div>
      <div className="navbar bg-base-300 px-5 fixed top-0 z-50">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Task Management</a>
        </div>
        <div className="flex gap-5">
          <div>
            {user && user?.email ? (
              <button
                onClick={logOut}
                className="btn btn-neutral hover:bg-blue-700 border-none"
              >
                LogOut
              </button>
            ) : (
              <button
                onClick={handleGoogleSignIn}
                className="btn btn-primary text-white hover:bg-gray-900 border-none"
              >
                Sign In
              </button>
            )}
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full border-2">
                {user && (
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoURL}
                  />
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={logOut}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
