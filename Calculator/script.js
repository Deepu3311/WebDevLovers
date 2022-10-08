// Selects and stores all html elements.

const numbersBtn = document.querySelectorAll('.number');
const operatorsBtn = document.querySelectorAll('.operator');
const equalsBtn = document.querySelector('#equals');
const clearBtn = document.querySelector('#clear');
const deleteBtn = document.querySelector('#delete');

const outputDisplay = document.querySelector('.output');
const historyDisplay = document.querySelector('.history');

// Declares some variables to be used later.

let operand1 = '',
  operand2 = '';
let operation = null;
isSecondOperand = false;

// Adds functionality to all number buttons.

numbersBtn.forEach(numberBtn => {
  numberBtn.addEventListener('click', appendNumber);
});

function appendNumber(e) {
  if (checkPoint(outputDisplay.textContent) && e.target.textContent == '.')
    return;
  if (outputDisplay.textContent == '0') {
    if (e.target.textContent == '.') {
      outputDisplay.textContent += e.target.textContent;
    } else {
      outputDisplay.textContent = e.target.textContent;
    }
  } else outputDisplay.textContent += e.target.textContent;
}

// Adds functionality to all operator buttons.

operatorsBtn.forEach(operatorBtn => {
  operatorBtn.addEventListener('click', e => {
    setOperand();
    historyDisplay.textContent =
      evaluate(operand1, operand2, operation) + ' ' + e.target.textContent;
    operand1 = evaluate(operand1, operand2, operation);
    outputDisplay.textContent = '0';
    isSecondOperand = true;
    operation = e.target.textContent;
  });
});

// Adds keyboard support to all numbers and operations.

window.addEventListener('keydown', appendKey);

function appendKey(e) {
  if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(e.key)) {
    if (checkPoint(outputDisplay.textContent) && e.key == '.') return;
    if (outputDisplay.textContent == '0') {
      if (e.key == '.') {
        outputDisplay.textContent += e.key;
      } else {
        outputDisplay.textContent = e.key;
      }
    } else outputDisplay.textContent += e.key;
  } else if (e.key == '+' || e.key == '-' || e.key == '^') {
    setOperand();
    historyDisplay.textContent =
      evaluate(operand1, operand2, operation) + ' ' + e.key;
    operand1 = evaluate(operand1, operand2, operation);
    outputDisplay.textContent = '0';
    isSecondOperand = true;
    operation = e.key;
  } else if (e.key == '*') {
    setOperand();
    historyDisplay.textContent =
      evaluate(operand1, operand2, operation) + ' ' + '×';
    operand1 = evaluate(operand1, operand2, operation);
    outputDisplay.textContent = '0';
    isSecondOperand = true;
    operation = '×';
  } else if (e.key == '/') {
    setOperand();
    historyDisplay.textContent =
      evaluate(operand1, operand2, operation) + ' ' + '÷';
    operand1 = evaluate(operand1, operand2, operation);
    outputDisplay.textContent = '0';
    isSecondOperand = true;
    operation = '÷';
  } else if (e.key == '=' || e.key == 'Enter') {
    equals();
  } else if (e.key == 'c' || e.key == 'C') {
    clearDisplay();
  } else if (e.key == 'Backspace') {
    del();
  } else return;
}

// This function calls the appropriate function depending on the operator passed to it.

function evaluate(op1, op2, opn) {
  if (op2 == '' || opn == null) return op1;
  switch (opn) {
    case '+':
      return add(op1, op2);
    case '-':
      return subtract(op1, op2);
    case '×':
      return multiply(op1, op2);
    case '÷':
      return divide(op1, op2);
    case '^':
      return exponent(op1, op2);
    default:
      return;
  }
}

// Defines the add, subtract, multiply, divide and exponent function.

function add(a, b) {
  let c = parseFloat(a) + parseFloat(b);
  if (maxPrecision(a, b)) {
    return c.toFixed(maxPrecision(a, b));
  } else return c;
}

function subtract(a, b) {
  let c = parseFloat(a) - parseFloat(b);
  if (maxPrecision(a, b)) {
    return c.toFixed(maxPrecision(a, b));
  } else return c;
}

function multiply(a, b) {
  let c = parseFloat(a) * parseFloat(b);
  if (maxPrecision(a, b)) {
    return c.toFixed(maxPrecision(a, b));
  } else return c;
}

function divide(a, b) {
  if (b == '0') {
    alert('Division by 0 is not possible!');
    return;
  }
  let c = parseFloat(a) / parseFloat(b);
  if (maxPrecision(a, b)) {
    return c.toFixed(maxPrecision(a, b));
  } else return c.toFixed(3);
}

function exponent(a, b) {
  let c = a ** b;
  if (maxPrecision(a, b)) {
    return c.toFixed(maxPrecision(a, b));
  } else return c;
}

// Adds functionality to equals button.

equalsBtn.addEventListener('click', equals);

function equals() {
  setOperand();
  historyDisplay.textContent = `${operand1} ${operation} ${operand2}`;
  outputDisplay.textContent = evaluate(operand1, operand2, operation);
  isSecondOperand = false;
  operand1 = '';
  operand2 = '';
  operation = null;
}

// Adds functionality to C button.

clearBtn.addEventListener('click', clearDisplay);

function clearDisplay() {
  outputDisplay.textContent = '0';
  historyDisplay.textContent = '0';
  isSecondOperand = false;
  operand1 = '';
  operand2 = '';
  operation = null;
}

// Adds functionality to Del button.

deleteBtn.addEventListener('click', del);

function del() {
  let str = outputDisplay.textContent.toString().slice(0, -1);
  if (str === '') outputDisplay.textContent = '0';
  else outputDisplay.textContent = str;
}

// Helper functions.

function setOperand() {
  if (!isSecondOperand) {
    operand1 = outputDisplay.textContent;
  } else if (isSecondOperand) {
    if (outputDisplay.textContent == '0') {
      operand2 = '';
    } else operand2 = outputDisplay.textContent;
  }
}

function maxPrecision(a, b) {
  let a_arr = a.toString().split('.');
  let b_arr = b.toString().split('.');

  let decimal_a, decimal_b;

  if (a_arr.length == 1) {
    decimal_a = 0;
  } else {
    let c = a_arr[1].toString().split('');
    decimal_a = c.length;
  }

  if (b_arr.length == 1) {
    decimal_b = 0;
  } else {
    let d = b_arr[1].toString().split('');
    decimal_b = d.length;
  }

  return decimal_a > decimal_b ? decimal_a : decimal_b;
}

function checkPoint(str) {
  if (str.includes('.')) return true;
  else return false;
}
