import { Request, Response, NextFunction } from 'express'
import Expense from '../models/Expense';
import { UserForClientProp } from '../types';

export const AddExpense = async (req: Request, res: Response) => {
    try {
        const user = req.user as UserForClientProp;

        const expense = new Expense({
            user: user._id,
            budget: req.body.budget,
            budgetCategory: req.body.budgetCategory,
            expenseAmount: req.body.expenseAmount,
            description: req.body.description
        });
        await expense.save()
        return res.status(200).json(expense);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Server error" });
    }
};

export const EditExpense = async (req: Request, res: Response) => {
    try {
        const budgetId = req.body.budgetId;

        const budget = await Expense.findById(budgetId);

        if (!budget) {
            return res.status(404).json({ message: "Budget not found" });
        }

        /*
        budget.budgetName = req.body.budgetName;
        budget.monthlyBudgetAmount = req.body.monthlyBudgetAmount;
        budget.categories = req.body.budgetCategories;
        budget.updatedAt = new Date()
        */

        await budget.save();
        
        return res.status(200).json(budget);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Server error" });
    }
};

export const GetExpenses = async (req: Request, res: Response) => {
    try {
        const user = req.user as UserForClientProp;
        const allUserExpenses = await Expense.find({ user: user._id })
        res.status(200).json(allUserExpenses)
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Server error" });
    }
}