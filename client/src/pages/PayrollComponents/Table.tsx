import React, { JSX, useMemo, useState } from "react";
import { Edit, Eye, Trash } from "lucide-react";
import PaginationComponent from "./Pagination";
import axios from "axios";
import { toast, Toaster } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface Payroll {
  _id?: string;
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
  hdmf: number;
  hdmfLoans: number;
  sss: number;
  phic: number;
  netPay: number;
  status: string;
}

interface PayrollTableProps {
  payrolls: Payroll[];
  setPayrolls: React.Dispatch<React.SetStateAction<Payroll[]>>;
  handleCheckboxChange: (id: string) => void;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => JSX.Element;
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
  currentPage: number;
  setCurrentPage: (value: number) => void;
}

const PayrollTable: React.FC<PayrollTableProps> = ({
  payrolls,
  setPayrolls,
  handleCheckboxChange,
  getStatusColor,
  getStatusIcon,
  itemsPerPage,
  setItemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const displayedPayrolls = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return payrolls.slice(startIndex, endIndex);
  }, [payrolls, currentPage, itemsPerPage]);
  const [payrollToDelete, setPayrollToDelete] = useState<Payroll | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const nightDifferentialAmount = (payroll: Payroll) =>
    payroll.regularNightDifferential * 8.06;

  const regularHolidayAmount = (payroll: Payroll) =>
    payroll.regularHoliday * 161.25;

  const specialHolidayAmount = (payroll: Payroll) =>
    payroll.specialHoliday * 104.81;

  const overtimeAmount = (payroll: Payroll) => payroll.overtime * 100.78;

  const handleDeleteClick = (payroll: Payroll) => {
    setPayrollToDelete(payroll);
    setIsDeleteDialogOpen(true);
  };

  const handleDeletePayroll = async () => {
    if (!payrollToDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/payrolls/${
          payrollToDelete._id || payrollToDelete.id
        }`
      );

      const updatedPayroll = payrolls.filter(
        (emp) =>
          (emp._id || emp.id) !== (payrollToDelete._id || payrollToDelete.id)
      );
      setPayrolls(updatedPayroll);

      toast.success("Payroll Deleted", {
        description: `Payroll for ${payrollToDelete.name} has been deleted successfully.`,
      });
    } catch (error) {
      console.error("Error deleting payroll:", error);
      toast.error("Delete Failed", {
        description: "An error occurred while deleting the payroll.",
      });
    } finally {
      setPayrollToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="rounded-lg overflow-hidden shadow animate-fadeIn bg-white border border-blue-100">
        <div className="overflow-x-auto">
          <table className="w-full relative">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-blue-100 bg-blue-50">
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
                <th className="p-3 text-left font-medium">HDMF</th>
                <th className="p-3 text-left font-medium">HDMF Loans</th>
                <th className="p-3 text-left font-medium">SSS</th>
                <th className="p-3 text-left font-medium">PHIC</th>
                <th className="p-3 text-left font-medium">Net Pay</th>
                <th className="p-3 text-left font-medium">Status</th>
                <th className="p-3 text-left font-medium sticky right-0 bg-blue-50 z-10">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedPayrolls.map((payroll) => (
                <tr
                  key={payroll.id}
                  className="border-b border-blue-50 hover:bg-blue-50 transition-all duration-200 animate-fadeIn"
                >
                  <td className="p-3">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-800 font-medium">
                        {payroll.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-3 text-sm text-gray-800">
                    {payroll.numberOfRegularHours}
                  </td>
                  <td className="p-3 text-sm text-gray-800">
                    ₱{payroll.hourlyRate.toLocaleString()}
                  </td>
                  <td className="p-3 text-sm text-gray-800">
                    ₱{payroll.totalRegularWage.toLocaleString()}
                  </td>
                  <td className="p-3 text-sm text-gray-800">
                    ₱{nightDifferentialAmount(payroll).toLocaleString()}
                  </td>
                  <td className="p-3 text-sm text-gray-800">
                    ₱{payroll.prorated13thMonthPay.toLocaleString()}
                  </td>
                  <td className="p-3 text-sm text-gray-800">
                    ₱{specialHolidayAmount(payroll).toLocaleString()}
                  </td>
                  <td className="p-3 text-sm text-gray-800">
                    ₱{regularHolidayAmount(payroll).toLocaleString()}
                  </td>
                  <td className="p-3 text-sm text-gray-800">
                    ₱{payroll.serviceIncentiveLeave.toLocaleString()}
                  </td>
                  <td className="p-3 text-sm text-gray-800">
                    ₱{overtimeAmount(payroll).toLocaleString()}
                  </td>
                  <td className="p-3 text-sm text-gray-800">
                    ₱{payroll.totalAmount.toLocaleString()}
                  </td>
                  <td className="p-3 text-sm text-gray-800">
                    ₱{payroll.hdmf.toLocaleString()}
                  </td>
                  <td className="p-3 text-sm text-gray-800">
                    ₱{payroll.hdmfLoans.toLocaleString()}
                  </td>
                  <td className="p-3 text-sm text-gray-800">
                    ₱{payroll.sss.toLocaleString()}
                  </td>
                  <td className="p-3 text-sm text-gray-800">
                    ₱{payroll.phic.toLocaleString()}
                  </td>
                  <td className="p-3 text-sm text-gray-800">
                    ₱{payroll.netPay.toLocaleString()}
                  </td>
                  <td className="p-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full flex items-center w-fit ${getStatusColor(
                        payroll.status
                      )}`}
                    >
                      {getStatusIcon(payroll.status)}
                      {payroll.status}
                    </span>
                  </td>
                  <td className="p-3 sticky right-0 bg-white z-10">
                    <div className="flex items-center space-x-2">
                      <button className="p-1.5 bg-blue-50 hover:bg-blue-100 rounded-md text-gray-600 hover:text-blue-700 transition-all duration-200 cursor-pointer">
                        <Eye size={16} />
                      </button>
                      <button className="p-1.5 bg-blue-50 hover:bg-blue-100 rounded-md text-gray-600 hover:text-blue-700 transition-all duration-200 cursor-pointer">
                        <Edit size={16} />
                      </button>
                      <button
                        className="p-1.5 bg-blue-50 hover:bg-blue-100 rounded-md text-gray-600 hover:text-red-600 transition-all duration-200 cursor-pointer"
                        onClick={() => handleDeleteClick(payroll)}
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

        <PaginationComponent
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={payrolls.length}
        />
      </div>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              payroll record for <strong>{payrollToDelete?.name}</strong> from
              the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="cursor-pointer"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleDeletePayroll}
              className="cursor-pointer"
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PayrollTable;
