// PayslipDataFormatter.js
import { formatCurrency } from './excelUtils';

export const createEmployeePayslipData = (employee, formattedDate) => {
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
      formatEmployeeName(employee),
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

export const calculateMerges = (currentRow) => {
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

const formatEmployeeName = (employee) => {
  return `EMPLOYEE NAME: ${employee.lastName?.toUpperCase() || ""}, ${
    employee.firstName?.toUpperCase() ||
    employee.name?.toUpperCase() ||
    ""
  }`;
};