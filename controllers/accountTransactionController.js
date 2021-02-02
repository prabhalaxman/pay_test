
var accountTransactionModel = require('../models/account-transaction')
var transactionHistoryModel = require('../models/transaction-history')

var readController = require('./readController')
var commonController = require('./commonController')

var mongoose = require("mongoose");

module.exports.transferAmount = async function (postData) {

    // console.log('createUsers called')
    return new Promise(async function (resolve, reject) {
        try {
            if (postData.accountNumber != null && postData.accountNumber != "" && postData.toAccountNumber != null && postData.toAccountNumber != "") {

                var d = new Date();
                var balanceResult = await readController.getAccountBalance(postData.accountNumber);

                var toAccountBalance = await readController.getAccountBalance(postData.toAccountNumber);

                if (balanceResult.data.balance >= Number(postData.transferAmount) && toAccountBalance.data.balance >= Number(postData.transferAmount)) {


                    var creditData = new transactionHistoryModel({
                        _id: new mongoose.Types.ObjectId(),
                        toAccountNumber: postData.toAccountNumber,
                        accountNumber: postData.accountNumber,
                        amount: postData.transferAmount,
                        refNumber: "ref" + d.getTime(),
                        type: "d",
                        transactionDate: new Date(),
                        createdAt: new Date(),
                        modifiedAt: new Date(),
                        isActive: true

                    });
                    console.log('credit data ', creditData);
                    var creditResult = await commonController.saveCreditDebitTransaction(creditData);

                    if (creditResult.status == 'success') {
                        var debitData = new transactionHistoryModel({
                            _id: new mongoose.Types.ObjectId(),
                            toAccountNumber: postData.accountNumber,
                            accountNumber: postData.toAccountNumber,
                            amount: postData.transferAmount,
                            refNumber: "ref" + d.getTime(),
                            type: "c",
                            transactionDate: new Date(),
                            createdAt: new Date(),
                            modifiedAt: new Date(),
                            isActive: true

                        });
                        console.log('debit data ', debitData);
                        var debitResult = await commonController.saveCreditDebitTransaction(debitData);

                        if (debitResult.status == 'success') {

                            var updateCreditData = new accountTransactionModel({

                                modifiedAt: new Date(),
                                balance: Number(postData.transferAmount) + toAccountBalance.data.balance
                            });

                            var updateCrQuery = {
                                accountNumber: postData.toAccountNumber,
                                isActive: true
                            }

                            var creditBalanceResult = await commonController.updateCreditDebitBalance(updateCrQuery, updateCreditData);

                            if (creditBalanceResult.status == 'success') {

                                var updateDebitData = new accountTransactionModel({

                                    modifiedAt: new Date(),
                                    balance: balanceResult.data.balance - Number(postData.transferAmount)
                                });

                                var updateDrQuery = {
                                    accountNumber: postData.accountNumber,
                                    isActive: true
                                }

                                var debitBalanceResult = await commonController.updateCreditDebitBalance(updateDrQuery, updateDebitData);

                                resolve(debitBalanceResult);
                            } else {
                                resolve(creditBalanceResult);
                            }
                        } else {
                            resolve(debitResult);
                        }
                    } else {
                        resolve(creditResult);
                    }


                } else {
                    resolve({ "status": "failure", "message": "Insufficient balance" });
                }


            } else {
                resolve({ "status": "failure", "message": "From and To account number is required" })

            }
        } catch (err) {
            console.log(err)
            resolve({ "status": "failure", "message": "Internal Server Error", err });

        } finally {
        }
    });

}

module.exports.getBalance = async function (postData) {

    // console.log('createUsers called')
    return new Promise(async function (resolve, reject) {
        try {
            if (postData.accountNumber != null && postData.accountNumber != "") {

                var query = {
                    accountNumber: postData.accountNumber,
                    isActive: true
                }

                accountTransactionModel.getSingleRecordQuery(query, function (err, data) {

                    console.log('err ', err)
                    console.log('data ', data)

                    if (err) {


                        resolve({ "status": "failure", "message": "Failed to create the user account", err });

                    } else {



                        resolve({ "status": "success", "message": "Account balance fetched successfully", data });
                    }
                })

            } else {
                resolve({ "status": "failure", "message": "ID number is required" })

            }
        } catch (err) {
            resolve({ "status": "failure", "message": "Internal Server Error", err });

        } finally {
        }
    });

}


module.exports.getTransactionHistory = async function (postData) {

    // console.log('createUsers called')
    return new Promise(async function (resolve, reject) {
        try {
            if (postData.accountNumber != null && postData.accountNumber != "") {
                var query = {
                    $or: [
                        { accountNumber: postData.accountNumber },
                        { toAccountNumber: postData.accountNumber }
                    ],
                    isActive: true
                }



                transactionHistoryModel.getAllRecordBasedQuery(query, function (err, data) {

                    console.log('err ', err)
                    console.log('data ', data)

                    if (err) {

                        resolve({ "status": "failure", "message": "Failed to create the user account", err });

                    } else {

                        resolve({ "status": "success", "message": "Transaction history fetched successfully", data });
                    }
                })

            } else {
                resolve({ "status": "failure", "message": "ID number is required" })

            }
        } catch (err) {
            console.log(err)
            resolve({ "status": "failure", "message": "Internal Server Error", err });

        } finally {
        }
    });

}