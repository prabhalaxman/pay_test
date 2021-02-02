var userAccountModel = require('../models/user-account')
var transactionHistoryModel = require('../models/transaction-history')
var accountTransactionModel = require('../models/account-transaction')

var commonController = require('./commonController')

var mongoose = require("mongoose");
module.exports.createAccount = async function (postData) {

    // console.log('createUsers called')
    return new Promise(async function (resolve, reject) {
        try {
            if (postData.userIdNumber != null && postData.userIdNumber != "") {

                var d = new Date();
                var accountNumber = d.getTime();

                var saveData = new userAccountModel({
                    _id: new mongoose.Types.ObjectId(),
                    accountNumber: accountNumber,
                    userIdNumber: postData.userIdNumber,
                    name: postData.name,
                    address: postData.address,
                    createdAt: new Date(),
                    modifiedAt: new Date(),
                    isActive: true

                });

                var userAccountResult = await commonController.saveUserAccountData(saveData);

                if (userAccountResult.status == 'success') {


                    var accData = new accountTransactionModel({
                        _id: new mongoose.Types.ObjectId(),
                        accountNumber: accountNumber,
                        balance: postData.depositAmount,

                        createdAt: new Date(),
                        modifiedAt: new Date(),
                        isActive: true

                    });

                    var accTxnResult = await commonController.saveAccountTxnData(accData);

                    if (accTxnResult.status == 'success') {

                        var creditData = new transactionHistoryModel({
                            _id: new mongoose.Types.ObjectId(),
                            // toAccountNumber: postData.toAccountNumber,
                            accountNumber: accountNumber,
                            amount: postData.depositAmount,
                            refNumber: "ref" + d.getTime(),
                            type: "c",
                            transactionDate: new Date(),
                            createdAt: new Date(),
                            modifiedAt: new Date(),
                            isActive: true

                        });

                        var creditResult = await commonController.saveCreditDebitTransaction(creditData);
                        if (creditResult.status == 'success') {

                            resolve(userAccountResult);
                        } else {
                            resolve(creditResult);
                        }


                    } else {
                        resolve(accTxnResult);
                    }

                } else {
                    resolve(userAccountResult);
                }



            } else {
                resolve({ "status": "failure", "message": "ID number is required" })

            }
        } catch (err) {
            resolve({ "status": "failure", "message": "Internal Server Error", err });

        } finally {
        }
    });

}


module.exports.getAllUsers = async function () {

    // console.log('createUsers called')
    return new Promise(async function (resolve, reject) {
        try {
            var query = {
                isActive: true
            }

            userAccountModel.getAllRecordBasedQuery(query, function (err, data) {
                if (err) {
                    resolve({
                        status: 'failure', message: 'failed to fetch user data'
                    })
                } else {
                    resolve({
                        status: 'success', data: data
                    })
                }
            })
        } catch (err) {
            resolve({ "status": "failure", "message": "Internal Server Error", err });

        } finally {
        }
    });

}