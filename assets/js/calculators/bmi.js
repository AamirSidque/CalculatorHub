document.getElementById("calculateBMI").addEventListener("click", () => {
  const unit = document.getElementById("unit").value;
  let weight = parseFloat(document.getElementById("weight").value);
  let height = parseFloat(document.getElementById("height").value);

  if (!weight || !height) return;

  let bmi;

  if (unit === "metric") {
    height = height / 100;
    bmi = weight / (height * height);
  } else {
    bmi = (weight / (height * height)) * 703;
  }

  bmi = bmi.toFixed(2);

  let category;
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal weight";
  else if (bmi < 30) category = "Overweight";
  else category = "Obese";

  document.getElementById("bmiValue").textContent = bmi;
  document.getElementById("bmiCategory").textContent = category;
});
