const axios = require('axios')

const html = axios
    .get('https://github.com/Nonzakiz')
    .then(result => result)
const html3 = axios
    .get('https://github.com/Nonzakiz')
    .then(result => result)
const html2 = axios
    .get('https://github.com/Nonzakiz')
    .then(result => result)
Promise
    .all([html,html2,html3])
    .then(result => console.log(result))