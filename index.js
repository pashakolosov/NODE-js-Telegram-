const TelegramBot = require('node-telegram-bot-api') // Подключаем фреймворк
const debug = require('./debug')
const TOKEN = '958509167:AAHXTGUNUT_aFBQ2mjL7nP-H6Nb3u4lmXas' // Задаем токен

console.log('Bot have been started')

const bot = new TelegramBot(TOKEN, {
    polling: {
        interval: 300,
        autoStart: true,
        params: {
            timeout: 10
        }
    }
})


// Прослушивание и обработка комманд ('RE')
bot.onText(/\/start/, msg => {
    const { id } = msg['chat']
    bot.sendMessage(id, debug(msg))
})


// Прослушивание и обработка комманд ('RE')
bot.onText(/\/help(.+)/, (msg, [source, match]) => {
    const { id } = msg['chat']
    bot.sendMessage(id, debug(match))
})


// Прослушивание всех сообщений ('message')
bot.on('message', (msg) => {
    const html = `
    <strong>Hello, ${msg.from.first_name}</strong>
    <i>Text message</i>
    <pre>${debug(msg)}</pre>
    `
    const { id } = msg['chat']

    if (msg.text === 'html')
    {
        bot.sendMessage(id, html, {parse_mode: 'HTML'})
    }

    else if (msg.text === 'Да пошел ты!')
    {
        bot.sendMessage(id, 'Приходи один, мы тоже одни придем!')

    }

    else if (msg.text === 'Закрыть')
    {
        bot.sendMessage(id, 'Закрываю', {reply_markup: {remove_keyboard: true}})
    }

    else if (msg.text === 'Отправить')
    {
        bot.sendMessage(id, 'Sending', {reply_markup: {force_reply: true}})
    }

    else if (msg.text === 'inline')
    {
        bot.sendMessage(id, 'Допрыгался голубец..', {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Вилкой в глаз?',
                            callback_data: 'V'
                        },
                        {
                            text: 'В жопу раз',
                            callback_data: 'S'
                        }
                    ],
                    [
                        {
                            text: 'Google',
                            url: 'https://google.com'
                        }
                    ]
                ]
            }
        })
    }

    else if (msg.text === 'key')
    {
        bot.sendMessage(id, 'Keyboard', {
            reply_markup: {
                keyboard: [
                    ['Отправить', 'Закрыть'],
                    [{
                        text: 'SendLocation',
                        request_location: true
                    }],
                    [{
                        text: 'SendContact',
                        request_contact: true
                    }]

                ]
            }
        })
    }


    else if (msg.text === 'fuck')
    {
        bot.sendMessage(id, 'Ну-ка дружочек...', {
            reply_markup: {
                keyboard:[
                    [{
                        text: 'Отправить местоположение?',
                        request_location: true
                    }],
                    [{
                        text: 'УрАнить цифру, ежжии',
                        request_contact: true
                    }],
                    ['Да пошел ты!']
                ]
            }
        })
    }

})


// Прослушивание колбэк данных ('callback_query')
bot.on('callback_query', query => {
    bot.sendMessage(query.message.chat.id, debug(query))
    bot.answerCallbackQuery(query.id, `${query.data}`)
})


// Прослушивание инлайн запросов('inline_query') Предварительно настроив /setinline у BotFather
bot.on('inline_query', query => {

    const result = []

    for (let i = 0; i < 10; i++){
        result.push({
            type: 'article',
            id: i.toString(),
            title: 'Article' + i,
            input_message_content: {
                message_text: `Article #${i + 1}`
            }
        })
    }
    bot.answerInlineQuery(query.id, result,{
        cache_time: 0
    })
})