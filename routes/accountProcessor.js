
var accountTransactionController = require('../controllers/accountTransactionController')

exports.processCreateTransfer = async function (postData, res) {
    var result = await accountTransactionController.transferAmount(postData);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));


};

exports.processGetBalance = async function (postData, res) {
    var result = await accountTransactionController.getBalance(postData);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));


};

exports.processGetHistory = async function (postData, res) {
    var result = await accountTransactionController.getTransactionHistory(postData);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));


};
