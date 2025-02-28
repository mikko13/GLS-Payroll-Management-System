import React, { useState } from "react";
import {
  Save,
  ArrowLeft,
  User,
  Briefcase,
  CreditCard,
  Phone,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CreateEmployeeFormProps {
  onSubmit: (employeeData: Omit<Employee, "id">) => void;
  onCancel: () => void;
  onBack?: () => void;
}

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

const CreateEmployeeForm: React.FC<CreateEmployeeFormProps> = ({ onSubmit }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    gender: "male",
    position: "",
    department: "",
    dateStarted: "",
    rate: "",
    civilStatus: "single",
    birthDate: "",
    sss: "",
    hdmf: "",
    philhealth: "",
    tin: "",
    emailAddress: "",
    permanentAddress: "",
    contactNumber: "",
    status: "active",
    remarks: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Calculate status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-800";
      case "on leave":
        return "bg-amber-100 text-amber-800";
      case "inactive":
        return "bg-red-100 text-red-800";
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
              onClick={() => navigate("/employees")}
              className="mr-3 p-2 rounded-full hover:bg-blue-100 transition-colors text-blue-600 cursor-pointer"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl md:text-2xl font-bold text-blue-800">
              Create New Employee
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
          {/* Card for Personal Information */}
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
                  <option value="male">Male</option>
                  <option value="female">Female</option>
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
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="widowed">Widowed</option>
                  <option value="divorced">Divorced</option>
                  <option value="separated">Separated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Card for Employment Information */}
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
                  <option value="active">Active</option>
                  <option value="on leave">On Leave</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Card for Government IDs */}
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

          {/* Card for Contact Information */}
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

          {/* Card for Remarks */}
          <div className="bg-white p-4 md:p-5 rounded-lg shadow-sm border border-blue-100">
            <div className="flex items-center mb-4">
              <FileText className="text-blue-600 mr-2" size={18} />
              <h3 className="text-md font-semibold text-blue-800">
                Additional Information
              </h3>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="remarks"
                className="block text-sm font-medium text-gray-700"
              >
                Remarks
              </label>
              <textarea
                id="remarks"
                name="remarks"
                rows={4}
                value={formData.remarks}
                onChange={handleChange}
                className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Enter any additional notes or remarks"
              ></textarea>
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
              className="px-6 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm flex items-center"
            >
              <Save size={16} className="mr-2" /> Save Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployeeForm;