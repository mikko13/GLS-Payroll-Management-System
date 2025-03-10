import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Activity, CalendarIcon } from "lucide-react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const PayrollSummaryChart = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState("6months");

  useEffect(() => {
    const fetchPayrollData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/payrolls");
        const data = response.data;

        const processedData = processPayrollData(data, timeframe);
        setPayrollData(processedData);
        setError(null);
      } catch (err) {
        console.error("Error fetching payroll data:", err);
        setError("Failed to load payroll data. Please try again later.");
        toast.error("Failed to load payroll data");
      } finally {
        setLoading(false);
      }
    };

    fetchPayrollData();
  }, [timeframe]);

  const processPayrollData = (data, timeRange) => {
    if (!data || data.length === 0) {
      return [];
    }

    const monthlyData = {};

    const monthCount = timeRange === "3months" ? 3 : 6;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"].slice(
      0,
      monthCount
    );

    months.forEach((month) => {
      monthlyData[month] = {
        month: month,
        totalRegularWage: 0,
        totalDeductions: 0,
        totalNetPay: 0,
        employeeCount: 0,
      };
    });

    data.forEach((payroll) => {
      const randomMonth = months[Math.floor(Math.random() * months.length)];

      monthlyData[randomMonth].totalRegularWage +=
        payroll.totalRegularWage || 0;

      const deductions =
        (payroll.hdmf || 0) +
        (payroll.hdmfLoans || 0) +
        (payroll.sss || 0) +
        (payroll.phic || 0);

      monthlyData[randomMonth].totalDeductions += deductions;
      monthlyData[randomMonth].totalNetPay += payroll.netPay || 0;
      monthlyData[randomMonth].employeeCount += 1;
    });

    return Object.values(monthlyData).map((item) => ({
      ...item,
      totalRegularWage: Math.round(item.totalRegularWage),
      totalDeductions: Math.round(item.totalDeductions),
      totalNetPay: Math.round(item.totalNetPay),
    }));
  };

  const summaryData = {
    totalRegularWage: payrollData.reduce(
      (sum, item) => sum + item.totalRegularWage,
      0
    ),
    totalDeductions: payrollData.reduce(
      (sum, item) => sum + item.totalDeductions,
      0
    ),
    totalNetPay: payrollData.reduce((sum, item) => sum + item.totalNetPay, 0),
  };

  const formatCurrency = (value) => {
    return `₱${value.toLocaleString()}`;
  };

  return (
    <Card className="bg-white shadow-sm border border-blue-100 h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium text-blue-800">
            Payroll Summary
          </CardTitle>
          <Tabs
            value={timeframe}
            onValueChange={setTimeframe}
            className="w-auto"
          >
            <TabsList className="grid w-40 grid-cols-2">
              <TabsTrigger value="3months">3 Months</TabsTrigger>
              <TabsTrigger value="6months">6 Months</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-64 pt-2">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Activity
                  size={32}
                  className="mx-auto animate-pulse text-blue-300 mb-2"
                />
                <p>Loading payroll data...</p>
              </div>
            </div>
          ) : error ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-red-500">
                <p>{error}</p>
                <button
                  className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                  onClick={() => setTimeframe(timeframe)}
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : payrollData.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                <CalendarIcon
                  size={32}
                  className="mx-auto text-blue-200 mb-2"
                />
                <p>No payroll data available for this period</p>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={payrollData}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" />
                <XAxis dataKey="month" />
                <YAxis
                  tickFormatter={(value) => `₱${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend wrapperStyle={{ paddingTop: 10 }} />
                <Bar
                  dataKey="totalRegularWage"
                  name="Regular Wages"
                  fill="#3b82f6"
                />
                <Bar
                  dataKey="totalDeductions"
                  name="Deductions"
                  fill="#ef4444"
                />
                <Bar dataKey="totalNetPay" name="Net Pay" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {!loading && !error && payrollData.length > 0 && (
          <div className="mt-4 pt-4 border-t border-blue-50">
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <p className="text-xs text-gray-500">Total Regular Wages</p>
                <p className="font-medium text-blue-600">
                  ₱{summaryData.totalRegularWage.toLocaleString()}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Total Deductions</p>
                <p className="font-medium text-red-600">
                  ₱{summaryData.totalDeductions.toLocaleString()}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Total Net Pay</p>
                <p className="font-medium text-green-600">
                  ₱{summaryData.totalNetPay.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PayrollSummaryChart;
