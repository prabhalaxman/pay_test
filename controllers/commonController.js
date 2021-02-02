var accountTransactionModel = require('../models/account-transaction');
var userAccountModel = require('../models/user-account');
var transactionHistoryModel = require('../models/transaction-history');

var mongoose = require("mongoose");



module.exports.saveCreditDebitTransaction = async function (creditData) {

    // console.log('createUsers called')
    return new Promise(async function (resolve, reject) {
        try {
            transactionHistoryModel.saveData(creditData, function (err, data) {

                console.log('err ', err)
                console.log('data ', data)

                if (err) {



                    resolve({ "status": "failure", "message": "Failed to transfer the balance", err });

                } else {
                    resolve({ "status": "success", "message": "Balance transfer data saved successfully" });
                }
            })
        } catch (err) {
            resolve({ "status": "failure", "message": "Internal Server Error", err });

        } finally {
        }
    });

}

module.exports.updateCreditDebitBalance = async function (query, updateData) {

    // console.log('createUsers called')
    return new Promise(async function (resolve, reject) {
        try {

            accountTransactionModel.updateDataBasedQuery(query, updateData, function (err, data) {

                console.log('err ', err)
                console.log('data ', data)

                if (err) {


                    resolve({ "status": "failure", "message": "Failed to create Balance data", err });

                } else {



                    resolve({ "status": "success", "message": "Balance data created successfully", data });
                }
            })

        } catch (err) {
            resolve({ "status": "failure", "message": "Internal Server Error", err });

        } finally {
        }
    });

}



module.exports.saveUserAccountData = async function (creditData) {

    // console.log('createUsers called')
    return new Promise(async function (resolve, reject) {
        try {
            userAccountModel.saveData(creditData, function (err, data) {

                console.log('err ', err)
                console.log('data ', data)

                if (err) {

                    if (11000 === err.code || 11001 === err.code) {
                        resolve({ "status": "failure", "message": "Data already exists" });
                    } else {

                        resolve({ "status": "failure", "message": "Failed to create the user account", err });
                    }

                } else {

                    resolve({ "status": "success", "message": "User account created successfully" });
                }
            })
        } catch (err) {
            resolve({ "status": "failure", "message": "Internal Server Error", err });

        } finally {
        }
    });

}

module.exports.saveAccountTxnData = async function (creditData) {

    // console.log('createUsers called')
    return new Promise(async function (resolve, reject) {
        try {
            accountTransactionModel.saveData(creditData, function (err, data) {

                console.log('err ', err)
                console.log('data ', data)

                if (err) {

                    if (11000 === err.code || 11001 === err.code) {
                        resolve({ "status": "failure", "message": "Data already exists" });
                    } else {

                        resolve({ "status": "failure", "message": "Failed to create the user account", err });
                    }

                } else {



                    resolve({ "status": "success", "message": "Account transaction created successfully" });
                }
            })
        } catch (err) {
            resolve({ "status": "failure", "message": "Internal Server Error", err });

        } finally {
        }
    });

}