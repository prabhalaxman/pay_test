var mongoose = require('mongoose');


var userAccountSchema = mongoose.Schema({


    _id: mongoose.Schema.Types.ObjectId,

    accountNumber: {
        type: String,
        required: true
    },

    userIdNumber: {
        type: String,
        required: true
    },
    

    name: {
        type: String,
        required: true
    },

    address: {
        type: String,
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
    }




}, {
    versionKey: false
});

userAccountSchema.index({ userIdNumber: 1, accountNumber: 1 }, { unique: true });

var userAccountModel = module.exports = mongoose.model("user_account", userAccountSchema);

module.exports.saveData = (data, cb) => {
    data.save(cb);
};


module.exports.getSingleRecordQuery = function (query, callback) {
    userAccountModel.findOne(query, callback);
}

module.exports.getAllRecordBasedQuery = function (query, callback) {
    userAccountModel.find(query, callback);
}

module.exports.updateDataBasedQuery = function (query, updateData, callback) {
    userAccountModel.findOneAndUpdate(query, updateData, { new: true }, callback);
}


module.exports.removeDataBasedQuery = function (query, callback) {
    userAccountModel.deleteMany(query, callback);
}