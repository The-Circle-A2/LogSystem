const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    text: { type: String, required: true },
    userId: { type: Number },
    from: { type: String, required: true },
    time: { type: Date, default: Date.now },
});

const Log = mongoose.model('Log', schema);

module.exports = Log;