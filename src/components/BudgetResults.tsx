import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  InfoIcon,
  PieChartIcon,
  BarChartIcon,
  HelpCircleIcon,
} from "lucide-react";
import BudgetChart, { ChartType } from "./BudgetChart";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BudgetResultsProps {
  monthlySalary: number;
  bondPayment: number;
  totalExpenses: number;
  remainingFunds: number;
  isEligible: boolean;
  expensesBreakdown: {
    rent: number;
    utilities: number;
    food: number;
    transportation: number;
    other: number;
  };
  stateTax: number;
  state: 'NY' | 'NJ' | 'CT';
}

const BudgetResults: React.FC<BudgetResultsProps> = ({
  monthlySalary = 7500, // Default $90,000/year
  bondPayment = 1125, // Default 15% of $7,500
  totalExpenses = 4000, // Default expenses
  remainingFunds = 2375, // Default remaining
  isEligible = true,
  expensesBreakdown = {
    rent: 2000,
    utilities: 500,
    food: 800,
    transportation: 400,
    other: 300,
  },
  stateTax = 0,
  state = 'NY',
}) => {
  const [chartType, setChartType] = useState<ChartType>("pie");
  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Calculate percentages for summary
  const bondPercentage =
    monthlySalary > 0 ? Math.round((bondPayment / monthlySalary) * 100) : 0;
  const expensesPercentage =
    monthlySalary > 0 ? Math.round((totalExpenses / monthlySalary) * 100) : 0;
  const remainingPercentage =
    monthlySalary > 0 ? Math.round((remainingFunds / monthlySalary) * 100) : 0;
  const stateTaxPercentage = 
    monthlySalary > 0 ? Math.round((stateTax / monthlySalary) * 100) : 0;

  // Toggle chart type
  const toggleChartType = () => {
    setChartType(chartType === "pie" ? "bar" : "pie");
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Budget Breakdown</h2>

      {!isEligible && (
        <Alert className="mb-6 bg-amber-50 border-amber-200">
          <InfoIcon className="h-5 w-5 text-amber-500" />
          <AlertDescription className="text-amber-800">
            Based on your annual salary, you are not eligible for the Pursuit
            Bond program (minimum $85,000/year required).
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart Section */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">Budget Visualization</h3>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className={cn("p-2", chartType === "pie" && "bg-secondary")}
                onClick={() => setChartType("pie")}
              >
                <PieChartIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={cn("p-2", chartType === "bar" && "bg-secondary")}
                onClick={() => setChartType("bar")}
              >
                <BarChartIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <BudgetChart
            bondPayment={bondPayment}
            totalExpenses={totalExpenses}
            remainingFunds={remainingFunds}
            isEligible={isEligible}
            chartType={chartType}
            expensesBreakdown={expensesBreakdown}
          />
        </div>

        {/* Summary Section */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Budget Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="font-medium">Monthly Income:</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <HelpCircleIcon className="h-4 w-4 ml-1 text-muted-foreground inline cursor-help" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-[200px] text-sm">
                        Your gross monthly income before taxes and deductions.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="font-bold">{formatCurrency(monthlySalary)}</span>
            </div>

            {isEligible && (
              <div className="flex justify-between items-center text-pursuit">
                <div className="flex items-center">
                  <span className="font-medium">
                    Bond Payment ({bondPercentage}%):
                  </span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>
                          <HelpCircleIcon className="h-4 w-4 ml-1 text-pursuit-light inline cursor-help" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px] text-sm">
                          The Pursuit Bond payment is 15% of your monthly
                          income. This applies only if your annual salary is
                          $85,000 or higher.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="font-bold">{formatCurrency(bondPayment)}</span>
              </div>
            )}

            <div className="flex justify-between items-center text-amber-600">
              <div className="flex items-center">
                <span className="font-medium">
                  {state} State Tax ({stateTaxPercentage}%):
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <HelpCircleIcon className="h-4 w-4 ml-1 text-amber-500 inline cursor-help" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-[200px] text-sm">
                        Estimated monthly state income tax based on your annual salary 
                        and {state === 'NY' ? 'New York' : state === 'NJ' ? 'New Jersey' : 'Connecticut'} tax brackets.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="font-bold">{formatCurrency(stateTax)}</span>
            </div>

            <div className="flex justify-between items-center text-red-600">
              <div className="flex items-center">
                <span className="font-medium">
                  Total Expenses ({expensesPercentage}%):
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <HelpCircleIcon className="h-4 w-4 ml-1 text-red-400 inline cursor-help" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-[200px] text-sm">
                        The sum of all your monthly expenses including rent,
                        utilities, food, transportation, and other costs.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="font-bold">{formatCurrency(totalExpenses)}</span>
            </div>

            <Separator />

            <div className="flex justify-between items-center text-green-600">
              <div className="flex items-center">
                <span className="font-medium">
                  Remaining ({remainingPercentage}%):
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <HelpCircleIcon className="h-4 w-4 ml-1 text-green-400 inline cursor-help" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-[200px] text-sm">
                        Your discretionary income after paying all expenses and
                        the Bond payment (if applicable). This is money
                        available for savings, investments, or additional
                        spending.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="font-bold">
                {formatCurrency(remainingFunds)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expenses Breakdown */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Expenses Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex justify-between">
              <span>Rent/Mortgage:</span>
              <span>{formatCurrency(expensesBreakdown.rent)}</span>
            </div>
            <div className="flex justify-between">
              <span>Utilities:</span>
              <span>{formatCurrency(expensesBreakdown.utilities)}</span>
            </div>
            <div className="flex justify-between">
              <span>Food:</span>
              <span>{formatCurrency(expensesBreakdown.food)}</span>
            </div>
            <div className="flex justify-between">
              <span>Transportation:</span>
              <span>{formatCurrency(expensesBreakdown.transportation)}</span>
            </div>
            <div className="flex justify-between">
              <span>Other:</span>
              <span>{formatCurrency(expensesBreakdown.other)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetResults;
