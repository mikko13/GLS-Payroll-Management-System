import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../SidebarComponents/Sidebar";
import Header from "../HeaderComponents/Header";
import StatCards from "./StatCards";
import PayrollSummaryChart from "./PayrollSummaryChart";
import DepartmentDistributionChart from "./DepartmentDistributionChart";
import AnnouncementsList from "./AnnouncementsList";
import PendingTasksList from "./PendingTasksLists";
import { StatCardProps } from "./types";

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSidebarItem, setActiveSidebarItem] = useState("Dashboard");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employees");
        setEmployees(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

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
      <div className="fixed h-screen z-10">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeSidebarItem={activeSidebarItem}
          setActiveSidebarItem={setActiveSidebarItem}
        />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <Header />
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
            <StatCards employees={employees} loading={loading} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <PayrollSummaryChart />
            </div>

            <div>
              {loading ? (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100 h-full flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <p>Loading department data...</p>
                  </div>
                </div>
              ) : (
                <DepartmentDistributionChart employees={employees} />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnnouncementsList announcements={announcements} />

            <PendingTasksList tasks={pendingTasks} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
