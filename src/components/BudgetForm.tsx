import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface BudgetFormProps {
  onSubmit: (data: BudgetFormData) => void;
}

export interface BudgetFormData {
  annualSalary: number;
  monthlyExpenses: {
    rent: number;
    utilities: number;
    food: number;
    transportation: number;
    other: number;
  };
}

const BudgetForm: React.FC<BudgetFormProps> = ({ onSubmit = () => {} }) => {
  const [formData, setFormData] = useState<BudgetFormData>({
    annualSalary: 0,
    monthlyExpenses: {
      rent: 0,
      utilities: 0,
      food: 0,
      transportation: 0,
      other: 0,
    },
  });

  const [errors, setErrors] = useState<{
    salary?: string;
    expenses?: string;
  }>({});

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setFormData((prev) => ({ ...prev, annualSalary: value }));
  };

  const handleExpenseChange =
    (key: keyof BudgetFormData["monthlyExpenses"]) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value) || 0;
      setFormData((prev) => ({
        ...prev,
        monthlyExpenses: {
          ...prev.monthlyExpenses,
          [key]: value,
        },
      }));
    };

  const validateForm = (): boolean => {
    const newErrors: { salary?: string; expenses?: string } = {};

    if (formData.annualSalary <= 0) {
      newErrors.salary = "Please enter a valid annual salary";
    }

    const hasNegativeExpense = Object.values(formData.monthlyExpenses).some(
      (value) => value < 0,
    );
    if (hasNegativeExpense) {
      newErrors.expenses = "Expenses cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Card className="w-full max-w-md bg-white">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Annual Income</h3>

            <div className="space-y-2">
              <Label htmlFor="annual-salary" className="form-label">
                Annual Salary ($)
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/70">
                  $
                </span>
                <Input
                  id="annual-salary"
                  type="number"
                  placeholder="85000"
                  className="pl-7 placeholder:text-muted-foreground/60"
                  value={formData.annualSalary || ""}
                  onChange={handleSalaryChange}
                />
              </div>
              {errors.salary && (
                <Alert variant="destructive" className="py-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.salary}</AlertDescription>
                </Alert>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Monthly Expenses</h3>

            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="rent">Rent/Mortgage ($)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <Input
                    id="rent"
                    type="number"
                    placeholder="1500"
                    className="pl-7"
                    value={formData.monthlyExpenses.rent || ""}
                    onChange={handleExpenseChange("rent")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="utilities">Utilities ($)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <Input
                    id="utilities"
                    type="number"
                    placeholder="200"
                    className="pl-7"
                    value={formData.monthlyExpenses.utilities || ""}
                    onChange={handleExpenseChange("utilities")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="food">Food ($)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <Input
                    id="food"
                    type="number"
                    placeholder="500"
                    className="pl-7"
                    value={formData.monthlyExpenses.food || ""}
                    onChange={handleExpenseChange("food")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transportation">Transportation ($)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <Input
                    id="transportation"
                    type="number"
                    placeholder="300"
                    className="pl-7"
                    value={formData.monthlyExpenses.transportation || ""}
                    onChange={handleExpenseChange("transportation")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="other">Other Expenses ($)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <Input
                    id="other"
                    type="number"
                    placeholder="400"
                    className="pl-7"
                    value={formData.monthlyExpenses.other || ""}
                    onChange={handleExpenseChange("other")}
                  />
                </div>
              </div>
            </div>

            {errors.expenses && (
              <Alert variant="destructive" className="py-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.expenses}</AlertDescription>
              </Alert>
            )}
          </div>

          <Button type="submit" className="w-full">
            Calculate Budget Impact
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BudgetForm;
