import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    material: { type: String },
    category: { type: String, required: true },
    price: { type: Number },
    dimensions: { type: String },
    isFeatured: { type: Boolean, default: false },
});
const Product = mongoose.model('Product', productSchema);
export default Product