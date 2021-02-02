var mongoose = require('mongoose');



var accountTxnSchema = mongoose.Schema({


    _id: mongoose.Schema.Types.ObjectId,


    accountNumber: {
        type: String,
        required: true,
        unique:true
    },
   
    balance: {
        type: Number,
        required: true
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


var accountModel = module.exports = mongoose.model("account", accountTxnSchema);

module.exports.saveData = (data, cb) => {
    data.save(cb);
};


module.exports.getSingleRecordQuery = function (query, callback) {
    accountModel.findOne(query, callback);
}

module.exports.getAllRecordBasedQuery = function (query, callback) {
    accountModel.find(query, callback);
}

module.exports.updateDataBasedQuery = function (query, updateData, callback) {
    accountModel.findOneAndUpdate(query, updateData, { new: true }, callback);
}


module.exports.removeDataBasedQuery = function (query, callback) {
    accountModel.deleteMany(query, callback);
}