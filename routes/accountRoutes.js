
var accountProcessor = require('./accountProcessor')

/*
*To transfer Amount between two account

requireed parameters : {
    "accountNumber": "1612290327494",
    "toAccountNumber": "1612290331480",
    "transferAmount": 0.23
}
*/
exports.transferAmount = async function (req, res) {
    body = '';

    req.on('data', function (chunk) {
        body += chunk;
    });

    req.on('end', function () {

        postBody = JSON.parse(body);

        var result1 = accountProcessor.processCreateTransfer(postBody, res);

    });
};


/*
*To get balance for the particular account

requireed parameters : {
 
    "accountNumber": "1612290331480"
}
*/
exports.getBalance = async function (req, res) {
    body = '';

    req.on('data', function (chunk) {
        body += chunk;
    });

    req.on('end', function () {

        postBody = JSON.parse(body);

        var result1 = accountProcessor.processGetBalance(postBody, res);

    });
};

/*
*To get transaction history for the particular account

requireed parameters : {
 
    "accountNumber": "1612290331480"
}
*/
exports.getTransactionHistory = async function (req, res) {
    body = '';

    req.on('data', function (chunk) {
        body += chunk;
    });

    req.on('end', function () {

        postBody = JSON.parse(body);

        var result1 = accountProcessor.processGetHistory(postBody, res);

    });
};