const display = document.getElementById('display');
const keys = document.querySelector('.keys');

let value = '';

const functions = {
  sin: x => Math.sin(x),
  cos: x => Math.cos(x),
  tan: x => Math.tan(x),
  log: x => Math.log10(x),
  sqrt: x => Math.sqrt(x),
  pow: x => Math.pow(x, 2),
  pi: () => Math.PI
};

keys.addEventListener('click', e => {
  const btn = e.target;

  if (!btn.matches('button')) return;

  if (btn.id === 'clear') {
    value = '';
    display.textContent = '0';
    return;
  }

  if (btn.dataset.fn) {
    try {
      const num = parseFloat(value);
      const result = functions[btn.dataset.fn](num);
      value = result.toString();
      display.textContent = value;
    } catch {
      display.textContent = 'Error';
      value = '';
    }
    return;
  }

  if (btn.textContent === '=') {
    try {
      const result = Function(`"use strict";return (${value})`)();
      value = result.toString();
      display.textContent = value;
    } catch {
      display.textContent = 'Error';
      value = '';
    }
    return;
  }

  value += btn.textContent;
  display.textContent = value;
});
