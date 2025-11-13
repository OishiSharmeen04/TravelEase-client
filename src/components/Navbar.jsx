import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    setShowDropdown(false); // close dropdown when logging out
    logout()
      .then(() => toast.success("Logged out successfully!"))
      .catch((error) => toast.error(error.message));
  };

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `block px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            isActive
              ? "text-primary bg-primary/10"
              : "text-secondary hover:text-primary hover:bg-primary/5"
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/all-vehicles"
        className={({ isActive }) =>
          `block px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            isActive
              ? "text-primary bg-primary/10"
              : "text-secondary hover:text-primary hover:bg-primary/5"
          }`
        }
      >
        All Vehicles
      </NavLink>

      {user && (
        <>
          <NavLink
            to="/add-vehicle"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-secondary hover:text-primary hover:bg-primary/5"
              }`
            }
          >
            Add Vehicle
          </NavLink>

          <NavLink
            to="/my-vehicles"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-secondary hover:text-primary hover:bg-primary/5"
              }`
            }
          >
            My Vehicles
          </NavLink>

          <NavLink
            to="/my-bookings"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-secondary hover:text-primary hover:bg-primary/5"
              }`
            }
          >
            My Bookings
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <nav className="glass border-b border-white/10 sticky top-0 z-50 backdrop-blur-custom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src={logo}
              alt="TravelEase Logo"
              className="h-10 w-auto transition-transform group-hover:scale-105"
            />
            <span className="text-2xl font-display font-bold text-neutral group-hover:text-gray-500 transition-colors duration-200">
              Travel
              <span className="text-primary transition-colors duration-200 hover:text-primary/70">
                Ease
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="flex items-center space-x-2 group"
                >
                  <img
                    src={
                      user.photoURL ||
                      "https://cdn-icons-png.flaticon.com/512/5987/5987424.png"
                    }
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full border-2 border-primary ring-2 ring-primary/20 
                             group-hover:ring-4 transition-all duration-200"
                  />
                </button>

                {showDropdown && (
                  <div
                    className="absolute right-0 mt-2 w-48 rounded-xl shadow-glow-lg 
               py-2 animate-slide-down bg-base-200/90 backdrop-blur-md border border-base-300"
                  >
                    <div className="px-4 py-2 border-b border-primary">
                      <p className="text-sm font-semibold text-neutral">
                        {user.displayName}
                      </p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-secondary 
                 hover:bg-dark-600 hover:text-primary"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-secondary hover:text-gray-500 transition-colors duration-200 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-primary hover:text-gray-500"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile & Tablet Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-gray-300 hover:text-primary transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* ✅ Mobile & Tablet Dropdown Menu */}
        {isMenuOpen && (
          <div
            className="lg:hidden mt-2 mb-4 bg-base-200 text-neutral border border-base-300 
                       rounded-xl shadow-lg py-2 backdrop-blur-md animate-slide-down"
          >
            <div className="flex flex-col divide-y divide-base-300">
              {user ? (
                <>
                  {/* Nav Links */}
                  <div className="flex flex-col">{navLinks}</div>

                  {/* Theme Toggle */}
                  <div className="px-4 py-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-secondary">Theme</span>
                    <ThemeToggle />
                  </div>

                  {/* User Info */}
                  <div className="px-4 py-3 border-t border-base-300 bg-base-100/50 rounded-b-xl">
                    <div className="flex items-center space-x-3">
                      <img
                        src={
                          user.photoURL ||
                          "https://cdn-icons-png.flaticon.com/512/5987/5987424.png"
                        }
                        alt={user.displayName}
                        className="w-10 h-10 rounded-full border border-primary"
                      />
                      <div>
                        <p className="text-sm font-semibold">{user.displayName}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full mt-3 text-left text-sm text-secondary px-4 py-2 
                                 rounded-lg hover:bg-base-300 hover:text-primary transition-all"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Nav Links */}
                  <div className="flex flex-col">{navLinks}</div>

                  {/* Theme Toggle */}
                  <div className="px-4 py-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-secondary">Theme</span>
                    <ThemeToggle />
                  </div>

                  {/* Guest Links */}
                  <div className="flex flex-col px-4 py-2 space-y-2">
                    <Link
                      to="/login"
                      className="px-4 py-2 hover:bg-base-300 hover:text-primary rounded-lg transition-all"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="px-4 py-2 bg-primary text-secondary font-semibold rounded-lg text-center hover:bg-primary/90 transition-all"
                    >
                      Register
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;