const express = require('express');
const router = express.Router();

const pool = require('../Pool');

router.get('/',(req, res)=>{
    pool.query('SELECT `order`.*,`Name` FROM `order` join \
    `customer` on `order`.CustomerID=customer.ID',  (err, result, fields)=> {
        if (err) {
            res.status(500).send(err)
            console.log({err})
        } 
        res.send(result);
    })
 })
// particular orderr
router.get('/order/:id',(req, res)=>{
    pool.query('SELECT * FROM order',  (err, result, fields)=> {
        if (err) throw new Error(err)    // Do something with result.
        res.send(result);
    })
 })
//  post order creat an orderr 
router.post('/',(req, res)=>{
    // console.log(req.body);
    let items = req.body.Items;
    // console.log(items);
    // for order table
    pool.query('INSERT INTO `order` (OrderNo, CustomerID, PMethod, GTotal) VALUES (?, ?, ?, ?)',[req.body.OrderNo,req.body.CustomerID,req.body.PMethod,req.body.GTotal],  (err, result, fields)=> {
        if (err) {
            res.status(500).send(err)
            console.log({err})
        } 
        else{
            console.log(result)
            // for orderitems table
            let values = [];
            items.forEach(element => {
                let data = [result.insertId,element.itemId,element.quantity]
                values.push(data);
            });
            pool.query('INSERT INTO `orderitems` (`OrderID`,`ItemID`,`Quantity`) \
            VALUES ?',[values],(error, rresult, ffields)=>{
                if (error) {
                    res.status(500).send(error)
                    console.log({error})
                }else{
                    res.send(rresult)
                } 
            });
        }
    })
 })

//  // edit order
//  router.put('/order/:id',(req, res)=>{
//     pool.query('SELECT * FROM order',  (err, result, fields)=> {
//         if (err) throw new Error(err)    // Do something with result.
//         res.send(result);
//     })
//  })   
//  // delete order
//  router.delete('/order/:id',(req, res)=>{ 
//     pool.query('SELECT * FROM order',  (err, result, fields)=> {
//         if (err) throw new Error(err)    // Do something with result.
//         res.send(result);
//     })
// })   


module.exports = router