import React from "react";
import { BarChart, Activity } from "lucide-react";

const PayrollSummaryChart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-blue-800">Payroll Summary</h2>
        <div className="flex items-center text-sm text-gray-500">
          <BarChart size={16} className="mr-2" />
          <span>Last 6 months</span>
        </div>
      </div>
      <div className="h-64 flex items-center justify-center border-t border-blue-100 pt-4">
        <div className="text-center text-gray-500">
          <Activity size={48} className="mx-auto text-blue-200 mb-2" />
          <p>Payroll trend visualization</p>
          <p className="text-sm text-gray-400">
            (Chart visualization would appear here)
          </p>
        </div>
      </div>
    </div>
  );
};

export default PayrollSummaryChart;