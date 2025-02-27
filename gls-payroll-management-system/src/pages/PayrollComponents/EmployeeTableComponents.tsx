import React, { JSX, useMemo } from "react";
import { Eye, Trash } from "lucide-react";
import PaginationComponent from "./PaginationComponent";

interface Employee {
  id: string;
  name: string;
  checked: boolean;
  numberOfRegularHours: number;
  hourlyRate: number;
  totalRegularWage: number;
  regularNightDifferential: number;
  prorated13thMonthPay: number;
  specialHoliday: number;
  regularHoliday: number;
  serviceIncentiveLeave: number;
  overtime: number;
  totalAmount: number;
  hdmfLoans: number;
  sss: number;
  phic: number;
  netPay: number;
  status: string;
}

interface EmployeeTableProps {
  employees: Employee[];
  handleCheckboxChange: (id: string) => void;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => JSX.Element;
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
  currentPage: number;
  setCurrentPage: (value: number) => void;
}

const EmployeeTableComponent: React.FC<EmployeeTableProps> = ({
  employees,
  handleCheckboxChange,
  getStatusColor,
  getStatusIcon,
  itemsPerPage,
  setItemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const displayedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return employees.slice(startIndex, endIndex);
  }, [employees, currentPage, itemsPerPage]);

  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="rounded-lg overflow-hidden shadow animate-fadeIn bg-white border border-blue-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-blue-100 bg-blue-50">
                <th className="p-3 w-12 text-left">
                  <input
                    type="checkbox"
                    className="rounded bg-white border-blue-200"
                  />
                </th>
                <th className="p-3 text-left font-medium">Employee</th>
                <th className="p-3 text-left font-medium">Regular Hours</th>
                <th className="p-3 text-left font-medium">Hourly Rate</th>
                <th className="p-3 text-left font-medium">
                  Total Regular Wage
                </th>
                <th className="p-3 text-left font-medium">
                  Night Differential
                </th>
                <th className="p-3 text-left font-medium">13th Month Pay</th>
                <th className="p-3 text-left font-medium">Special Holiday</th>
                <th className="p-3 text-left font-medium">Regular Holiday</th>
                <th className="p-3 text-left font-medium">
                  Service Incentive Leave
                </th>
                <th className="p-3 text-left font-medium">Overtime</th>
                <th className="p-3 text-left font-medium">Total Amount</th>
                <th className="p-3 text-left font-medium">HDMF Loans</th>
                <th className="p-3 text-left font-medium">SSS</th>
                <th className="p-3 text-left font-medium">PHIC</th>
                <th className="p-3 text-left font-medium">Net Pay</th>
                <th className="p-3 text-left font-medium">Status</th>
                <th className="p-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-b border-blue-50 hover:bg-blue-50 transition-all duration-200 animate-fadeIn"
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={employee.checked}
                      onChange={() => handleCheckboxChange(employee.id)}
                      className="rounded bg-white border-blue-200"
                    />
                  </td>
                  <td className="p-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center text-white mr-3 shadow">
                        {employee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="text-sm text-gray-800 font-medium">
                        {employee.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-3 text-sm text-gray-800">
                    {employee.numberOfRegularHours}
                  </td>
                  <td className="p-3 text-sm text-gray-800">
                    ₱{employee.hourlyRate.toLocaleString()}
                  </td>
                  <td className="p-3 text-sm text-gray-800">
                    ₱{employee.totalRegularWage.toLocaleString()}
                  </td>
                  <td className="p-3 text-sm text-gray-800">
                    ₱{employee.regularNightDifferential.toLocaleString()}
                  </td>
                  <td className="p-3 text-sm text-gray-800">
                    ₱{employee.prorated13thMonthPay.toLocaleString()}
                  </td>
                  <td className="p-3 text-sm text-gray-800">
                    ₱{employee.specialHoliday.toLocaleString()}
                  </td>
                  <td className="p-3 text-sm text-gray-800">
                    ₱{employee.regularHoliday.toLocaleString()}
                  </td>
                  <td className="p-3 text-sm text-gray-800">
                    ₱{employee.serviceIncentiveLeave.toLocaleString()}
                  </td>
                  <td className="p-3 text-sm text-gray-800">
                    ₱{employee.overtime.toLocaleString()}
                  </td>
                  <td className="p-3 text-sm text-gray-800">
                    ₱{employee.totalAmount.toLocaleString()}
                  </td>
                  <td className="p-3 text-sm text-gray-800">
                    ₱{employee.hdmfLoans.toLocaleString()}
                  </td>
                  <td className="p-3 text-sm text-gray-800">
                    ₱{employee.sss.toLocaleString()}
                  </td>
                  <td className="p-3 text-sm text-gray-800">
                    ₱{employee.phic.toLocaleString()}
                  </td>
                  <td className="p-3 text-sm text-gray-800">
                    ₱{employee.netPay.toLocaleString()}
                  </td>
                  <td className="p-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full flex items-center w-fit ${getStatusColor(
                        employee.status
                      )}`}
                    >
                      {getStatusIcon(employee.status)}
                      {employee.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <button className="p-1.5 bg-blue-50 hover:bg-blue-100 rounded-md text-gray-600 hover:text-blue-700 transition-all duration-200">
                        <Eye size={16} />
                      </button>
                      <button className="p-1.5 bg-blue-50 hover:bg-blue-100 rounded-md text-gray-600 hover:text-red-600 transition-all duration-200">
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PaginationComponent
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={employees.length}
        />
      </div>
    </div>
  );
};

export default EmployeeTableComponent;
