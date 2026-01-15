const display = document.getElementById("display");
const keys = document.querySelector(".keys");
const degBtn = document.getElementById("degBtn");
const radBtn = document.getElementById("radBtn");

let expr = "";
let memory = 0;
let isDegree = true;

const toRad = x => (isDegree ? x * Math.PI / 180 : x);
const fromRad = x => (isDegree ? x * 180 / Math.PI : x);

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

const fns = {
  sin: x => Math.sin(toRad(x)),
  cos: x => Math.cos(toRad(x)),
  tan: x => Math.tan(toRad(x)),
  asin: x => fromRad(Math.asin(x)),
  acos: x => fromRad(Math.acos(x)),
  atan: x => fromRad(Math.atan(x)),
  log: x => Math.log10(x),
  ln: x => Math.log(x),
  sqrt: x => Math.sqrt(x),
  cbrt: x => Math.cbrt(x),
  square: x => x * x,
  exp: x => Math.exp(x),
  tenpow: x => Math.pow(10, x)
};

keys.addEventListener("click", e => {
  const b = e.target;
  if (!b.matches("button")) return;

  if (b.id === "clear") {
    expr = "";
    display.textContent = "0";
    return;
  }

  if (b.id === "back") {
    expr = expr.slice(0, -1);
    display.textContent = expr || "0";
    return;
  }

  if (b.dataset.mem) {
    const val = parseFloat(display.textContent) || 0;
    if (b.dataset.mem === "MC") memory = 0;
    if (b.dataset.mem === "MR") expr += memory;
    if (b.dataset.mem === "M+") memory += val;
    if (b.dataset.mem === "M-") memory -= val;
    display.textContent = expr || memory;
    return;
  }

  if (b.dataset.const) {
    expr += b.dataset.const === "pi" ? Math.PI : Math.E;
    display.textContent = expr;
    return;
  }

  if (b.dataset.fn) {
    try {
      const val = parseFloat(expr);
      const result = fns[b.dataset.fn](val);
      expr = result.toString();
      display.textContent = expr;
    } catch {
      display.textContent = "Error";
      expr = "";
    }
    return;
  }

  if (b.textContent === "=") {
    try {
      const safe = expr
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-");
      const result = Function(`"use strict";return (${safe})`)();
      expr = result.toString();
      display.textContent = expr;
    } catch {
      display.textContent = "Error";
      expr = "";
    }
    return;
  }

  expr += b.textContent;
  display.textContent = expr;
});
