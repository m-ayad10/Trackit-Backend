const { addIncome, fetchIncomes, DeleteIncome } = require('../Controller/IncomeController')

const router=require('express').Router()

router.post('/',addIncome)
router.get('/:user',fetchIncomes)
router.patch('/',DeleteIncome)

module.exports=router