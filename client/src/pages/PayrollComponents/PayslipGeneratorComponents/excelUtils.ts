// excelUtils.js
import * as XLSX from "xlsx-js-style";

// Format currency values
export const formatCurrency = (value) => {
  return value
    ? `${value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : "";
};

// Create and format date for payslip
export const formatPayslipDate = (date) => {
  return `${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")} ${date.getDate().toString().padStart(2, "0")}-${(
    date.getDate() + 13
  )
    .toString()
    .padStart(2, "0")}, ${date.getFullYear()}`;
};

// Format date for filename
export const formatFilenameDate = (date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};

// Create workbook and set up worksheet with column widths
export const createWorkbook = () => {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet([]);

  // Set column widths
  worksheet["!cols"] = [
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

  return { workbook, worksheet };
};

// Apply style to a specific cell
export const applyCellStyle = (worksheet, row, col, value, style) => {
  const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
  if (!worksheet[cellAddress]) worksheet[cellAddress] = { v: value };
  worksheet[cellAddress].s = style;
};

// Standard cell styles
export const cellStyles = {
  companyName: {
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
  },
  date: {
    font: { name: "Abadi", sz: 9 },
    alignment: { vertical: "center", horizontal: "center" },
    border: {
      top: { style: "medium", color: { rgb: "000000" } },
    },
  },
  numeric: {
    font: { name: "Abadi", sz: 9 },
    alignment: { vertical: "center", horizontal: "right" },
  },
  rightBorder: {
    font: { name: "Abadi", sz: 9 },
    alignment: { vertical: "center", horizontal: "right" },
    border: {
      right: { style: "medium", color: { rgb: "000000" } },
    },
  },
  netPay: {
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
  },
  default: {
    font: { name: "Abadi", sz: 9 },
    alignment: { vertical: "center", horizontal: "left" },
  }
};