const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = ""; // Keeps track of the number being entered
let operator = null; // Stores the current operator
let firstOperand = null; // First operand for the calculation

// Add event listeners to all buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;

    // Clear button logic
    if (button.id === "clear") {
      resetCalculator();
      return;
    }

    // Equals button logic
    if (button.id === "equals") {
      if (firstOperand !== null && operator !== null && currentInput !== "") {
        const result = calculate(
          firstOperand,
          parseFloat(currentInput),
          operator
        );
        updateDisplay(result);
        firstOperand = null;
        operator = null;
        currentInput = ""; // Reset current input
      }
      return;
    }

    // Handle operators
    if (["+", "-", "*", "/"].includes(value)) {
      if (currentInput !== "") {
        if (firstOperand === null) {
          firstOperand = parseFloat(currentInput);
        } else if (operator !== null) {
          firstOperand = calculate(
            firstOperand,
            parseFloat(currentInput),
            operator
          );
        }
      }
      operator = value;
      currentInput = ""; // Reset input after operator
      updateDisplay(firstOperand);
      return;
    }

    // Handle number and decimal input
    if (value === "." && currentInput.includes(".")) return; // Prevent multiple dots
    currentInput += value;
    updateDisplay(currentInput);
  });
});

// Function to reset the calculator
function resetCalculator() {
  currentInput = "";
  operator = null;
  firstOperand = null;
  updateDisplay("0");
}

// Function to update the display
function updateDisplay(value) {
  display.textContent = value.toString().slice(0, 10); // Limit display length
}

// Function to perform calculations
function calculate(a, b, op) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b !== 0 ? a / b : "Error"; // Handle division by zero
    default:
      return 0;
  }
}
