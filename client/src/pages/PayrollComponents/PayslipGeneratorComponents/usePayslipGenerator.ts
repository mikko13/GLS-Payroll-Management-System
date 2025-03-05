import * as XLSX from "xlsx-js-style";

const usePayslipGenerator = (employees, setIsGenerating) => {
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

      employees.forEach((employee) => {
        const payslipData = createPayslipData(employee, formattedDate);

        const employeeMerges = calculateMerges(currentRow);
        merges.push(...employeeMerges);

        XLSX.utils.sheet_add_aoa(worksheet, payslipData, {
          origin: `A${currentRow + 1}`,
        });

        applyStylesForEmployee(worksheet, currentRow, employee, formattedDate);

        currentRow += payslipData.length;
      });

      worksheet["!merges"] = merges;

      XLSX.utils.book_append_sheet(workbook, worksheet, "Payslips");

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

const createWorkbookAndWorksheet = () => {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet([]);

  const columnWidths = [
    { wch: 8.33 },
    { wch: 8.11 },
    { wch: 8.33 }, 
    { wch: 1.22 },
    { wch: 5.11 },
    { wch: 11.11 },
    { wch: 0.88 },
    { wch: 8.33 },
    { wch: 7.22 },
    { wch: 1.78 },
    { wch: 11.33 },
  ];
  worksheet["!cols"] = columnWidths;

  return { workbook, worksheet };
};

const getCurrentDate = () => {
  return new Date();
};

const formatDate = (date) => {
  return `${(date.getMonth() + 1).toString().padStart(2, "0")} ${date
    .getDate()
    .toString()
    .padStart(2, "0")}-${(date.getDate() + 13)
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
  const calculatedRegularHoliday = employee.regularHoliday * 161.25;
  const calculatedSpecialHoliday = employee.specialHoliday * 104.81;
  const calculatedRegularNightDifferential = employee.regularNightDifferential * 8.06;
  const calculatedOvertime = employee.overtime * 100.78;
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
        employee.firstName?.toUpperCase() || employee.name?.toUpperCase() || ""
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
      "161.25",
      "",
      "",
      formatCurrency(calculatedRegularHoliday),
      "",
      "HDMF LOAN",
      "",
      "",
      formatCurrency(employee.hdmfLoans),
    ],
    [
      "SPECIAL HOLIDAY",
      "",
      "104.81",
      "",
      "",
      formatCurrency(calculatedSpecialHoliday),
      "",
      "SSS ",
      "",
      "",
      formatCurrency(employee.sss),
    ],
    [
      "NIGHT DIFF",
      "",
      "8.06",
      "",
      "",
      formatCurrency(calculatedRegularNightDifferential),
      "",
      "PHIC",
      "",
      "",
      formatCurrency(employee.phic),
    ],
    [
      "OT",
      "",
      formatCurrency(calculatedOvertime),
      "",
      "",
      "",
      "",
      "HDMF",
      "",
      "",
      formatCurrency(employee.hdmf),
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
    ["", "", "", "", "", "", "", "", "", "", ""],
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
    { s: { r: currentRow, c: 7 }, e: { r: currentRow + 1, c: 10 } },
  ];
};

const applyStylesForEmployee = (
  worksheet,
  currentRow,
  employee,
  formattedDate
) => {
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

  applyCellStyle(worksheet, currentRow, 7, formattedDate, {
    font: { name: "Abadi", sz: 9 },
    alignment: { vertical: "center", horizontal: "center" },
    border: {
      top: { style: "medium", color: { rgb: "000000" } },
    },
  });

  applyNumericStyles(worksheet, currentRow, employee);

  applyBorderStyles(worksheet, currentRow);
};

const applyCellStyle = (worksheet, row, col, value, style) => {
  const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
  if (!worksheet[cellAddress]) worksheet[cellAddress] = { v: value };
  worksheet[cellAddress].s = style;
};

const applyNumericStyles = (worksheet, currentRow, employee) => {
  if (employee.hourlyRate) {
    applyCellStyle(worksheet, currentRow + 3, 2, employee.hourlyRate, {
      font: { name: "Abadi", sz: 9 },
      alignment: { vertical: "center", horizontal: "right" },
    });
  }

  const regWageCell = XLSX.utils.encode_cell({ r: currentRow + 3, c: 5 });
  if (worksheet[regWageCell] && worksheet[regWageCell].v) {
    worksheet[regWageCell].s = {
      font: { name: "Abadi", sz: 9 },
      alignment: { vertical: "center", horizontal: "right" },
    };
  }

  if (employee.numberOfRegularHours) {
    applyCellStyle(
      worksheet,
      currentRow + 3,
      4,
      employee.numberOfRegularHours,
      {
        font: { name: "Abadi", sz: 9 },
        alignment: { vertical: "center", horizontal: "right" },
      }
    );
  }

  const regHolidayCell = XLSX.utils.encode_cell({ r: currentRow + 4, c: 2 });
  if (worksheet[regHolidayCell] && worksheet[regHolidayCell].v) {
    worksheet[regHolidayCell].s = {
      font: { name: "Abadi", sz: 9 },
      alignment: { vertical: "center", horizontal: "right" },
    };
  }

  const specialHolidayCell = XLSX.utils.encode_cell({
    r: currentRow + 5,
    c: 2,
  });
  if (worksheet[specialHolidayCell] && worksheet[specialHolidayCell].v) {
    worksheet[specialHolidayCell].s = {
      font: { name: "Abadi", sz: 9 },
      alignment: { vertical: "center", horizontal: "right" },
    };
  }

  const nightDiffRateCell = XLSX.utils.encode_cell({ r: currentRow + 6, c: 2 });
  if (worksheet[nightDiffRateCell] && worksheet[nightDiffRateCell].v) {
    worksheet[nightDiffRateCell].s = {
      font: { name: "Abadi", sz: 9 },
      alignment: { vertical: "center", horizontal: "right" },
    };
  }

  const nightDiffAmtCell = XLSX.utils.encode_cell({ r: currentRow + 6, c: 5 });
  if (worksheet[nightDiffAmtCell] && worksheet[nightDiffAmtCell].v) {
    worksheet[nightDiffAmtCell].s = {
      font: { name: "Abadi", sz: 9 },
      alignment: { vertical: "center", horizontal: "right" },
    };
  }

  const specialHolidayAmtCell = XLSX.utils.encode_cell({ r: currentRow + 5, c: 5 });
  if (worksheet[specialHolidayAmtCell] && worksheet[specialHolidayAmtCell].v) {
    worksheet[specialHolidayAmtCell].s = {
      font: { name: "Abadi", sz: 9 },
      alignment: { vertical: "center", horizontal: "right" },
    };
  }

  const overtimeCell = XLSX.utils.encode_cell({ r: currentRow + 7, c: 2 });
  if (worksheet[overtimeCell] && worksheet[nightDiffRateCell].v) {
    worksheet[overtimeCell].s = {
      font: { name: "Abadi", sz: 9 },
      alignment: { vertical: "center", horizontal: "right" },
    };
  }

  const grossPayCell = XLSX.utils.encode_cell({ r: currentRow + 8, c: 5 });
  if (worksheet[grossPayCell] && worksheet[grossPayCell].v) {
    worksheet[grossPayCell].s = {
      font: { name: "Abadi", sz: 9 },
      alignment: { vertical: "center", horizontal: "right" },
    };
  }

  applyCellStyle(worksheet, currentRow + 5, 10, employee.sss, {
    font: { name: "Abadi", sz: 9 },
    alignment: { vertical: "center", horizontal: "right" },
    border: {
      right: { style: "medium", color: { rgb: "000000" } },
    },
  });

  applyCellStyle(worksheet, currentRow + 4, 10, employee.hdmfLoans, {
    font: { name: "Abadi", sz: 9 },
    alignment: { vertical: "center", horizontal: "right" },
    border: {
      right: { style: "medium", color: { rgb: "000000" } },
    },
  });

  applyCellStyle(worksheet, currentRow + 6, 10, employee.phic, {
    font: { name: "Abadi", sz: 9 },
    alignment: { vertical: "center", horizontal: "right" },
    border: {
      right: { style: "medium", color: { rgb: "000000" } },
    },
  });

  applyCellStyle(
    worksheet,
    currentRow + 7,
    10,
    formatCurrency(employee.hdmf),
    {
      font: { name: "Abadi", sz: 9 },
      alignment: { vertical: "center", horizontal: "right" },
      border: {
        right: { style: "medium", color: { rgb: "000000" } },
      },
    }
  );

  applyCellStyle(
    worksheet,
    currentRow + 8,
    10,
    formatCurrency(employee.netPay),
    {
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
    }
  );
};

const applyBorderStyles = (worksheet, currentRow) => {
  const payslipRowCount = 9;
  const payslipColCount = 11; 

  for (let rowIndex = 0; rowIndex < payslipRowCount; rowIndex++) {
    for (let colIndex = 0; colIndex < payslipColCount; colIndex++) {
      const cellAddress = XLSX.utils.encode_cell({
        r: currentRow + rowIndex,
        c: colIndex,
      });

      if (!worksheet[cellAddress]) worksheet[cellAddress] = { v: "" };
      if (!worksheet[cellAddress].s) worksheet[cellAddress].s = {};

      if (!worksheet[cellAddress].s.font) {
        worksheet[cellAddress].s.font = { name: "Abadi", sz: 9 };
      }

      if (!worksheet[cellAddress].s.alignment) {
        worksheet[cellAddress].s.alignment = {
          vertical: "center",
          horizontal: "left",
        };
      }

      const cellStyle = worksheet[cellAddress].s;

      if (rowIndex === 0) {
        cellStyle.border = {
          ...(cellStyle.border || {}),
          top: { style: "medium", color: { rgb: "000000" } },
        };
      }

      if (rowIndex === payslipRowCount - 1) {
        cellStyle.border = {
          ...(cellStyle.border || {}),
          bottom: { style: "medium", color: { rgb: "000000" } },
        };
      }

      if (colIndex === 0) {
        cellStyle.border = {
          ...(cellStyle.border || {}),
          left: { style: "medium", color: { rgb: "000000" } },
        };
      }

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
