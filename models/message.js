
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let messageChecker = (message) => {
    if (!message) {
        return false;
    } else {
        if (message.length < 3 && message.length > 500) {
            return false;
        } else {
            return true;
        }
    }
};

const messageValid = [
    {
        validator: messageChecker,
        message: ''
    }
];

const messageSchema = new Schema({
    comment: { type: String, required: true, validate: messageValid },
    // like: { type: String, required: true },
});

module.exports = mongoose.model('Message', messageSchema);
