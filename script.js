// Interest Rate Calculator - Main Logic

/**
 * Calculate compound interest
 * @param {number} principal - The initial amount
 * @param {number} rate - The annual interest rate (in percentage)
 * @param {number} time - The time period (in years)
 * @param {number} n - The compounding frequency per year
 * @returns {object} - Object containing principal, interest, and total
 */
function calculate(principal, rate, time, n) {
    // Convert all inputs to numbers to prevent TypeErrors
    principal = Number(principal);
    rate = Number(rate);
    time = Number(time);
    n = Number(n);

    // Validate inputs
    if (isNaN(principal) || principal <= 0) {
        throw new Error('Principal must be a valid positive number');
    }
    if (isNaN(rate) || rate < 0) {
        throw new Error('Interest rate must be a valid non-negative number');
    }
    if (isNaN(time) || time <= 0) {
        throw new Error('Time period must be a valid positive number');
    }
    if (isNaN(n) || n <= 0) {
        throw new Error('Compounding frequency must be a valid positive number');
    }

    // Compound Interest Formula: A = P(1 + r/(100*n))^(n*t)
    const rateDecimal = rate / 100;
    const amount = principal * Math.pow(1 + rateDecimal / n, n * time);
    const interest = amount - principal;

    return {
        principal: parseFloat(principal.toFixed(2)),
        interest: parseFloat(interest.toFixed(2)),
        total: parseFloat(amount.toFixed(2))
    };
}

// DOM Elements
const form = typeof document !== 'undefined' ? document.getElementById('calculatorForm') : null;
const resultDiv = typeof document !== 'undefined' ? document.getElementById('result') : null;
const resultPrincipal = typeof document !== 'undefined' ? document.getElementById('resultPrincipal') : null;
const resultInterest = typeof document !== 'undefined' ? document.getElementById('resultInterest') : null;
const resultTotal = typeof document !== 'undefined' ? document.getElementById('resultTotal') : null;

// Form submission handler - only run in browser environment
if (form) {
    form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Clear previous errors
    clearErrors();

    try {
        // Get input values and convert to numbers
        const principal = Number(document.getElementById('principal').value);
        const rate = Number(document.getElementById('rate').value);
        const time = Number(document.getElementById('time').value);
        const compound = Number(document.getElementById('compound').value);

        // Validate inputs
        if (!principal || principal <= 0) {
            showError('principalError');
            return;
        }
        if (typeof rate !== 'number' || rate < 0) {
            showError('rateError');
            return;
        }
        if (!time || time <= 0) {
            showError('timeError');
            return;
            }
        if (!compound || compound <= 0) {
            showError('compoundError');
            return;
        }

        // Calculate interest
        const result = calculate(principal, rate, time, compound);

        // Display results
        resultPrincipal.textContent = '$' + result.principal.toFixed(2);
        resultInterest.textContent = '$' + result.interest.toFixed(2);
        resultTotal.textContent = '$' + result.total.toFixed(2);

        resultDiv.classList.add('show');
    } catch (error) {
        console.error('Calculation error:', error);
        alert('Error: ' + error.message);
    }
});
}

// Helper function to show error message
function showError(errorId) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.classList.add('show');
    }
}

// Helper function to clear all error messages
function clearErrors() {
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => {
        error.classList.remove('show');
    });
}

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculate };
}
