import { useState } from "react";
import { Table, Receipt, Search, Filter, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ActionsComponent = () => {
  const [mobileActionsOpen, setMobileActionsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <div className="hidden md:flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-3 py-2 rounded-md text-sm flex items-center transition-all duration-200 shadow-md cursor-pointer"
            onClick={() => navigate("/Payroll/CreatePayroll")}
          >
            <Plus size={16} className="mr-2" />
            Create Payroll Record
          </button>
          <button className="bg-white hover:bg-blue-50 text-gray-800 px-3 py-2 rounded-md text-sm flex items-center transition-colors duration-200 border border-blue-200">
            <Table size={16} className="mr-2" />
            Generate Payroll
          </button>
          <button className="bg-white hover:bg-blue-50 text-gray-800 px-3 py-2 rounded-md text-sm flex items-center transition-colors duration-200 border border-blue-200">
            <Receipt size={16} className="mr-2" />
            Generate Payslip
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search employees..."
              className="bg-white text-gray-800 px-3 py-2 rounded-md text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-blue-200 transition-all duration-200"
            />
            <Search
              size={16}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
          <button className="p-2 rounded-md bg-white hover:bg-blue-50 transition-colors duration-200 border border-blue-200">
            <Filter size={16} className="text-gray-400" />
          </button>
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex justify-between items-center">
          <div className="relative flex-1 mr-2">
            <input
              type="text"
              placeholder="Search..."
              className="bg-white text-gray-800 px-3 py-2 rounded-md text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 border border-blue-200 transition-all duration-200"
            />
            <Search
              size={16}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-md bg-white hover:bg-blue-50 transition-colors duration-200 border border-blue-200">
              <Filter size={16} className="text-gray-400" />
            </button>
            <button
              onClick={() => setMobileActionsOpen(!mobileActionsOpen)}
              className="p-2 rounded-md bg-gradient-to-r from-blue-700 to-blue-800 text-white transition-colors duration-200"
            >
              {mobileActionsOpen ? <X size={16} /> : <Plus size={16} />}
            </button>
          </div>
        </div>

        {mobileActionsOpen && (
          <div className="mt-2 space-y-2 animate-fade-in">
            <button className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-3 py-2 rounded-md text-sm flex items-center transition-all duration-200 shadow-md w-full">
              <Plus size={16} className="mr-2" />
              Create Payroll Record
            </button>
            <button className="bg-white hover:bg-blue-50 text-gray-800 px-3 py-2 rounded-md text-sm flex items-center transition-colors duration-200 border border-blue-200 w-full">
              <Table size={16} className="mr-2" />
              Generate Payroll
            </button>
            <button className="bg-white hover:bg-blue-50 text-gray-800 px-3 py-2 rounded-md text-sm flex items-center transition-colors duration-200 border border-blue-200 w-full">
              <Receipt size={16} className="mr-2" />
              Generate Payslip
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionsComponent;
