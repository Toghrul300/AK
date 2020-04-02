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
  let select = document.getElementById("period");
  for (let i = 0; i <= 1000; i++) {
    let node = document.createElement("option");
    node.innerHTML = i;
    node.setAttribute("value", i);
    node.setAttribute("class", "period");
    select.appendChild(node);
  }
}
createOptions();
class Deposit {
  constructor(firstAmount, mounthlyAmount, period, typeCurrency) {
    this.firstAmount = firstAmount;
    this.mounthlyAmount = mounthlyAmount;
    this.period = period;
    this.typeCurrency = typeCurrency;
  }
  checkAllFunction() {
    document.getElementById("start-amountError").innerHTML = "";
    document.getElementById("mounthlyAmountError").innerHTML = "";
    document.getElementById("monthsError").innerHTML = "";
    if (
      document.savingscalc.balance.value == null ||
      document.savingscalc.balance.value.length == 0 ||
      isNaN(document.savingscalc.balance.value) == true
    ) {
      document.getElementById("finalBalance").innerHTML =
        "Please enter the missing information.";
    } else if (
      document.savingscalc.mounthlyAmount.value == null ||
      document.savingscalc.mounthlyAmount.value.length == 0 ||
      isNaN(document.savingscalc.mounthlyAmount.value) == true
    ) {
      document.getElementById("finalBalance").innerHTML =
        "Please enter the missing information.";
    } else if (
      document.savingscalc.months.value == null ||
      document.savingscalc.months.value.length == 0 ||
      isNaN(document.savingscalc.months.value) == true
    ) {
      document.getElementById("finalBalance").innerHTML =
        "Please enter the missing information.";
    } else {
      return document.getElementById("calculate");
    }
  }
}
class BankProduct {
  constructor({ bankName, investName,
    currency, incomeType, sumMin,
    sumMax, termMin, termMax,
    canDeposit } = obj) {
    this.bankName = bankName;
    this.investName = investName;
    this.currency = currency;
    this.incomeType = incomeType;
    this.sumMin = sumMin;
    this.sumMax = sumMax;
    this.termMin = termMin;
    this.termMax = termMax;
    this.canDeposit = canDeposit;
  }
}
class Calculator {
  constructor(deposit) {
    this.bankProductArr = [];
    this.deposit = deposit;
  }
  initialFunction(obj) {
    for (let i = 0; i < obj.length; i++) {
      let newBankProduct = new BankProduct(obj[i]);
      this.bankProductArr.push(newBankProduct);
    }
  }
  filteredArray() {
    let filteredArray =
      this.bankProductArr.filter(bankProduct =>
        bankProduct.currency == this.deposit.typeCurrency);
    filteredArray = filteredArray.filter(bankProduct =>
      (this.deposit.firstAmount >=
        bankProduct.sumMin && (this.deposit.firstAmount <=
          bankProduct.sumMax || bankProduct.sumMax == null)));
    filteredArray = filteredArray.filter(bankProduct =>
      (this.deposit.period >= bankProduct.termMin && this.deposit.period
        <= bankProduct.termMax));
    if (this.deposit.mounthlyAmount > 0) {
      filteredArray = filteredArray.filter(bankProduct => bankProduct.canDeposit);
    }
    filteredArray = filteredArray.sort((first, second) => second.incomeType - first.incomeType);
    filteredArray = filteredArray.filter(bankProduct => bankProduct.incomeType == filteredArray[0].incomeType);
    return filteredArray;
  }
  sumDeposit(bankProduct) {
    let returnDeposit = this.deposit.firstAmount;
    for (let i = 0; i < this.deposit.period; i++) {
      returnDeposit *= (1 + (bankProduct.incomeType / (100 * 12)));
      if (i != this.deposit.period - 1) {
        returnDeposit += Number(this.deposit.mounthlyAmount);
      }
    }
    return returnDeposit;
  }
}
class Application {
  constructor() {
    this.firstAmount = document.getElementById('start-amount');
    this.mounthlyAmount = document.getElementById('mounthlyAmount');
    this.period = document.getElementById('period');
    this.typeCurrency = document.getElementById('choiseCurrency');
    this.button = document.getElementById("calculate");
    const self = this;
    this.button.addEventListener('click', function () {
      self.callFunction();
    });
    document.getElementById('alertDisplay').style.display = 'none';
  }
  callFunction() {
    let firstAmount = this.firstAmount.value;
    let mounthlyAmount = this.mounthlyAmount.value;
    let period = this.period.value;
    let typeCurrency = this.typeCurrency.value;
    let deposit = new Deposit(firstAmount, mounthlyAmount, period, typeCurrency);
    if (deposit.checkAllFunction()) {
      let calc = new Calculator(deposit);
      calc.initialFunction(res); //список
      let resultArray = calc.filteredArray();
      this.displayTable(resultArray, calc);
    }
  }
  displayTable(resultArray, calc) {
    const container = document.getElementById('tableDisplay');
    // console.log(resultArray);
    if (resultArray.length == 0) {
      container.innerHTML = '';
      document.getElementById('alertDisplay').style.display = 'block';
    } else {
      document.getElementById('alertDisplay').style.display = 'none';
      let table;
      table = `<tr>
                 <th>Название Банка</th>
                 <th>Вклад</th>
                 <th>Процент</th>
                 <th>Итоговая сумма</th>` ;
      for (let i = 0; i < resultArray.length; i++) {
        table += `<tr>
                  <td>${resultArray[i].bankName}</td>
                  <td>${resultArray[i].investName}</td>
                  <td>${resultArray[i].incomeType}</td>
                  <td>${Math.round(calc.sumDeposit(resultArray[i]))}</td>
                 </tr> `;
      }
      // document.getElementById("finalBalance").innerHTML = ` <b>${table}</b>  `;
      container.innerHTML = `<table>${table}</table>`;
    }
  }
}
let start = new Application();
let res = [{
  "bankName": "Газпромбанк",
  "investName": "Ваш успех",
  "currency": "RUB",
  "incomeType": 6.22,
  "sumMin": 50000,
  "sumMax": null,
  "termMin": 12,
  "termMax": 12,
  "canDeposit": false
},
{
  "bankName": "Кредит Европа Банк",
  "investName": "Оптимальный на 2 года",
  "currency": "RUB",
  "incomeType": 6.45,
  "sumMin": 100000,
  "sumMax": null,
  "termMin": 24,
  "termMax": 24,
  "canDeposit": false
},
{
  "bankName": "Банк Зенит",
  "investName": "Праздничный 500+",
  "currency": "RUB",
  "incomeType": 6,
  "sumMin": 30000,
  "sumMax": null,
  "termMin": 17,
  "termMax": 17,
  "canDeposit": false
},
{
  "bankName": "Еврофинанс Моснарбанк",
  "investName": "Классический",
  "currency": "RUB",
  "incomeType": 6.95,
  "sumMin": 30000,
  "sumMax": null,
  "termMin": 12,
  "termMax": 24,
  "canDeposit": false
},
{
  "bankName": "Джей энд Ти Банк",
  "investName": "Магнус-Онлайн",
  "currency": "RUB",
  "incomeType": 6.8,
  "sumMin": 100000,
  "sumMax": null,
  "termMin": 6,
  "termMax": 6,
  "canDeposit": false
},
{
  "bankName": "МТС Банк",
  "investName": "В вашу пользу",
  "currency": "RUB",
  "incomeType": 6.75,
  "sumMin": 50000,
  "sumMax": null,
  "termMin": 12,
  "termMax": 12,
  "canDeposit": true
},
{
  "bankName": "Эс-Би-Ай Банк",
  "investName": "Свои правила Онлайн",
  "currency": "RUB",
  "incomeType": 6.7,
  "sumMin": 30000,
  "sumMax": 30000000,
  "termMin": 24,
  "termMax": 24,
  "canDeposit": false
},
{
  "bankName": "Банк Уралсиб",
  "investName": "Прогноз отличный",
  "currency": "RUB",
  "incomeType": 6.7,
  "sumMin": 100000,
  "sumMax": null,
  "termMin": 37,
  "termMax": 37,
  "canDeposit": false
},
{
  "bankName": "Инвестторгбанк",
  "investName": "ИТБ-Постоянный доход",
  "currency": "RUB",
  "incomeType": 6.6,
  "sumMin": 50000,
  "sumMax": null,
  "termMin": 37,
  "termMax": 37,
  "canDeposit": false
},
{
  "bankName": "Транскапиталбанк",
  "investName": "ТКБ.Постоянный доход",
  "currency": "RUB",
  "incomeType": 6.6,
  "sumMin": 50000,
  "sumMax": null,
  "termMin": 37,
  "termMax": 37,
  "canDeposit": false
},
{
  "bankName": "Совкомбанк",
  "investName": "Зимний праздник с Халвой",
  "currency": "RUB",
  "incomeType": 5.6,
  "sumMin": 50000,
  "sumMax": null,
  "termMin": 2,
  "termMax": 2,
  "canDeposit": true
},
{
  "bankName": "Агророс",
  "investName": "Медовый месяц",
  "currency": "RUB",
  "incomeType": 5.51,
  "sumMin": 20000,
  "sumMax": null,
  "termMin": 1,
  "termMax": 1,
  "canDeposit": true
},
{
  "bankName": "Росдорбанк",
  "investName": "Онлайн-1",
  "currency": "RUB",
  "incomeType": 5.1,
  "sumMin": 100000,
  "sumMax": 150000000,
  "termMin": 1,
  "termMax": 1,
  "canDeposit": true
},
{
  "bankName": "Национальный Стандарт",
  "investName": "Сберегательный стандарт",
  "currency": "RUB",
  "incomeType": 5.1,
  "sumMin": 100000,
  "sumMax": null,
  "termMin": 1,
  "termMax": 3,
  "canDeposit": true
},
{
  "bankName": "Россия",
  "investName": "Морозные узоры",
  "currency": "RUB",
  "incomeType": 5,
  "sumMin": 100000,
  "sumMax": null,
  "termMin": 1,
  "termMax": 1,
  "canDeposit": true
},
{
  "bankName": "Кузнецкий Мост",
  "investName": "Накопительный",
  "currency": "RUB",
  "incomeType": 4.85,
  "sumMin": 50000,
  "sumMax": null,
  "termMin": 1,
  "termMax": 3,
  "canDeposit": true
},
{
  "bankName": "Тексбанк",
  "investName": "Универсальный",
  "currency": "RUB",
  "incomeType": 4.6,
  "sumMin": 10000,
  "sumMax": null,
  "termMin": 1,
  "termMax": 1,
  "canDeposit": true
},
{
  "bankName": "Морской Банк",
  "investName": "Правильным курсом +",
  "currency": "RUB",
  "incomeType": 4.55,
  "sumMin": 100000,
  "sumMax": null,
  "termMin": 1,
  "termMax": 3,
  "canDeposit": true
},
{
  "bankName": "Норвик Банк",
  "investName": "Лаконичный",
  "currency": "RUB",
  "incomeType": 4.5,
  "sumMin": 500,
  "sumMax": 50000000,
  "termMin": 1,
  "termMax": 1,
  "canDeposit": true
},
{
  "bankName": "Промсельхозбанк",
  "investName": "Конструктор",
  "currency": "RUB",
  "incomeType": 4.5,
  "sumMin": 10000,
  "sumMax": null,
  "termMin": 1,
  "termMax": 3,
  "canDeposit": true
},
{
  "bankName": "Акибанк",
  "investName": "Онлайн",
  "currency": "RUB",
  "incomeType": 6.5,
  "sumMin": 1000,
  "sumMax": null,
  "termMin": 6,
  "termMax": 6,
  "canDeposit": true
},
{
  "bankName": "Банк БКФ",
  "investName": "Ключевой стандарт",
  "currency": "RUB",
  "incomeType": 6.5,
  "sumMin": 100000,
  "sumMax": null,
  "termMin": 6,
  "termMax": 13,
  "canDeposit": true
},
{
  "bankName": "Экспобанк",
  "investName": "Специальный (в конце срока)",
  "currency": "RUB",
  "incomeType": 6.35,
  "sumMin": 50000,
  "sumMax": 10000000,
  "termMin": 6,
  "termMax": 6,
  "canDeposit": true
},
{
  "bankName": "Инвестторгбанк",
  "investName": "ИТБ-Пополняемый",
  "currency": "RUB",
  "incomeType": 6.15,
  "sumMin": 50000,
  "sumMax": 30000000,
  "termMin": 6,
  "termMax": 6,
  "canDeposit": true
},
{
  "bankName": "Транскапиталбанк",
  "investName": "ТКБ.Пополняемый",
  "currency": "RUB",
  "incomeType": 6.15,
  "sumMin": 50000,
  "sumMax": 30000000,
  "termMin": 6,
  "termMax": 6,
  "canDeposit": true
},
{
  "bankName": "Евроазиатский Инвестиционный Банк",
  "investName": "Классика",
  "currency": "RUB",
  "incomeType": 6.1,
  "sumMin": 100000,
  "sumMax": null,
  "termMin": 6,
  "termMax": 12,
  "canDeposit": true
},
{
  "bankName": "Тимер Банк",
  "investName": "Надежный выбор",
  "currency": "RUB",
  "incomeType": 6,
  "sumMin": 10000,
  "sumMax": null,
  "termMin": 6,
  "termMax": 6,
  "canDeposit": true
},
{
  "bankName": "Евразийский Банк",
  "investName": "TURBO MAXIMUM",
  "currency": "RUB",
  "incomeType": 6,
  "sumMin": 30000,
  "sumMax": 299999,
  "termMin": 6,
  "termMax": 6,
  "canDeposit": true
},
{
  "bankName": "Таврический Банк",
  "investName": "Достижимый (онлайн)",
  "currency": "RUB",
  "incomeType": 6,
  "sumMin": 50000,
  "sumMax": null,
  "termMin": 6,
  "termMax": 6,
  "canDeposit": true
},
{
  "bankName": "Экспобанк",
  "investName": "Юбилейный 25 (в конце срока)",
  "currency": "RUB",
  "incomeType": 6.5,
  "sumMin": 100000,
  "sumMax": 20000000,
  "termMin": 12,
  "termMax": 12,
  "canDeposit": true
},
{
  "bankName": "Крокус-Банк",
  "investName": "Ежемесячный доход",
  "currency": "RUB",
  "incomeType": 6.35,
  "sumMin": 50000,
  "sumMax": null,
  "termMin": 12,
  "termMax": 12,
  "canDeposit": true
},
{
  "bankName": "Промсельхозбанк",
  "investName": "Ваш выбор",
  "currency": "RUB",
  "incomeType": 6.3,
  "sumMin": 10000,
  "sumMax": null,
  "termMin": 12,
  "termMax": 12,
  "canDeposit": true
},
{
  "bankName": "Нацинвестпромбанк",
  "investName": "Прибыльный",
  "currency": "RUB",
  "incomeType": 6.3,
  "sumMin": 50000,
  "sumMax": null,
  "termMin": 12,
  "termMax": 12,
  "canDeposit": true
},
{
  "bankName": "Ишбанк",
  "investName": "Накопительный",
  "currency": "RUB",
  "incomeType": 6.25,
  "sumMin": 100000,
  "sumMax": null,
  "termMin": 12,
  "termMax": 12,
  "canDeposit": true
},
{
  "bankName": "Примсоцбанк",
  "investName": "Новогодний чулок (333 дня)",
  "currency": "RUB",
  "incomeType": 6.2,
  "sumMin": 10000,
  "sumMax": null,
  "termMin": 11,
  "termMax": 11,
  "canDeposit": true
},
{
  "bankName": "Еврофинанс Моснарбанк",
  "investName": "Пополняемый",
  "currency": "RUB",
  "incomeType": 6.75,
  "sumMin": 1000000,
  "sumMax": null,
  "termMin": 12,
  "termMax": 24,
  "canDeposit": true
},
{
  "bankName": "Евроазиатский Инвестиционный Банк",
  "investName": "VIP",
  "currency": "RUB",
  "incomeType": 6.35,
  "sumMin": 1000000,
  "sumMax": null,
  "termMin": 9,
  "termMax": 12,
  "canDeposit": true
},
{
  "bankName": "Российская Финансовая Корпорация",
  "investName": "Универсальный",
  "currency": "RUB",
  "incomeType": 6,
  "sumMin": 5000,
  "sumMax": null,
  "termMin": 3,
  "termMax": 3,
  "canDeposit": true
},
{
  "bankName": "Московский Кредитный Банк",
  "investName": "МЕГА Онлайн",
  "currency": "RUB",
  "incomeType": 5.8,
  "sumMin": 1000,
  "sumMax": null,
  "termMin": 3,
  "termMax": 5,
  "canDeposit": true
},
{
  "bankName": "Александровский",
  "investName": "Черника 19/20",
  "currency": "RUB",
  "incomeType": 5.6,
  "sumMin": 20000,
  "sumMax": null,
  "termMin": 3,
  "termMax": 3,
  "canDeposit": true
},
{
  "bankName": "Финанс Бизнес Банк",
  "investName": "Мандариновый!",
  "currency": "RUB",
  "incomeType": 5.6,
  "sumMin": 50000,
  "sumMax": null,
  "termMin": 3,
  "termMax": 3,
  "canDeposit": true
},
{
  "bankName": "ЦентроКредит",
  "investName": "Доход Плюс",
  "currency": "USD",
  "incomeType": 1.15,
  "sumMin": 5000,
  "sumMax": null,
  "termMin": 3,
  "termMax": 3,
  "canDeposit": true
},
{
  "bankName": "Совкомбанк",
  "investName": "Удобный (в долларах)",
  "currency": "USD",
  "incomeType": 1,
  "sumMin": 500,
  "sumMax": null,
  "termMin": 3,
  "termMax": 6,
  "canDeposit": true
},
{
  "bankName": "Веста",
  "investName": "Веста - Копилка",
  "currency": "USD",
  "incomeType": 1,
  "sumMin": 10000,
  "sumMax": null,
  "termMin": 3,
  "termMax": 6,
  "canDeposit": true
},
{
  "bankName": "Славия",
  "investName": "Славный Капитал",
  "currency": "USD",
  "incomeType": 0.85,
  "sumMin": 5000,
  "sumMax": null,
  "termMin": 3,
  "termMax": 4,
  "canDeposit": true
},
{
  "bankName": "Роскосмосбанк",
  "investName": "Комфортный",
  "currency": "USD",
  "incomeType": 0.8,
  "sumMin": 500,
  "sumMax": null,
  "termMin": 3,
  "termMax": 6,
  "canDeposit": true
},
{
  "bankName": "ФорБанк",
  "investName": "Срочный накопительный",
  "currency": "USD",
  "incomeType": 0.8,
  "sumMin": 10000,
  "sumMax": 500000,
  "termMin": 3,
  "termMax": 3,
  "canDeposit": true
},
{
  "bankName": "Московский Областной Банк",
  "investName": "Гарантированный доллар",
  "currency": "USD",
  "incomeType": 0.75,
  "sumMin": 50,
  "sumMax": null,
  "termMin": 4,
  "termMax": 4,
  "canDeposit": true
},
{
  "bankName": "Объединенный Резервный Банк",
  "investName": "ОРБ-Накопительный (в конце срока)",
  "currency": "USD",
  "incomeType": 1.6,
  "sumMin": 1000,
  "sumMax": null,
  "termMin": 12,
  "termMax": 12,
  "canDeposit": true
},
{
  "bankName": "Банк Агора",
  "investName": "Срочный",
  "currency": "USD",
  "incomeType": 1.5,
  "sumMin": 1000,
  "sumMax": null,
  "termMin": 12,
  "termMax": 12,
  "canDeposit": true
},
{
  "bankName": "Тинькофф Банк",
  "investName": "СмартВклад (с повышенной ставкой)",
  "currency": "USD",
  "incomeType": 1.5,
  "sumMin": 1000,
  "sumMax": null,
  "termMin": 12,
  "termMax": 12,
  "canDeposit": true
},
{
  "bankName": "Первый Инвестиционный Банк",
  "investName": "Закон сохранения",
  "currency": "USD",
  "incomeType": 1.5,
  "sumMin": 1000,
  "sumMax": null,
  "termMin": 12,
  "termMax": 12,
  "canDeposit": true
},
{
  "bankName": "Новый Век",
  "investName": "Сберегательный",
  "currency": "USD",
  "incomeType": 1.5,
  "sumMin": 5000,
  "sumMax": 20000,
  "termMin": 12,
  "termMax": 12,
  "canDeposit": true
}
];