const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 8080;

const borrowRoutes = require('./routes/borrowRoutes');
const returnRoutes = require('./routes/returnRoutes');
const mediaRoutes = require('./routes/mediaRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/borrow', borrowRoutes);
app.use('/return', returnRoutes);
app.use('/media', mediaRoutes);

app.listen(PORT, () => {
    console.log(`Library system running on http://localhost:${PORT}`);
});
