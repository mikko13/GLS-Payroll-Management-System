import React, { useState, useEffect } from "react";
import { Bell, ChevronDown, X } from "lucide-react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const pageTitles = {
    "/payroll": "Payroll",
    "/employees": "Employees",
    "/settings": "Settings",
    "/dashboard": "Home",
  };

  const title = pageTitles[location.pathname] || "Dashboard";

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "John Smith submitted a time-off request",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      text: "New employee onboarding complete",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      text: "Quarterly review deadline approaching",
      time: "3 hours ago",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      setNotifications(notifications.map((n) => ({ ...n, read: true })));
    }
  };

  const dismissNotification = (id, e) => {
    e.stopPropagation();
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="border-b border-blue-100 p-4 bg-white relative">
      <div className="flex items-center justify-between">
        <div className="text-blue-800 ml-4 font-bold">{title}</div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">{unreadCount}</span>
              </div>
            )}
            <Bell
              size={20}
              className="text-gray-500 cursor-pointer hover:text-blue-800 transition-colors duration-200"
              onClick={toggleNotifications}
            />

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                <div className="p-2 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-medium text-gray-800">Notifications</h3>
                  {notifications.length > 0 && (
                    <button
                      className="text-xs text-blue-600 hover:text-blue-800"
                      onClick={() => setNotifications([])}
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="max-h-64 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 border-b border-gray-100 hover:bg-blue-50 cursor-pointer ${
                          !notification.read ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex justify-between">
                          <p className="text-sm text-gray-800">
                            {notification.text}
                          </p>
                          <button
                            className="text-gray-400 hover:text-gray-600"
                            onClick={(e) =>
                              dismissNotification(notification.id, e)
                            }
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      No notifications
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center text-white shadow">
              M
            </div>
            <span className="text-gray-800">Mommy</span>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
