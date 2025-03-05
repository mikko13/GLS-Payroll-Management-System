export interface CreatePayrollFormProps {
  onSubmit: (payrollData: Omit<Employee, "id" | "checked">) => void;
  onCancel?: () => void;
}

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
