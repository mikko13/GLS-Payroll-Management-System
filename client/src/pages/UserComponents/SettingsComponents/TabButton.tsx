// components/TabButton.tsx
import { LucideIcon } from "lucide-react";

interface TabButtonProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton = ({
  icon: Icon,
  label,
  isActive,
  onClick,
}: TabButtonProps) => {
  return (
    <button
      className={`px-4 py-3 font-medium text-sm flex items-center cursor-pointer ${
        isActive
          ? "text-blue-800 border-b-2 border-blue-800"
          : "text-gray-500 hover:text-blue-800"
      } transition-colors duration-200`}
      onClick={onClick}
    >
      <Icon size={16} className="mr-2" />
      {label}
    </button>
  );
};

export default TabButton;
