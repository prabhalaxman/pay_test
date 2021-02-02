
var userAccountProcessor = require('./userAccountProcessor')


/*
*To Create user account with Default balance

requireed parameters : {
    "userIdNumber": "ckepp2726b",
    "name": "prabhakaran2",
    "address": "test,tets,200023",
    "depositAmount": 100.00
}
*/

exports.createAccounts = async function (req, res) {
    body = '';

    req.on('data', function (chunk) {
        body += chunk;
    });

    req.on('end', function () {

        postBody = JSON.parse(body);

        var result1 = userAccountProcessor.processCreateAccount(postBody, res);
    });
};


/*
* To get all users
*/
exports.getAllUsers = async function (req, res) {
    body = '';

    req.on('data', function (chunk) {
        body += chunk;
    });

    req.on('end', function () {



        var result1 = userAccountProcessor.getAllUsers(res);
    });
};
