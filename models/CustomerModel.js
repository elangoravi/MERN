const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CustomerSchema = new Schema(
    {
        name: { type: String, required: true, maxlength: 50 },
        phone: { type: Number, require: true, maxlength: 15 },
        address: { type: String },
        startDate: { type: Date, required: true },
        amount: { type: Number, required: true },
        interest: { type: Number },
        aadhaar: { type: Number, maxlength: 12 }
    }
)

//Export Model
module.exports = mongoose.model("Customer", CustomerSchema);