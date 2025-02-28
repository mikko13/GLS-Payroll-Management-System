import { FileText, Users, Search, Filter, Plus } from "lucide-react";
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
  civilStatus: string;
  birthDate: string;
  sss: string;
  hdmf: string;
  philhealth: string;
  tin: string;
  emailAddress: string;
  permanentAddress: string;
  contactNumber: string;
  status: string;
  remarks: string;
}

interface EmployeeActionsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  displayedEmployees: Employee[];
}

const EmployeeActions = ({
  searchQuery,
  setSearchQuery,
  displayedEmployees,
}: EmployeeActionsProps) => {
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
        employee.civilStatus,
        employee.birthDate,
        employee.sss,
        employee.hdmf,
        employee.philhealth,
        employee.tin,
        employee.emailAddress,
        employee.permanentAddress,
        employee.contactNumber,
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

  const navigate = useNavigate();

  return (
    <div className="p-4">
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
          <button className="p-2 rounded-md bg-white hover:bg-blue-50 transition-colors duration-200 border border-blue-200">
            <Filter size={16} className="text-gray-400" />
          </button>
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex justify-between items-center">
          <div className="relative flex-1 mr-2">
            <input
              type="text"
              placeholder="Search..."
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
            <button className="p-2 rounded-md bg-white hover:bg-blue-50 transition-colors duration-200 border border-blue-200">
              <Filter size={16} className="text-gray-400" />
            </button>
            <button
              onClick={generatePDF}
              className="p-2 rounded-md bg-white hover:bg-blue-50 text-gray-800 transition-colors duration-200 border border-blue-200"
            >
              <FileText size={16} className="text-gray-600" />
            </button>
            <button className="p-2 rounded-md bg-gradient-to-r from-blue-700 to-blue-800 text-white transition-colors duration-200">
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeActions;
