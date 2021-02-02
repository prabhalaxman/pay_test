
var userAccountController = require('../controllers/userAccountController')

exports.processCreateAccount = async function (postData, res) {
    var result = await userAccountController.createAccount(postData);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));


};


exports.getAllUsers = async function (res) {
    var result = await userAccountController.getAllUsers();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));


};

