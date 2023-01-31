const express = require('express');
const ProductRouter = require('./routes/ProductRouter');

const seed = require('../database/seeders/20230130183434-orders');
seed().catch(console.error);

const app = express();
const port = 3000;

app.use('/products', ProductRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
