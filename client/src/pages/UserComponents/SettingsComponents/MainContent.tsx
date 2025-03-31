// components/MainContent.tsx
import { useState } from "react";
import TabButton from "./TabButton";
import ProfileTab from "./ProfileTab";
import SecurityTab from "./SecurityTab";
import PreferencesTab from "./PreferencesTab";
import NotificationsTab from "./NotificationsTab";
import { User, Lock, Settings, Bell } from "lucide-react";
import { FormData, HandleChange } from "./types";

interface MainContentProps {
  formData: FormData;
  handleChange: HandleChange;
  handleSubmit: (e: React.FormEvent) => void;
  theme: string;
  setTheme: (theme: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  autoLogout: string;
  setAutoLogout: (autoLogout: string) => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  emailNotifications: boolean;
  setEmailNotifications: (enabled: boolean) => void;
  userId: string; // Add userId to the props interface
}

const MainContent = ({
  formData,
  handleChange,
  handleSubmit,
  theme,
  setTheme,
  language,
  setLanguage,
  autoLogout,
  setAutoLogout,
  notificationsEnabled,
  setNotificationsEnabled,
  emailNotifications,
  setEmailNotifications,
  userId, // Destructure userId from props
}: MainContentProps) => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="bg-white rounded-lg shadow border border-blue-100 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-blue-100">
          <TabButton
            icon={User}
            label="Profile"
            isActive={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
          />
          <TabButton
            icon={Lock}
            label="Security"
            isActive={activeTab === "security"}
            onClick={() => setActiveTab("security")}
          />
          <TabButton
            icon={Settings}
            label="Preferences"
            isActive={activeTab === "preferences"}
            onClick={() => setActiveTab("preferences")}
          />
          <TabButton
            icon={Bell}
            label="Notifications"
            isActive={activeTab === "notifications"}
            onClick={() => setActiveTab("notifications")}
          />
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "profile" && (
            <ProfileTab
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          )}
          {activeTab === "security" && (
            <SecurityTab userId={userId} />
          )}
          {activeTab === "preferences" && (
            <PreferencesTab
              theme={theme}
              setTheme={setTheme}
              language={language}
              setLanguage={setLanguage}
              autoLogout={autoLogout}
              setAutoLogout={setAutoLogout}
            />
          )}
          {activeTab === "notifications" && (
            <NotificationsTab
              notificationsEnabled={notificationsEnabled}
              setNotificationsEnabled={setNotificationsEnabled}
              emailNotifications={emailNotifications}
              setEmailNotifications={setEmailNotifications}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainContent;