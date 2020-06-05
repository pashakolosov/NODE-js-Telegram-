const request = require('request')
const URL = 'https://api.telegram.org/bot'
const TOKEN = '958509167:AAHXTGUNUT_aFBQ2mjL7nP-H6Nb3u4lmXas/'


function get_updates() {
    const url = URL + TOKEN + 'getMe'
    return request.get(url).json()
}

console.log(get_updates())



console.log('')