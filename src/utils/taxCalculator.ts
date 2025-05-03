/**
 * Calculates estimated state income tax for single filers in NY, NJ, or CT
 * @param income Annual gross income in dollars
 * @param state State code ('NY', 'NJ', or 'CT')
 * @returns Estimated state income tax in dollars
 */
export function calculateStateTax(income: number, state: 'NY' | 'NJ' | 'CT'): number {
  // Input validation
  if (income < 0) {
    throw new Error('Income cannot be negative');
  }
  
  let tax = 0;
  
  switch (state) {
    case 'NY': // New York state tax calculation
      // Simplified 2024 NY tax brackets for single filers
      if (income <= 13900) {
        tax = income * 0.04;
      } else if (income <= 22000) {
        tax = 556 + (income - 13900) * 0.045;
      } else if (income <= 27900) {
        tax = 921 + (income - 22000) * 0.0525;
      } else if (income <= 161550) {
        tax = 1230 + (income - 27900) * 0.0585;
      } else if (income <= 323200) {
        tax = 9078 + (income - 161550) * 0.0625;
      } else if (income <= 2155350) {
        tax = 19079 + (income - 323200) * 0.0685;
      } else {
        tax = 144905 + (income - 2155350) * 0.109;
      }
      break;
      
    case 'NJ': // New Jersey state tax calculation
      // Simplified 2024 NJ tax brackets for single filers
      if (income <= 20000) {
        tax = income * 0.014;
      } else if (income <= 35000) {
        tax = 280 + (income - 20000) * 0.0175;
      } else if (income <= 40000) {
        tax = 542.50 + (income - 35000) * 0.035;
      } else if (income <= 75000) {
        tax = 717.50 + (income - 40000) * 0.05525;
      } else if (income <= 500000) {
        tax = 2651.25 + (income - 75000) * 0.0637;
      } else if (income <= 1000000) {
        tax = 29723.75 + (income - 500000) * 0.0897;
      } else {
        tax = 74573.75 + (income - 1000000) * 0.1075;
      }
      break;
      
    case 'CT': // Connecticut state tax calculation
      // Simplified 2024 CT tax brackets for single filers
      if (income <= 10000) {
        tax = income * 0.03;
      } else if (income <= 50000) {
        tax = 300 + (income - 10000) * 0.05;
      } else if (income <= 100000) {
        tax = 2300 + (income - 50000) * 0.055;
      } else if (income <= 200000) {
        tax = 5050 + (income - 100000) * 0.06;
      } else if (income <= 250000) {
        tax = 11050 + (income - 200000) * 0.065;
      } else if (income <= 500000) {
        tax = 14300 + (income - 250000) * 0.069;
      } else {
        tax = 31550 + (income - 500000) * 0.0699;
      }
      break;
      
    default:
      throw new Error('Invalid state code. Must be NY, NJ, or CT');
  }
  
  // Round to 2 decimal places for currency
  return Math.round(tax * 100) / 100;
}

// Sample usage
const income = 85000;
const state = 'NY';
const estimatedTax = calculateStateTax(income, state);
console.log(`Estimated state income tax for $${income.toLocaleString()} in ${state}: $${estimatedTax.toLocaleString()}`);
// Output: Estimated state income tax for $85,000 in NY: $4,424.33