const categories = {
  Length: {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    millimeter: 0.001,
    mile: 1609.344,
    yard: 0.9144,
    foot: 0.3048,
    inch: 0.0254
  },
  Mass: {
    kilogram: 1,
    gram: 0.001,
    milligram: 0.000001,
    pound: 0.45359237,
    ounce: 0.0283495,
    ton: 1000
  },
  Volume: {
    liter: 1,
    milliliter: 0.001,
    cubic_meter: 1000,
    gallon: 3.78541,
    quart: 0.946353,
    pint: 0.473176
  },
  Temperature: {
    celsius: "c",
    fahrenheit: "f",
    kelvin: "k"
  },
  Data: {
    bit: 1,
    byte: 8,
    kilobyte: 8192,
    megabyte: 8388608,
    gigabyte: 8589934592,
    terabyte: 8796093022208
  },
  Speed: {
    mps: 1,
    kmph: 0.277778,
    mph: 0.44704,
    knot: 0.514444
  }
};

const categoryEl = document.getElementById("category");
const fromEl = document.getElementById("fromUnit");
const toEl = document.getElementById("toUnit");
const inputEl = document.getElementById("inputValue");
const resultEl = document.getElementById("result");

Object.keys(categories).forEach(cat => {
  categoryEl.innerHTML += `<option value="${cat}">${cat}</option>`;
});

categoryEl.onchange = () => {
  const units = categories[categoryEl.value];
  fromEl.innerHTML = toEl.innerHTML = "";
  Object.keys(units).forEach(u => {
    fromEl.innerHTML += `<option value="${u}">${u}</option>`;
    toEl.innerHTML += `<option value="${u}">${u}</option>`;
  });
};

categoryEl.dispatchEvent(new Event("change"));

document.getElementById("convert").onclick = () => {
  const val = parseFloat(inputEl.value);
  const cat = categoryEl.value;

  if (cat === "Temperature") {
    convertTemp(val);
    return;
  }

  const base = val * categories[cat][fromEl.value];
  const res = base / categories[cat][toEl.value];
  resultEl.textContent = res.toFixed(6);
};

function convertTemp(v) {
  let c;
  if (fromEl.value === "fahrenheit") c = (v - 32) * 5/9;
  if (fromEl.value === "kelvin") c = v - 273.15;
  if (fromEl.value === "celsius") c = v;

  let r;
  if (toEl.value === "fahrenheit") r = (c * 9/5) + 32;
  if (toEl.value === "kelvin") r = c + 273.15;
  if (toEl.value === "celsius") r = c;

  resultEl.textContent = r.toFixed(2);
}
