import { JSX } from "react/jsx-dev-runtime";

export interface Employee {
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
  hdmfLoans: number;
  sss: number;
  phic: number;
  netPay: number;
  status: string;
}

export interface PayrollTableProps {
  employees: Employee[];
  handleCheckboxChange: (id: string) => void;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => JSX.Element;
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
  currentPage: number;
  setCurrentPage: (value: number) => void;
}
