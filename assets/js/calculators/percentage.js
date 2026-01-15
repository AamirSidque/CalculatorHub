document.getElementById("calculate").addEventListener("click", () => {
  const a = parseFloat(document.getElementById("valueA").value);
  const b = parseFloat(document.getElementById("valueB").value);
  const type = document.getElementById("type").value;
  const resultEl = document.getElementById("result");

  if (isNaN(a) || isNaN(b)) {
    resultEl.textContent = "Invalid input";
    return;
  }

  let result;

  switch (type) {
    case "percentOf":
      result = (a * b) / 100;
      resultEl.textContent = `${result.toFixed(2)}`;
      break;

    case "increase":
      result = ((b - a) / a) * 100;
      resultEl.textContent = `${result.toFixed(2)}% increase`;
      break;

    case "decrease":
      result = ((a - b) / a) * 100;
      resultEl.textContent = `${result.toFixed(2)}% decrease`;
      break;

    case "difference":
      result = (Math.abs(a - b) / ((a + b) / 2)) * 100;
      resultEl.textContent = `${result.toFixed(2)}% difference`;
      break;

    case "reverse":
      result = a / (1 + b / 100);
      resultEl.textContent = `${result.toFixed(2)} original value`;
      break;
  }
});
