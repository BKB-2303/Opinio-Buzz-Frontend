import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

const Sidebar = ({ items }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout } = useContext(AppContext);
  const navigate = useNavigate();
  const [logoutMessage, setLogoutMessage] = useState("");

  const openNav = () => {
    setIsSidebarOpen(true);
  };

  const closeNav = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      setLogoutMessage("Logout successful");
      setTimeout(() => setLogoutMessage(""), 1500); // Clear message after 1.5 seconds
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="flex">
      <div
        className={`fixed top-0 left-0 h-full bg-stone-950 overflow-x-hidden transition-width duration-500 ease-in-out ${
          isSidebarOpen ? "w-64" : "w-0"
        }`}
        id="mySidebar"
      >
        <button className="absolute top-0 right-3 text-4xl text-white" onClick={closeNav}>
          &times;
        </button>
        <div className="mt-16">
          {items.map((item, index) => (
            <Link key={index} to={item.link} className="block py-2 px-6 text-gray-400 hover:text-white">
              {item.text}
            </Link>
          ))}
          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="block py-2 px-6 text-gray-400 hover:text-white cursor-pointer"
          >
            Logout
          </button>
          {logoutMessage && (
            <div className="text-gray-400 text-sm mt-2">{logoutMessage}</div>
          )}
        </div>
      </div>

      <div
        className={`transition-margin duration-500 ease-in-out flex-grow ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
        id="main"
      >
        <button className="m-4 p-2 bg-stone-950 text-white rounded" onClick={openNav}>
          ☰ Open Sidebar
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
