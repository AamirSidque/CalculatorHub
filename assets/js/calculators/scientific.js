const display = document.getElementById("display");
const buttons = document.querySelectorAll(".keys button");
const degBtn = document.getElementById("deg");
const radBtn = document.getElementById("rad");

let expr = "";
let memory = 0;
let isDegree = true;
let awaitingPower = false;

const toRad = v => isDegree ? v * Math.PI / 180 : v;
const fromRad = v => isDegree ? v * 180 / Math.PI : v;

degBtn.onclick = () => {
  isDegree = true;
  degBtn.classList.add("active");
  radBtn.classList.remove("active");
};

radBtn.onclick = () => {
  isDegree = false;
  radBtn.classList.add("active");
  degBtn.classList.remove("active");
};

function calculate(fn, v) {
  switch (fn) {
    case "sin": return Math.sin(toRad(v));
    case "cos": return Math.cos(toRad(v));
    case "tan": return Math.tan(toRad(v));
    case "asin": return fromRad(Math.asin(v));
    case "acos": return fromRad(Math.acos(v));
    case "atan": return fromRad(Math.atan(v));
    case "log": return Math.log10(v);
    case "ln": return Math.log(v);
    case "square": return v * v;
    case "sqrt": return Math.sqrt(v);
    case "inv": return 1 / v;
  }
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => handleInput(btn));
});

function handleInput(btn) {
  const text = btn.textContent;

  if (btn.dataset.mem) {
    const val = parseFloat(display.textContent) || 0;
    if (btn.dataset.mem === "MC") memory = 0;
    if (btn.dataset.mem === "MR") expr += memory;
    if (btn.dataset.mem === "M+") memory += val;
    if (btn.dataset.mem === "M-") memory -= val;
    display.textContent = expr || memory;
    return;
  }

  if (btn.dataset.fn) {
    const val = parseFloat(display.textContent);
    if (btn.dataset.fn === "pow") {
      awaitingPower = true;
      expr = val + "**";
      display.textContent = expr;
      return;
    }
    const res = calculate(btn.dataset.fn, val);
    expr = res.toString();
    display.textContent = expr;
    return;
  }

  if (btn.id === "clear") {
    expr = "";
    display.textContent = "0";
    return;
  }

  if (btn.id === "back") {
    expr = expr.slice(0, -1);
    display.textContent = expr || "0";
    return;
  }

  if (btn.id === "equals") {
    try {
      const safe = expr
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-");
      const res = Function(`"use strict";return (${safe})`)();
      expr = res.toString();
      display.textContent = expr;
    } catch {
      display.textContent = "Error";
      expr = "";
    }
    return;
  }

  expr += text;
  display.textContent = expr;
}
document.addEventListener("keydown", e => {
  if (/[0-9.]/.test(e.key)) append(e.key);
  if (["+", "-", "*", "/"].includes(e.key)) append(e.key);
  if (e.key === "Enter") document.getElementById("equals").click();
  if (e.key === "Backspace") document.getElementById("back").click();
  if (e.key === "Escape") document.getElementById("clear").click();
});

function append(val) {
  expr += val;
  display.textContent = expr;
}
