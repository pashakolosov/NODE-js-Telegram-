const TOKEN = '1135449790:AAF7WCEVS8XKc-cGaqfUpQamnDPfLU-seUM'
const TelegramBot = require('node-telegram-bot-api')

console.log('Bot has been started')

const bot = new TelegramBot(TOKEN, {
    polling: true
})


const keyboard = [
    [
        {
            text: 'Forward',
            callback_data: 'forward'
        },
        {
            text: 'Reply',
            callback_data: 'reply'
        },
    ],
    [
        {
            text: 'Edit',
            callback_data: 'edit'
        },
        {
            text: 'Delete',
            callback_data: 'delete'
        },
    ],
]


// Отправка клавиаутры по команде /start
bot.onText(/\/start/, msg => {
    bot.sendMessage(msg.chat.id, 'keyboard', {
        reply_markup: {
            inline_keyboard: keyboard
        }
    })
})

/// Ловим callback_data
bot.on('callback_query', query => {
    const {chat, message_id, text} = query.message

    switch (query.data) {
        case 'forward':
            bot.forwardMessage(chat.id, chat.id, message_id)
            break

        case 'reply':
            bot.sendMessage(chat.id, 'text', {
                reply_to_message_id: message_id
            })
            break

        case 'edit':
            bot.editMessageText(`${text} (edited)`, {
                chat_id: chat.id,
                message_id: message_id,
                reply_markup: {
                    inline_keyboard: keyboard
                }
            })
            break

        case 'delete':
            bot.deleteMessage(chat.id, message_id)
    }

    bot.answerCallbackQuery(query.id, query.data)
})