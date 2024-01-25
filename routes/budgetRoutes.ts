import express from 'express'
import { AddBudget } from '../controllers/budgetController'

const budgetRouter = express.Router()

budgetRouter.post('/add-budget', AddBudget)

export default budgetRouter