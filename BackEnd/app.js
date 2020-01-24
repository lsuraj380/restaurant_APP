const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const customerRoutes = require('./API/Routes/customer');
const orderRoutes = require('./API/Routes/order');
const ordereItemsRoutes = require('./API/Routes/orderitems');
const itemsRoutes = require('./API/Routes/items');
const cros = require('cors');

app.use(cros());
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
app.use(bodyParser.json());


app.get('/',(req,res)=>{
    res.send("Hello World !!!!!.......This api is underConstruction");
})

app.use('/api/customer',customerRoutes);
app.use('/api/items',itemsRoutes); 
app.use('/api/order',orderRoutes);
app.use('/api/orderitems',ordereItemsRoutes);

app.use((req,res,next)=>{
    const error = new Error('NOT FOUND!');
    error.status = 404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
})
 
module.exports = app;