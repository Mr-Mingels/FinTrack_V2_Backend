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
        required: true
    },
    budgetName: {
        type: String,
        required: true
    },
    monthlyBudgetAmount: {
        type: String,
        required: true
    },
    categories: {
        type: [categorySchema],
        required: true,
    },
    updatedAt: {
        type: Date,
        required: true
    },
    createdAt: { type: Date, default: Date.now },
});

const Budget = mongoose.model("Budget", budgetSchema);
export default Budget