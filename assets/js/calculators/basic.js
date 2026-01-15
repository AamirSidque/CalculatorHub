const display = document.getElementById('display');
const keys = document.querySelector('.keys');

let expression = '';

keys.addEventListener('click', e => {
  if (!e.target.matches('button')) return;

  const value = e.target.textContent;

  if (value === 'C') {
    expression = '';
    display.textContent = '0';
    return;
  }

  if (value === '=') {
    try {
      const result = Function(`"use strict"; return (${expression})`)();
      display.textContent = result;
      expression = result.toString();
    } catch {
      display.textContent = 'Error';
      expression = '';
    }
    return;
  }

  expression += value;
  display.textContent = expression;
});
