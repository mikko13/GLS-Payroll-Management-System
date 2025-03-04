import { Users, Zap, ZapOff } from "lucide-react";

interface EmployeeStatsProps {
  totalEmployees: number;
  activeEmployees: number;
  regularEmployees: number;
}

const EmployeeStats = ({
  totalEmployees,
  activeEmployees,
  regularEmployees,
}: EmployeeStatsProps) => {
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg p-4 border border-blue-100 shadow">
        <div className="flex items-center justify-between mb-2">
          <div className="text-gray-500 text-sm">Total Employees</div>
          <Users size={18} className="text-blue-800" />
        </div>
        <div className="text-gray-800 text-xl md:text-2xl font-bold">
          {totalEmployees}
        </div>
      </div>
      <div className="bg-white rounded-lg p-4 border border-blue-100 shadow">
        <div className="flex items-center justify-between mb-2">
          <div className="text-gray-500 text-sm">Active Employees</div>
          <Zap size={18} className="text-blue-800" />
        </div>
        <div className="text-gray-800 text-xl md:text-2xl font-bold">
          {activeEmployees}
        </div>
      </div>
      <div className="bg-white rounded-lg p-4 border border-blue-100 shadow">
        <div className="flex items-center justify-between mb-2">
          <div className="text-gray-500 text-sm">Inactive Employees</div>
          <ZapOff size={18} className="text-blue-800" />
        </div>
        <div className="text-gray-800 text-xl md:text-2xl font-bold">
          {regularEmployees}
        </div>
      </div>
    </div>
  );
};

export default EmployeeStats;