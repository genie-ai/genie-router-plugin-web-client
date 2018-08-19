const path = require('path');
const readFile = require('pify')((require('fs').readFile));

let clientIndex = '';

function getClient(req, res) {
    res.send(clientIndex);
}

async function start(config, app, express) {
    const view = await readFile(path.join(__dirname, '../../views/client.html'), 'utf8');

    const endpoint = config.endpoint ? config.endpoint : '/api/message';
    clientIndex = view.replace(/{{endpoint}}/g, endpoint).replace('{{accessToken}}', config.accessToken);
    const prefix = config.prefix ? config.prefix : '';
    clientIndex = clientIndex.replace(/{{prefix}}/g, prefix);
    app.use('/web-client/assets', express.static(path.join(__dirname, '/../../assets')));
    app.get('/web-client', getClient);
    if (config.registerOnRoot) {
        app.get('/', getClient);
    }
}

module.exports = { start };
