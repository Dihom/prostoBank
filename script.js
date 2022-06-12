'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'UAH',
  locale: 'uk-UA',
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'RUB',
  locale: 'ru-RU',
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'EUR',
  locale: 'fr-CA',
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseNickname = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


// Отображение вывода и поступлений средств на счет
const displayTransactions = function(account, sort = false) {

  containerTransactions.innerHTML = '';

  const transacs = sort ? account.transactions.slice().sort((x, y) => x - y) : account.transactions;

  transacs.forEach(function(trans, index) {

    const transType = trans > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(account.transactionsDates[index]);

    const day = `${date.getDate()}`.padStart(2, '0');
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const year = date.getFullYear();

    const transDate = `${day}/${month}/${year}`;

    const transactionRow = `
    <div class="transactions__row">
    <div class="transactions__type transactions__type--${transType}">
      ${index + 1} ${transType}
    </div>
    <div class="transactions__date">${transDate}</div>
    <div class="transactions__value">${trans.toFixed(2)}</div>
  </div>
  `;

            // вставка строки в контет на веб странице
  containerTransactions.insertAdjacentHTML('afterbegin', transactionRow);

  });
};

// displayTransactions(account1.transactions);

// console.log(containerTransactions.innerHTML);

// Создание никнейма из имени и фамилии пользователя по первым заглавным буквам
const createNicknames = function(accs) {
  accs.forEach(function(acc) {
    acc.nickname = acc.userName
    .toLowerCase()
    .split(' ')
    .map(word => word[0])
    .join('');
  });
};

createNicknames(accounts);
// console.log(accounts)

// const userName = 'Oliver Avila'; // nickname = 'oa'
// const nickname = userName
// .toLowerCase()
// .split(' ')
// .map(word => word[0])
// .join('');

// console.log(nickname)

// Отображение основного баланса пользователя
const displayBalance = function(account) {
  const balance = account.transactions.reduce((acc, trans) =>
  acc + trans, 0);
  account.balance = balance;
  labelBalance.textContent = `${balance.toFixed(2)}$`
}

// displayBalance(account1.transactions);

// Отображение денежных средств у пользователя
const displayTotal = function (account) {
  const depositesTotal = account.transactions
    .filter(trans => trans > 0)
    .reduce((acc, trans) => acc + trans, 0);
    labelSumIn.textContent = `${depositesTotal.toFixed(2)}$`;

  const withdrawalsTotal = account.transactions
  .filter(trans => trans < 0)
  .reduce((acc, trans) => acc + trans, 0);
  labelSumOut.textContent = `${withdrawalsTotal.toFixed(2)}$`

  const interestTotal = account.transactions
  .filter(trans => trans > 0)
  .map(depos => (depos * account.interest) / 100)
  .filter((interest, index, arr) => {
    return interest >= 5;
  })
  .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interestTotal.toFixed(2)}$`
};

// displayTotal(account1.transactions);

// Функция изенения баланса пользователя после совершения операций
const updateUi = function(account) {
  // Display transactions
  displayTransactions(account);

  // Display balance
  displayBalance(account);

  // Display total
  displayTotal(account);
}

let currentAccount;

// Always logged in
// currentAccount = account1;
// updateUi(currentAccount);
// containerApp.style.opacity = 1;


// labelDate.textContent = now;

// Ввод логина и пароля с очитской полей после ввода
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(account => account.nickname === inputLoginUsername.value);
  console.log(currentAccount)

  if(currentAccount?.pin === +(inputLoginPin.value)) {
    // Display UI
    containerApp.style.opacity = '1';

    labelWelcome.textContent = `Рады, что Вы снова с нами, ${currentAccount.userName.split(' ')[0]}!`

    const now = new Date();
    const day = `${now.getDate()}`.padStart(2, '0');
    const month = `${now.getMonth() + 1}`.padStart(2, '0');
    const year = now.getFullYear();

    // Clear inputs
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUi(currentAccount);
  }
});

// Event handlers
// Перевод денег другому пользователю
btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  const transferAmount = +(inputTransferAmount.value);
  const recipientNickname = inputTransferTo.value;
  const recipientAccount = accounts.find(account => account.nickname === recipientNickname);
  
  inputTransferTo.value = '';
  inputTransferAmount.value = '';

  if(transferAmount > 0 && currentAccount.balance >= transferAmount && recipientAccount && currentAccount.nickname !== recipientAccount?.nickname) {

    // Add transaction
    currentAccount.transactions.push(-transferAmount);
    recipientAccount.transactions.push(transferAmount);

    // Add transaction date
    currentAccount.transactionsDates.push(new Date().toISOString());
    recipientAccount.transactionsDates.push(new Date().toISOString());

    updateUi(currentAccount);
  }
});

// Закрытие счета пользователя
btnClose.addEventListener('click', function(e) {
  e.preventDefault();
  if (inputCloseNickname.value === currentAccount.nickname && +(inputClosePin.value) === currentAccount.pin) {
    const currentAccountIndex = accounts.findIndex(account => account.nickname === currentAccount.nickname);

    accounts.splice(currentAccountIndex, 1);

    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Войдите в свой аккаунт'
  }

  inputCloseNickname.value = '';
  inputClosePin.value = '';
});


// Запрос займа у банка
btnLoan.addEventListener('click', function(e) {
  e.preventDefault();
  const loanAmount = Math.floor(inputLoanAmount.value);

  if (loanAmount > 0 && currentAccount.transactions.some(trans => trans >= (loanAmount * 10) / 100)) {
    currentAccount.transactions.push(loanAmount);
    currentAccount.transactionsDates.push(new Date().toISOString());
    updateUi(currentAccount); 
  }
  inputLoanAmount.value = '';
})


// Сортировка баланса

let  transactionsSorted = false;

btnSort.addEventListener('click', function(e) {
  e.preventDefault();
  displayTransactions(currentAccount, !transactionsSorted);
  transactionsSorted = !transactionsSorted;
})


// Array.from() пример


// const logoImage = document.querySelector('.logo');
// logoImage.addEventListener('click', function() {
//   const transactionsUi = document.querySelectorAll('.transactions__value');
//   console.log(transactionsUi);
//   // const transactionsUiArray = Array.from(transactionsUi)
//   // console.log(transactionsUiArray.map(elem => +(elem.textContent)));
//   const transactionsUiArray = Array.from(transactionsUi, elem => +(elem.textContent));
//   console.log(transactionsUiArray);
// })

// Окрашивание каждой второй строки баланса в серый цвет
const logoImage = document.querySelector('.logo');

logoImage.addEventListener('click', function() {

[...document.querySelectorAll('.transactions__row')].forEach(function(row, i) {

  if(i % 2 === 0) {
    row.style.backgroundColor = 'grey'

  }
})
});

// const now = new Date();
// console.log(now)

// const someDateString = 'Oct 12 2021 11:35:43';
// const SomeDate = new Date(someDateString);
// console.log(SomeDate);
// console.log(new Date('Dec 31 2022'));


// console.log(new Date(account1.transactionsDates[0]));
// console.log(new Date(2222, 0, 13, 11, 28, 59));
// console.log(new Date(2222, 0, 32));

// // Unix time started Jin 1 1970

// console.log(new Date(0));
// console.log(new Date(7 *24 *60 *60 * 1000))

// const futureDate = new Date(2222, 1, 13, 11, 28, 59);
// console.log(futureDate);
// console.log(futureDate.getFullYear());
// console.log(futureDate.getMonth());
// console.log(futureDate.getDate());
// console.log(futureDate.getDay());
// console.log(futureDate.getHours());
// console.log(futureDate.getMinutes());
// console.log(futureDate.getSeconds());

// console.log(futureDate.toISOString())
// console.log(futureDate.getTime())

// console.log(new Date(7956080939000))

// console.log(Date.now());

// futureDate.setFullYear(2223);
// console.log(futureDate)
