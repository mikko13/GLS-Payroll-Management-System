import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  PhilippinePeso,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  activeSidebarItem: string;
  setActiveSidebarItem: (item: string) => void;
  expandedSubmenu: string | null;
  setExpandedSubmenu: (item: string | null) => void;
}

const SidebarComponent: React.FC<SidebarProps> = ({
  sidebarOpen,
  toggleSidebar,
  activeSidebarItem,
  setActiveSidebarItem,
  expandedSubmenu,
  setExpandedSubmenu,
}) => {
  const handleMenuClick = (menuItem: string) => {
    setActiveSidebarItem(menuItem);
    if (menuItem === "Payroll") {
      setExpandedSubmenu(expandedSubmenu === "Payroll" ? null : "Payroll");
    }
  };

  return (
    <div className="flex relative">
      {!sidebarOpen && (
        <button
          className="absolute -left-2 top-4 bg-blue-700 text-white p-2 rounded-md hover:bg-blue-600 transition-all duration-200 shadow-sm z-10 cursor-pointer"
          onClick={toggleSidebar}
          aria-label="Open Sidebar"
        >
          <ChevronRight size={18} />
        </button>
      )}

      <div
        className={`border-r border-blue-900/20 flex flex-col transition-all duration-500 ease-in-out ${
          sidebarOpen ? "w-64" : "w-0"
        }`}
        style={{ background: "linear-gradient(to bottom, #fff, #f8fafc)" }}
      >
        <div className="p-6 flex justify-between items-center">
          <div className="flex flex-col">
            <div className="text-xl font-bold flex items-center">
              <span className="text-blue-800 mr-1 tracking-widest">G.</span>
              <span className="text-blue-800 mr-1 tracking-widest">L.</span>
              <span className="text-blue-800 tracking-widest">S.</span>
            </div>
            <div className="text-xs font-semibold tracking-wider text-blue-800">
              MANPOWER SERVICES
            </div>
            <div className="text-xs font-semibold tracking-wider text-blue-800">
              Payroll Management System
            </div>
          </div>
          <button
            className="text-gray-500 hover:text-blue-800 transition-colors duration-200 cursor-pointer"
            onClick={toggleSidebar}
            aria-label="Close Sidebar"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-2">
            {[
              {
                name: "Dashboard",
                icon: <Home size={18} />,
                path: "/Dashboard",
              },
              {
                name: "Payroll",
                icon: <PhilippinePeso size={18} />,
                path: "/Payroll",
              },
              {
                name: "Employees",
                icon: <Users size={18} />,
                path: "/Employees",
              },
              {
                name: "Settings",
                icon: <Settings size={18} />,
                path: "/Settings",
              },
            ].map((item) => (
              <div key={item.name} className="mb-1">
                <Link
                  to={item.path} // ✅ Navigation using Link
                  className={`flex items-center py-2 px-3 rounded-md cursor-pointer 
                  hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 ${
                    activeSidebarItem === item.name
                      ? "bg-blue-100 text-blue-800"
                      : "text-gray-600"
                  }`}
                  onClick={() => handleMenuClick(item.name)}
                >
                  <div className="mr-3">{item.icon}</div>
                  <span>{item.name}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-blue-100">
          <div className="flex items-center text-gray-600 hover:text-blue-800 cursor-pointer transition-colors duration-200">
            <LogOut size={18} className="mr-3" />
            <span>Log out</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
