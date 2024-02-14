const mongoose = require("mongoose")


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
        default: new Date(Date.now()+ 3*24*60*60*1000),
    }
})

const Verification = mongoose.models?.Verification || mongoose.model("Verification",verficationSchema);

module.exports = Verification;