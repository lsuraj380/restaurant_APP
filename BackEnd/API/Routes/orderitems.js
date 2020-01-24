const express = require('express');
const router = express.Router();

const pool = require('../Pool');

router.get('/',(req, res)=>{
    pool.query('SELECT * FROM orderitems',  (err, result, fields)=> {
        if (err) throw new Error(err)    // Do something with result.
        res.send(result);
    })
 })
router.post('/',(req, res)=>{
    console.log(req.body)
    req.body.forEach(element => {
        console.log(element.itemId,element.quantity)
    });
    pool.query('INSERT INTO orderitems (`OrderID`,`ItemID`,`Quantity`)\
    VALUES ( ?, ?, ?);',[req.body.OrderID,req.body.ItemID,req.body.Quantity],  (err, result, fields)=> {
        if (err) throw new Error(err)    // Do something with result.
        res.send(result);
    })
 })


module.exports = router