// components/NotificationsTab.tsx
import { Bell, Mail, Save } from "lucide-react";

interface NotificationsTabProps {
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  emailNotifications: boolean;
  setEmailNotifications: (enabled: boolean) => void;
}

const NotificationsTab = ({
  notificationsEnabled,
  setNotificationsEnabled,
  emailNotifications,
  setEmailNotifications,
}: NotificationsTabProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-800">
          Notification Settings
        </h2>
        <button
          type="button"
          className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-3 py-2 rounded-md text-sm flex items-center transition-all duration-200 shadow-md"
        >
          <Save size={16} className="mr-2" />
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        <div className="p-4 border border-blue-100 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell size={20} className="mr-3 text-blue-800" />
              <div>
                <h3 className="font-medium text-gray-800">
                  System Notifications
                </h3>
                <p className="text-sm text-gray-500">
                  Receive in-app notifications for important updates
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-800"></div>
            </label>
          </div>
        </div>

        <div className="p-4 border border-blue-100 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Mail size={20} className="mr-3 text-blue-800" />
              <div>
                <h3 className="font-medium text-gray-800">
                  Email Notifications
                </h3>
                <p className="text-sm text-gray-500">
                  Receive email alerts for important events
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={emailNotifications}
                onChange={() => setEmailNotifications(!emailNotifications)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-800"></div>
            </label>
          </div>
        </div>

        {emailNotifications && (
          <div className="ml-8 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-800">
                New employee registration
              </span>
              <input
                type="checkbox"
                className="rounded bg-white border-blue-200 text-blue-800 focus:ring-blue-500"
                defaultChecked
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-800">
                Employee status changes
              </span>
              <input
                type="checkbox"
                className="rounded bg-white border-blue-200 text-blue-800 focus:ring-blue-500"
                defaultChecked
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-800">
                Payroll processing notifications
              </span>
              <input
                type="checkbox"
                className="rounded bg-white border-blue-200 text-blue-800 focus:ring-blue-500"
                defaultChecked
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-800">
                System maintenance alerts
              </span>
              <input
                type="checkbox"
                className="rounded bg-white border-blue-200 text-blue-800 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-800">
                Weekly summary reports
              </span>
              <input
                type="checkbox"
                className="rounded bg-white border-blue-200 text-blue-800 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsTab;
