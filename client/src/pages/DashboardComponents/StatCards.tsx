import React from "react";
import { Users, PhilippinePeso } from "lucide-react";
import { StatCardProps } from "./types";

type StatCardItemProps = StatCardProps

const StatCardItem: React.FC<StatCardItemProps> = ({ title, value, change, iconName, positive }) => {
  // Function to render the appropriate icon based on iconName
  const renderIcon = () => {
    switch (iconName) {
      case "Users":
        return <Users size={20} className="text-blue-600" />;
      case "PhilippinePeso":
        return <PhilippinePeso size={20} className="text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-blue-800">{value}</p>
            <span
              className={`ml-2 text-xs font-medium ${
                positive ? "text-green-600" : "text-red-600"
              }`}
            >
              {change}
            </span>
          </div>
        </div>
        <div className="p-2 bg-blue-50 rounded-md">{renderIcon()}</div>
      </div>
    </div>
  );
};

interface StatCardsProps {
  stats: StatCardProps[];
}

const StatCards: React.FC<StatCardsProps> = ({ stats }) => {
  return (
    <>
      {stats.map((stat, index) => (
        <StatCardItem key={index} {...stat} />
      ))}
    </>
  );
};

export default StatCards;