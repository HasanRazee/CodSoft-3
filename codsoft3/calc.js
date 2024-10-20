const display = document.getElementById('display');
let currentValue = '';
let previousValue = '';
let operator = '';

const clearDisplay = () => {
  currentValue = '';
  previousValue = '';
  operator = '';
  display.innerText = '0';
};

const deleteLast = () => {
  currentValue = currentValue.slice(0, -1);
  display.innerText = currentValue || '0';
};

const appendNumber = (num) => {
  if (num === '.' && currentValue.includes('.')) return;
  currentValue += num;
  display.innerText = currentValue;
};

const chooseOperator = (op) => {
  if (currentValue === '') return;
  if (previousValue !== '') calculate();
  operator = op;
  previousValue = currentValue;
  currentValue = '';
};

const calculate = () => {
  let result;
  const prev = parseFloat(previousValue);
  const curr = parseFloat(currentValue);
  
  if (isNaN(prev) || isNaN(curr)) return;

  switch (operator) {
    case '+':
      result = prev + curr;
      break;
    case '-':
      result = prev - curr;
      break;
    case '*':
      result = prev * curr;
      break;
    case '/':
      result = prev / curr;
      break;
    default:
      return;
  }

  currentValue = result;
  operator = '';
  previousValue = '';
  display.innerText = result;
};

document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', (e) => {
    const value = e.target.innerText;

    switch (value) {
      case 'C':
        clearDisplay();
        break;
      case 'DEL':
        deleteLast();
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        chooseOperator(value);
        break;
      case '=':
        calculate();
        break;
      case '00':
        appendNumber('00');
        break;
      default:
        appendNumber(value);
    }
  });
});