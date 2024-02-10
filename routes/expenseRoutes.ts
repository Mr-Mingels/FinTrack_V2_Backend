import express from 'express'
import { AddExpense, GetExpenses } from '../controllers/expenseController'

const expenseRouter = express.Router()

expenseRouter.post('/add-expense', AddExpense)
expenseRouter.get('/get-expenses', GetExpenses)

export default expenseRouter