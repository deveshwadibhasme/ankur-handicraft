import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaDashcube,
  FaPlusCircle,
  FaList,
  FaShoppingBag,
  FaLockOpen,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { logoutAdmin } from "../api/auth";

const Sidebar = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaDashcube size={20} />,
    },
    {
      name: "Add Products",
      path: "/add-product",
      icon: <FaPlusCircle size={20} />,
    },
    {
      name: "List of Products",
      path: "/products",
      icon: <FaList size={20} />,
    },
  ];

  const handleLogout = () => {
    logoutAdmin();
    navigate("/login");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-indigo-600 text-white rounded-md shadow-lg"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`absolute md:relative left-0 top-0 h-screen max-w-55 w-full bg-white border-r border-gray-200 flex flex-col z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 flex items-center gap-3 border-b border-gray-50">
          <div className="rounded-lg">
            <img
              src="/favicon.ico"
              alt="Ankur Handicraft"
              className="h-8 w-8 object-contain"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-800">
            Ankur <span className="text-indigo-600">Admin</span>
          </span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 font-semibold shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="w-full flex cursor-pointer items-center gap-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
          >
            <FaLockOpen size={20} />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
