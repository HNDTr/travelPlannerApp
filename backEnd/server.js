const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const axios = require('axios');

const port = process.env.PORT ? process.env.PORT : 4000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api', require('./routes/flightRoutes'));
app.use('/api', require('./routes/weatherRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
