const express = require('express')
const {premiummembership} = require('../controller/purchase')
const {updateTransactionStatus} = require('../controller/purchase')

const purchaseRouter =  express.Router()

purchaseRouter.post('/premiummembership', premiummembership);
purchaseRouter.put('/updatetransactionstatus', updateTransactionStatus); 

module.exports = purchaseRouter