import { useState } from "react";
import { ChevronLeft, ChevronRight, Download, Edit, Trash } from "lucide-react";
import { generateEmployeePDF } from "./pdfGenerator";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  getStatusColor,
  getRemarksColor,
  getRemarksIcon,
} from "./employeeUtils";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { Employee, EmployeeTableProps } from "./types";

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  displayedEmployees,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  filteredEmployees,
  employees,
  setEmployees,
}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null
  );

  const handleDownloadPDF = (employee: Employee) => {
    generateEmployeePDF(employee);
  };

  const navigate = useNavigate();

  const openDeleteModal = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setDeleteModalOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    navigate(`/Employees/UpdateEmployee/${employee.id}`, {
      state: { employee },
    });
  };

  const handleDeleteEmployee = async () => {
    if (!employeeToDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/employees/${employeeToDelete.id}`
      );

      const updatedEmployees = employees.filter(
        (emp) => emp.id !== employeeToDelete.id
      );
      setEmployees(updatedEmployees);

      setDeleteModalOpen(false);
      setEmployeeToDelete(null);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setEmployeeToDelete(null);
  };

  return (
    <>
      <div className="flex-1 overflow-auto p-4">
        <div className="rounded-lg overflow-hidden shadow animate-fadeIn bg-white border border-blue-100">
          <div className="overflow-x-auto">
            <table id="employee-table" className="w-full relative">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-blue-100 bg-blue-50">
                  <th className="p-3 w-12 text-left sticky left-0 bg-blue-50 z-10"></th>
                  <th className="p-3 text-left font-medium">Last Name</th>
                  <th className="p-3 text-left font-medium">First Name</th>
                  <th className="p-3 text-left font-medium">Middle Name</th>
                  <th className="p-3 text-left font-medium">Gender</th>
                  <th className="p-3 text-left font-medium">Position</th>
                  <th className="p-3 text-left font-medium">Department</th>
                  <th className="p-3 text-left font-medium">Date Started</th>
                  <th className="p-3 text-left font-medium">Rate</th>
                  <th className="p-3 text-left font-medium">Civil Status</th>
                  <th className="p-3 text-left font-medium">Birthday</th>
                  <th className="p-3 text-left font-medium">SSS Number</th>
                  <th className="p-3 text-left font-medium">HDMF/PAGIBIG</th>
                  <th className="p-3 text-left font-medium">Philhealth</th>
                  <th className="p-3 text-left font-medium">Tin Number</th>
                  <th className="p-3 text-left font-medium">Email Address</th>
                  <th className="p-3 text-left font-medium">
                    Permanent Address
                  </th>
                  <th className="p-3 text-left font-medium">Contact Number</th>
                  <th className="p-3 text-left font-medium">Status</th>
                  <th className="p-3 text-left font-medium">Remarks</th>
                  <th className="p-3 text-left font-medium sticky right-0 bg-blue-50 z-10">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayedEmployees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="border-b border-blue-50 hover:bg-blue-50 transition-all duration-200 animate-fadeIn"
                  >
                    <td className="p-3 sticky left-0 bg-white z-10"></td>
                    <td className="p-3 text-sm text-gray-800">
                      {employee.lastName}
                    </td>
                    <td className="p-3 text-sm text-gray-800">
                      {employee.firstName}
                    </td>
                    <td className="p-3 text-sm text-gray-800">
                      {employee.middleName}
                    </td>
                    <td className="p-3 text-sm text-gray-800">
                      {employee.gender}
                    </td>
                    <td className="p-3 text-sm text-gray-800">
                      {employee.position}
                    </td>
                    <td className="p-3 text-sm text-gray-800">
                      {employee.department}
                    </td>
                    <td className="p-3 text-sm text-gray-800">
                      {employee.dateStarted}
                    </td>
                    <td className="p-3 text-sm text-gray-800">
                      {employee.rate}
                    </td>
                    <td className="p-3 text-sm text-gray-800">
                      {employee.civilStatus}
                    </td>
                    <td className="p-3 text-sm text-gray-800">
                      {employee.birthDate}
                    </td>
                    <td className="p-3 text-sm text-gray-800">
                      {employee.sss}
                    </td>
                    <td className="p-3 text-sm text-gray-800">
                      {employee.hdmf}
                    </td>
                    <td className="p-3 text-sm text-gray-800">
                      {employee.philhealth}
                    </td>
                    <td className="p-3 text-sm text-gray-800">
                      {employee.tin}
                    </td>
                    <td className="p-3 text-sm text-gray-800">
                      {employee.emailAddress}
                    </td>
                    <td className="p-3 text-sm text-gray-800">
                      {employee.permanentAddress}
                    </td>
                    <td className="p-3 text-sm text-gray-800">
                      {employee.contactNumber}
                    </td>
                    <td className="p-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full flex items-center w-fit ${getStatusColor(
                          employee.status
                        )}`}
                      >
                        {employee.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {employee.remarks && (
                        <span
                          className={`text-xs px-2 py-1 rounded-full flex items-center w-fit ${getRemarksColor(
                            employee.remarks
                          )}`}
                        >
                          {getRemarksIcon(employee.remarks)}
                          {employee.remarks.length > 15
                            ? `${employee.remarks.substring(0, 15)}...`
                            : employee.remarks}
                        </span>
                      )}
                    </td>
                    <td className="p-3 sticky right-0 bg-white z-10">
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-1.5 bg-blue-50 hover:bg-blue-100 rounded-md text-gray-600 hover:text-blue-600 transition-all duration-200 cursor-pointer"
                          onClick={() => handleEditEmployee(employee)}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="p-1.5 bg-blue-50 hover:bg-blue-100 rounded-md text-gray-600 hover:text-blue-600 transition-all duration-200 cursor-pointer"
                          onClick={() => handleDownloadPDF(employee)}
                        >
                          <Download size={16} />
                        </button>
                        <button
                          className="p-1.5 bg-blue-50 hover:bg-blue-100 rounded-md text-gray-600 hover:text-red-600 transition-all duration-200 cursor-pointer"
                          onClick={() => openDeleteModal(employee)}
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Rest of the code remains the same */}
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 px-6 bg-white border-t border-blue-100">
            <div className="mb-4 sm:mb-0 text-sm text-gray-500">
              Showing {Math.min(1, filteredEmployees.length)} to{" "}
              {Math.min(itemsPerPage, filteredEmployees.length)} of{" "}
              {filteredEmployees.length} entries
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center mr-4">
                <span className="text-sm text-gray-500 mr-2">Display</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                  className="border border-blue-100 rounded px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                </select>
              </div>
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400"
                    : "bg-blue-50 text-gray-600 hover:bg-blue-100 hover:text-blue-700"
                } transition-all duration-200`}
              >
                <ChevronLeft size={16} />
              </button>
              <button className="h-8 w-8 rounded flex items-center justify-center text-sm transition-all duration-200 bg-blue-600 text-white">
                {currentPage}
              </button>
              <button
                onClick={() =>
                  setCurrentPage(
                    Math.min(
                      Math.ceil(filteredEmployees.length / itemsPerPage),
                      currentPage + 1
                    )
                  )
                }
                disabled={
                  currentPage ===
                    Math.ceil(filteredEmployees.length / itemsPerPage) ||
                  filteredEmployees.length === 0
                }
                className={`p-2 rounded ${
                  currentPage ===
                    Math.ceil(filteredEmployees.length / itemsPerPage) ||
                  filteredEmployees.length === 0
                    ? "bg-gray-100 text-gray-400"
                    : "bg-blue-50 text-gray-600 hover:bg-blue-100 hover:text-blue-700"
                } transition-all duration-200`}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        employeeToDelete={employeeToDelete}
        onCancel={closeDeleteModal}
        onConfirmDelete={handleDeleteEmployee}
      />
    </>
  );
};

export default EmployeeTable;
