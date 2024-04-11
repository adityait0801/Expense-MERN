// app.js
const express = require('express')
const cors = require('cors');
const { connection } = require('./config/db');
const authentication  = require('./middlewares/authentication');
const userRouter = require('./routes/user.route');
const expenseRouter = require('./routes/expense.route');
const purchaseRouter = require('./routes/purchase.route');
require('dotenv').config();
const path = require("path");

const app = express();

app.use(express.json());

// const _dirname = path.dirname("");
// const buildpath = path.join(_dirname, "../frontend/build")
// app.use(express.static(buildpath))

app.get('/', (req, res)=> {
    res.send("The server is running")
})

app.use(cors({ origin: '*' }));
app.use(cors({ origin: 'http://localhost:3000' }));

const PORT = process.env.PORT || 7200;

app.use('/user', userRouter);
app.use('/expense', authentication, expenseRouter);
app.use('/purchase', authentication, purchaseRouter);

app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Connected to DB Successfully");
    } catch (err) {
        console.error("Error while connecting to DB:", err);
    }
    console.log("Server is running on Port 7200");
});
