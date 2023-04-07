const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const { readdirSync } = require('fs');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
// Dynamic routes : reading an array of routes files
readdirSync('./routes').map((r) => app.use('/', require('./routes/' + r)));

// Database connection
connectDB();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
