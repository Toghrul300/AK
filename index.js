// Требования
// В качестве параметров функция должна принимать на вход:
// Начальную сумму вклада (в валюте)
// Сумму ежемесячного пополнения (в валюте)
// Величину доходности по вкладу (в процентах годовых)
// Срок вклада (дней)

// При расчетах считать, что проценты начисляются ежемесячно и капитализируются (ежемесячный доход попадает на баланс и учитывается при расчете дохода в следующем месяце).

// Функция должна возвращать сумму вклада на момент окончания его срока действия.

// Предусмотреть проверку корректности входных данных. Корректными входными данными для функции следует считать:
// Начальная сумма - положительно число
// Сумма пополнения - неотрицательное число
// Процент - положительное число (до 100)
// Срок - положительное целое число.

// В случае некорректных значений, функция выводит в консоль сообщение об ошибке и возвращать NaN.

// function deposit (
//   initialDepositAmount,
//   amountOfMonthlyReplenishment,
//   interestRate,
//   period){

//    let result = 0;
  

//    for (let i = 0; i < period; i++) {
//     result = initialDepositAmount + amountOfMonthlyReplenishment + ((initialDepositAmount + amountOfMonthlyReplenishment)/100*interestRate)*Math.round(period/30);
//     }
//       return result;
//     }
          


// console.log(deposit(1000, 100, 10, 360 )); 



let button = document.getElementById("submit");

function getDeposit (
  initialDepositAmount,
  amountOfMonthlyReplenishment,
  interestRate,
  period){
    
    let initialDepositAmount = document.getElementById("Amount").id;
    let amountOfMonthlyReplenishment = document.getElementById("amountOfMonthlyReplenishment");
    let interestRate = document.getElementById("interestRate");
    let period = document.getElementById("period");

   
    let result = 0;
  
    for (let i = 0; i < period; i++) {
      result = initialDepositAmount + amountOfMonthlyReplenishment + ((initialDepositAmount + amountOfMonthlyReplenishment)/100*interestRate)*Math.round(period/30);
      }
        return result;
      }
    
    button.addEventListener("click", getDeposit);







