import React from "react";
import BudgetCalculator from "./BudgetCalculator";
import PursuitLogo from "./PursuitLogo";

export default function BudgetCalculatorStoryboard() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8 lg:p-12 relative">
      <div className="absolute top-4 left-4 md:top-8 md:left-8">
        <PursuitLogo size={48} />
      </div>
      <header className="mb-8 text-center pt-16 md:pt-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-pursuit">
          Pursuit Bond Budget Calculator
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Understand how the Pursuit Bond payment (15% of monthly income) would
          impact your budget. Visualize the breakdown of your income, expenses,
          and remaining funds.
        </p>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="bg-card rounded-xl shadow-lg border p-4 md:p-6">
          <BudgetCalculator />
        </div>
      </main>
    </div>
  );
}
