import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  totalItems: number;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  itemsPerPage,
  setItemsPerPage,
  currentPage,
  setCurrentPage,
  totalItems,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const pagesToShow = [];
  const pageWindow = 2;

  for (let i = Math.max(1, currentPage - pageWindow); i <= Math.min(totalPages, currentPage + pageWindow); i++) {
    pagesToShow.push(i);
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center py-4 px-6 bg-white border-t border-blue-100">
      <div className="mb-4 sm:mb-0 text-sm text-gray-500">
        Showing {startItem} to {endItem} of {totalItems} entries
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center mr-4">
          <span className="text-sm text-gray-500 mr-2">Display</span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
            className="border border-blue-100 rounded px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400"
              : "bg-blue-50 text-gray-600 hover:bg-blue-100 hover:text-blue-700"
          } transition-all duration-200`}
        >
          <ChevronLeft size={16} />
        </button>
        {pagesToShow.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`h-8 w-8 rounded flex items-center justify-center text-sm transition-all duration-200 ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "bg-blue-50 text-gray-700 hover:bg-blue-100"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400"
              : "bg-blue-50 text-gray-600 hover:bg-blue-100 hover:text-blue-700"
          } transition-all duration-200`}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default PaginationComponent;