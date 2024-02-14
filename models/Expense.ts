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
        budgetCategoryName: {
            type: String,
            required: true
        },
        budgetCategoryId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        budgetCategoryPercentage: {
            type: Number,
            required: true
        }
    },
    expenseAmount: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
    },
    updatedAt: {
        type: Date,
        required: true
    },
    createdAt: { type: Date, default: Date.now },
});

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense