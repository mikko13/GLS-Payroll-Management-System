import { useState } from "react";
import GenerateButton from "./GenerateButton";
import usePayslipGenerator from "./usePayslipGenerator";

const PayslipGenerator = ({ employees }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { generateAllPayslips } = usePayslipGenerator(employees, setIsGenerating);

  return (
    <GenerateButton 
      onClick={generateAllPayslips}
      isGenerating={isGenerating}
      disabled={isGenerating || employees.length === 0}
    />
  );
};

export default PayslipGenerator;