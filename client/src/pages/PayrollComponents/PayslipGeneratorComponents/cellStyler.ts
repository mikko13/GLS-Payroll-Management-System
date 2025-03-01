// CellStyler.js
import * as XLSX from "xlsx-js-style";
import { applyCellStyle, cellStyles, formatCurrency } from './excelUtils';

export const applyPayslipStyles = (worksheet, currentRow, employee, formattedDate) => {
  // Apply header styles
  applyHeaderStyles(worksheet, currentRow, formattedDate);
  
  // Apply numeric values styles
  applyNumericStyles(worksheet, currentRow, employee);
  
  // Apply border styles to the entire payslip
  applyBorderStyles(worksheet, currentRow);
};

const applyHeaderStyles = (worksheet, currentRow, formattedDate) => {
  // Company name
  applyCellStyle(
    worksheet, 
    currentRow, 
    0, 
    "G.L.S. MANPOWER SERVICES", 
    cellStyles.companyName
  );
  
  // Date cell
  applyCellStyle(
    worksheet, 
    currentRow, 
    7, 
    formattedDate, 
    cellStyles.date
  );
};

const applyNumericStyles = (worksheet, currentRow, employee) => {
  // Hourly rate
  if (employee.hourlyRate) {
    applyCellStyle(
      worksheet, 
      currentRow + 3, 
      2, 
      employee.hourlyRate, 
      cellStyles.numeric
    );
  }
  // Regular wage
  const regWageCell = XLSX.utils.encode_cell({ r: currentRow + 3, c: 5 });
  if (worksheet[regWageCell] && worksheet[regWageCell].v) {
    worksheet[regWageCell].s = cellStyles.numeric;
  }
  // Hours
  if (employee.numberOfRegularHours) {
    applyCellStyle(
      worksheet, 
      currentRow + 3, 
      4, 
      employee.numberOfRegularHours, 
      cellStyles.numeric
    );
  }
  // Regular Holiday
  const regHolidayCell = XLSX.utils.encode_cell({ r: currentRow + 4, c: 2 });
  if (worksheet[regHolidayCell] && worksheet[regHolidayCell].v) {
    worksheet[regHolidayCell].s = cellStyles.numeric;
  }
  // Special Holiday
  const specialHolidayCell = XLSX.utils.encode_cell({ r: currentRow + 5, c: 2 });
  if (worksheet[specialHolidayCell] && worksheet[specialHolidayCell].v) {
    worksheet[specialHolidayCell].s = cellStyles.numeric;
  }
  // Night Diff Rate
  const nightDiffRateCell = XLSX.utils.encode_cell({ r: currentRow + 6, c: 2 });
  if (worksheet[nightDiffRateCell] && worksheet[nightDiffRateCell].v) {
    worksheet[nightDiffRateCell].s = cellStyles.numeric;
  }
  // Night Diff Amount
  const nightDiffAmtCell = XLSX.utils.encode_cell({ r: currentRow + 6, c: 5 });
  if (worksheet[nightDiffAmtCell] && worksheet[nightDiffAmtCell].v) {
    worksheet[nightDiffAmtCell].s = cellStyles.numeric;
  }
  // Gross Pay
  const grossPayCell = XLSX.utils.encode_cell({ r: currentRow + 8, c: 5 });
  if (worksheet[grossPayCell] && worksheet[grossPayCell].v) {
    worksheet[grossPayCell].s = cellStyles.numeric;
  }
  // SSS value
  applyCellStyle(
    worksheet, 
    currentRow + 5, 
    10, 
    employee.sss, 
    cellStyles.rightBorder
  );
  // PHIC value
  applyCellStyle(
    worksheet, 
    currentRow + 6, 
    10, 
    employee.phic, 
    cellStyles.rightBorder
  );
  // HDMF Loans value
  applyCellStyle(
    worksheet, 
    currentRow + 7, 
    10, 
    formatCurrency(employee.hdmfLoans), 
    cellStyles.rightBorder
  );
  
  // HDMF value
  applyCellStyle(
    worksheet, 
    currentRow + 8, 
    10, 
    employee.hdmf, 
    cellStyles.rightBorder
  );
  
  // Other Deductions value
  if (employee.otherDeductions) {
    applyCellStyle(
      worksheet, 
      currentRow + 9, 
      10, 
      formatCurrency(employee.otherDeductions), 
      cellStyles.rightBorder
    );
  }
  
  // Total Deductions
  const totalDeductionsCell = XLSX.utils.encode_cell({ r: currentRow + 10, c: 10 });
  if (worksheet[totalDeductionsCell] && worksheet[totalDeductionsCell].v) {
    worksheet[totalDeductionsCell].s = cellStyles.totalDeductions;
  }
  
  // Net Pay
  const netPayCell = XLSX.utils.encode_cell({ r: currentRow + 12, c: 10 });
  if (worksheet[netPayCell] && worksheet[netPayCell].v) {
    worksheet[netPayCell].s = cellStyles.netPay;
  }
};

const applyBorderStyles = (worksheet, currentRow) => {
  // Apply borders to the entire payslip area
  const payslipRowCount = 15; // Total rows in a payslip
  const columnCount = 12; // Total columns in the payslip
  
  for (let i = 0; i < payslipRowCount; i++) {
    for (let j = 0; j < columnCount; j++) {
      const cellRef = XLSX.utils.encode_cell({ r: currentRow + i, c: j });
      
      if (!worksheet[cellRef]) {
        worksheet[cellRef] = { v: '', t: 's' };
      }
      
      if (!worksheet[cellRef].s) {
        worksheet[cellRef].s = {};
      }
      
      // Apply border styles
      worksheet[cellRef].s = {
        ...worksheet[cellRef].s,
        border: {
          top: { style: 'thin', color: { rgb: '000000' } },
          left: { style: 'thin', color: { rgb: '000000' } },
          bottom: { style: 'thin', color: { rgb: '000000' } },
          right: { style: 'thin', color: { rgb: '000000' } }
        }
      };
    }
  }
  
  // Apply thicker borders to the main sections
  applyHeaderBorder(worksheet, currentRow);
  applyEarningsSectionBorder(worksheet, currentRow);
  applyDeductionsSectionBorder(worksheet, currentRow);
  applyNetPayBorder(worksheet, currentRow);
};

const applyHeaderBorder = (worksheet, currentRow) => {
  // Thicker border at the bottom of the header
  for (let j = 0; j < 12; j++) {
    const cellRef = XLSX.utils.encode_cell({ r: currentRow + 1, c: j });
    if (worksheet[cellRef]) {
      if (!worksheet[cellRef].s) {
        worksheet[cellRef].s = {};
      }
      worksheet[cellRef].s.border = {
        ...worksheet[cellRef].s.border,
        bottom: { style: 'medium', color: { rgb: '000000' } }
      };
    }
  }
};

const applyEarningsSectionBorder = (worksheet, currentRow) => {
  // Thicker border at the bottom of the earnings section
  for (let j = 0; j < 6; j++) {
    const cellRef = XLSX.utils.encode_cell({ r: currentRow + 8, c: j });
    if (worksheet[cellRef]) {
      if (!worksheet[cellRef].s) {
        worksheet[cellRef].s = {};
      }
      worksheet[cellRef].s.border = {
        ...worksheet[cellRef].s.border,
        bottom: { style: 'medium', color: { rgb: '000000' } }
      };
    }
  }
};

const applyDeductionsSectionBorder = (worksheet, currentRow) => {
  // Thicker border at the bottom of the deductions section
  for (let j = 6; j < 12; j++) {
    const cellRef = XLSX.utils.encode_cell({ r: currentRow + 10, c: j });
    if (worksheet[cellRef]) {
      if (!worksheet[cellRef].s) {
        worksheet[cellRef].s = {};
      }
      worksheet[cellRef].s.border = {
        ...worksheet[cellRef].s.border,
        bottom: { style: 'medium', color: { rgb: '000000' } }
      };
    }
  }
};

const applyNetPayBorder = (worksheet, currentRow) => {
  // Thicker border around the net pay cell
  const netPayCell = XLSX.utils.encode_cell({ r: currentRow + 12, c: 10 });
  if (worksheet[netPayCell]) {
    if (!worksheet[netPayCell].s) {
      worksheet[netPayCell].s = {};
    }
    worksheet[netPayCell].s.border = {
      top: { style: 'medium', color: { rgb: '000000' } },
      left: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
      right: { style: 'medium', color: { rgb: '000000' } }
    };
  }
};

export default applyPayslipStyles;