import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    percentage: {
        type: Number,
        required: true,
    },
});

const budgetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    budgetName: {
        type: String,
        required: true,
        unique: false
    },
    categories: {
        type: [categorySchema],
        required: true,
        unique: false
    },
    createdAt: { type: Date, default: Date.now },
});

const Budget = mongoose.model("Budget", budgetSchema);
export default Budget