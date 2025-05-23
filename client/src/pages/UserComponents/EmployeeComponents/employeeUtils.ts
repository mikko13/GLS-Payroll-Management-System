export const getStatusColor = (status: string) => {
    if (status === "Regular") {
      return "bg-emerald-100 text-emerald-600";
    } else if (status === "Irregular") {
      return "bg-red-100 text-red-600";
    } else {
      return "bg-gray-100 text-gray-600";
    }
  };
  
  export const getRemarksColor = (remarks: string) => {
    if (!remarks) return "";
  
    if (remarks === "Active") {
      return "bg-emerald-100 text-emerald-600";
    } else if (remarks === "Inactive") {
      return "bg-red-100 text-red-600";
    } else if (remarks === "On Leave") {
      return "bg-amber-100 text-amber-600";
    } else {
      return "bg-gray-100 text-gray-600";
    }
  };
  
  export const getRemarksIcon = (remarks: string) => {
    if (!remarks) return null;
    return null;
  };