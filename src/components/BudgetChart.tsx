import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "@/lib/theme-provider";

// Register the required Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
);

export type ChartType = "pie" | "bar";

interface BudgetChartProps {
  bondPayment?: number;
  totalExpenses: number;
  remainingFunds: number;
  isEligible?: boolean;
  chartType?: ChartType;
  expensesBreakdown?: Record<string, number>;
}

const BudgetChart = ({
  bondPayment = 0,
  totalExpenses = 0,
  remainingFunds = 0,
  isEligible = false,
  chartType = "pie",
  expensesBreakdown = {},
}: BudgetChartProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  // Define colors that work well in both light and dark modes
  const bondColor = "#4338FF"; // Pursuit blue
  const bondBorderColor = "#3229CC";
  const expensesColor = "#ef4444"; // Red
  const expensesBorderColor = "#dc2626";
  const remainingColor = "#10b981"; // Green
  const remainingBorderColor = "#059669";
  
  // Text color for legends based on theme
  const textColor = isDark ? "rgba(255, 255, 255, 0.87)" : "rgba(0, 0, 0, 0.87)";
  
  // Prepare data for the pie chart
  const pieChartData = {
    labels: isEligible
      ? ["Bond Payment", "Expenses", "Remaining Funds"]
      : ["Expenses", "Remaining Funds"],
    datasets: [
      {
        data: isEligible
          ? [bondPayment, totalExpenses, remainingFunds]
          : [totalExpenses, remainingFunds],
        backgroundColor: isEligible
          ? [bondColor, expensesColor, remainingColor]
          : [expensesColor, remainingColor],
        borderColor: isEligible
          ? [bondBorderColor, expensesBorderColor, remainingBorderColor]
          : [expensesBorderColor, remainingBorderColor],
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for the bar chart
  const barChartData = {
    labels:
      Object.keys(expensesBreakdown).length > 0
        ? Object.keys(expensesBreakdown).map(
            (key) => key.charAt(0).toUpperCase() + key.slice(1),
          )
        : ["No expense data"],
    datasets: [
      {
        label: "Monthly Expenses",
        data:
          Object.keys(expensesBreakdown).length > 0
            ? Object.values(expensesBreakdown)
            : [0],
        backgroundColor: [
          "#ef4444", // Red
          "#f97316", // Orange
          "#eab308", // Yellow
          "#84cc16", // Lime
          "#10b981", // Green
        ],
        borderColor: ["#dc2626", "#ea580c", "#ca8a04", "#65a30d", "#059669"],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          font: {
            size: 14,
          },
          color: textColor,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: $${value.toFixed(0)}`;
          },
        },
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const value = context.raw || 0;
            return `$${value.toFixed(0)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return "$" + value;
          },
          color: textColor,
        },
        grid: {
          color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        ticks: {
          color: textColor,
        },
        grid: {
          color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  return (
    <Card className="w-full h-full">
      <CardContent className="p-6">
        <div className="h-[350px] flex items-center justify-center">
          {bondPayment > 0 || totalExpenses > 0 || remainingFunds > 0 ? (
            chartType === "pie" ? (
              <Pie data={pieChartData} options={pieChartOptions} />
            ) : (
              <Bar data={barChartData} options={barChartOptions} />
            )
          ) : (
            <div className="text-center text-muted-foreground">
              <p>Enter your income and expenses to see your budget breakdown</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetChart;
