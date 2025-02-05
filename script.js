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
        case '%':
            return Number(a) / 100;    
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
    document.querySelectorAll('.buttons button').forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('backspace')) {
                handleBackspace();
            } else if (button.textContent === '%') {
                inputPercentage();
            } else if (button.classList.contains('operator')) {
                handleOperator(button.textContent);
            } else if (button.classList.contains('equals')) {
                handleOperator('=');
            } else if (button.classList.contains('clear')) {
                clearCalculator();
            } else {
                inputNumber(button.textContent);
            }
        });
    });
});



// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (!isNaN(key) || key === '.') {
        inputNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        handleOperator(key === '*' ? '×' : key === '/' ? '÷' : key);
    } else if (key === 'Enter') {
        if (operator && firstNumber !== null) {
            const secondNumber = parseFloat(displayValue);
            const result = operate(operator, firstNumber, secondNumber);
            displayValue = String(result);
            firstNumber = null;
            operator = null;
            waitingForSecondNumber = false;
            updateDisplay();
        }
    } else if (key === 'Escape') {
        clearCalculator();
    }
});

// Multiple Operators
function handleMultipleOperators(numbers, operators) {
    // Make copies of arrays to avoid modifying originals
    let nums = [...numbers];
    let ops = [...operators];
    
    // First pass: handle multiplication and division
    for (let i = 0; i < ops.length; i++) {
        if (ops[i] === '×' || ops[i] === '÷') {
            // Perform operation
            const result = operate(ops[i], nums[i], nums[i + 1]);
            
            // Replace the two numbers with the result
            nums.splice(i, 2, result);
            // Remove the operator
            ops.splice(i, 1);
            // Move index back one since we removed an operator
            i--;
        }
    }
    
    // Second pass: handle addition and subtraction
    while (ops.length > 0) {
        const result = operate(ops[0], nums[0], nums[1]);
        nums.splice(0, 2, result);
        ops.splice(0, 1);
    }
    
    return nums[0]; // Final result
}

// Modified handleOperator function to work with multiple operators
let numbers = [];
let operators = [];

function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (nextOperator === '=') {
        if (numbers.length === 0) {
            numbers.push(inputValue);
        } else {
            numbers.push(inputValue);
            const result = handleMultipleOperators(numbers, operators);
            displayValue = String(result);
            numbers = [];
            operators = [];
        }
    } else {
        if (numbers.length === 0) {
            numbers.push(inputValue);
        } else {
            numbers.push(inputValue);
        }
        operators.push(nextOperator);
    }
    
    waitingForSecondNumber = true;
    updateDisplay();
}

// Modified clear function to reset arrays
function clearCalculator() {
    displayValue = '0';
    numbers = [];
    operators = [];
    waitingForSecondNumber = false;
    updateDisplay();
}

// Decimal support
// Function to input numbers
function inputNumber(number) {
    // Check for multiple decimals
    if (number === '.' && displayValue.includes('.')) {
        displayValue = "Error: Multiple decimals";
        updateDisplay();
        setTimeout(() => {
            displayValue = '0';
            updateDisplay();
        }, 1000);
        return;
    }

    if (waitingForSecondNumber) {
        displayValue = number;
        waitingForSecondNumber = false;
    } else {
        // If display is '0', replace it, otherwise append
        displayValue = displayValue === '0' ? number : displayValue + number;
    }
    updateDisplay();
}

// Add a dedicated decimal function for better control
function inputDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
    }
}

// Function for Percentage
function inputPercentage() {
    const inputValue = parseFloat(displayValue);
    
    if (!isNaN(inputValue)) {
        if (firstNumber !== null && operator) {
            // If we're in the middle of an operation, calculate percentage of the first number
            const result = operate('%', firstNumber, inputValue);
            displayValue = String(result);
        } else {
            // Just convert the current number to a percentage
            displayValue = String(inputValue / 100);
        }
        updateDisplay();
    }
}

//Function to handle backspace
function handleBackspace() {
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = '0';
    }
    updateDisplay();
}
