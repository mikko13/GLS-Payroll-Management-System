/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Save,
  ArrowLeft,
  User,
  Briefcase,
  CreditCard,
  Phone,
  Loader,
  Clock,
  MinusCircle,
} from "lucide-react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "sonner";

interface Payroll {
  id: string;
  name: string;
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

const UpdatePayrollForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Payroll>({
    name: "",
    numberOfRegularHours: 8,
    hourlyRate: 80.625,
    regularNightDifferential: 0,
    prorated13thMonthPay: 0,
    specialHoliday: 0,
    regularHoliday: 0,
    serviceIncentiveLeave: 0,
    overtime: 0,
    hdmf: 0,
    hdmfLoans: 0,
    sss: 0,
    phic: 0,
    status: "Pending",
  });

  useEffect(() => {
    const statePayroll = location.state?.Payroll;

    if (statePayroll) {
      setFormData(statePayroll);
    } else {
      const fetchPayroll = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/payrolls/${id}`
          );
          setFormData(response.data);
        } catch (err) {
          console.error("Error fetching payroll:", err);
          setError("Failed to load payroll data");
          toast.error("Failed to load payroll data", {
            description: "Unable to retrieve payroll information.",
          });
        }
      };

      fetchPayroll();
    }
  }, [id, location.state]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/payrolls/${id}`,
        formData
      );

      toast.success("Payroll updated successfully!", {
        description: `${formData.firstName} ${formData.lastName}'s information has been updated.`,
        duration: 3000,
      });

      setTimeout(() => {
        navigate("/payroll", {
          state: { message: "Payroll updated successfully!", type: "success" },
        });
      }, 3000);
    } catch (err) {
      console.error("Error updating payroll:", err);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Failed to update payroll");
        toast.error("Failed to update payroll", {
          description:
            err.response.data.message || "An unexpected error occurred.",
        });
      } else {
        setError("An unexpected error occurred. Please try again.");
        toast.error("Error", {
          description: "An unexpected error occurred. Please try again.",
        });
      }
      setIsSubmitting(false);
    }
  };

  const getRemarksColor = (remarks: string) => {
    switch (remarks) {
      case "Active":
        return "bg-emerald-100 text-emerald-800";
      case "On leave":
        return "bg-amber-100 text-amber-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="h-full w-full p-4 md:p-6">
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
              Update Payroll Record
            </h2>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div className="bg-white p-4 md:p-5 rounded-lg shadow-sm border border-blue-100">
            <div className="flex items-center mb-4">
              <CreditCard className="text-blue-600 mr-2" size={18} />
              <h3 className="text-md font-semibold text-blue-800">
                Payroll Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Employee Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Enter last name"
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
                  step="0.1"
                  value={formData.numberOfRegularHours}
                  onChange={handleChange}
                  className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
              </div>

              {/* Similar modifications for other number inputs */}
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
                  step="0.001"
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
                  Night Differential (₱) (8.06)
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
                  Overtime (₱) (100.78)
                </label>
                <input
                  type="number"
                  id="overtime"
                  name="overtime"
                  min="0"
                  step="0"
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
                  Special Holiday (₱) (104.81)
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
                  Regular Holiday (₱) (161.25)
                </label>
                <input
                  type="number"
                  id="regularHoliday"
                  name="regularHoliday"
                  min="0"
                  step="0.5"
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

          <div className="bg-white p-4 md:p-5 rounded-lg shadow-sm border border-blue-100">
            <div className="flex items-center mb-4">
              <MinusCircle className="text-red-600 mr-2" size={18} />
              <h3 className="text-md font-semibold text-red-800">Deductions</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="hdmf"
                    className="block text-sm font-medium text-gray-700"
                  >
                    HDMF (₱)
                  </label>
                  <input
                    type="number"
                    id="hdmf"
                    name="hdmf"
                    min="0"
                    step="0.01"
                    value={formData.hdmf}
                    onChange={handleChange}
                    className="w-full rounded-md border border-red-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                  />
                </div>

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
              </div>

              <div className="grid grid-cols-1 gap-4">
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
          </div>

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

          <div className="flex justify-end space-x-3 mt-4 md:mt-6">
            <button
              type="button"
              onClick={() => navigate("/Payroll")}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 rounded-md text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm flex items-center cursor-pointer"
            >
              {isSubmitting ? (
                <Loader size={16} className="mr-2 animate-spin" />
              ) : (
                <Save size={16} className="mr-2" />
              )}
              {isSubmitting ? "Saving..." : "Save Payroll"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePayrollForm;
