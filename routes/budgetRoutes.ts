import express from 'express'
import { AddBudget, GetBudgets } from '../controllers/budgetController'

const budgetRouter = express.Router()

budgetRouter.post('/add-budget', AddBudget)
budgetRouter.get('/get-budgets', GetBudgets)

export default budgetRouter