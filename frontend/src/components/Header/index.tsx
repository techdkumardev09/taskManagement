import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions/userActions";
import { allImages } from "../../utils/constants";
import { getUser } from "../../utils";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const isAuthenticated = useSelector((state: any) => state.isAuthenticated);
  const isUserAuthenticated = localStorage.getItem("user") !== null;

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setDropdownOpen(false);
    dispatch(logout());
    navigate("/signin");
  };

  const openProfile = () => {
    navigate("/profile");
    setDropdownOpen(false);
  };

  const getFirstLetter = (email: string) => {
    return email ? email[0].toUpperCase() : "";
  };

  return (
    <header className="bg-[#01172c] p-4">
      <div className="container max-w-[1200px] mx-auto flex items-center justify-between">
        <Link
          to={isUserAuthenticated ? "/" : "/signin"}
          className="text-[#fff] md:text-2xl text-md font-semibold flex items-center gap-1"
        >
          <img className="w-16" src={allImages.brandLogo} alt="logo" />
          <span>Master</span>
        </Link>

        {isAuthenticated || isUserAuthenticated ? (
          <div className="flex justify-center items-center relative">
            <p className="ml-2 text-white mr-2 hidden sm:inline">
              Welcome, {getUser()?.user?.name}
            </p>
            <div
              onClick={toggleDropdown}
              className="cursor-pointer rounded-full w-8 h-8 bg-white shadow-sm flex items-center justify-center text-blue-800 text-xl font-bold ml-3"
            >
              {getUser() !== null && getFirstLetter(getUser()?.user?.name)}
            </div>
            {isDropdownOpen && (
              <div className="absolute top-12 right-0 bg-white border rounded shadow-md w-48 z-50">
                <ul>
                  <li
                    className="p-4 pl-6 cursor-pointer flex gap-4 text-lg items-center"
                    onClick={openProfile}
                  >
                    <img
                      alt="profile"
                      src={allImages.userProfile}
                      className="w-6 h-6"
                    ></img>
                    Profile
                  </li>
                  <li
                    className=" p-4 pl-6 flex gap-4 text-lg cursor-pointer border-b border-gray-100 items-center"
                    onClick={handleLogout}
                  >
                    <img
                      alt="logout"
                      src={allImages.logOut}
                      className="w-5 h-5"
                    ></img>
                    <span>Logout</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div>
            <nav className="space-x-4">
              <Link to="/signup" className="text-white">
                Sign up
              </Link>
              <Link to="/signin" className="text-white">
                Sign in
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
