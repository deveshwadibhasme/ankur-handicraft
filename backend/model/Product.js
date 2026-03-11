import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    isFeatured: Boolean,
});
const Product = mongoose.model('Product', productSchema);
export default Product