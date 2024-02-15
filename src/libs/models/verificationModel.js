const mongoose = require("mongoose");
const { getDefaultExpirationDate } = require("../utils/utils");


const verficationSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    verify_token:{
        type: String,
        required: true,
    },
    expireIn:{
        type: Date,
        required: true,
        default: getDefaultExpirationDate(),
    }
})

const Verification = mongoose.models?.Verification || mongoose.model("Verification",verficationSchema);

module.exports = Verification;