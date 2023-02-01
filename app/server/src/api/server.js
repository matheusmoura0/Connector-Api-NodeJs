const express = require('express');
const ProductRouter = require('./routes/ProductRouter');
const OrderRouter = require('./routes/OrdersRouter');

const app = express();

const port = 3000;


app.use(express.json());
app.use('/products', ProductRouter);
app.use('/', OrderRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
