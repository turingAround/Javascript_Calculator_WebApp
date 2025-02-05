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

// Variables to store the calculator state
let displayValue = '0';
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;

// Function to update display
function updateDisplay() {
    const displayElement = document.querySelector('.display');
    displayElement.textContent = displayValue;
}

// Function to input numbers
function inputNumber(number) {
    if (waitingForSecondNumber) {
        displayValue = number;
        waitingForSecondNumber = false;
    } else {
        // If display is '0', replace it, otherwise append
        displayValue = displayValue === '0' ? number : displayValue + number;
    }
    updateDisplay();
}

// Function to handle operator input
function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (firstNumber === null) {
        firstNumber = inputValue;
    } else if (operator) {
        const result = operate(operator, firstNumber, inputValue);
        displayValue = String(result);
        firstNumber = result;
    }

    waitingForSecondNumber = true;
    operator = nextOperator;
    updateDisplay();
}

// Function to clear the calculator
function clearCalculator() {
    displayValue = '0';
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;
    updateDisplay();
}

// Event listeners for buttons
document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners for number buttons
    document.querySelectorAll('.buttons button').forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('operator')) {
                handleOperator(button.textContent);
            } else if (button.classList.contains('equals')) {
                if (operator && firstNumber !== null) {
                    const secondNumber = parseFloat(displayValue);
                    const result = operate(operator, firstNumber, secondNumber);
                    displayValue = String(result);
                    firstNumber = null;
                    operator = null;
                    waitingForSecondNumber = false;
                    updateDisplay();
                }
            } else if (button.classList.contains('clear')) {
                clearCalculator();
            } else {
                // It's a number or decimal point
                inputNumber(button.textContent);
            }
        });
    });
});
