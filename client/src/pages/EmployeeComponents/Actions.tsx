/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import {
  FileText,
  Users,
  Search,
  Filter,
  Plus,
  X,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import usePDFGenerator from "./usePDFGenerator";

interface Employee {
  id: string;
  lastName: string;
  firstName: string;
  middleName: string;
  gender: string;
  position: string;
  department: string;
  dateStarted: string;
  rate: string;
  status: string;
  remarks: string;
  civilStatus?: string;
  birthDate?: string;
  sss?: string;
  hdmf?: string;
  philhealth?: string;
  tin?: string;
  emailAddress?: string;
  permanentAddress?: string;
  contactNumber?: string;
}

interface EmployeeActionsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  displayedEmployees: Employee[];
  employees: Employee[];
  setFilteredEmployees: (employees: Employee[]) => void;
}

const EmployeeActions = ({
  searchQuery,
  setSearchQuery,
  displayedEmployees,
  employees,
  setFilteredEmployees,
}: EmployeeActionsProps) => {
  const [mobileActionsOpen, setMobileActionsOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [activeFilterSection, setActiveFilterSection] = useState<string | null>(
    null
  );
  const [filters, setFilters] = useState({
    department: "",
    position: "",
    status: "",
    remarks: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { generatePDF } = usePDFGenerator();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const uniqueDepartments = [
    ...new Set(employees.map((emp) => emp.department)),
  ];
  const uniquePositions = [...new Set(employees.map((emp) => emp.position))];
  const uniqueStatuses = [...new Set(employees.map((emp) => emp.status))];
  const uniqueRemarks = [...new Set(employees.map((emp) => emp.remarks))];

  const applyFilters = useCallback(() => {
    const filteredData = employees.filter((employee) => {
      const matchesSearch =
        searchQuery === "" ||
        employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.middleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `${employee.firstName} ${employee.middleName} ${employee.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesDepartment =
        !filters.department || employee.department === filters.department;

      const matchesPosition =
        !filters.position || employee.position === filters.position;

      const matchesStatus =
        !filters.status || employee.status === filters.status;

      const matchesRemarks =
        !filters.remarks || employee.remarks === filters.remarks;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesPosition &&
        matchesStatus &&
        matchesRemarks
      );
    });

    setFilteredEmployees(filteredData);
  }, [employees, searchQuery, filters, setFilteredEmployees]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const filterSections = [
    {
      label: "Department",
      key: "department",
      options: uniqueDepartments,
    },
    {
      label: "Position",
      key: "position",
      options: uniquePositions,
    },
    {
      label: "Status",
      key: "status",
      options: uniqueStatuses,
    },
    {
      label: "Remarks",
      key: "remarks",
      options: uniqueRemarks,
    },
  ];

  const resetFilters = () => {
    setFilters({
      department: "",
      position: "",
      status: "",
      remarks: "",
    });
    setSearchQuery("");
    setFilteredEmployees(employees);
    setFilterDropdownOpen(false);
  };

  const handleGeneratePDF = () => {
    generatePDF(displayedEmployees);
  };

  return (
    <div
      className="p-4 transition-all duration-500 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(10px)",
      }}
    >
      <div className="hidden md:flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-3 py-2 rounded-md text-sm flex items-center transition-all duration-200 shadow-md cursor-pointer"
            onClick={() => navigate("/Employees/AddEmployee")}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(5px)",
              transition: "opacity 500ms ease-out, transform 500ms ease-out",
              transitionDelay: "300ms",
            }}
          >
            <Users size={16} className="mr-2" />
            Add Employee
          </button>
          <button
            onClick={handleGeneratePDF}
            className="bg-white hover:bg-blue-50 text-gray-800 px-3 py-2 rounded-md text-sm flex items-center transition-colors duration-200 border border-blue-200 cursor-pointer"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(5px)",
              transition: "opacity 500ms ease-out, transform 500ms ease-out",
              transitionDelay: "400ms",
            }}
          >
            <FileText size={16} className="mr-2" />
            Generate PDF
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className="relative"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(10px)",
              transition: "opacity 500ms ease-out, transform 500ms ease-out",
              transitionDelay: "300ms",
            }}
          >
            <input
              type="text"
              placeholder="Search employees..."
              className="bg-white text-gray-800 px-3 py-2 rounded-md text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-blue-200 transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              size={16}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>

          <div
            className="relative"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(10px)",
              transition: "opacity 500ms ease-out, transform 500ms ease-out",
              transitionDelay: "400ms",
            }}
          >
            <button
              onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
              className="p-2 rounded-md bg-white hover:bg-blue-50 transition-colors duration-200 border border-blue-200 flex items-center"
            >
              <Filter size={16} className="text-gray-400 mr-1" />
              <ChevronDown size={14} className="text-gray-400" />
            </button>

            {filterDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-blue-100 rounded-lg shadow-lg p-4 z-50 animate-fade-in">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Department
                    </label>
                    <select
                      value={filters.department}
                      onChange={(e) => {
                        setFilters({ ...filters, department: e.target.value });
                        applyFilters();
                      }}
                      className="w-full px-3 py-2 border border-blue-200 rounded-md text-sm"
                    >
                      <option value="">All Departments</option>
                      {uniqueDepartments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position
                    </label>
                    <select
                      value={filters.position}
                      onChange={(e) => {
                        setFilters({ ...filters, position: e.target.value });
                        applyFilters();
                      }}
                      className="w-full px-3 py-2 border border-blue-200 rounded-md text-sm"
                    >
                      <option value="">All Positions</option>
                      {uniquePositions.map((pos) => (
                        <option key={pos} value={pos}>
                          {pos}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={filters.status}
                      onChange={(e) => {
                        setFilters({ ...filters, status: e.target.value });
                        applyFilters();
                      }}
                      className="w-full px-3 py-2 border border-blue-200 rounded-md text-sm"
                    >
                      <option value="">All Statuses</option>
                      {uniqueStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Remarks
                    </label>
                    <select
                      value={filters.remarks}
                      onChange={(e) => {
                        setFilters({ ...filters, remarks: e.target.value });
                        applyFilters();
                      }}
                      className="w-full px-3 py-2 border border-blue-200 rounded-md text-sm"
                    >
                      <option value="">All Remarks</option>
                      {uniqueRemarks.map((remark) => (
                        <option key={remark} value={remark}>
                          {remark}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-between mt-4">
                    <button
                      onClick={resetFilters}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      Reset Filters
                    </button>
                    <button
                      onClick={() => setFilterDropdownOpen(false)}
                      className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex justify-between items-center">
          <div
            className="relative flex-1 mr-2"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(5px)",
              transition: "opacity 500ms ease-out, transform 500ms ease-out",
              transitionDelay: "300ms",
            }}
          >
            <input
              type="text"
              placeholder="Search employees..."
              className="bg-white text-gray-800 px-3 py-2 rounded-md text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 border border-blue-200 transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              size={16}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>

          <div className="flex items-center space-x-2">
            <div
              className="relative"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(5px)",
                transition: "opacity 500ms ease-out, transform 500ms ease-out",
                transitionDelay: "400ms",
              }}
            >
              <button
                onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                className="p-2 rounded-md bg-white hover:bg-blue-50 transition-colors duration-200 border border-blue-200 flex items-center"
              >
                <Filter size={16} className="text-gray-400 mr-1" />
                <ChevronDown size={14} className="text-gray-400" />
              </button>

              {filterDropdownOpen && (
                <div className="fixed inset-0 z-50 flex items-end justify-center">
                  <div className="bg-white w-full rounded-t-2xl max-h-[80vh] overflow-y-auto animate-slide-up p-4 shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold text-gray-800">
                        Filter Employees
                      </h2>
                      <button
                        onClick={() => setFilterDropdownOpen(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={24} />
                      </button>
                    </div>

                    <div className="space-y-4">
                      {filterSections.map((section) => (
                        <div key={section.key}>
                          <button
                            onClick={() =>
                              setActiveFilterSection(
                                activeFilterSection === section.key
                                  ? null
                                  : section.key
                              )
                            }
                            className="w-full flex justify-between items-center px-3 py-2 bg-blue-50 rounded-md"
                          >
                            <span className="text-sm font-medium">
                              {section.label}
                            </span>
                            <ChevronDown
                              size={16}
                              className={`transform transition-transform ${
                                activeFilterSection === section.key
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </button>

                          {activeFilterSection === section.key && (
                            <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                              {section.options.map((option) => (
                                <label
                                  key={option}
                                  className="flex items-center space-x-2 px-3 py-2 hover:bg-blue-50 rounded-md"
                                >
                                  <input
                                    type="radio"
                                    name={section.key}
                                    value={option}
                                    checked={
                                      filters[
                                        section.key as keyof typeof filters
                                      ] === option
                                    }
                                    onChange={() => {
                                      setFilters({
                                        ...filters,
                                        [section.key]:
                                          filters[
                                            section.key as keyof typeof filters
                                          ] === option
                                            ? ""
                                            : option,
                                      });
                                    }}
                                    className="form-radio text-blue-600"
                                  />
                                  <span className="text-sm">{option}</span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between mt-6 space-x-4">
                      <button
                        onClick={resetFilters}
                        className="flex-1 text-sm text-gray-600 bg-gray-100 py-3 rounded-md hover:bg-gray-200 transition-colors"
                      >
                        Reset Filters
                      </button>
                      <button
                        onClick={() => {
                          applyFilters();
                          setFilterDropdownOpen(false);
                        }}
                        className="flex-1 text-sm bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => setMobileActionsOpen(!mobileActionsOpen)}
              className="p-2 rounded-md bg-gradient-to-r from-blue-700 to-blue-800 text-white transition-all duration-200"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(5px)",
                transition: "opacity 500ms ease-out, transform 500ms ease-out",
                transitionDelay: "500ms",
              }}
            >
              {mobileActionsOpen ? <X size={16} /> : <Plus size={16} />}
            </button>
          </div>
        </div>

        {mobileActionsOpen && (
          <div className="mt-2 space-y-2">
            <div
              style={{
                animation: "slideDown 300ms ease forwards",
                opacity: 0,
                transform: "translateY(-20px)",
              }}
            >
              <button
                className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-3 py-2 rounded-md text-sm flex items-center transition-all duration-200 shadow-md w-full"
                onClick={() => navigate("/Employees/AddEmployee")}
              >
                <Users size={16} className="mr-2" />
                Add Employee
              </button>
            </div>
            <div
              style={{
                animation: "slideDown 300ms ease forwards",
                animationDelay: "100ms",
                opacity: 0,
                transform: "translateY(-20px)",
              }}
            >
              <button
                onClick={handleGeneratePDF}
                className="bg-white hover:bg-blue-50 text-gray-800 px-3 py-2 rounded-md text-sm flex items-center transition-colors duration-200 border border-blue-200 w-full"
              >
                <FileText size={16} className="mr-2" />
                Generate PDF
              </button>
            </div>
          </div>
        )}
      </div>
      <Toaster position="bottom-left" richColors />
    </div>
  );
};

export default EmployeeActions;
