const TOKEN = '1165600579:AAHpSjvzoLrzGz-P-mD8wm941IsOu1c-_CI'
const TelegramBot = require('node-telegram-bot-api')
const fs = require('fs')
const bot = new TelegramBot(TOKEN, {
    polling: true
})

bot.getMe().then(function (me) {
    console.log('Hi my name is %s!', me.username);
});


function main_menu(chat_id)
{
    bot.sendMessage(chat_id, 'Если что-то непонятно, читайте справку',{
        reply_markup: {
            keyboard:[
                ['Начать работу'],
                ['Справка'],
                ['Закрыть']
            ]
        }
    })
}
function start_menu(chat_id)
{
    bot.sendMessage(chat_id, 'Выберите функцию', {
            reply_markup: {
                keyboard: [
                    ['Курс крипты', 'Прогноз погоды'],
                    ['Главное меню']
                ]}
        }
    )
}
const inline_keyboard_start = [
    [
        {
            text: 'Forward',
            callback_data: 'forward'
        },
        {
            text: 'Reply',
            callback_data: 'reply'
        }
    ],
    [
        {
            text: 'Edit',
            callback_data: 'edit'
        },
        {
            text: 'Delete',
            callback_data: 'delete'
        }
    ],
    [
        {
            text: 'Начать работу',
            callback_data: 'start'
        }
    ],
    [
        {
            text: 'Send Document',
            callback_data: 'document'
        },
        {
            text: 'Send Sticker',
            callback_data: 'sticker'
        }
    ],
    [
        {
            text: 'Send Photo',
            callback_data: 'photo'
        },
        {
            text: 'Send Audio',
            callback_data: 'audio'
        }
    ],
        [
        {
            text: 'Contact',
            callback_data: 'contact'
        },
        {
            text: 'Location',
            callback_data: 'location'
        }
    ],
    [
        {
            text:'Send Video',
            callback_data: 'video'
        }
    ]
]
const like_dislike = [
    [
        {
            text: 'Like',
            callback_data: 'like'
        },
        {
            text: 'Dislike',
            callback_data: 'dislike'
        }
    ]
]


// Старт
bot.onText(/\/start/, msg => {
    bot.sendMessage(msg.chat.id, 'language?', {
        reply_markup: {
            inline_keyboard: inline_keyboard_start
        }
    })
})


// callback_query
bot.on('callback_query', query => {
    const {chat, message_id} = query.message

    switch (query.data) {
        case 'start':
            main_menu(chat.id)
            break
        case 'forward':
            bot.forwardMessage(chat.id, chat.id, message_id)
            break
        case 'reply':
            bot.sendMessage(chat.id, 'Bla-bla-bla' ,{
                reply_to_message_id: message_id
            })
            break
        case 'edit':
            bot.editMessageText('edited', {
                chat_id: chat.id,
                message_id: message_id,
                reply_markup: {
                    inline_keyboard: inline_keyboard_start
                }
            })
            break
        case 'delete':
            bot.deleteMessage(chat.id, message_id)
            break
        case 'document':
            bot.sendMessage(chat.id, 'Start upload')

            fs.readFile(__dirname + '/Огневая-Колосов.rar', (err, file) => {
                bot.sendDocument(chat.id, file).then(() => {
                    bot.sendMessage(chat.id, 'upload finish')
                })
            })
            break
        case 'sticker':
            bot.sendSticker(chat.id, 'moon-magic-impact-lunar-cycle-magical-activities-main.webp', {
                reply_markup: {
                    inline_keyboard: like_dislike
                }
            })
            break
        case 'photo':
            bot.sendPhoto(chat.id, 'boned.jpg', {
                caption: 'Как дела?',
                reply_markup: {
                    inline_keyboard: like_dislike
                }
            })
            break
        case 'audio':
            bot.sendMessage(chat.id, 'Start upload audio')

            fs.readFile(__dirname + '/audio_test.mp3', (err, audio) => {
                bot.sendAudio(chat.id, audio).then(() => {
                    bot.sendMessage(chat.id, 'Finish upload')
                })
            })
            break
        case 'contact':
            bot.sendContact(chat.id, '375333910992', 'Pasha', {
                last_name: 'Kolosov'
            })
            break
        case 'location':
            const latitude = 53.172070
            const longitude = 24.439388
            bot.sendLocation(chat.id, latitude, longitude)
            break
        case 'video':
            fs.readFile(__dirname + '/small.mp4', (err, video) => {
                bot.sendVideo(chat.id, video, {
                    reply_markup: {
                        inline_keyboard: like_dislike
                    }
                }).then(() => {
                    bot.sendMessage(chat.id,'Лучше смотри это чем порно...')
                })
            })
    }
    bot.answerCallbackQuery(query.id, query.data)
})


// Управление клавиаутрой
bot.on('message', msg => {
    const {id} = msg['chat']
    const text = msg.text

    if (text === 'Начать работу')
    {
      start_menu(id)
    }
    else if (text === 'Курс крипты')
    {
        bot.sendMessage(id, 'Выберете валюту', {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Bitcoin',
                            callback_data: 'btc'
                        },
                        {
                            text: 'Litecoin',
                            callback_data: 'ltc'
                        },
                    ],
                    [
                        {
                            text: 'Ethereum',
                            callback_data: 'eth'
                        },
                        {
                            text: 'Cash',
                            callback_data: 'csh'
                        }
                    ]
                ]
            }
        })
    }
    else if (text === 'Прогноз погоды')
    {
        bot.sendMessage(id, 'требуется местоположение', {
            reply_markup: {
                keyboard: [
                    [
                        {
                            text: 'Отправить местоположение',
                            request_location: true
                        },
                        {text: 'Выбрать из списка'}
                    ],
                    [
                        {
                            text: 'Назад',
                        }
                    ]
                ]
            }
        })
    }
    else if (text === 'Выбрать из списка')
    {
        bot.sendMessage(id, 'Список доступных мест:', {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Витебск',
                            callback_data: 'bt'
                        },
                        {
                            text: 'Могилев',
                            callback_data: 'mg'
                        },
                        {
                            text: 'Гомель',
                            callback_data: 'gm'
                        }
                    ],
                    [
                        {
                            text: 'Гродно',
                            callback_data: 'gr'
                        },
                        {
                            text: 'Бреест',
                            callback_data: 'br'
                        }
                    ],
                    [
                        {
                            text: 'Минск',
                            callback_data: 'mn'
                        }
                    ]
                ]
            }
        })
    }
    else if (text === 'Назад')
    {
        start_menu(id)
    }
    else if (text === 'Главное меню')
    {
        main_menu(id)
    }



    else if (text === 'Справка')
    {
        bot.sendMessage(id, 'Справка', {
                reply_markup: {
                    keyboard: [
                        ['Список команд', 'Описание бота'],
                        ['Назад']
                    ]}
            }
        )
    }
    else if (text === 'Список команд')
    {
        bot.sendMessage(id, 'При переходе по этой вкладке\n должен передаваться список команд:')
    }
    else if (text === 'Описание бота')
    {
        bot.sendMessage(id, 'Это послушный мальчик, жаль что тупой')
    }


    else if (text === 'Закрыть')
    {
        bot.sendMessage(id, '...', {reply_markup: {remove_keyboard: true}})
        bot.sendMessage(id, 'Точно?', {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Открыть',
                            callback_data: 'start'
                        }
                    ]
                ]
            }
        })
    }



    else
    {
        console.log('pass')
    }
})


// Инлайн режим
bot.on('inline_query', query => {
    const {result} = ['article1, article2, article3']
    bot.answerInlineQuery(query.id, result, {
        cache_time: 0
    })
})
