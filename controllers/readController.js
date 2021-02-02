
var accountTransactionModel = require('../models/account-transaction')

var mongoose = require("mongoose");


module.exports.getAccountBalance = async function (accountNumber) {

    // console.log('createUsers called')
    return new Promise(async function (resolve, reject) {
        try {
            if (accountNumber != null && accountNumber != "") {

                var query = {
                    accountNumber: accountNumber,
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