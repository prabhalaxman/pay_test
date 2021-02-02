
const http = require('http');
const url = require('url');
var userAccountRoutes = require('./routes/userAccountRoutes');
var accountRoutes = require('./routes/accountRoutes');

module.exports = http.createServer((req, res) => {



    // var service = require('./service.js');
    const reqUrl = url.parse(req.url, true);

    if (reqUrl.pathname == '/create-account' && req.method === 'POST') {
        console.log('Request Type:' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);

        userAccountRoutes.createAccounts(req, res);

    } else if (reqUrl.pathname == '/create-transfer' && req.method === 'POST') {
        console.log('Request Type:' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);

        accountRoutes.transferAmount(req, res);

    } else if (reqUrl.pathname == '/get-balance' && req.method === 'POST') {
        console.log('Request Type:' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);

        accountRoutes.getBalance(req, res);

    } else if (reqUrl.pathname == '/get-history' && req.method === 'POST') {
        console.log('Request Type:' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);

        accountRoutes.getTransactionHistory(req, res);

    } else if (reqUrl.pathname == '/get-users' && req.method === 'POST') {
        console.log('Request Type:' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);

        userAccountRoutes.getAllUsers(req, res);

    }
    else {
        console.log('Request Type:' +
            req.method + ' Invalid Endpoint: ' +
            reqUrl.pathname);

        service.invalidRequest(req, res);

    }
});