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
  const result1 = 1000 / input2;
  const result2 = (input1 / 60) * result1;
  const result3 = result2 * input3;
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

function validateInputs(input1, input2, input3) {
  return ![input1, input2, input3].some(input => isNaN(input) || input === '' || input === 0);
}

buttons.forEach(button => {
  button.addEventListener("click", (e) => {
    const key = e.target.innerHTML;
    let [input1, input2, input3] = Array.from(inputs).map(input => parseFloat(input.value));

    if (key === "Рассчитать") {
      if (validateInputs(input1, input2, input3)) {
        const [result1, result2, result3] = calculateResults(input1, input2, input3);
        displayResults(result1, result2, result3);
      } else {
        alert("Введите валидные данные");
      }
    } else if (key === "Сбросить") {
      resetFields();
    }
  });
});