const { addExpense, fetchExpenses, DeleteExpense } = require('../Controller/ExpenseController')

const router=require('express').Router()

router.post('/',addExpense)
router.get('/:user',fetchExpenses)
router.patch('/',DeleteExpense)

module.exports=router