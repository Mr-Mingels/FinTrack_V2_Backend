import express from 'express'
import { AddExpense, GetExpenses, DeleteExpense, EditExpense } from '../controllers/expenseController'

const expenseRouter = express.Router()

expenseRouter.post('/add-expense', AddExpense)
expenseRouter.get('/get-expenses', GetExpenses)
expenseRouter.put('/edit-expense', EditExpense)
expenseRouter.delete('/delete-expense', DeleteExpense)

export default expenseRouter