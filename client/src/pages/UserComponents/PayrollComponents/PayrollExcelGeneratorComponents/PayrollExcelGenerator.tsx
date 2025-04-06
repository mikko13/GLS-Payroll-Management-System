import React, { useState } from "react";
import { Table, Download } from "lucide-react";
import * as XLSX from "xlsx";
import { toast } from "sonner";

interface Payroll {
  _id?: string;
  id: string;
  name: string;
  checked: boolean;
  numberOfRegularHours: number;
  hourlyRate: number;
  totalRegularWage: number;
  regularNightDifferential: number;
  prorated13thMonthPay: number;
  specialHoliday: number;
  regularHoliday: number;
  serviceIncentiveLeave: number;
  overtime: number;
  totalAmount: number;
  hdmf: number;
  hdmfLoans: number;
  sss: number;
  phic: number;
  netPay: number;
  status: string;
  payPeriod: string;
}

interface PayrollExcelGeneratorProps {
  payrolls: Payroll[];
  selectedPayPeriod?: string;
}

const PayrollExcelGenerator: React.FC<PayrollExcelGeneratorProps> = ({
  payrolls,
  selectedPayPeriod = "All Pay Periods",
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const nightDifferentialAmount = (payroll: Payroll) =>
    payroll.regularNightDifferential * 8.06;

  const regularHolidayAmount = (payroll: Payroll) =>
    payroll.regularHoliday * 161.25;

  const specialHolidayAmount = (payroll: Payroll) =>
    payroll.specialHoliday * 104.81;

  const overtimeAmount = (payroll: Payroll) => payroll.overtime * 100.78;

  const generatePayrollExcel = async () => {
    try {
      setIsGenerating(true);

      const filteredPayrolls =
        selectedPayPeriod === "All Pay Periods"
          ? payrolls
          : payrolls.filter(
              (payroll) => payroll.payPeriod === selectedPayPeriod
            );

      if (filteredPayrolls.length === 0) {
        toast.error("No payroll records found", {
          description:
            "There are no payroll records available for the selected pay period.",
        });
        return;
      }

      // Create workbook
      const wb = XLSX.utils.book_new();

      // Create detailed payroll worksheet based on the reference image
      const detailedPayrollData = [];

      // Add title row with period
      detailedPayrollData.push(Array(17).fill(null));
      detailedPayrollData[0][7] = `PAYROLL FOR THE PERIOD ${selectedPayPeriod}`;

      // Add headers
      const headers = [
        "Name of Employee",
        "No. of REG. HOURS",
        "HOURLY Rate",
        "Total Regular Wage",
        "REG. NIGHT DIFF",
        "PRO RATED 13TH MONTH PAY",
        "SPCL HOLIDAY 104.81",
        "REGULAR HOLIDAY 161.25",
        "service incentive leave",
        "OVERTIME DEC 1-15",
        "TOTAL AMOUNT",
        "hdmf loan",
        "SSS",
        "PHIC",
        "HDMF",
        "NET PAY",
      ];

      detailedPayrollData.push(Array(17).fill(null));
      headers.forEach((header, index) => {
        detailedPayrollData[1][index] = header;
      });

      // Add employee data
      filteredPayrolls.forEach((payroll) => {
        const row = [
          payroll.name,
          payroll.numberOfRegularHours,
          payroll.hourlyRate,
          payroll.totalRegularWage,
          nightDifferentialAmount(payroll),
          payroll.prorated13thMonthPay,
          specialHolidayAmount(payroll),
          regularHolidayAmount(payroll),
          payroll.serviceIncentiveLeave,
          overtimeAmount(payroll),
          payroll.totalAmount,
          payroll.hdmfLoans,
          payroll.sss,
          payroll.phic,
          payroll.hdmf,
          payroll.netPay,
        ];

        detailedPayrollData.push(row);
      });

      // Create the worksheet
      const ws = XLSX.utils.aoa_to_sheet(detailedPayrollData);

      // Style the worksheet
      ws["!merges"] = [
        { s: { r: 0, c: 7 }, e: { r: 0, c: 9 } }, // Merge cells for title
      ];

      // Set column widths
      ws["!cols"] = [
        { wch: 20 }, // Name
        { wch: 12 }, // Hours
        { wch: 12 }, // Rate
        { wch: 15 }, // Regular Wage
        { wch: 15 }, // Night Diff
        { wch: 15 }, // 13th Month
        { wch: 15 }, // Special Holiday
        { wch: 15 }, // Regular Holiday
        { wch: 15 }, // SIL
        { wch: 15 }, // Overtime
        { wch: 15 }, // Total Amount
        { wch: 12 }, // HDMF Loans
        { wch: 12 }, // SSS
        { wch: 12 }, // PHIC
        { wch: 12 }, // HDMF
        { wch: 15 }, // Net Pay
      ];

      // Apply formatting
      const numericCols = [
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
      ];
      const currencyFormat = "₱#,##0.00";
      const lastRow = detailedPayrollData.length;

      numericCols.forEach((col) => {
        for (let i = 3; i <= lastRow; i++) {
          const cellRef = `${col}${i}`;
          if (!ws[cellRef]) continue;

          // Apply formatting based on column type
          if (col === "B" || col === "C") {
            // Regular number format for hours and rate
            ws[cellRef].z = "#,##0.00";
          } else {
            // Currency format for monetary values
            ws[cellRef].z = currencyFormat;
          }
        }
      });

      // Apply cell styles
      // Header styles - not directly possible with xlsx but we prep the data
      for (let i = 0; i < headers.length; i++) {
        const cellRef = XLSX.utils.encode_cell({ r: 1, c: i });
        if (!ws[cellRef]) continue;
        ws[cellRef].s = { font: { bold: true } };
      }

      // Title cell style
      const titleCell = XLSX.utils.encode_cell({ r: 0, c: 7 });
      if (ws[titleCell]) {
        ws[titleCell].s = { font: { bold: true, sz: 14 } };
      }

      // Create summary sheet
      const summaryData = [];

      // Add company header
      summaryData.push(["COMPANY PAYROLL SUMMARY"]);
      summaryData.push(["Pay Period:", selectedPayPeriod]);
      summaryData.push(["Generated on:", new Date().toLocaleDateString()]);
      summaryData.push([]);

      // Add summary totals
      const totalRegularWage = filteredPayrolls.reduce(
        (sum, p) => sum + p.totalRegularWage,
        0
      );
      const totalNightDiff = filteredPayrolls.reduce(
        (sum, p) => sum + nightDifferentialAmount(p),
        0
      );
      const total13thMonth = filteredPayrolls.reduce(
        (sum, p) => sum + p.prorated13thMonthPay,
        0
      );
      const totalSpecialHoliday = filteredPayrolls.reduce(
        (sum, p) => sum + specialHolidayAmount(p),
        0
      );
      const totalRegularHoliday = filteredPayrolls.reduce(
        (sum, p) => sum + regularHolidayAmount(p),
        0
      );
      const totalSIL = filteredPayrolls.reduce(
        (sum, p) => sum + p.serviceIncentiveLeave,
        0
      );
      const totalOvertime = filteredPayrolls.reduce(
        (sum, p) => sum + overtimeAmount(p),
        0
      );
      const totalGross = filteredPayrolls.reduce(
        (sum, p) => sum + p.totalAmount,
        0
      );
      const totalHDMF = filteredPayrolls.reduce((sum, p) => sum + p.hdmf, 0);
      const totalHDMFLoans = filteredPayrolls.reduce(
        (sum, p) => sum + p.hdmfLoans,
        0
      );
      const totalSSS = filteredPayrolls.reduce((sum, p) => sum + p.sss, 0);
      const totalPHIC = filteredPayrolls.reduce((sum, p) => sum + p.phic, 0);
      const totalDeductions = totalHDMF + totalHDMFLoans + totalSSS + totalPHIC;
      const totalNetPay = filteredPayrolls.reduce(
        (sum, p) => sum + p.netPay,
        0
      );

      summaryData.push(["SUMMARY OF EARNINGS"]);
      summaryData.push(["Regular Wages:", totalRegularWage]);
      summaryData.push(["Night Differential:", totalNightDiff]);
      summaryData.push(["13th Month Pay:", total13thMonth]);
      summaryData.push(["Special Holiday Pay:", totalSpecialHoliday]);
      summaryData.push(["Regular Holiday Pay:", totalRegularHoliday]);
      summaryData.push(["Service Incentive Leave:", totalSIL]);
      summaryData.push(["Overtime Pay:", totalOvertime]);
      summaryData.push(["GROSS PAY:", totalGross]);
      summaryData.push([]);

      summaryData.push(["SUMMARY OF DEDUCTIONS"]);
      summaryData.push(["HDMF:", totalHDMF]);
      summaryData.push(["HDMF Loans:", totalHDMFLoans]);
      summaryData.push(["SSS:", totalSSS]);
      summaryData.push(["PHIC:", totalPHIC]);
      summaryData.push(["TOTAL DEDUCTIONS:", totalDeductions]);
      summaryData.push([]);

      summaryData.push(["NET PAY TOTAL:", totalNetPay]);
      summaryData.push(["Number of Employees:", filteredPayrolls.length]);

      const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);

      // Style summary sheet
      summaryWs["!cols"] = [{ wch: 25 }, { wch: 15 }];

      // Apply currency formatting to monetary values in summary
      for (let i = 6; i <= 13; i++) {
        const cellRef = `B${i}`;
        if (summaryWs[cellRef]) {
          summaryWs[cellRef].z = currencyFormat;
        }
      }

      for (let i = 16; i <= 20; i++) {
        const cellRef = `B${i}`;
        if (summaryWs[cellRef]) {
          summaryWs[cellRef].z = currencyFormat;
        }
      }

      if (summaryWs["B22"]) {
        summaryWs["B22"].z = currencyFormat;
      }

      // Add sheets to the workbook
      XLSX.utils.book_append_sheet(wb, ws, "Payroll Details");
      XLSX.utils.book_append_sheet(wb, summaryWs, "Summary");

      // Generate filename
      const periodFormatted =
        selectedPayPeriod === "All Pay Periods"
          ? "All_Periods"
          : selectedPayPeriod.replace(/\s+/g, "_").replace(/,/g, "");

      const fileName = `Payroll_${periodFormatted}.xlsx`;

      // Write and download the file
      XLSX.writeFile(wb, fileName);

      toast.success("Payroll Excel Generated", {
        description: `Successfully generated payroll Excel for ${filteredPayrolls.length} employees.`,
      });
    } catch (error) {
      console.error("Error generating payroll Excel:", error);
      toast.error("Failed to Generate Payroll Excel", {
        description:
          "An error occurred while generating the payroll Excel file.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={generatePayrollExcel}
      disabled={isGenerating}
      className={`cursor-pointer bg-white hover:bg-blue-50 text-gray-800 px-3 py-2 rounded-md text-sm flex items-center 
      transition-all duration-200 border border-blue-200 w-full md:w-auto justify-center
      ${isGenerating ? "opacity-70 cursor-not-allowed" : ""}`}
    >
      {isGenerating ? (
        <>
          <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full mr-2" />
          Generating...
        </>
      ) : (
        <>
          <Download size={16} className="mr-2" />
          Export Payroll Excel
        </>
      )}
    </button>
  );
};

export default PayrollExcelGenerator;
