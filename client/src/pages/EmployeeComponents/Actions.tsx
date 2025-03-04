import { useState } from "react";
import {
  FileText,
  Users,
  Search,
  Filter,
  Plus,
  X,
  ChevronDown,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  // Get unique values for filter dropdowns
  const uniqueDepartments = [
    ...new Set(employees.map((emp) => emp.department)),
  ];
  const uniquePositions = [...new Set(employees.map((emp) => emp.position))];
  const uniqueStatuses = [...new Set(employees.map((emp) => emp.status))];
  const uniqueRemarks = [...new Set(employees.map((emp) => emp.remarks))];

  // Advanced filtering function
  const applyFilters = () => {
    let filteredData = employees.filter((employee) => {
      const matchesSearch =
        employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.middleName.toLowerCase().includes(searchQuery.toLowerCase());

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
  };

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

  // Reset all filters
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

  const generatePDF = () => {
    // Initialize PDF document in landscape mode
    const doc = new jsPDF("landscape");
    const pageWidth = doc.internal.pageSize.getWidth();

    // Add header with title
    doc.setFillColor(51, 102, 204);
    doc.rect(0, 0, pageWidth, 25, "F");
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("Century Park Hotel GLS Staff Data Based", 14, 15);

    const today = new Date();
    const dateStr = today.toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`As of: ${dateStr}`, pageWidth - 14, 10, { align: "right" });

    // Company info
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.text("GLS Manpower Services", 14, 35);
    doc.text(
      "Suite 19 G/F Midland Plaza, M. Adriatico Street, Ermita, City of Manila 1000 Metro Manila",
      14,
      40
    );
    doc.text("gls_manpowerservices@yahoo.com | +63 (2) 8 526 5813", 14, 45);

    // Add summary box
    doc.setDrawColor(220, 220, 220);
    doc.setFillColor(245, 245, 250);
    doc.roundedRect(pageWidth - 80, 30, 70, 20, 3, 3, "FD");
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(11);
    doc.text("Total Employees:", pageWidth - 75, 38);
    doc.setFont("helvetica", "bold");
    doc.text(`${displayedEmployees.length}`, pageWidth - 30, 38);

    // Define all columns to match the table headers exactly
    const columns = [
      { header: "Last Name", dataKey: "lastName" },
      { header: "First Name", dataKey: "firstName" },
      { header: "Middle Name", dataKey: "middleName" },
      { header: "Gender", dataKey: "gender" },
      { header: "Position", dataKey: "position" },
      { header: "Department", dataKey: "department" },
      { header: "Date Started", dataKey: "dateStarted" },
      { header: "Rate", dataKey: "rate" },
      { header: "Civil Status", dataKey: "civilStatus" },
      { header: "Birthday", dataKey: "birthDate" },
      { header: "SSS Number", dataKey: "sss" },
      { header: "HDMF/PAGIBIG", dataKey: "hdmf" },
      { header: "Philhealth", dataKey: "philhealth" },
      { header: "Tin Number", dataKey: "tin" },
      { header: "Email Address", dataKey: "emailAddress" },
      { header: "Permanent Address", dataKey: "permanentAddress" },
      { header: "Contact Number", dataKey: "contactNumber" },
      { header: "Status", dataKey: "status" },
      { header: "Remarks", dataKey: "remarks" },
    ];

    // Format status for better appearance in PDF
    const formatStatus = (status: string) => {
      return status.charAt(0).toUpperCase() + status.slice(1);
    };

    // Add table using the imported autoTable function
    autoTable(doc, {
      startY: 55,
      head: [columns.map((col) => col.header)],
      body: displayedEmployees.map((employee) => [
        employee.lastName,
        employee.firstName,
        employee.middleName,
        employee.gender,
        employee.position,
        employee.department,
        employee.dateStarted,
        employee.rate,
        employee.civilStatus || "",
        employee.birthDate || "",
        employee.sss || "",
        employee.hdmf || "",
        employee.philhealth || "",
        employee.tin || "",
        employee.emailAddress || "",
        employee.permanentAddress || "",
        employee.contactNumber || "",
        formatStatus(employee.status),
        employee.remarks,
      ]),
      theme: "grid",
      headStyles: {
        fillColor: [73, 137, 222],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        halign: "center",
        fontSize: 8,
      },
      bodyStyles: {
        fontSize: 7,
      },
      alternateRowStyles: {
        fillColor: [240, 245, 255],
      },
      styles: {
        lineColor: [220, 220, 220],
        lineWidth: 0.1,
        cellPadding: 2,
        overflow: "linebreak",
      },
      columnStyles: {
        15: {
          // Permanent Address
          cellWidth: "auto",
          overflow: "linebreak",
        },
        18: {
          // Remarks
          cellWidth: "auto",
          overflow: "linebreak",
        },
      },
      didDrawPage: () => {
        // Footer with page numbers
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.text(
            `Page ${i} of ${pageCount}`,
            pageWidth / 2,
            doc.internal.pageSize.getHeight() - 10,
            {
              align: "center",
            }
          );
          doc.text(
            "CONFIDENTIAL - FOR INTERNAL USE ONLY",
            14,
            doc.internal.pageSize.getHeight() - 10
          );
        }
      },
    });

    doc.save("employee-complete-report.pdf");
  };

  return (
    <div className="p-4">
      {/* Desktop Layout */}
      <div className="hidden md:flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-3 py-2 rounded-md text-sm flex items-center transition-all duration-200 shadow-md cursor-pointer"
            onClick={() => navigate("/Employees/AddEmployee")}
          >
            <Users size={16} className="mr-2" />
            Add Employee
          </button>
          <button
            onClick={generatePDF}
            className="bg-white hover:bg-blue-50 text-gray-800 px-3 py-2 rounded-md text-sm flex items-center transition-colors duration-200 border border-blue-200 cursor-pointer"
          >
            <FileText size={16} className="mr-2" />
            Generate PDF
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
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

          {/* Advanced Filter Dropdown */}
          <div className="relative">
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
                  {/* Department Filter */}
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

                  {/* Position Filter */}
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

                  {/* Status Filter */}
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

                  {/* Remarks Filter */}
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

                  {/* Filter Actions */}
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

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex justify-between items-center">
          <div className="relative flex-1 mr-2">
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
            <div className="relative">
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

                    {/* Filter Sections */}
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

                    {/* Filter Actions */}
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
              className="p-2 rounded-md bg-gradient-to-r from-blue-700 to-blue-800 text-white transition-colors duration-200"
            >
              {mobileActionsOpen ? <X size={16} /> : <Plus size={16} />}
            </button>
          </div>
        </div>

        {mobileActionsOpen && (
          <div className="mt-2 space-y-2 animate-fade-in">
            <button
              className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-3 py-2 rounded-md text-sm flex items-center transition-all duration-200 shadow-md w-full"
              onClick={() => navigate("/Employees/AddEmployee")}
            >
              <Users size={16} className="mr-2" />
              Add Employee
            </button>
            <button
              onClick={generatePDF}
              className="bg-white hover:bg-blue-50 text-gray-800 px-3 py-2 rounded-md text-sm flex items-center transition-colors duration-200 border border-blue-200 w-full"
            >
              <FileText size={16} className="mr-2" />
              Generate PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeActions;
