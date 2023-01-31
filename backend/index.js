const express = require('express');
const port = 3001;
const app = express();
const connectToDB = require('./db');
const cors = require('cors');

connectToDB();
app.use(cors());
app.use(express.json());
app.use('/api', require('./routes/auth'));

app.listen(port, () => {
    console.log("your app is listen sucessfully");
});