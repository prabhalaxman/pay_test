var mongoose = require('mongoose');



var historySchema = mongoose.Schema({


    _id: mongoose.Schema.Types.ObjectId,


    accountNumber: {
        type: String,
        required: true
    },
    toAccountNumber: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    refNumber: {
        type: String,
    },
    type: {
        type: String,
    },
    transactionDate: {
        type: Date,
    },

    createdAt: {
        type: Date, default: Date.now
    },
    modifiedAt: {
        type: Date
    },

    isActive: {
        type: Boolean,
        default: true
    },


}, {
    versionKey: false
});


var txnHistoryModel = module.exports = mongoose.model("transaction_history", historySchema);

module.exports.saveData = (data, cb) => {
    data.save(cb);
};


module.exports.getSingleRecordQuery = function (query, callback) {
    txnHistoryModel.findOne(query, callback);
}

module.exports.getAllRecordBasedQuery = function (query, callback) {
    txnHistoryModel.find(query, callback);
}

module.exports.updateDataBasedQuery = function (query, updateData, callback) {
    txnHistoryModel.findOneAndUpdate(query, updateData, { new: true }, callback);
}


module.exports.removeDataBasedQuery = function (query, callback) {
    txnHistoryModel.deleteMany(query, callback);
}