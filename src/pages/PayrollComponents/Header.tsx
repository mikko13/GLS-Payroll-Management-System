import { Bell, ChevronDown } from "lucide-react";

const HeaderComponent = () => {
  return (
    <div className="border-b border-blue-100 p-4 bg-white">
      <div className="flex items-center justify-between">
        <div className="text-blue-800 ml-4 font-bold">Payroll</div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
            <Bell size={20} className="text-gray-500 cursor-pointer hover:text-blue-800 transition-colors duration-200" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center text-white shadow">M</div>
            <span className="text-gray-800">Mommy</span>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;