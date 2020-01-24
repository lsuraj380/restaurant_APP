const express = require('express');
const router = express.Router();

const pool = require('../Pool');

router.get('/',(req, res)=>{
    pool.query('SELECT * FROM customer',  (err, result, fields)=> {
        if (err) throw new Error(err) ;   
        else res.send(result);// Do something with result.
    })
 })

module.exports = router