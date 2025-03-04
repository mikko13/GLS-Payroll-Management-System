import React, { useState } from 'react';
import { Filter, X, Check } from 'lucide-react';
import { Employee } from './types';

interface FilterModalProps {
  employees: Employee[];
  onApplyFilters: (filteredEmployees: Employee[]) => void;
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ 
  employees, 
  onApplyFilters, 
  onClose 
}) => {
  const departments = [...new Set(employees.map(e => e.department))];
  const positions = [...new Set(employees.map(e => e.position))];
  const statuses = [...new Set(employees.map(e => e.status))];

  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [searchName, setSearchName] = useState('');

  const handleToggleDepartment = (department: string) => {
    setSelectedDepartments(prev => 
      prev.includes(department)
        ? prev.filter(d => d !== department)
        : [...prev, department]
    );
  };

  const handleTogglePosition = (position: string) => {
    setSelectedPositions(prev => 
      prev.includes(position)
        ? prev.filter(p => p !== position)
        : [...prev, position]
    );
  };

  const handleToggleStatus = (status: string) => {
    setSelectedStatuses(prev => 
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const applyFilters = () => {
    let filteredResult = employees;

    if (searchName) {
      filteredResult = filteredResult.filter(emp => 
        `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (selectedDepartments.length > 0) {
      filteredResult = filteredResult.filter(emp => 
        selectedDepartments.includes(emp.department)
      );
    }

    if (selectedPositions.length > 0) {
      filteredResult = filteredResult.filter(emp => 
        selectedPositions.includes(emp.position)
      );
    }

    if (selectedStatuses.length > 0) {
      filteredResult = filteredResult.filter(emp => 
        selectedStatuses.includes(emp.status)
      );
    }

    onApplyFilters(filteredResult);
    onClose();
  };

  const resetFilters = () => {
    setSelectedDepartments([]);
    setSelectedPositions([]);
    setSelectedStatuses([]);
    setSearchName('');
    onApplyFilters(employees);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl w-[600px] max-h-[80vh] overflow-auto p-6 animate-slideUp">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <Filter className="mr-2 text-blue-600" size={24} />
            Filter Employees
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search by Name
          </label>
          <input 
            type="text" 
            placeholder="Search first or last name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Departments
          </label>
          <div className="grid grid-cols-3 gap-2">
            {departments.map(department => (
              <button
                key={department}
                onClick={() => handleToggleDepartment(department)}
                className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                  selectedDepartments.includes(department)
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {department}
                {selectedDepartments.includes(department) && (
                  <Check size={16} className="ml-2" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Positions
          </label>
          <div className="grid grid-cols-3 gap-2">
            {positions.map(position => (
              <button
                key={position}
                onClick={() => handleTogglePosition(position)}
                className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                  selectedPositions.includes(position)
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {position}
                {selectedPositions.includes(position) && (
                  <Check size={16} className="ml-2" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Employment Status
          </label>
          <div className="grid grid-cols-3 gap-2">
            {statuses.map(status => (
              <button
                key={status}
                onClick={() => handleToggleStatus(status)}
                className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                  selectedStatuses.includes(status)
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status}
                {selectedStatuses.includes(status) && (
                  <Check size={16} className="ml-2" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between space-x-4 mt-8">
          <button
            onClick={resetFilters}
            className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition-colors"
          >
            Reset Filters
          </button>
          <button
            onClick={applyFilters}
            className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;