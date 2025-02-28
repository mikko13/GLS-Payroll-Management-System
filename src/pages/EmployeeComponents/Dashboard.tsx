import { useState } from "react";
import Sidebar from "../SidebarComponents/Sidebar";
import Header from "./Header";
import EmployeeStats from "./Stats";
import EmployeeActions from "./Actions";
import EmployeeTable from "./Table";

const EmployeeDashboard = () => {
  const [employees] = useState([
    {
      id: "1",
      lastName: "lastname",
      firstName: "firstname",
      middleName: "middlename",
      gender: "gender",
      position: "position",
      department: "department",
      dateStarted: "MM-DD-YYYY",
      rate: "rate",
      civilStatus: "civil status",
      birthDate: "MM-DD-YYYY",
      sss: "#####",
      hdmf: "#####",
      philhealth: "#####",
      tin: "#####",
      emailAddress: "email",
      permanentAddress: "address",
      contactNumber: "###",
      status: "status",
      remarks: "remarks",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.middleName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(
    (emp) => emp.status === "active"
  ).length;

  const inactiveEmployees = employees.filter(
    (emp) => emp.status === "inactive"
  ).length;

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSidebarItem, setActiveSidebarItem] = useState("Employees");

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar
        sidebarOpen={sidebarOpen}
        activeSidebarItem={activeSidebarItem}
        setActiveSidebarItem={setActiveSidebarItem}
        setSidebarOpen={setSidebarOpen}
      />
      <div
        className="flex-1 flex flex-col h-screen overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f8fafc, #f0f4f8)" }}
      >
        <Header />
        <div className="flex-1 overflow-y-auto">
          <EmployeeStats
            totalEmployees={totalEmployees}
            activeEmployees={activeEmployees}
            inactiveEmployees={inactiveEmployees}
          />
          <EmployeeActions
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            displayedEmployees={displayedEmployees}
          />
          <EmployeeTable
            displayedEmployees={displayedEmployees}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            filteredEmployees={filteredEmployees}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
