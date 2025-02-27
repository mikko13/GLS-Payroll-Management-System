import React, { useState } from "react";
import {
  Home,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  PhilippinePeso,
  ChevronRight,
  Calendar,
  Clock,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom"; // Import the Link component

const DashboardComponent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSidebarItem] = useState("Dashboard");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="flex relative">
        {!sidebarOpen && (
          <button
            className="absolute -right-7 top-4 bg-blue-700 text-white p-2 rounded-md hover:bg-blue-600 transition-all duration-200 shadow-sm z-10 cursor-pointer"
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
          <div
            className={`p-6 flex justify-between items-center transition-opacity duration-300 ${
              sidebarOpen ? "opacity-100" : "opacity-0"
            }`}
          >
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

          <div
            className={`flex-1 overflow-y-auto transition-opacity duration-300 ${
              sidebarOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="px-4 py-2">
              {[
                { name: "Dashboard", icon: <Home size={18} />, path: "/" },
                { name: "Payroll", icon: <PhilippinePeso size={18} />, path: "/Payroll" },
                { name: "Employees", icon: <Users size={18} />, path: "/Employees" },
                { name: "Settings", icon: <Settings size={18} />, path: "/Settings" },
              ].map((item) => (
                <Link to={item.path} key={item.name}>
                  <div className="mb-1">
                    <div
                      className={`flex items-center py-2 px-3 rounded-md cursor-pointer 
                      hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 ${
                        activeSidebarItem === item.name
                          ? "bg-blue-100 text-blue-800"
                          : "text-gray-600"
                      }`}
                    >
                      <div className="mr-3">{item.icon}</div>
                      <span>{item.name}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div
            className={`p-4 border-t border-blue-100 transition-opacity duration-300 ${
              sidebarOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex items-center text-gray-600 hover:text-blue-800 cursor-pointer transition-colors duration-200">
              <LogOut size={18} className="mr-3" />
              <span>Log out</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="flex items-center cursor-pointer">
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-sm">
                    M
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    Mommy
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Card 1 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3 rounded-full bg-blue-100 text-blue-600">
                  <Users size={20} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    Total Employees
                  </p>
                  <p className="text-xl font-semibold text-gray-800">2</p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3 rounded-full bg-green-100 text-green-600">
                  <Users size={20} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Active</p>
                  <p className="text-xl font-semibold text-gray-800">1</p>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3 rounded-full bg-red-100 text-red-600">
                  <Users size={20} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">On Leave</p>
                  <p className="text-xl font-semibold text-gray-800">1</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent activity table */}
          <div className="mt-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-800 mb-2 sm:mb-0">
                  Recently Active Employees
                </h3>
                <a
                  href="#"
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  View all employees <ChevronRight size={14} className="ml-1" />
                </a>
              </div>

              <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Employee
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Department
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Position
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Last Active
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* Row 4 */}
                      <tr>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium text-sm">
                              W
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-800">
                                wek
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-600">
                          Marketing
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-600">
                          Marketing Specialist
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            On Leave
                          </span>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-600">
                          Feb 24, 2025
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-right text-sm">
                          <a
                            href="#"
                            className="text-blue-600 hover:text-blue-800 mr-3"
                          >
                            View
                          </a>
                          <a
                            href="#"
                            className="text-gray-600 hover:text-gray-800"
                          >
                            Edit
                          </a>
                        </td>
                      </tr>

                      {/* Row 5 */}
                      <tr>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white font-medium text-sm">
                              R
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-800">
                                RO
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-600">
                          Operations
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-600">
                          Operations Manager
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-600">
                          Feb 25, 2025
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-right text-sm">
                          <a
                            href="#"
                            className="text-blue-600 hover:text-blue-800 mr-3"
                          >
                            View
                          </a>
                          <a
                            href="#"
                            className="text-gray-600 hover:text-gray-800"
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">5</span> of{" "}
                  <span className="font-medium">143</span> employees
                </div>
                <div className="flex space-x-1">
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50">
                    Previous
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700">
                    1
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 bg-white hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 bg-white hover:bg-gray-50">
                    3
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 bg-white hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming events section */}
          <div className="mt-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-800 mb-2 sm:mb-0">
                  Upcoming Deadlines & Events
                </h3>
                <a
                  href="#"
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  View calendar <ChevronRight size={14} className="ml-1" />
                </a>
              </div>

              {/* Events grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Event card 1 */}
                <div className="border border-gray-200 rounded-md p-4 bg-blue-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                        <Calendar size={18} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-800">
                        Payroll Processing
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Final day to process February payroll
                      </p>
                      <div className="flex items-center mt-2">
                        <Clock size={14} className="text-gray-400" />
                        <span className="ml-1 text-xs text-gray-500">
                          Tomorrow, 5:00 PM
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Event card 2 */}
                <div className="border border-gray-200 rounded-md p-4 bg-green-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white">
                        <Users size={18} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-800">
                        Department Meeting
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Quarterly performance review
                      </p>
                      <div className="flex items-center mt-2">
                        <Clock size={14} className="text-gray-400" />
                        <span className="ml-1 text-xs text-gray-500">
                          Mar 1, 10:00 AM
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Event card 3 */}
                <div className="border border-gray-200 rounded-md p-4 bg-purple-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white">
                        <FileText size={18} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-800">
                        Tax Compliance
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Submit monthly tax declarations
                      </p>
                      <div className="flex items-center mt-2">
                        <Clock size={14} className="text-gray-400" />
                        <span className="ml-1 text-xs text-gray-500">
                          Mar 5, 11:59 PM
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-gray-500">
              © 2025 G.L.S. Payroll System. All rights reserved.
            </div>
            <div className="mt-3 md:mt-0 flex space-x-4">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Contact Support
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardComponent;