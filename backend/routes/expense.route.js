// expense.route.js
const express = require('express');
const { addExpense } = require('../controller/expense');
const { getExpenses} = require('../controller/expense');
const { deleteExpenses } = require('../controller/expense');
const { updateExpense } = require('../controller/expense');

const expenseRouter = express.Router();

expenseRouter.post('/add', addExpense);

expenseRouter.get('/list', getExpenses);

expenseRouter.delete("/delete/:expenseID", deleteExpenses);

expenseRouter.put('/update/:expenseID', updateExpense); 

module.exports = expenseRouter;
