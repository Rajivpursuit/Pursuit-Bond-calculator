import React, { useState } from "react";
import BudgetForm, { BudgetFormData } from "./BudgetForm";
import BudgetResults from "./BudgetResults";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const BudgetCalculator = () => {
  const [budgetData, setBudgetData] = useState<BudgetFormData | null>(null);
  const [isEligible, setIsEligible] = useState<boolean | null>(null);
  const [monthlySalary, setMonthlySalary] = useState<number>(0);
  const [bondPayment, setBondPayment] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [remainingFunds, setRemainingFunds] = useState<number>(0);

  const handleSubmit = (data: BudgetFormData) => {
    // Calculate monthly income from annual salary
    const monthly = Math.round((data.annualSalary / 12) * 100) / 100;

    // Check eligibility based on annual salary threshold
    const eligible = data.annualSalary >= 85000;

    // Calculate bond payment (15% of monthly income if eligible)
    const payment = eligible ? Math.round(monthly * 0.15 * 100) / 100 : 0;

    // Sum all expense categories
    const expenses = Object.values(data.monthlyExpenses).reduce(
      (sum, expense) => sum + expense,
      0,
    );

    // Calculate remaining funds after expenses and bond payment
    const remaining = Math.round((monthly - payment - expenses) * 100) / 100;

    // Update state with calculated values
    setBudgetData(data);
    setIsEligible(eligible);
    setMonthlySalary(monthly);
    setBondPayment(payment);
    setTotalExpenses(expenses);
    setRemainingFunds(remaining);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-background">
      <Card className="w-full shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-bold text-pursuit">
            Pursuit Bond Budget Calculator
          </CardTitle>
          <CardDescription className="text-sm md:text-base">
            Understand how the Pursuit Bond payment (15% of monthly income)
            would impact your budget.
            <br />
            <span className="font-medium">
              Eligibility: Annual salary of $85,000 or higher
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BudgetForm onSubmit={handleSubmit} />
            {budgetData && (
              <BudgetResults
                monthlySalary={monthlySalary}
                bondPayment={bondPayment}
                totalExpenses={totalExpenses}
                remainingFunds={remainingFunds}
                isEligible={isEligible || false}
                expensesBreakdown={budgetData.monthlyExpenses}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetCalculator;
