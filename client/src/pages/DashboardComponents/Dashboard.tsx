import React, { useState } from "react";
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

  // Data that could potentially come from API calls or context
  const stats: StatCardProps[] = [
    {
      title: "Total Employees",
      value: "124",
      change: "+8%",
      iconName: "Users",
      positive: true,
    },
    {
      title: "Monthly Payroll",
      value: "₱1.24M",
      change: "+12%",
      iconName: "PhilippinePeso",
      positive: true,
    },
  ];

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
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
            <StatCards stats={stats} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Payroll summary chart */}
            <div className="lg:col-span-2">
              <PayrollSummaryChart />
            </div>

            {/* Department distribution */}
            <div>
              <DepartmentDistributionChart />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Announcements */}
            <AnnouncementsList announcements={announcements} />

            {/* Pending Tasks */}
            <PendingTasksList tasks={pendingTasks} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
