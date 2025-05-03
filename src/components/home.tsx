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
        {/* Removed redundant header section */}
        
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
