import { Request, Response, NextFunction } from 'express'
import Expense from '../models/Expense';
import { UserForClientProp } from '../types';

export const AddExpense = async (req: Request, res: Response) => {
    try {
        const user = req.user as UserForClientProp;
        const expense = new Expense({
            user: user._id,
            budget: req.body.budget,
            budgetCategory: {
                budgetCategoryName: req.body.budgetCategory.budgetCategoryName,
                budgetCategoryPercentage: req.body.budgetCategory.budgetCategoryPercentage,
                budgetCategoryId: req.body.budgetCategory.budgetCategoryId,
            },
            expenseAmount: req.body.expenseAmount,
            description: req.body.description,
            updatedAt: new Date()
        });

        await expense.populate({
            path: 'budget',
            select: 'budgetName monthlyBudgetAmount categories'
        })

        await expense.save();

        return res.status(200).json(expense);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Server error" });
    }
};


export const EditExpense = async (req: Request, res: Response) => {
    try {
        const expenseId = req.body.expenseId;

        const expense = await Expense.findById(expenseId);

        if (!expense) {
            return res.status(404).json({ message: "Budget not found" });
        }

        expense.budget = req.body.budget;
        expense.budgetCategory = {
            budgetCategoryName: req.body.budgetCategory.budgetCategoryName,
            budgetCategoryPercentage: req.body.budgetCategory.budgetCategoryPercentage,
            budgetCategoryId: req.body.budgetCategory.budgetCategoryId,
        },
        expense.expenseAmount = req.body.expenseAmount;
        expense.description = req.body.description;
        expense.updatedAt = new Date()

        await expense.populate({
            path: 'budget',
            select: 'budgetName monthlyBudgetAmount categories'
        })

        await expense.save();
        
        return res.status(200).json(expense);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Server error" });
    }
};

export const GetExpenses = async (req: Request, res: Response) => {
    try {
        const user = req.user as UserForClientProp;
        const allUserExpenses = await Expense.find({ user: user._id }).populate({
            path: 'budget',
            select: 'budgetName monthlyBudgetAmount categories'
        })
        res.status(200).json(allUserExpenses)
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Server error" });
    }
}

export const DeleteExpense = async (req: Request, res: Response) => {
    try {
        const expenseId = req.body._id;

        await Expense.deleteOne({ _id: expenseId });

        res.status(200).send({ message: "Expense Successfully Deleted!" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Server error" });
    }
}