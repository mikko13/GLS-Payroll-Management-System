// usePayslipGenerator.js
import * as XLSX from "xlsx-js-style";

const usePayslipGenerator = (employees, setIsGenerating) => {
  // Function to generate all payslips in a single Excel file with row separation
  const generateAllPayslips = () => {
    if (!employees || employees.length === 0) {
      alert("No employees found to generate payslips.");
      return;
    }

    setIsGenerating(true);

    try {
      const { workbook, worksheet } = createWorkbookAndWorksheet();
      const today = getCurrentDate();
      const formattedDate = formatDate(today);

      let currentRow = 0;
      const merges = [];

      // Process each employee
      employees.forEach((employee) => {
        const payslipData = createPayslipData(employee, formattedDate);
        
        // Calculate merges for this employee
        const employeeMerges = calculateMerges(currentRow);
        merges.push(...employeeMerges);

        // Add data to worksheet
        XLSX.utils.sheet_add_aoa(worksheet, payslipData, {
          origin: `A${currentRow + 1}`,
        });

        // Apply styles to cells
        applyStylesForEmployee(worksheet, currentRow, employee, formattedDate);

        currentRow += payslipData.length;
      });

      // Apply all merges
      worksheet["!merges"] = merges;

      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Payslips");

      // Generate and download the file
      const dateStr = formatDateForFilename(today);
      XLSX.writeFile(workbook, `Payslips_${dateStr}.xlsx`);
    } catch (error) {
      console.error("Error generating payslips:", error);
      alert("An error occurred while generating payslips. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return { generateAllPayslips };
};

// Helper functions
const createWorkbookAndWorksheet = () => {
  // Create a new workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet([]);

  // Set column widths
  const columnWidths = [
    { wch: 8.33 }, // A
    { wch: 8.11 }, // B
    { wch: 8.33 }, // C
    { wch: 1.22 }, // D
    { wch: 5.11 }, // E
    { wch: 11.11 }, // F
    { wch: 0.88 }, // G
    { wch: 8.33 }, // H
    { wch: 7.22 }, // I
    { wch: 1.78 }, // J
    { wch: 11.33 }, // K
  ];
  worksheet["!cols"] = columnWidths;

  return { workbook, worksheet };
};

const getCurrentDate = () => {
  return new Date();
};

const formatDate = (date) => {
  return `${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")} ${date.getDate().toString().padStart(2, "0")}-${(
    date.getDate() + 13
  )
    .toString()
    .padStart(2, "0")}, ${date.getFullYear()}`;
};

const formatDateForFilename = (date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};

const formatCurrency = (value) => {
  return value
    ? `${value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : "";
};

const createPayslipData = (employee, formattedDate) => {
  return [
    [
      "G.L.S. MANPOWER SERVICES",
      "",
      "",
      "",
      "",
      "",
      "",
      formattedDate,
      "",
      "",
      "",
    ],
    [
      `EMPLOYEE NAME: ${employee.lastName?.toUpperCase() || ""}, ${
        employee.firstName?.toUpperCase() ||
        employee.name?.toUpperCase() ||
        ""
      }`,
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    ["", "", "RATE/HR", "", "#OF HRS", "", "", "DEDUCTIONS", "", "", ""],
    [
      "REGULAR HOUR",
      "",
      employee.hourlyRate,
      "",
      employee.numberOfRegularHours,
      formatCurrency(employee.totalRegularWage),
      "",
      "BREAKAGES",
      "",
      "",
      "",
    ],
    [
      "REGULAR HOLIDAY",
      "",
      formatCurrency(employee.regularHoliday),
      "",
      "",
      "",
      "",
      "HDMF LOAN",
      "",
      "",
      "",
    ],
    [
      "SPECIAL HOLIDAY",
      "",
      employee.specialHoliday,
      "",
      "",
      "",
      "",
      "SSS ",
      "",
      "",
      employee.sss,
    ],
    [
      "NIGHT DIFF",
      "",
      "8.0625",
      "",
      "",
      formatCurrency(employee.regularNightDifferential),
      "",
      "PHIC",
      "",
      "",
      employee.phic,
    ],
    [
      "OT",
      "",
      "",
      "",
      "",
      "",
      "",
      "HDMF",
      "",
      "",
      formatCurrency(employee.hdmfLoans),
    ],
    [
      "GROSS PAY",
      "",
      "",
      "",
      "",
      formatCurrency(employee.totalAmount),
      "",
      "NET PAY",
      "",
      "",
      formatCurrency(employee.netPay),
    ],
    ["", "", "", "", "", "", "", "", "", "", ""], // Empty row for separation
  ];
};

const calculateMerges = (currentRow) => {
  return [
    { s: { r: currentRow, c: 0 }, e: { r: currentRow, c: 5 } },
    { s: { r: currentRow + 1, c: 0 }, e: { r: currentRow + 1, c: 5 } },
    { s: { r: currentRow + 2, c: 4 }, e: { r: currentRow + 2, c: 5 } },
    { s: { r: currentRow + 3, c: 0 }, e: { r: currentRow + 3, c: 1 } },
    { s: { r: currentRow + 4, c: 0 }, e: { r: currentRow + 4, c: 1 } },
    { s: { r: currentRow + 5, c: 0 }, e: { r: currentRow + 5, c: 1 } },
    { s: { r: currentRow + 2, c: 7 }, e: { r: currentRow + 2, c: 8 } },
    { s: { r: currentRow + 3, c: 7 }, e: { r: currentRow + 3, c: 8 } },
    { s: { r: currentRow + 4, c: 7 }, e: { r: currentRow + 4, c: 8 } },
    { s: { r: currentRow, c: 7 }, e: { r: currentRow + 1, c: 10 } }
  ];
};

const applyStylesForEmployee = (worksheet, currentRow, employee, formattedDate) => {
  // Apply company name style
  applyCellStyle(worksheet, currentRow, 0, "G.L.S. MANPOWER SERVICES", {
    font: {
      name: "Abadi",
      bold: true,
      sz: 10,
    },
    alignment: { vertical: "center", horizontal: "left" },
    border: {
      top: { style: "medium", color: { rgb: "000000" } },
      left: { style: "medium", color: { rgb: "000000" } },
    },
  });

  // Apply date style
  applyCellStyle(worksheet, currentRow, 7, formattedDate, {
    font: { name: "Abadi", sz: 9 },
    alignment: { vertical: "center", horizontal: "center" },
    border: {
      top: { style: "medium", color: { rgb: "000000" } },
    },
  });

  // Apply numeric values styles
  applyNumericStyles(worksheet, currentRow, employee);
  
  // Apply border styles
  applyBorderStyles(worksheet, currentRow);
};

const applyCellStyle = (worksheet, row, col, value, style) => {
  const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
  if (!worksheet[cellAddress]) worksheet[cellAddress] = { v: value };
  worksheet[cellAddress].s = style;
};

const applyNumericStyles = (worksheet, currentRow, employee) => {
  // Rate/Hr value
  if (employee.hourlyRate) {
    applyCellStyle(worksheet, currentRow + 3, 2, employee.hourlyRate, {
      font: { name: "Abadi", sz: 9 },
      alignment: { vertical: "center", horizontal: "right" },
    });
  }

  // Regular wage
  const regWageCell = XLSX.utils.encode_cell({ r: currentRow + 3, c: 5 });
  if (worksheet[regWageCell] && worksheet[regWageCell].v) {
    worksheet[regWageCell].s = {
      font: { name: "Abadi", sz: 9 },
      alignment: { vertical: "center", horizontal: "right" },
    };
  }

  // #OF HRS value
  if (employee.numberOfRegularHours) {
    applyCellStyle(worksheet, currentRow + 3, 4, employee.numberOfRegularHours, {
      font: { name: "Abadi", sz: 9 },
      alignment: { vertical: "center", horizontal: "right" },
    });
  }

  // Regular Holiday
  const regHolidayCell = XLSX.utils.encode_cell({ r: currentRow + 4, c: 2 });
  if (worksheet[regHolidayCell] && worksheet[regHolidayCell].v) {
    worksheet[regHolidayCell].s = {
      font: { name: "Abadi", sz: 9 },
      alignment: { vertical: "center", horizontal: "right" },
    };
  }

  // Special Holiday
  const specialHolidayCell = XLSX.utils.encode_cell({ r: currentRow + 5, c: 2 });
  if (worksheet[specialHolidayCell] && worksheet[specialHolidayCell].v) {
    worksheet[specialHolidayCell].s = {
      font: { name: "Abadi", sz: 9 },
      alignment: { vertical: "center", horizontal: "right" },
    };
  }

  // Night Diff Rate
  const nightDiffRateCell = XLSX.utils.encode_cell({ r: currentRow + 6, c: 2 });
  if (worksheet[nightDiffRateCell] && worksheet[nightDiffRateCell].v) {
    worksheet[nightDiffRateCell].s = {
      font: { name: "Abadi", sz: 9 },
      alignment: { vertical: "center", horizontal: "right" },
    };
  }

  // Night Diff Amount
  const nightDiffAmtCell = XLSX.utils.encode_cell({ r: currentRow + 6, c: 5 });
  if (worksheet[nightDiffAmtCell] && worksheet[nightDiffAmtCell].v) {
    worksheet[nightDiffAmtCell].s = {
      font: { name: "Abadi", sz: 9 },
      alignment: { vertical: "center", horizontal: "right" },
    };
  }

  // Gross Pay
  const grossPayCell = XLSX.utils.encode_cell({ r: currentRow + 8, c: 5 });
  if (worksheet[grossPayCell] && worksheet[grossPayCell].v) {
    worksheet[grossPayCell].s = {
      font: { name: "Abadi", sz: 9 },
      alignment: { vertical: "center", horizontal: "right" },
    };
  }

  // SSS value
  applyCellStyle(worksheet, currentRow + 5, 10, employee.sss, {
    font: { name: "Abadi", sz: 9 },
    alignment: { vertical: "center", horizontal: "right" },
    border: {
      right: { style: "medium", color: { rgb: "000000" } },
    },
  });

  // PHIC value
  applyCellStyle(worksheet, currentRow + 6, 10, employee.phic, {
    font: { name: "Abadi", sz: 9 },
    alignment: { vertical: "center", horizontal: "right" },
    border: {
      right: { style: "medium", color: { rgb: "000000" } },
    },
  });

  // HDMF Loans value
  applyCellStyle(worksheet, currentRow + 7, 10, formatCurrency(employee.hdmfLoans), {
    font: { name: "Abadi", sz: 9 },
    alignment: { vertical: "center", horizontal: "right" },
    border: {
      right: { style: "medium", color: { rgb: "000000" } },
    },
  });

  // Net Pay value
  applyCellStyle(worksheet, currentRow + 8, 10, formatCurrency(employee.netPay), {
    font: {
      name: "Abadi",
      sz: 9,
      underline: true,
    },
    alignment: { vertical: "center", horizontal: "right" },
    border: {
      right: { style: "medium", color: { rgb: "000000" } },
      bottom: { style: "medium", color: { rgb: "000000" } },
    },
  });
};

const applyBorderStyles = (worksheet, currentRow) => {
  const payslipRowCount = 9; // Exclude the empty separator row
  const payslipColCount = 11; // Number of columns (A-K)

  // Apply border styles for all cells
  for (let rowIndex = 0; rowIndex < payslipRowCount; rowIndex++) {
    for (let colIndex = 0; colIndex < payslipColCount; colIndex++) {
      const cellAddress = XLSX.utils.encode_cell({
        r: currentRow + rowIndex,
        c: colIndex,
      });

      if (!worksheet[cellAddress]) worksheet[cellAddress] = { v: "" };
      if (!worksheet[cellAddress].s) worksheet[cellAddress].s = {};

      // Apply default font if not already set
      if (!worksheet[cellAddress].s.font) {
        worksheet[cellAddress].s.font = { name: "Abadi", sz: 9 };
      }

      // Apply default alignment if not already set
      if (!worksheet[cellAddress].s.alignment) {
        worksheet[cellAddress].s.alignment = { vertical: "center", horizontal: "left" };
      }

      // Apply borders based on cell position
      const cellStyle = worksheet[cellAddress].s;

      // Top edge
      if (rowIndex === 0) {
        cellStyle.border = {
          ...(cellStyle.border || {}),
          top: { style: "medium", color: { rgb: "000000" } },
        };
      }

      // Bottom edge
      if (rowIndex === payslipRowCount - 1) {
        cellStyle.border = {
          ...(cellStyle.border || {}),
          bottom: { style: "medium", color: { rgb: "000000" } },
        };
      }

      // Left edge
      if (colIndex === 0) {
        cellStyle.border = {
          ...(cellStyle.border || {}),
          left: { style: "medium", color: { rgb: "000000" } },
        };
      }

      // Right edge
      if (colIndex === payslipColCount - 1) {
        cellStyle.border = {
          ...(cellStyle.border || {}),
          right: { style: "medium", color: { rgb: "000000" } },
        };
      }
    }
  }
};

export default usePayslipGenerator;