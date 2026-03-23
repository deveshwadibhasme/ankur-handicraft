import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const Admin = mongoose.model('admin', AdminSchema);

export default Admin