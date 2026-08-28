const mongoose = require("mongoose");

const appDataSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
}, {
    timestamps: true,
    minimize: false
});

module.exports = mongoose.model("AppData", appDataSchema);
