// components/SecurityTab.tsx
import { Lock, Shield, RefreshCw, EyeOff, Save } from "lucide-react";
import { FormData, HandleChange } from "./types";

interface SecurityTabProps {
  formData: FormData;
  handleChange: HandleChange;
}

const SecurityTab = ({ formData, handleChange }: SecurityTabProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-800">Security Settings</h2>
        <button
          type="button"
          className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-3 py-2 rounded-md text-sm flex items-center transition-all duration-200 shadow-md"
        >
          <Save size={16} className="mr-2" />
          Save Changes
        </button>
      </div>

      <div className="mb-8">
        <h3 className="text-md font-medium text-gray-800 mb-4 flex items-center">
          <Lock size={18} className="mr-2 text-blue-800" />
          Change Password
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-md font-medium text-gray-800 mb-4 flex items-center">
          <Shield size={18} className="mr-2 text-blue-800" />
          Two-Factor Authentication
        </h3>
        <div className="p-4 border border-blue-100 rounded-lg bg-blue-50">
          <div className="flex items-start">
            <div className="mr-4 mt-1">
              <EyeOff size={20} className="text-blue-800" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-1">
                Enhance Your Account Security
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Add an extra layer of security to your account by enabling two-factor authentication.
              </p>
              <button
                type="button"
                className="bg-white hover:bg-blue-50 text-blue-800 px-3 py-2 rounded-md text-sm flex items-center transition-colors duration-200 border border-blue-200"
              >
                Setup 2FA
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-md font-medium text-gray-800 mb-4 flex items-center">
          <RefreshCw size={18} className="mr-2 text-blue-800" />
          Login Sessions
        </h3>
        <div className="border border-blue-100 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-blue-100 bg-blue-50 flex justify-between items-center">
            <span className="font-medium text-gray-800">Current Session</span>
            <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded-full">
              Active
            </span>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <div>
                <div className="text-sm font-medium text-gray-800">
                  Windows 11 • Chrome
                </div>
                <div className="text-xs text-gray-500">
                  Last active: Just now
                </div>
              </div>
              <button className="text-sm text-red-600 hover:text-red-800 transition-colors duration-200">
                Log out
              </button>
            </div>
            <div className="text-xs text-gray-500">
              IP Address: 192.168.1.100 • Location: New York, USA
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;