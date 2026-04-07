import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    material: { type: String, default: "" },
    category: { type: String, required: true },
    price: { type: Number, default: 0 },
    oldPrice: { type: Number, default: 0 },
    dimensions: { type: String, default: "" },
    isFeatured: { type: Boolean, default: false },
});
const Product = mongoose.model('Product', productSchema);
export default Product