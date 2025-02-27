import React from "react";
import { Calendar, CheckCircle } from "lucide-react";

interface PayPeriodProps {
  payPeriod: string;
  setPayPeriod: (period: string) => void;
}

const PayPeriodComponent: React.FC<PayPeriodProps> = ({
  payPeriod,
  setPayPeriod,
}) => {
  return (
    <div className="p-4 bg-blue-50 border-b border-blue-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div className="flex items-center flex-wrap gap-2 sm:gap-3">
          <div className="flex items-center">
            <Calendar size={20} className="text-blue-800 mr-2" />
            <span className="text-gray-800 font-medium">Pay Period:</span>
          </div>
          <select
            className="bg-white text-gray-800 border border-blue-200 rounded-md px-2 sm:px-3 py-1.5 
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 
            w-full sm:w-auto text-sm sm:text-base"
            value={payPeriod}
            onChange={(e) => setPayPeriod(e.target.value)}
          >
            <option>February 1-15, 2025</option>
            <option>January 16-31, 2025</option>
            <option>January 1-15, 2025</option>
            <option>December 16-31, 2024</option>
          </select>
        </div>
        <div className="text-emerald-600 flex items-center">
          <CheckCircle size={16} className="mr-2" />
          <span className="text-sm sm:text-base">Payroll is ready to run</span>
        </div>
      </div>
    </div>
  );
};

export default PayPeriodComponent;
