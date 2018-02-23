const path = require('path')
const Promise = require('bluebird')
const readFile = Promise.promisify(require('fs').readFile)

let clientIndex = ''

function start (config, app, express) {
  return readFile(path.join(__dirname, '../../views/client.html'), 'utf8')
    .then(function (view) {
      let endpoint = config.endpoint ? config.endpoint : '/api/message'
      clientIndex = view.replace(/{{endpoint}}/g, endpoint).replace('{{accessToken}}', config.accessToken)
      let prefix = config.prefix ? config.prefix : ''
      clientIndex = clientIndex.replace(/{{prefix}}/g, prefix)
      app.use('/web-client/assets', express.static(path.join(__dirname, '/../../assets')))
      app.get('/web-client', getClient)
      if (config.registerOnRoot) {
        app.get('/', getClient)
      }
    })
}

function getClient (req, res) {
  res.send(clientIndex)
}

module.exports = {start: start}
