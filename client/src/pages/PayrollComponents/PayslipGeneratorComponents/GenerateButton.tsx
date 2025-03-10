import { Receipt, Loader } from "lucide-react";


const GenerateButton = ({ onClick, isGenerating}) => {
  return (
    <button
      onClick={onClick}
      className="bg-white hover:bg-blue-50 text-gray-800 px-3 py-2 rounded-md text-sm flex items-center transition-colors duration-200 border border-blue-200 mr-2 w-full md:w-auto cursor-pointer"
    >
      {isGenerating ? (
        <Loader size={16} className="mr-2 animate-spin" />
      ) : (
        <Receipt size={16} className="mr-2" />
      )}
      Generate Payslips
    </button>
  );
};

export default GenerateButton;