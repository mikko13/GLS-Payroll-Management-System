import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "sonner";

interface Employee {
  id: string;
  lastName: string;
  firstName: string;
  middleName: string;
  gender: string;
  position: string;
  department: string;
  dateStarted: string;
  rate: string;
  status: string;
  remarks: string;
  civilStatus?: string;
  birthDate?: string;
  sss?: string;
  hdmf?: string;
  philhealth?: string;
  tin?: string;
  emailAddress?: string;
  permanentAddress?: string;
  contactNumber?: string;
}

interface PDFGeneratorProps {
  displayedEmployees: Employee[];
}

const usePDFGenerator = () => {
  const generatePDF = (displayedEmployees: Employee[]) => {
    try {
      const doc = new jsPDF("landscape");
      const pageWidth = doc.internal.pageSize.getWidth();

      const internalDoc = doc.internal as any;

      // Header section
      doc.setFillColor(51, 102, 204);
      doc.rect(0, 0, pageWidth, 25, "F");
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.text("Century Park Hotel GLS Staff Data Based", 14, 15);

      const today = new Date();
      const dateStr = today.toLocaleDateString();
      doc.setFontSize(10);
      doc.text(`As of: ${dateStr}`, pageWidth - 14, 10, { align: "right" });

      // Company information
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(10);
      doc.text("GLS Manpower Services", 14, 35);
      doc.text(
        "Suite 19 G/F Midland Plaza, M. Adriatico Street, Ermita, City of Manila 1000 Metro Manila",
        14,
        40
      );
      doc.text("gls_manpowerservices@yahoo.com | +63 (2) 8 526 5813", 14, 45);

      // Employee count box
      doc.setDrawColor(220, 220, 220);
      doc.setFillColor(245, 245, 250);
      doc.roundedRect(pageWidth - 80, 30, 70, 20, 3, 3, "FD");
      doc.setTextColor(50, 50, 50);
      doc.setFontSize(11);
      doc.text("Total Employees:", pageWidth - 75, 38);
      doc.setFont("helvetica", "bold");
      doc.text(`${displayedEmployees.length}`, pageWidth - 30, 38);

      // Table columns definition
      const columns = [
        { header: "Last Name", dataKey: "lastName" },
        { header: "First Name", dataKey: "firstName" },
        { header: "Middle Name", dataKey: "middleName" },
        { header: "Gender", dataKey: "gender" },
        { header: "Position", dataKey: "position" },
        { header: "Department", dataKey: "department" },
        { header: "Date Started", dataKey: "dateStarted" },
        { header: "Rate", dataKey: "rate" },
        { header: "Civil Status", dataKey: "civilStatus" },
        { header: "Birthday", dataKey: "birthDate" },
        { header: "SSS Number", dataKey: "sss" },
        { header: "HDMF/PAGIBIG", dataKey: "hdmf" },
        { header: "Philhealth", dataKey: "philhealth" },
        { header: "Tin Number", dataKey: "tin" },
        { header: "Email Address", dataKey: "emailAddress" },
        { header: "Permanent Address", dataKey: "permanentAddress" },
        { header: "Contact Number", dataKey: "contactNumber" },
        { header: "Status", dataKey: "status" },
        { header: "Remarks", dataKey: "remarks" },
      ];

      const formatStatus = (status: string) => {
        return status.charAt(0).toUpperCase() + status.slice(1);
      };

      // Generate table
      autoTable(doc, {
        startY: 55,
        head: [columns.map((col) => col.header)],
        body: displayedEmployees.map((employee) => [
          employee.lastName,
          employee.firstName,
          employee.middleName,
          employee.gender,
          employee.position,
          employee.department,
          employee.dateStarted,
          employee.rate,
          employee.civilStatus || "",
          employee.birthDate || "",
          employee.sss || "",
          employee.hdmf || "",
          employee.philhealth || "",
          employee.tin || "",
          employee.emailAddress || "",
          employee.permanentAddress || "",
          employee.contactNumber || "",
          formatStatus(employee.status),
          employee.remarks,
        ]),
        theme: "grid",
        headStyles: {
          fillColor: [73, 137, 222],
          textColor: [255, 255, 255],
          fontStyle: "bold",
          halign: "center",
          fontSize: 8,
        },
        bodyStyles: {
          fontSize: 7,
        },
        alternateRowStyles: {
          fillColor: [240, 245, 255],
        },
        styles: {
          lineColor: [220, 220, 220],
          lineWidth: 0.1,
          cellPadding: 2,
          overflow: "linebreak",
        },
        columnStyles: {
          15: {
            cellWidth: "auto",
            overflow: "linebreak",
          },
          18: {
            cellWidth: "auto",
            overflow: "linebreak",
          },
        },
        didDrawPage: () => {
          const pageCount = internalDoc.getNumberOfPages();
          doc.setFontSize(8);
          doc.setTextColor(100, 100, 100);
          for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.text(
              `Page ${i} of ${pageCount}`,
              pageWidth / 2,
              doc.internal.pageSize.getHeight() - 10,
              {
                align: "center",
              }
            );
            doc.text(
              "CONFIDENTIAL - FOR INTERNAL USE ONLY",
              14,
              doc.internal.pageSize.getHeight() - 10
            );
          }
        },
      });

      doc.save("employee-complete-report.pdf");

      toast.success("PDF Generated", {
        description: `Employee report for ${displayedEmployees.length} employees has been created.`,
        duration: 3000,
      });
    } catch (error) {
      toast.error("PDF Generation Failed", {
        description: "There was an error creating the employee report.",
        duration: 3000,
      });
      console.error("PDF generation error:", error);
    }
  };

  return { generatePDF };
};

export default usePDFGenerator;
