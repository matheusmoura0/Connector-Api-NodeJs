const express = require('express');
const ProductRouter = require('./routes/ProductRouter');
const OrderRouter = require('./routes/OrdersRouter');
const swaggerDocs = require('./swagger.json');





const app = express();

const port = 3000;


const swaggerUi = require('swagger-ui-express');

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



app.use(express.json());
app.use('/products', ProductRouter);
app.use('/', OrderRouter);

  

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
