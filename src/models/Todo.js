import mongoose from 'mongoose';

let todoSchema = new mongoose.Schema({
    date: String,
    price: String,
    persent: String,
    come: String
});

export default mongoose.model('Todo', todoSchema);
