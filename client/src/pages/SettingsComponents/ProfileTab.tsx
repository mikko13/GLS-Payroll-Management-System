// components/ProfileTab.tsx
import { Save } from "lucide-react";
import { FormData, HandleChange } from "./types";

interface ProfileTabProps {
  formData: FormData;
  handleChange: HandleChange;
  handleSubmit: (e: React.FormEvent) => void;
}

const ProfileTab = ({
  formData,
  handleChange,
  handleSubmit,
}: ProfileTabProps) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-800">
          Profile Information
        </h2>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-3 py-2 rounded-md text-sm flex items-center transition-all duration-200 shadow-md"
          >
            <Save size={16} className="mr-2" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center text-white text-2xl shadow-md">
            {formData.firstName.charAt(0)}
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-gray-800">Profile Picture</h3>
            <div className="flex space-x-2">
              <button
                type="button"
                className="bg-white hover:bg-blue-50 text-blue-800 px-3 py-1.5 rounded-md text-sm flex items-center transition-colors duration-200 border border-blue-200"
              >
                Upload
              </button>
              <button
                type="button"
                className="bg-white hover:bg-red-50 text-red-600 px-3 py-1.5 rounded-md text-sm flex items-center transition-colors duration-200 border border-red-200"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Position
          </label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Department
          </label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>
      </div>
    </form>
  );
};

export default ProfileTab;
