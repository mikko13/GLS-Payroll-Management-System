import React from 'react';
import { Employee } from './types';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  employeeToDelete: Employee | null;
  onCancel: () => void;
  onConfirmDelete: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  employeeToDelete,
  onCancel,
  onConfirmDelete
}) => {
  if (!isOpen || !employeeToDelete) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Confirm Deletion
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete the employee{" "}
          <span className="font-medium">
            {employeeToDelete.firstName} {employeeToDelete.lastName}
          </span>
          ? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirmDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;