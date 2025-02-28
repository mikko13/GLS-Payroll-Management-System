import React, { useState } from "react";
import {
  Save,
  ArrowLeft,
  CreditCard,
  Clock,
  DollarSign,
  PlusCircle,
  MinusCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CreatePayrollFormProps {
  onSubmit: (payrollData: Omit<Employee, "id" | "checked">) => void;
  onCancel: () => void;
  onBack?: () => void;
}

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

const CreatePayrollForm: React.FC<CreatePayrollFormProps> = ({ onSubmit }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    numberOfRegularHours: null,
    hourlyRate: null,
    regularNightDifferential: null,
    prorated13thMonthPay: null,
    specialHoliday: null,
    regularHoliday: null,
    serviceIncentiveLeave: null,
    overtime: null,
    hdmfLoans: null,
    sss: null,
    phic: null,
    status: "Pending",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let parsedValue: string | number | null = value;

    // Parse numeric fields
    if (name !== "name" && name !== "status") {
      parsedValue = value === "" ? null : parseFloat(value);
    }

    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const calculateDerivedValues = () => {
    const totalRegularWage =
      (formData.numberOfRegularHours || 0) * (formData.hourlyRate || 0);

    const totalAmount =
      totalRegularWage +
      (formData.regularNightDifferential || 0) +
      (formData.prorated13thMonthPay || 0) +
      (formData.specialHoliday || 0) +
      (formData.regularHoliday || 0) +
      (formData.serviceIncentiveLeave || 0) +
      (formData.overtime || 0);

    const netPay =
      totalAmount -
      (formData.hdmfLoans || 0) -
      (formData.sss || 0) -
      (formData.phic || 0);

    return {
      totalRegularWage,
      totalAmount,
      netPay,
    };
  };

  const { totalRegularWage, totalAmount, netPay } = calculateDerivedValues();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payrollData = {
      ...formData,
      totalRegularWage,
      totalAmount,
      netPay,
    };

    onSubmit(payrollData);
  };

  // Calculate status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Processed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="h-full w-full p-4 md:p-6">
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button
              onClick={() => navigate("/payroll")}
              className="mr-3 p-2 rounded-full hover:bg-blue-100 transition-colors text-blue-600 cursor-pointer"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl md:text-2xl font-bold text-blue-800">
              Create New Payroll Record
            </h2>
          </div>
          <div className="flex items-center">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                formData.status
              )}`}
            >
              {formData.status}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* Card for Employee Information */}
          <div className="bg-white p-4 md:p-5 rounded-lg shadow-sm border border-blue-100">
            <div className="flex items-center mb-4">
              <CreditCard className="text-blue-600 mr-2" size={18} />
              <h3 className="text-md font-semibold text-blue-800">
                Employee Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Employee Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Enter employee name"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processed">Processed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Card for Regular Work */}
          <div className="bg-white p-4 md:p-5 rounded-lg shadow-sm border border-blue-100">
            <div className="flex items-center mb-4">
              <Clock className="text-blue-600 mr-2" size={18} />
              <h3 className="text-md font-semibold text-blue-800">
                Regular Work
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="numberOfRegularHours"
                  className="block text-sm font-medium text-gray-700"
                >
                  Regular Hours
                </label>
                <input
                  type="number"
                  id="numberOfRegularHours"
                  name="numberOfRegularHours"
                  min="0"
                  step="0.01"
                  value={
                    formData.numberOfRegularHours === null
                      ? ""
                      : formData.numberOfRegularHours
                  }
                  onChange={handleChange}
                  className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="hourlyRate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Hourly Rate (₱)
                </label>
                <input
                  type="number"
                  id="hourlyRate"
                  name="hourlyRate"
                  min="0"
                  step="0.01"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="totalRegularWage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Total Regular Wage (₱)
                </label>
                <input
                  type="number"
                  id="totalRegularWage"
                  name="totalRegularWage"
                  value={totalRegularWage.toFixed(2)}
                  readOnly
                  className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm bg-blue-50 font-medium text-blue-700"
                />
              </div>
            </div>
          </div>

          {/* Card for Additional Pay */}
          <div className="bg-white p-4 md:p-5 rounded-lg shadow-sm border border-blue-100">
            <div className="flex items-center mb-4">
              <PlusCircle className="text-green-600 mr-2" size={18} />
              <h3 className="text-md font-semibold text-green-800">
                Additional Pay
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="regularNightDifferential"
                  className="block text-sm font-medium text-gray-700"
                >
                  Night Differential (₱)
                </label>
                <input
                  type="number"
                  id="regularNightDifferential"
                  name="regularNightDifferential"
                  min="0"
                  step="0.01"
                  value={formData.regularNightDifferential}
                  onChange={handleChange}
                  className="w-full rounded-md border border-green-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="prorated13thMonthPay"
                  className="block text-sm font-medium text-gray-700"
                >
                  13th Month Pay (₱)
                </label>
                <input
                  type="number"
                  id="prorated13thMonthPay"
                  name="prorated13thMonthPay"
                  min="0"
                  step="0.01"
                  value={formData.prorated13thMonthPay}
                  onChange={handleChange}
                  className="w-full rounded-md border border-green-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="overtime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Overtime (₱)
                </label>
                <input
                  type="number"
                  id="overtime"
                  name="overtime"
                  min="0"
                  step="0.01"
                  value={formData.overtime}
                  onChange={handleChange}
                  className="w-full rounded-md border border-green-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="specialHoliday"
                  className="block text-sm font-medium text-gray-700"
                >
                  Special Holiday (₱)
                </label>
                <input
                  type="number"
                  id="specialHoliday"
                  name="specialHoliday"
                  min="0"
                  step="0.01"
                  value={formData.specialHoliday}
                  onChange={handleChange}
                  className="w-full rounded-md border border-green-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="regularHoliday"
                  className="block text-sm font-medium text-gray-700"
                >
                  Regular Holiday (₱)
                </label>
                <input
                  type="number"
                  id="regularHoliday"
                  name="regularHoliday"
                  min="0"
                  step="0.01"
                  value={formData.regularHoliday}
                  onChange={handleChange}
                  className="w-full rounded-md border border-green-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="serviceIncentiveLeave"
                  className="block text-sm font-medium text-gray-700"
                >
                  Service Incentive Leave (₱)
                </label>
                <input
                  type="number"
                  id="serviceIncentiveLeave"
                  name="serviceIncentiveLeave"
                  min="0"
                  step="0.01"
                  value={formData.serviceIncentiveLeave}
                  onChange={handleChange}
                  className="w-full rounded-md border border-green-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Card for Deductions */}
          <div className="bg-white p-4 md:p-5 rounded-lg shadow-sm border border-blue-100">
            <div className="flex items-center mb-4">
              <MinusCircle className="text-red-600 mr-2" size={18} />
              <h3 className="text-md font-semibold text-red-800">Deductions</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="hdmfLoans"
                  className="block text-sm font-medium text-gray-700"
                >
                  HDMF Loans (₱)
                </label>
                <input
                  type="number"
                  id="hdmfLoans"
                  name="hdmfLoans"
                  min="0"
                  step="0.01"
                  value={formData.hdmfLoans}
                  onChange={handleChange}
                  className="w-full rounded-md border border-red-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="sss"
                  className="block text-sm font-medium text-gray-700"
                >
                  SSS (₱)
                </label>
                <input
                  type="number"
                  id="sss"
                  name="sss"
                  min="0"
                  step="0.01"
                  value={formData.sss}
                  onChange={handleChange}
                  className="w-full rounded-md border border-red-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="phic"
                  className="block text-sm font-medium text-gray-700"
                >
                  PHIC (₱)
                </label>
                <input
                  type="number"
                  id="phic"
                  name="phic"
                  min="0"
                  step="0.01"
                  value={formData.phic}
                  onChange={handleChange}
                  className="w-full rounded-md border border-red-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Summary Card */}
          <div className="bg-blue-50 p-4 md:p-5 rounded-lg shadow-sm border border-blue-200">
            <div className="flex items-center mb-4">
              <DollarSign className="text-blue-700 mr-2" size={18} />
              <h3 className="text-md font-semibold text-blue-800">
                Payment Summary
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="totalAmount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Total Amount (₱)
                </label>
                <input
                  type="text"
                  id="totalAmount"
                  name="totalAmount"
                  value={totalAmount.toFixed(2)}
                  readOnly
                  className="w-full rounded-md border border-blue-300 px-3 py-2 text-sm bg-white font-medium text-blue-700"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="netPay"
                  className="block text-sm font-medium text-gray-700"
                >
                  Net Pay (₱)
                </label>
                <input
                  type="text"
                  id="netPay"
                  name="netPay"
                  value={netPay.toFixed(2)}
                  readOnly
                  className="w-full rounded-md border border-blue-300 px-3 py-3 text-base bg-white font-bold text-blue-800"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-4 md:mt-6">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 border border-transparent rounded-md text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm flex items-center"
            >
              <Save size={16} className="mr-2" /> Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePayrollForm;
