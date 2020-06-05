//Есть разные типы переменных const let var Рекомендуется успользовать только первую и вторую, const(Unvariable) и let

// Типы данных string, number, boolean, undefined, null, object и др.

//Ветвлеине
if (conditional)
{
    expression
}






//Тернарный оператор
conditional ? (выполнятся если условие верно) : (выполняется если условие не верно)





isReady = false
// Записываем как условие
if (isReady)
{
    console.log('All is ready')
}
else console.log('All is not ready')

//Можно записать как тернарный оператор
isReady ? console.log('true') : console.log('false')





// функция
function calculate(speed, distance)
{
    console.log('Время равняется виличине скорости умноженной на дистанцию')
    return distance / speed
}

const a = calculate(74, 89)
console.log(a)





// Массивы
const cars = ['mazda', 'mercedes', 'porsche','audi']

// Фор
// Можно так
for (let i = 0; i < cars.length; i++)
{
    const car = cars[i]
    console.log(car)
}
console.log('--------------------------')
// А можно так

for (let item of cars)
{
    console.log(item)
}
console.log('--------------------------')






// Object
let currentYears = 2020

const person = {
    age: 24,
    name: 'Pasha',
    languages: ['ru', 'en', 'pl'],
    hasWife: false,
    birthday: function ()
    {
        return currentYears - this.age
    }
}

console.log(person.birthday())


bot.on('callback_query', function (msg) {
    if (msg.data === 'rus'){
        console.log(“Russian”);
    }
    if (msg.data === ‘eng’){
        console.log(“English”);
    }
});
