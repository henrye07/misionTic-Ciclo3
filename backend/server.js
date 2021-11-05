const express = require('express');
const cors = require('cors');
const app = express();
const usersRouter = require('./api/users');
const productsRouter = require('./api/products');
const invoicesRouter = require('./api/invoices');
const orderRouter = require('./api/order');
const verdorRouter =require('./api/vendor')
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/api/users',usersRouter);
app.use('/api/vendors',verdorRouter);
app.use('/api/products',productsRouter);
app.use('/api/invoices',invoicesRouter);
app.use('/api/order',orderRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el Puerto ${PORT}`)
    // db.sequelize.sync({force:true})
    // .then(conn=>{
    //         console.log('Connect to the database!')
    //     })
    // .catch(error=>{
    //     console.error('Unable to connect to the database:', error);
    //   })
});