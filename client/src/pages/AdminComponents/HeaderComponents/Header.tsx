import React, { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import UserAvatar from "./UserAvatar"; // Import the new component

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

  useEffect(() => {
    const titleElement = document.getElementById("page-title");
    if (titleElement) {
      titleElement.style.opacity = "0";
      titleElement.style.transform = "translateY(10px)";

      setTimeout(() => {
        titleElement.style.transition = "all 0.4s ease";
        titleElement.style.opacity = "1";
        titleElement.style.transform = "translateY(0)";
      }, 50);
    }
  }, [location.pathname]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      setNotifications(notifications.map((n) => ({ ...n, read: true })));
    }
  };

  const dismissNotification = (
    id: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    const notificationElement = document.getElementById(`notification-${id}`);

    if (notificationElement) {
      notificationElement.style.transition = "all 0.3s ease";
      notificationElement.style.opacity = "0";
      notificationElement.style.transform = "translateX(20px)";

      setTimeout(() => {
        setNotifications(notifications.filter((n) => n.id !== id));
      }, 300);
    } else {
      setNotifications(notifications.filter((n) => n.id !== id));
    }
  };

  return (
    <div className="border-b border-blue-100 p-4 bg-white relative">
      <div className="flex items-center justify-between">
        <div id="page-title" className="text-blue-800 ml-4 font-bold">
          {title}
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-white text-xs">{unreadCount}</span>
              </div>
            )}
            <Bell
              size={20}
              className="ml-4 text-gray-500 cursor-pointer hover:text-blue-800 transition-colors duration-200"
              onClick={toggleNotifications}
            />

            {showNotifications && (
              <div
                className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-10 animate-fadeIn"
                style={{
                  animationDuration: "0.2s",
                  transformOrigin: "top right",
                }}
              >
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
                    notifications.map((notification, index) => (
                      <div
                        id={`notification-${notification.id}`}
                        key={notification.id}
                        className={`p-3 border-b border-gray-100 hover:bg-blue-50 cursor-pointer ${
                          !notification.read ? "bg-blue-50" : ""
                        }`}
                        style={{
                          animation: `fadeInRight 0.3s ease forwards`,
                          animationDelay: `${index * 0.1}s`,
                          opacity: 0,
                          transform: "translateX(-10px)",
                        }}
                      >
                        <div className="flex justify-between">
                          <p className="text-sm text-gray-800">
                            {notification.text}
                          </p>
                          <button
                            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
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

          <UserAvatar />
        </div>
      </div>
    </div>
  );
};

const styleTag = document.createElement("style");
styleTag.innerHTML = `
  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.2s ease-out forwards;
  }
  
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }
`;
document.head.appendChild(styleTag);

export default Header;
