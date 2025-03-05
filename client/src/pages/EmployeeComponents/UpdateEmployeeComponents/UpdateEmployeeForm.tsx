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
} from "lucide-react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "sonner";

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

const UpdateEmployeeForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Employee>({
    id: "",
    lastName: "",
    firstName: "",
    middleName: "",
    gender: "Male",
    position: "",
    department: "",
    dateStarted: "",
    rate: "80.625",
    civilStatus: "Single",
    birthDate: "",
    sss: "",
    hdmf: "",
    philhealth: "",
    tin: "",
    emailAddress: "",
    permanentAddress: "",
    contactNumber: "",
    status: "Regular",
    remarks: "Active",
  });

  useEffect(() => {
    const stateEmployee = location.state?.employee;

    if (stateEmployee) {
      setFormData(stateEmployee);
    } else {
      const fetchEmployee = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/employees/${id}`
          );
          setFormData(response.data);
        } catch (err) {
          console.error("Error fetching employee:", err);
          setError("Failed to load employee data");
          toast.error("Failed to load employee data", {
            description: "Unable to retrieve employee information.",
          });
        }
      };

      fetchEmployee();
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
        `http://localhost:5000/api/employees/${id}`,
        formData
      );

      toast.success("Employee updated successfully!", {
        description: `${formData.firstName} ${formData.lastName}'s information has been updated.`,
        duration: 3000,
      });

      setTimeout(() => {
        navigate("/employees", {
          state: { message: "Employee updated successfully!", type: "success" },
        });
      }, 3000);
    } catch (err) {
      console.error("Error updating employee:", err);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Failed to update employee");
        toast.error("Failed to update employee", {
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
              onClick={() => navigate("/employees")}
              className="mr-3 p-2 rounded-full hover:bg-blue-100 transition-colors text-blue-600 cursor-pointer"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl md:text-2xl font-bold text-blue-800">
              Update Employee
            </h2>
          </div>
          <div className="flex items-center">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getRemarksColor(
                formData.remarks
              )}`}
            >
              {formData.remarks}
            </span>
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
              <User className="text-blue-600 mr-2" size={18} />
              <h3 className="text-md font-semibold text-blue-800">
                Personal Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name*
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
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name*
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Enter first name"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="middleName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Middle Name
                </label>
                <input
                  type="text"
                  id="middleName"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Enter middle name"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gender*
                </label>
                <select
                  id="gender"
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="birthDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Birth Date*
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  required
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="civilStatus"
                  className="block text-sm font-medium text-gray-700"
                >
                  Civil Status*
                </label>
                <select
                  id="civilStatus"
                  name="civilStatus"
                  required
                  value={formData.civilStatus}
                  onChange={handleChange}
                  className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Separated">Separated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Employment Information Section */}
          <div className="bg-white p-4 md:p-5 rounded-lg shadow-sm border border-blue-100">
            <div className="flex items-center mb-4">
              <Briefcase className="text-blue-600 mr-2" size={18} />
              <h3 className="text-md font-semibold text-blue-800">
                Employment Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="position"
                  className="block text-sm font-medium text-gray-700"
                >
                  Position*
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  required
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Enter position"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-700"
                >
                  Department*
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  required
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Enter department"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="dateStarted"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date Started*
                </label>
                <input
                  type="date"
                  id="dateStarted"
                  name="dateStarted"
                  required
                  value={formData.dateStarted}
                  onChange={handleChange}
                  className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="rate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rate (₱)*
                </label>
                <input
                  type="text"
                  id="rate"
                  name="rate"
                  required
                  value={formData.rate}
                  onChange={handleChange}
                  className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Enter hourly rate"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status*
                </label>
                <select
                  id="status"
                  name="status"
                  required
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <option value="Regular">Regular</option>
                  <option value="Irregular">Irregular</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="remarks"
                  className="block text-sm font-medium text-gray-700"
                >
                  Remarks*
                </label>
                <select
                  id="remarks"
                  name="remarks"
                  required
                  value={formData.remarks}
                  onChange={handleChange}
                  className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="On leave">On Leave</option>
                </select>
              </div>
            </div>
          </div>

          {/* Government IDs Section */}
          <div className="bg-white p-4 md:p-5 rounded-lg shadow-sm border border-blue-100">
            <div className="flex items-center mb-4">
              <CreditCard className="text-blue-600 mr-2" size={18} />
              <h3 className="text-md font-semibold text-blue-800">
                Government IDs
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="sss"
                  className="block text-sm font-medium text-gray-700"
                >
                  SSS Number
                </label>
                <input
                  type="text"
                  id="sss"
                  name="sss"
                  value={formData.sss}
                  onChange={handleChange}
                  className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Enter SSS number"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="hdmf"
                  className="block text-sm font-medium text-gray-700"
                >
                  HDMF/PAGIBIG
                </label>
                <input
                  type="text"
                  id="hdmf"
                  name="hdmf"
                  value={formData.hdmf}
                  onChange={handleChange}
                  className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Enter HDMF/PAGIBIG number"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="philhealth"
                  className="block text-sm font-medium text-gray-700"
                >
                  PhilHealth
                </label>
                <input
                  type="text"
                  id="philhealth"
                  name="philhealth"
                  value={formData.philhealth}
                  onChange={handleChange}
                  className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Enter PhilHealth number"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="tin"
                  className="block text-sm font-medium text-gray-700"
                >
                  TIN Number
                </label>
                <input
                  type="text"
                  id="tin"
                  name="tin"
                  value={formData.tin}
                  onChange={handleChange}
                  className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Enter TIN number"
                />
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="bg-white p-4 md:p-5 rounded-lg shadow-sm border border-blue-100">
            <div className="flex items-center mb-4">
              <Phone className="text-blue-600 mr-2" size={18} />
              <h3 className="text-md font-semibold text-blue-800">
                Contact Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="emailAddress"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address*
                </label>
                <input
                  type="email"
                  id="emailAddress"
                  name="emailAddress"
                  required
                  value={formData.emailAddress}
                  onChange={handleChange}
                  className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Enter email address"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contactNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contact Number*
                </label>
                <input
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  required
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Enter contact number"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label
                  htmlFor="permanentAddress"
                  className="block text-sm font-medium text-gray-700"
                >
                  Permanent Address*
                </label>
                <input
                  type="text"
                  id="permanentAddress"
                  name="permanentAddress"
                  required
                  value={formData.permanentAddress}
                  onChange={handleChange}
                  className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Enter permanent address"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-4 md:mt-6">
            <button
              type="button"
              onClick={() => navigate("/employees")}
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
              {isSubmitting ? "Updating..." : "Update Employee"}
            </button>
          </div>
        </form>
      </div>
      <Toaster position="bottom-left" richColors />
    </div>
  );
};

export default UpdateEmployeeForm;
