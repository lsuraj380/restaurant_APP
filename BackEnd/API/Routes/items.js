const express = require('express');
const router = express.Router();

const pool = require('../Pool');

router.get('/',(req,res)=>{
    pool.query('SELECT * FROM item',(err,result,fields)=>{
        if(err) throw new Error(err)
        res.send(result);
    })
})
router.get('/:id',(req,res)=>{
    pool.query('SELECT * FROM item WHERE ItemID=?',[req.params.id],(err,result,fields)=>{
        if(err) throw new Error(err)
        res.send(result);
    })
})

module.exports = router;