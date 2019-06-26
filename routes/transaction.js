const _ = require('lodash')
const { Transactions } = require('../models/transactions')
const auth = require('../middleware/auth')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

router.get("/transaction/:year/:month",auth, async(req,res)=>{
    const userId = req.user._id
    const month = req.params.month - 1
    const year = req.params.year
    const startDt = new Date(Date.UTC(year,month, 1, 0, 0, 0))
    const endDt = new Date(Date.UTC(year, month, 1, 0, 0, 0))

    const qry = {
        userId = userId,
        transactionDate = {
           $gte = startDt,
           $lt = endDt
        }
    }

    Transactions.find(qry)
    .sort( { 'transactionDate': 1})
    .exec()
    .then( docs => {
        res.status(200).json(docs)
    })
    .catch( err => {
        res.status(500).json({
          'message':'Error finding transaction for that user',
          "err": err  
        })
    })
})
module.exports = router