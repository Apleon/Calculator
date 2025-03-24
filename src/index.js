const result = document.getElementById('result');
const buttons = document.querySelectorAll('.buttons button');
const themeToggle = document.getElementById('theme-toggle');
const themeLink = document.getElementById('theme-link');

let currentInput = '';
let operator = null;
let previousValue = 0;

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const buttonText = button.textContent;

    if (button.classList.contains('number')) {
      currentInput += buttonText;
      result.textContent = currentInput;
    } else if (button.classList.contains('operator')) {
      handleOperatorClick(buttonText);
    }
  });
});

function handleOperatorClick(buttonText) {
  switch (buttonText) {
    case 'AC':
      currentInput = '';
      operator = null;
      previousValue = 0;
      result.textContent = '0';
      break;
    case '+/-':
      currentInput = (parseFloat(currentInput) * -1).toString();
      result.textContent = currentInput;
      break;
    case '=':
      calculate();
      break;
    default:
      operator = buttonText;
      previousValue = parseFloat(currentInput);
      currentInput = '';
      break;
  }
}

function calculate() {
  if (operator === null) return;

  let currentValue = parseFloat(currentInput);
  let finalResult = 0;

  switch (operator) {
    case '+':
      finalResult = previousValue + currentValue;
      break;
    case '-':
      finalResult = previousValue - currentValue;
      break;
    case '*':
      finalResult = previousValue * currentValue;
      break;
    case '/':
      finalResult = previousValue / currentValue;
      break;
    case '%':
      finalResult = (previousValue / 100) * currentValue;
      break;
    default:
      return;
  }

  currentInput = finalResult.toString();
  result.textContent = currentInput;
  operator = null;
  previousValue = finalResult;
}

themeToggle.addEventListener('click', () => {
  const currentTheme = themeLink.getAttribute('href');
  if (currentTheme === 'light-theme.css') {
    themeLink.setAttribute('href', 'dark-theme.css');
  } else {
    themeLink.setAttribute('href', 'light-theme.css');
  }
});

adfsdfsdf;
