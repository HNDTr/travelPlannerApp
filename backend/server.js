const path = require('path')
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
app.use('/api/itineraries', require('./routes/itineraryRoutes'));
app.use('/api', [
    require('./routes/flightRoutes'),
    require('./routes/hotelRoutes'),
    require('./routes/weatherRoutes')
  ]);

  // Serve frontend
  if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
  }else {
    app.get('/', (req, res) => res.send('Please set to production'))
  }

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
