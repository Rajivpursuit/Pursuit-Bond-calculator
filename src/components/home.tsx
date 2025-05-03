import React from "react";
import BudgetCalculator from "./BudgetCalculator";
import PursuitLogo from "./PursuitLogo";
import { ThemeToggle } from "./ui/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Fixed header */}
      <div className="app-header shadow-sm">
        <div className="flex items-center gap-3">
          <PursuitLogo size={32} />
          <h1>Pursuit Bond Calculator</h1>
        </div>
        <ThemeToggle />
      </div>
      
      <div className="header-offset p-4 md:p-8 lg:p-12">
        <header className="mb-8 text-center">
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
          <div className="bg-card rounded-xl shadow-lg border p-6">
            <BudgetCalculator />
          </div>
        </main>

        <footer className="mt-12 text-center text-sm text-muted-foreground p-4">
          <p>
            The Pursuit Bond is applicable for individuals with an annual salary
            of $85,000 or more. The payment is calculated as 15% of your monthly
            income.
          </p>
        </footer>
      </div>
    </div>
  );
}
