// components/MainContent.tsx
import { useState } from "react";
import TabButton from "./TabButton";
import ProfileTab from "./ProfileTab";
import SecurityTab from "./SecurityTab";
import { User, Lock } from "lucide-react";
import { FormData, HandleChange } from "./types";

interface MainContentProps {
  formData: FormData;
  handleChange: HandleChange;
  handleSubmit: (e: React.FormEvent) => void;
  userId: string;
}

const MainContent = ({
  formData,
  handleChange,
  handleSubmit,
  userId,
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
          {activeTab === "security" && <SecurityTab userId={userId} />}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
