// pages/SettingsPage.tsx
import { useState } from "react";
import Sidebar from "../SidebarComponents/Sidebar";
import Header from "./Header";
import MainContent from "./MainContent";

const SettingsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSidebarItem, setActiveSidebarItem] = useState("Settings");
  const [theme, setTheme] = useState("light");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoLogout, setAutoLogout] = useState("30");
  const [language, setLanguage] = useState("en");

  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    position: "HR Manager",
    department: "Human Resources",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar
        sidebarOpen={sidebarOpen}
        activeSidebarItem={activeSidebarItem}
        setActiveSidebarItem={setActiveSidebarItem}
        setSidebarOpen={setSidebarOpen}
      />
      <div
        className="flex-1 flex flex-col h-screen overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f8fafc, #f0f4f8)" }}
      >
        <Header title="Settings" userName="Mommy" />
        <MainContent
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          theme={theme}
          setTheme={setTheme}
          language={language}
          setLanguage={setLanguage}
          autoLogout={autoLogout}
          setAutoLogout={setAutoLogout}
          notificationsEnabled={notificationsEnabled}
          setNotificationsEnabled={setNotificationsEnabled}
          emailNotifications={emailNotifications}
          setEmailNotifications={setEmailNotifications}
        />
      </div>
    </div>
  );
};

export default SettingsPage;
