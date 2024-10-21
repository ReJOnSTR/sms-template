// src/components/Navbar.jsx
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push("/login");
  };

  return (
    <nav className="bg-gray-800 text-white w-full">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-white font-bold text-xl">
              SMS Şablonları
            </Link>
          </div>
          <div className="hidden md:flex items-center justify-end flex-1">
            {user ? (
              <>
                <span className="mr-4">Hoş geldin, {user.username}</span>
                <button
                  onClick={handleLogout}
                  className="ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="ml-4 bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Giriş Yap
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
