const express = require('express');
const ProductRouter = require('./routes/ProductRouter');

const app = express();
const port = 3000;

app.use('/products', ProductRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
