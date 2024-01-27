import express from 'express'
import { AddBudget, GetBudgets, EditBudget } from '../controllers/budgetController'

const budgetRouter = express.Router()

budgetRouter.post('/add-budget', AddBudget)
budgetRouter.put('/edit-budget', EditBudget)
budgetRouter.get('/get-budgets', GetBudgets)

export default budgetRouter