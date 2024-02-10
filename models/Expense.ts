import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    budget: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Budget',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    budgetCategory: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    expenseAmount: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
    },
    createdAt: { type: Date, default: Date.now },
});

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense