const buttons = document.querySelectorAll(".row button");
const inputs = document.querySelectorAll('input[type=number]');

function round(n, f) {
  const m = 10 ** f;
  return Math.floor(n * m) / m;
}

function replace() {
  if (/(?<=\d{4})(\d+)/g.test(this.value)) {
    this.value = this.value.replace(/(?<=\d{4})(\d+)/g, '');
  }
}

inputs.forEach(input => input.addEventListener('input', replace));

function calculateResults(input1, input2, input3) {
  let result1 = 1000 / input2;
  let result2 = (input1 / 60) * result1;
  let result3 = result2 * input3;
  return [result1, result2, result3];
}

function displayResults(result1, result2, result3) {
  document.getElementById("inputResult1").value = round(result1, 2);
  document.getElementById("inputResult2").value = round(result2, 2);
  document.getElementById("inputResult3").value = round(result3, 2);
}

function resetFields() {
  inputs.forEach(input => input.value = "");
  document.querySelectorAll('input[id^="inputResult"]').forEach(input => input.value = "");
}

buttons.forEach(button => {
  button.addEventListener("click", (e) => {
    const key = e.target.innerHTML;
    let [input1, input2, input3] = Array.from(inputs).map(input => input.value);

    if (key === "Рассчитать") {
      const [result1, result2, result3] = calculateResults(input1, input2, input3);

      if (isNaN(result1) || result1 === Infinity || result1 === 0 ||
        isNaN(result2) || result2 === Infinity || result2 === 0 ||
        isNaN(result3) || result3 === Infinity || result3 === 0) {
        alert("Введите валидные данные");
        resetFields();
      } else {
        displayResults(result1, result2, result3);
      }
    } else if (key === "Сбросить") {
      resetFields();
    }
  });
});
