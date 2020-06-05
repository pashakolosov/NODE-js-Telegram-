'use strict';

const readline = require('readline');

const welcomeText = 'Привет, я кекс. Мне нравиться загадывать числа, вы называете максимальное число, а я загадываю его в этом диапазоне.' +
    'Количество попыток не ограничено';

const readLineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


const showWinMessage = (secretNumber) => {
    console.log(`Ура, вы угадали число.
    Я действительно загадал ${secretNumber}.`);

    readLineInterface.close()
}


const checkAnswer = (secretNumber) => {
    readLineInterface.question('Ваш ответ: ', (inputNumber) => {
        const userAnswer = Number.parseInt(inputNumber);

        if (secretNumber === userAnswer){
            return showWinMessage(secretNumber);
        }

        console.log('Промазал, попробуй еще.');
        checkAnswer(secretNumber);
    })
}


const startGame = () => {
    console.log(welcomeText);

    readLineInterface.question('Максимальное число: ', (maxNumber) => {
        const myNumber = getRandomNumber(0, Number.parseInt(maxNumber, 10));
    });
}


startGame()