import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
    userName: { type: String, required: true },
    number: { type: String, required: true },
    message: { type: String, required: true },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: false
    },
}, { timestamps: true });

const Inquiry = mongoose.model('Inquiry', inquirySchema);

export default Inquiry;
