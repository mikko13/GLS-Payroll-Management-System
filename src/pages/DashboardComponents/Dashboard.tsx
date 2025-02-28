import React, { useState } from "react";
import {
  BarChart,
  PieChart,
  Activity,
  Users,
  PhilippinePeso,
  AlertCircle,
  ChevronDown,
  Bell,
} from "lucide-react";
import Sidebar from "../SidebarComponents/Sidebar";

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSidebarItem, setActiveSidebarItem] = useState("Dashboard");

  const stats = [
    {
      title: "Total Employees",
      value: "124",
      change: "+8%",
      icon: <Users size={20} className="text-blue-600" />,
      positive: true,
    },
    {
      title: "Monthly Payroll",
      value: "₱1.24M",
      change: "+12%",
      icon: <PhilippinePeso size={20} className="text-blue-600" />,
      positive: true,
    },
  ];

  // Sample data for announcements
  const announcements = [
    {
      title: "Payroll Processing Schedule",
      content:
        "The next payroll cycle will be processed on March 15, 2025. Please ensure all time entries are submitted by March 13.",
      date: "Feb 28, 2025",
    },
    {
      title: "System Maintenance",
      content:
        "The system will undergo scheduled maintenance on March 1, 2025 from 10:00 PM to 12:00 AM. Some features may be temporarily unavailable.",
      date: "Feb 27, 2025",
    },
    {
      title: "New Employee Orientation",
      content:
        "Orientation for new employees will be held on March 5, 2025 at 9:00 AM via Zoom. Attendance is mandatory for all new hires.",
      date: "Feb 25, 2025",
    },
  ];

  // Sample data for pending tasks
  const pendingTasks = [
    {
      task: "Approve overtime requests",
      deadline: "March 1, 2025",
      priority: "High",
    },
    {
      task: "Review employee performance evaluations",
      deadline: "March 10, 2025",
      priority: "Medium",
    },
    {
      task: "Update department budget allocations",
      deadline: "March 15, 2025",
      priority: "Low",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed h-screen">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeSidebarItem={activeSidebarItem}
          setActiveSidebarItem={setActiveSidebarItem}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 overflow-y-auto">
        <div className="border-b border-blue-100 p-4 bg-white">
          <div className="flex items-center justify-between">
            <div className="text-blue-800 ml-4 font-bold">Home</div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
                <Bell
                  size={20}
                  className="text-gray-500 cursor-pointer hover:text-blue-800 transition-colors duration-200"
                />
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center text-white shadow">
                  M
                </div>
                <span className="text-gray-800">Mommy</span>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <main className="p-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border border-blue-100"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-gray-500 text-sm font-medium">
                      {stat.title}
                    </h3>
                    <div className="mt-2 flex items-baseline">
                      <p className="text-2xl font-semibold text-blue-800">
                        {stat.value}
                      </p>
                      <span
                        className={`ml-2 text-xs font-medium ${
                          stat.positive ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="p-2 bg-blue-50 rounded-md">{stat.icon}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Payroll summary chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-blue-800">
                  Payroll Summary
                </h2>
                <div className="flex items-center text-sm text-gray-500">
                  <BarChart size={16} className="mr-2" />
                  <span>Last 6 months</span>
                </div>
              </div>
              <div className="h-64 flex items-center justify-center border-t border-blue-100 pt-4">
                <div className="text-center text-gray-500">
                  <Activity size={48} className="mx-auto text-blue-200 mb-2" />
                  <p>Payroll trend visualization</p>
                  <p className="text-sm text-gray-400">
                    (Chart visualization would appear here)
                  </p>
                </div>
              </div>
            </div>

            {/* Department distribution */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-blue-800">
                  Department Distribution
                </h2>
                <div className="flex items-center text-sm text-gray-500">
                  <PieChart size={16} className="mr-2" />
                  <span>By headcount</span>
                </div>
              </div>
              <div className="h-64 flex items-center justify-center border-t border-blue-100 pt-4">
                <div className="text-center text-gray-500">
                  <PieChart size={48} className="mx-auto text-blue-200 mb-2" />
                  <p>Department distribution chart</p>
                  <p className="text-sm text-gray-400">
                    (Chart visualization would appear here)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Announcements */}
            <div className="bg-white rounded-lg shadow-sm border border-blue-100">
              <div className="px-6 py-4 border-b border-blue-100">
                <h2 className="text-lg font-medium text-blue-800">
                  Announcements
                </h2>
              </div>
              <div className="divide-y divide-blue-100">
                {announcements.map((announcement, index) => (
                  <div key={index} className="p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-800">
                        {announcement.title}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {announcement.date}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      {announcement.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Tasks */}
            <div className="bg-white rounded-lg shadow-sm border border-blue-100">
              <div className="px-6 py-4 border-b border-blue-100">
                <h2 className="text-lg font-medium text-blue-800">
                  Pending Tasks
                </h2>
              </div>
              <div className="p-6">
                {pendingTasks.map((task, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <div className="flex items-start">
                      <div
                        className={`mt-1 mr-3 flex-shrink-0 w-2 h-2 rounded-full ${
                          task.priority === "High"
                            ? "bg-red-500"
                            : task.priority === "Medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">
                          {task.task}
                        </h3>
                        <div className="flex items-center mt-1">
                          <AlertCircle
                            size={14}
                            className="text-gray-400 mr-1"
                          />
                          <span className="text-xs text-gray-500">
                            Due: {task.deadline}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
