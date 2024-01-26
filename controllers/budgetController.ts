import { Request, Response, NextFunction } from 'express'
import Budget from '../models/Budget';
import User from '../models/User';
import { UserForClientProp } from '../types';

export const AddBudget = async (req: Request, res: Response) => {
    try {
        const user = req.user as UserForClientProp;

        const budget = new Budget({
            user: user._id,
            budgetName: req.body.budgetName,
            monthlyBudgetAmount: req.body.monthlyBudgetAmount,
            categories: req.body.budgetCategories
        });
        await budget.save()
        return res.status(200).send({ message: "Budget Successfully Added!" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Server error" });
    }
};

export const GetBudgets = async (req: Request, res: Response) => {
    try {
        const allBudgets = await Budget.find({})
        res.status(200).json(allBudgets)
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Server error" });
    }
}