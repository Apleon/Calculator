require('./style.css');

document.addEventListener('DOMContentLoaded', function () {
  const result = document.getElementById('result');
  const buttons = document.querySelectorAll('.buttons button');

  let currentInput = '';
  let operator = null;
  let previousValue = 0;

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const buttonText = button.textContent;

      if (button.classList.contains('number')) {
        if (buttonText === '.' && currentInput.includes('.')) {
          return;
        }
        if (currentInput === '0' && buttonText === '0') {
          return;
        }
        if (currentInput === '0' && buttonText !== '.') {
          currentInput = buttonText;
        } else {
          currentInput += buttonText;
        }
        updateDisplay();
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
        updateDisplay();
        break;
      case '+/-':
        if (currentInput) {
          currentInput = (parseFloat(currentInput) * -1).toString();
          updateDisplay();
        }
        break;
      case '%':
        if (operator && previousValue !== 0) {
          let currentValue = parseFloat(currentInput);
          if (!isNaN(currentValue)) {
            currentInput = ((previousValue / 100) * currentValue).toString();
            updateDisplay();
          }
        } else if (currentInput) {
          currentInput = (parseFloat(currentInput) / 100).toString();
          updateDisplay();
        }
        break;
      case '=':
        calculate();
        break;
      default:
        if (operator && currentInput) {
          calculate();
        }
        if (currentInput || previousValue !== 0) {
          operator = buttonText;
          if (currentInput) {
            previousValue = parseFloat(currentInput);
          }
          currentInput = '';
        }
        break;
    }
  }

  function calculate() {
    if (operator === null || !currentInput) return;

    let currentValue = parseFloat(currentInput);
    let finalResult = 0;

    if (operator === '/' && currentValue === 0) {
      result.textContent = 'Error';
      currentInput = '';
      operator = null;
      previousValue = 0;
      result.style.fontSize = '40px';
      return;
    }

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
      default:
        return;
    }

    currentInput = finalResult.toString();
    updateDisplay();
    operator = null;
    previousValue = finalResult;
  }

  function updateDisplay() {
    const initialFontSize = 67;
    const minFontSize = 10;
    const displayElement = result.parentElement;

    if (!displayElement) {
      console.error('Не найден родительский элемент для #result (.display)');
      result.textContent = currentInput || '0';
      return;
    }

    const displayWidth = displayElement.clientWidth;
    const safetyMargin = Math.max(1, displayWidth * 0.005);
    const targetWidth = displayWidth - safetyMargin;

    result.textContent = currentInput || '0';
    result.style.fontSize = initialFontSize + 'px';

    const currentScrollWidth = result.scrollWidth;

    if (
      currentScrollWidth > targetWidth &&
      currentInput &&
      currentInput.length > 0
    ) {
      let scaleRatio = targetWidth / currentScrollWidth;
      let newFontSize = Math.floor(initialFontSize * scaleRatio);
      newFontSize = Math.max(minFontSize, newFontSize);
      result.style.fontSize = newFontSize + 'px';
    }
  }

  document.addEventListener('keydown', function (event) {
    const key = event.key;

    if (key === 'Backspace') {
      event.preventDefault();
      currentInput = currentInput.slice(0, -1);
      updateDisplay();
    } else if (key >= '0' && key <= '9') {
      if (currentInput === '0' && key === '0') return;
      if (currentInput === '0') {
        currentInput = key;
      } else {
        currentInput += key;
      }
      updateDisplay();
    } else if (key === '.' || key === ',') {
      if (!currentInput.includes('.')) {
        if (currentInput === '') {
          currentInput = '0.';
        } else {
          currentInput += '.';
        }
        updateDisplay();
      }
    } else if (key === 'Enter') {
      event.preventDefault();
      calculate();
    } else if (['+', '-', '*', '/'].includes(key)) {
      event.preventDefault();
      handleOperatorClick(key);
    } else if (key === 'Escape') {
      handleOperatorClick('AC');
    }
  });
});
