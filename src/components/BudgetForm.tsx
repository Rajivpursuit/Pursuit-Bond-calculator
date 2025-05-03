import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { AlertCircle } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";

interface BudgetFormProps {
  onSubmit?: (data: BudgetFormData) => void;
}

export interface BudgetFormData {
  annualSalary: number;
  state: 'NY' | 'NJ' | 'CT';
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
    state: 'NY',
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

  const handleStateChange = (value: 'NY' | 'NJ' | 'CT') => {
    setFormData((prev) => ({ ...prev, state: value }));
  };

  const handleExpenseChange = (field: keyof BudgetFormData["monthlyExpenses"]) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(e.target.value) || 0;
    setFormData((prev) => ({
      ...prev,
      monthlyExpenses: {
        ...prev.monthlyExpenses,
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const newErrors: { salary?: string; expenses?: string } = {};
    
    if (formData.annualSalary <= 0) {
      newErrors.salary = "Please enter a valid annual salary";
    }
    
    const totalExpenses = Object.values(formData.monthlyExpenses).reduce(
      (sum, expense) => sum + expense,
      0
    );
    
    if (totalExpenses <= 0) {
      newErrors.expenses = "Please enter at least one expense";
    }
    
    setErrors(newErrors);
    
    // If no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <Card className="w-full max-w-md bg-white">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Income Information</h3>
            
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
            
            <div className="space-y-2">
              <Label htmlFor="state" className="form-label">
                State of Residence (Tri-State Area)
              </Label>
              <Select 
                value={formData.state} 
                onValueChange={(value: 'NY' | 'NJ' | 'CT') => handleStateChange(value)}
              >
                <SelectTrigger id="state" className="w-full">
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NY">New York</SelectItem>
                  <SelectItem value="NJ">New Jersey</SelectItem>
                  <SelectItem value="CT">Connecticut</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                This selection will help us tailor the budget calculations based on your location.
              </p>
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
