import React from "react";
import { PhilippinePeso, Users, Clock } from "lucide-react";

interface MetricsProps {
  totalNetPay: number;
  totalRegularWage: number;
  totalOvertime: number;
}

const MetricsComponent: React.FC<MetricsProps> = ({
  totalNetPay,
  totalRegularWage,
  totalOvertime,
}) => {
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg p-4 border border-blue-100 shadow">
        <div className="flex items-center justify-between mb-2">
          <div className="text-gray-500 text-sm">Total Pay</div>
          <PhilippinePeso size={18} className="text-blue-800" />
        </div>
        <div className="text-gray-800 text-xl md:text-2xl font-bold truncate">
          ₱{totalNetPay.toLocaleString()}
        </div>
      </div>
      <div className="bg-white rounded-lg p-4 border border-blue-100 shadow">
        <div className="flex items-center justify-between mb-2">
          <div className="text-gray-500 text-sm">Total Regular Wage</div>
          <Users size={18} className="text-blue-800" />
        </div>
        <div className="text-gray-800 text-xl md:text-2xl font-bold truncate">
          ₱{totalRegularWage.toLocaleString()}
        </div>
      </div>
      <div className="bg-white rounded-lg p-4 border border-blue-100 shadow sm:col-span-2 lg:col-span-1">
        <div className="flex items-center justify-between mb-2">
          <div className="text-gray-500 text-sm">Overtime</div>
          <Clock size={18} className="text-blue-800" />
        </div>
        <div className="text-gray-800 text-xl md:text-2xl font-bold truncate">
          ₱{totalOvertime.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default MetricsComponent;
