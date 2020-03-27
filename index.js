function onlyNumbers(keyinput) {
  let input = keyinput.charCode ? keyinput.charCode : keyinput.keyCode;
  // если не цифра и удаление
  // 8 backspace, 46 delete, 109 subtract, 110 decimal, 188 comma, 189 dash, 190 period
  if (input != 8 && input != 46) {
    if (input < 48 || input > 57) {
      return false;
    }
  }
}

function createOptions() {
  let select = document.getElementById("percentage");
  for (let i = 0; i <= 100; i++) {
    let node = document.createElement("option");
    node.innerHTML = i;
    node.setAttribute("value", i);
    node.setAttribute("class", "percent");
    select.appendChild(node);
  }
}
createOptions();


function toCalculate(startingbalance, payment, interestrate, days) {
  let months = days / 30;
  for (i = 1; i <= months; i++) {
    startingbalance += (startingbalance * interestrate) / 1200;
    startingbalance += payment;
  }
  return startingbalance.toFixed(0);
}
function mySavings() {
  // обнуление результата валидатора
  document.getElementById("balanceError").innerHTML = "";
  document.getElementById("paymentError").innerHTML = "";
  document.getElementById("rateError").innerHTML = "";
  document.getElementById("MonthsError").innerHTML = "";
  if (
    // проверка валидности
    document.savingscalc.balance.value == null ||
    document.savingscalc.balance.value.length == 0 ||
    isNaN(document.savingscalc.balance.value) == true
  ) {
    document.getElementById("finalBalance").innerHTML =
      "Please enter the missing information.";
  } else if (
    document.savingscalc.payment.value == null ||
    document.savingscalc.payment.value.length == 0 ||
    isNaN(document.savingscalc.payment.value) == true
  ) {
    document.getElementById("finalBalance").innerHTML =
      "Please enter the missing information.";
  } else if (
    document.savingscalc.rate.value == null ||
    document.savingscalc.rate.value.length == 0 ||
    isNaN(document.savingscalc.rate.value) == true
  ) {
    document.getElementById("finalBalance").innerHTML =
      "Please enter the missing information.";
  } else if (
    document.savingscalc.Months.value == null ||
    document.savingscalc.Months.value.length == 0 ||
    isNaN(document.savingscalc.Months.value) == true
  ) {
    document.getElementById("finalBalance").innerHTML =
      "Please enter the missing information.";
  } else {
    let startingbalance = +document.savingscalc.balance.value;
    let payment = +document.savingscalc.payment.value;
    let interestrate = +document.savingscalc.rate.value;
    let days = +document.savingscalc.Months.value;
    let result = toCalculate(startingbalance, payment, interestrate, days);
    document.getElementById(
      "finalBalance"
    ).innerHTML = `your final balance: <b>${result}</b>  AZN`; // калькуляция и выдача баланса
  }
}


