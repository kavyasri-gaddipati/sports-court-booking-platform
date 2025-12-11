const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const courtRoutes = require('./routes/courtRoutes');
const bookingRoutes = require('./routes/bookingRoutes'); // <--- 1. Import chey

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', courtRoutes);
app.use('/api/bookings', bookingRoutes); // <--- 2. Use 

app.get('/', (req, res) => {
  res.send('Acorn Globus Sports Booking API is Running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});