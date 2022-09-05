const config = require('./Config/config');
const express = require('express');
const employeeRoutes = require('./Order/route');

const app = express();

app.use(employeeRoutes);


app.get('/api/', (req, res) => {
    res.send('Hello World');
});


app.listen(config.port, () => {
    console.log(`NODE JS  is running `);
});

app.use((req, res) => {
    res.status(404);                  // page not found
    res.send({ error: 'Route does not Exist', success: false });
});


app.use((error, req, res, next) => {
    res.status(500);                 // Internal Server Error
    res.send({error: 'Internal Server Error',success: false  });
});

