import React, { useEffect, useState } from "react";
import { Users, PhilippinePeso, TrendingUp, TrendingDown } from "lucide-react";
import axios from "axios";
import { StatCardProps } from "./types";

interface StatCardsProps {
  employees: any[];
  loading: boolean;
}

const StatCards: React.FC<StatCardsProps> = ({ employees, loading }) => {
  const [payrollData, setPayrollData] = useState<any[]>([]);
  const [payrollLoading, setPayrollLoading] = useState(true);
  const [previousMonthStats, setPreviousMonthStats] = useState({
    employeeCount: 0,
    totalPayroll: 0,
  });
  const serverURL = import.meta.env.VITE_API_BASE_URL;
  
  useEffect(() => {
    const fetchPayrollData = async () => {
      try {
        // Fetch current payroll data
        const response = await axios.get(`${serverURL}/api/payrolls`);
        setPayrollData(response.data);

        // Fetch previous month's stats for comparison
        const previousStats = await axios.get(
          "http://localhost:5000/api/stats/previous-month"
        );
        setPreviousMonthStats({
          employeeCount: previousStats.data.employeeCount || 0,
          totalPayroll: previousStats.data.totalPayroll || 0,
        });

        setPayrollLoading(false);
      } catch (error) {
        console.error("Error fetching payroll data:", error);
        setPayrollLoading(false);
      }
    };

    fetchPayrollData();
  }, []);

  // Calculate total payroll amount
  const calculateTotalPayroll = () => {
    if (payrollLoading || !payrollData.length) return 0;
    return payrollData.reduce(
      (total, payroll) => total + payroll.totalAmount,
      0
    );
  };

  // Calculate percentage changes
  const calculateEmployeeChange = () => {
    if (previousMonthStats.employeeCount === 0) return "+0%";
    const change =
      ((employees.length - previousMonthStats.employeeCount) /
        previousMonthStats.employeeCount) *
      100;
    return `${change > 0 ? "+" : ""}${change.toFixed(1)}%`;
  };

  const calculatePayrollChange = () => {
    if (previousMonthStats.totalPayroll === 0) return "+0%";
    const currentTotal = calculateTotalPayroll();
    const change =
      ((currentTotal - previousMonthStats.totalPayroll) /
        previousMonthStats.totalPayroll) *
      100;
    return `${change > 0 ? "+" : ""}${change.toFixed(1)}%`;
  };

  // Determine if changes are positive
  const isEmployeeChangePositive = () => {
    return employees.length >= previousMonthStats.employeeCount;
  };

  const isPayrollChangePositive = () => {
    return calculateTotalPayroll() >= previousMonthStats.totalPayroll;
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `₱${(amount / 1000000).toFixed(2)}M`;
    } else if (amount >= 1000) {
      return `₱${(amount / 1000).toFixed(1)}K`;
    }
    return `₱${amount.toLocaleString()}`;
  };

  const stats: StatCardProps[] = [
    {
      title: "Total Employees",
      value: loading ? "Loading..." : employees.length.toString(),
      change: loading ? "--" : calculateEmployeeChange(),
      iconName: "Users",
      positive: isEmployeeChangePositive(),
    },
    {
      title: "Monthly Payroll",
      value: payrollLoading
        ? "Loading..."
        : formatCurrency(calculateTotalPayroll()),
      change: payrollLoading ? "--" : calculatePayrollChange(),
      iconName: "PhilippinePeso",
      positive: isPayrollChangePositive(),
    },
  ];

  return (
    <>
      {stats.map((stat, index) => (
        <StatCardItem key={index} {...stat} />
      ))}
    </>
  );
};

interface StatCardItemProps extends StatCardProps {
  loading?: boolean;
}

const StatCardItem: React.FC<StatCardItemProps> = ({
  title,
  value,
  change,
  iconName,
  positive,
  loading,
}) => {
  // Function to render the appropriate icon based on iconName
  const renderIcon = () => {
    switch (iconName) {
      case "Users":
        return <Users size={24} className="text-blue-600" />;
      case "PhilippinePeso":
        return <PhilippinePeso size={24} className="text-blue-600" />;
      default:
        return null;
    }
  };

  const trendIcon = positive ? (
    <TrendingUp size={16} className="mr-1" />
  ) : (
    <TrendingDown size={16} className="mr-1" />
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100 transform transition-all duration-300 hover:shadow-lg hover:scale-102">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-blue-50 rounded-full">{renderIcon()}</div>
        <div
          className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            positive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {loading ? null : trendIcon}
          {change}
        </div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <div className="flex items-baseline">
        <p className="text-3xl font-bold text-gray-900 tracking-tight">
          {value}
        </p>
      </div>
      {loading && (
        <div className="w-full mt-2 h-1 bg-gray-200 rounded overflow-hidden">
          <div className="h-1 bg-blue-500 animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default StatCards;
