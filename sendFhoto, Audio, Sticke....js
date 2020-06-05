const TelegramBot = require('node-telegram-bot-api')
const TOKEN = '1135449790:AAH-5g0Of4spt6fBJ1vHFvL7v7tWfkUlAg8'
const fs = require('fs')
const bot = new TelegramBot(TOKEN, {
    polling: true
})


const like_or_dislike =
        [[{
            text: 'Like',
            callback_data: 'like'
        },
        {
            text: 'Diz',
            callback_data: 'diz'
        }]]




// PHOTO  /bot.sendPhoto(chat_id, 'path', {caption}
bot.onText(/\/pic/, msg => {
    bot.sendPhoto(msg.chat.id, fs.readFileSync(__dirname + '/boned.jpg'), {
        reply_markup: {
            inline_keyboard: like_or_dislike
        }
    })
})




//AUDIO /bot.sendAudio(chat_id, 'path') {caption}
bot.onText(/\/audio1/, msg => {
    bot.sendAudio(msg.chat.id, './audio_test.mp3')
})
bot.onText(/\/audio2/, msg => {
    bot.sendMessage(msg.chat.id, 'Start uploading file')

    fs.readFile(__dirname + '/audio_test.mp3', (err, data) => {
        bot.sendAudio(msg.chat.id, data).then(() => {
            bot.sendMessage(msg.chat.id, 'Uploading finish')
        })
    })
})




// STICKER /bot.sendSticker(chat_id, 'data|path') {caption}
bot.onText(/\/sticker1/, msg => {
    bot.sendSticker(msg.chat.id, './Robots-Square.webp')
})
bot.onText(/\/sticker2/, msg => {
    fs.readFile(__dirname + '/Robots-Square.webp', (err, data) => {
        bot.sendSticker(msg.chat.id, data).then(() => {
            bot.sendMessage(msg.chat.id, 'Я хотя бы не черный...')
        })
    })
})




// DOCUMENT bot.sendDocument(chat_id, 'path|data') {caption}
bot.onText(/\/doc1/, msg => {
    bot.sendDocument(msg.chat.id, './Огневая-Колосов.rar')
})
bot.onText(/\/doc2/, msg => {
    bot.sendMessage(msg.chat.id, 'Start uploading..')

    fs.readFile(__dirname + '/Огневая-Колосов.rar', (err, file) => {
        bot.sendDocument(msg.chat.id, file).then(() => {
            bot.sendMessage(msg.chat.id, 'Upload finish')
        })
    })
})




// VIDEO bot.sendVideo(chat_id, link|video)
bot.onText(/\/video1/, msg => {
    bot.sendVideo(msg.chat.id, 'small.mp4', {
        reply_markup: {
       inline_keyboard: like_or_dislike
        }
    })
})
bot.onText(/\/video2/, msg => {
    bot.sendMessage(msg.chat.id, 'uploading video')

    fs.readFile(__dirname + '/small.mp4', (err, video) => {
        bot.sendVideo(msg.chat.id, video, {
            reply_markup: {
                inline_keyboard: like_or_dislike
            }
        }).then(() => {
            bot.sendMessage(msg.chat.id, 'Upload finish...')
        })
    })
})




//LOCATION bot.sendLocation(chat_id, latitude, longitude)
bot.onText(/\/location/, msg => {
    bot.sendLocation(msg.chat.id, 53.23423, 24.23432)
})




// CONTACT bot.sendContact(chat_id, 'contact', {username}
bot.onText(/\/contact/, msg => {
    bot.sendContact(msg.chat.id, '375 33 3910992', 'Pasha', {
        last_name: 'Kolosov'
    })
})




