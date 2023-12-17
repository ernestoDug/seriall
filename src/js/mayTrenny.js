// 1111111111111111111111111111111111111111
// Напишіть функцію camelize(str), яка перетворює такі рядки “my-short-string” 
// в “myShortString”.

// Тобто дефіси видаляються, а всі слова після них починаються з великої літери.
// Приклади:

camelize("background-color") == 'backgroundColor';
camelize("list-style-image") == 'listStyleImage';
camelize("-webkit-transition") == 'WebkitTransition';


function camelize(str) {
  console.log(
    // рядок в масив роздільник - прибирає -
    str
.split("-")
// мепимо елемент, індек масив пропускаємо для першого елемента
// масиву перуш літеру не збільшуємо 
// після зібльшення та як символи не міняються слайсем
//  з першого за позицею літери слово і конкатенуємо 
.map(
(wrd, ind) => ind == 0 ? wrd : wrd[0].toUpperCase() + wrd.slice(1))
.join(""))
}
camelize("-webkit-transition");

// 2222222222222222222222222222222222222222222222222222222
// Напишіть функцію filterRange(arr, a, b), яка приймає масив arr, 
// шукає в ньому елементи
//  більші-рівні a та менші-рівні b і віддає масив цих елементів..
// якщо ні з чим порівнвюати повертаю просто масива 
filterRange = (arr, a, b) => {
  console.log(
    arr.filter(item => item >=a && item<=b ))
  if(!a && !b) 
  console.log(arr);
  }      
    filterRange(arr, 1, 4);

    // 33333333333333333333333333333333333333333333333
    // Напишіть функцію filterRangeInPlace(arr, a, b), яка приймає масив arr і видаляє з
    //  нього всі значення крім тих, які знаходяться між a і b.

    let arr = [5, 3, 8, 1];
   
    function filterRangeInPlace(arr, a, b) {

      for (let i = 0; i < arr.length; i++) {
        let val = arr[i];
    
        // видаляти, якщо не у вказаному діапазоні
        if (val < a || val > b) {
          arr.splice(i, 1);
          i--;
        }
      }
        }
              filterRangeInPlace(arr, 1, 4); 
          console.log(arr)
// 444444444444444444444444444444444444444444444444444444444
          // Сортувати за спаданням
          let arr2 = [5, 2, 1, -10, 8];
          // виходить якщо б написати а-б тоді біло б і від більшого а так навпаки
           arr2.sort( (a, b) => b - a );
          //  або як варіант можна застусувати реверс 
          //      arr2.sort( (a, b) => a - b ).reverse();
              console.log(arr2);
              // 55555555555555555555555555555555555555555555555555
      //   Потрібно отримати відсортовану копію та залишити arr3 незміненим.

// Створіть функцію copySorted(arr3), яка буде повертати таку копію.

let arr3 = ["HTML", "JavaScript", "CSS"];

let copySorted = (arr) => 

// розпилемо для імутабельності 
arrNew = [...arr].sort();
// сортуємо 
let stored = copySorted(arr3);

console.log(stored, "new");
console.log(arr3, "old");

// або як варіант можна так 
// let arr4 = ["HTML", "JavaScript", "CSS"];
// copySorted = (arr) => {
//   return arr3.slice().sort();
// }

//  let sorted = copySorted(arr4);

// console.log(sorted, "neww");
// console.log(arr4, "oldd");
      // 66666666666666666666666666666666666666666
      // Створити розширюваний калькулятор

      function Calculator() {
        //         зверніть увагу, як зберігаються методи.
        //          Вони просто додаються до внутрішнього обʼєкта (this.methods).
        // Всі тести та числові перетворення виконуються в методі calculate.
        //  У майбутньому він може бути розширений для підтримки складніших виразів.
        // тут в методах ми пояснююємо що таке мінус та +
                this.methods = {
                  "-": (a, b) => a - b,
                  "+": (a, b) => a + b
                };
              // методк калькулят 
                this.calculate = function(str) {
              // рядок в масив 
                  let split = str.split(' '),
                  // перший член масива  в число 
                    a = +split[0],
                    // тут знак + - 
                   op = split[1],
                  //  третій в число 
                    b = +split[2];
              // якщо немає знаку або а чи бе не числа 
                  if (!this.methods[op] || isNaN(a) || isNaN(b)) {
                    return NaN;
                  }
              // поверни результату методів та сам знак 
                  return this.methods[op](a, b);
                };
              
                this.addMethod = function(name, func) {
                  this.methods[name] = func;
                };
              }
        // а ось виклик з новими функціями хоча біло на початку тільки +
              let powerCalc = new Calculator;
        powerCalc.addMethod("*", (a, b) => a * b);
        powerCalc.addMethod("/", (a, b) => a / b);
        powerCalc.addMethod("**", (a, b) => a ** b);
        
        let result = powerCalc.calculate("6 / 3");
        //   let result = powerCalc.calculate("2 ** 3");
        console.log(result)
  
  