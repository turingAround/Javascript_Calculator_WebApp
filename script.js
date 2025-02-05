// Basic arithmetic functions
function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return Number(a) - Number(b);
}

function multiply(a, b) {
    return Number(a) * Number(b);
}

function divide(a, b) {
    if (b === 0) {
        return "Error: Cannot divide by zero";
    }
    return Number(a) / Number(b);
}

// Operator function that takes an operator and two numbers
function operate(operator, a, b) {
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '×':
        case '*':
            return multiply(a, b);
        case '÷':
        case '/':
            return divide(a, b);
        default:
            return "Error: Invalid operator";
    }
}
