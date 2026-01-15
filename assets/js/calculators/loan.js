const amountEl = document.getElementById("amount");
const rateEl = document.getElementById("rate");
const yearsEl = document.getElementById("years");

const emiEl = document.getElementById("emi");
const interestEl = document.getElementById("interest");
const totalEl = document.getElementById("total");

const tableBody = document.querySelector("#amortizationTable tbody");

document.getElementById("calculate").addEventListener("click", () => {
  const P = parseFloat(amountEl.value);
  const annualRate = parseFloat(rateEl.value);
  const years = parseInt(yearsEl.value, 10);

  if (!P || !annualRate || !years) return;

  const r = annualRate / 12 / 100;
  const n = years * 12;

  const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  let balance = P;
  let totalInterest = 0;

  tableBody.innerHTML = "";

  for (let month = 1; month <= n; month++) {
    const interest = balance * r;
    const principal = emi - interest;
    balance -= principal;

    totalInterest += interest;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${month}</td>
      <td>${emi.toFixed(2)}</td>
      <td>${principal.toFixed(2)}</td>
      <td>${interest.toFixed(2)}</td>
      <td>${balance > 0 ? balance.toFixed(2) : "0.00"}</td>
    `;
    tableBody.appendChild(row);
  }

  emiEl.textContent = emi.toFixed(2);
  interestEl.textContent = totalInterest.toFixed(2);
  totalEl.textContent = (P + totalInterest).toFixed(2);
});
