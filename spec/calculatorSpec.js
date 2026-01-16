// Test specs for Interest Rate Calculator

// Load the calculate function
const { calculate } = require('../script.js');

describe('Interest Rate Calculator', function() {
    
    describe('calculate function', function() {
        
        it('should calculate simple interest correctly', function() {
            // Principal: $1000, Rate: 5%, Time: 2 years, Compounded Annually
            const result = calculate(1000, 5, 2, 1);
            
            expect(result.principal).toBe(1000);
            expect(result.interest).toBeCloseTo(102.5, 1);
            expect(result.total).toBeCloseTo(1102.5, 1);
        });
        
        it('should handle different compounding frequencies', function() {
            // Principal: $2000, Rate: 10%, Time: 1 year, Compounded Monthly
            const result = calculate(2000, 10, 1, 12);
            
            expect(result.principal).toBe(2000);
            expect(result.total).toBeCloseTo(2209.43, 1);
            expect(result.interest).toBeCloseTo(209.43, 1);
        });
    });
});
