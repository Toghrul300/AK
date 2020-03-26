function onlyNumbers(keyinput) {
  let input = keyinput.charCode ? keyinput.charCode : keyinput.keyCode;
  // если не цифра и удаление
  if (input != 8 && input != 46) {
    if (input < 48 || input > 57) {
      return false;
    }
  }
}
function mySavings() {
  // обнуляй эррор
  document.getElementById("balanceError").innerHTML = "";
  document.getElementById("paymentError").innerHTML = "";
  // добавил пеймент
  document.getElementById("rateError").innerHTML = "";
  document.getElementById("MonthsError").innerHTML = "";

  // let checkBalance = document.savingscalc.balance.value;
  // проверка валидности
  if (
    document.savingscalc.balance.value == null ||
    document.savingscalc.balance.value.length == 0 ||
    isNaN(document.savingscalc.balance.value) == true
  ) {
    document.getElementById("finalBalance").innerHTML =
      "Please enter the missing information.";
    document.getElementById("balanceError").innerHTML =
      "Numeric value required. Example: 10000";
  } else if (
    document.savingscalc.payment.value == null ||
    document.savingscalc.payment.value.length == 0 ||
    isNaN(document.savingscalc.payment.value) == true
  ) {
    document.getElementById("payment").innerHTML =
      "Please enter the missing information.";
    document.getElementById("paymentError").innerHTML =
      "Numeric value required. Example: 10000";
  } else if (
    document.savingscalc.rate.value == null ||
    document.savingscalc.rate.value.length == 0 ||
    isNaN(document.savingscalc.rate.value) == true
  ) {
    document.getElementById("finalBalance").innerHTML =
      "Please enter the missing information.";
    document.getElementById("rateError").innerHTML =
      "Numeric value required. Example: 3.5";
  } else if (
    document.savingscalc.Months.value == null ||
    document.savingscalc.Months.value.length == 0 ||
    isNaN(document.savingscalc.Months.value) == true
  ) {
    document.getElementById("finalBalance").innerHTML =
      "Please enter the missing information.";
    document.getElementById("MonthsError").innerHTML =
      "Numeric value required. Example: 10";
  } else {
    function toCalculate(startingbalance, payment, interestrate, days) {
      let months = days / 30;
      let result = 0;
      for (i = 1; i < months; i++) {
        startingbalance += (startingbalance * interestrate) / 1200;
        startingbalance += payment;
      }
      result = startingbalance;
      return result.toFixed(2);
    }
    // задать переменные данных
    let startingbalance = +document.savingscalc.balance.value;
    let payment = +document.savingscalc.payment.value;
    let interestrate = +document.savingscalc.rate.value;
    let days = +document.savingscalc.Months.value;
    let result = toCalculate(startingbalance, payment, interestrate, days);
    // калькуляция и выдача баланса
    document.getElementById(
      "finalBalance"
    ).innerHTML = `Final Balance: ${result}`;
  }
}

function mySavingsReset() {
  // ресет всех полей
  document.getElementById("finalBalance").innerHTML = "Values reset";
  document.getElementById("balanceError").innerHTML = "";
  document.getElementById("rateError").innerHTML = "";
  document.getElementById("MonthsError").innerHTML = "";
  document.savingscalc.balance.value = null;
  document.savingscalc.rate.value = null;
  document.savingscalc.Months.value = null;
  document.savingscalc.payment.value = null;
}
