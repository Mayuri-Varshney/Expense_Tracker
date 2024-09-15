const express=require('express')
const { addAllTransaction,getAllTransaction } = require('../controllers/transactionCntrl')

const router = express.Router()


router.post('/add-transaction',addAllTransaction)

router.post('/get-transaction',getAllTransaction)

module.exports=router