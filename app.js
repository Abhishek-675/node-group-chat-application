const path = require('path');
const fs = require('fs');

const express = require('express');

const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const dotenv = require('dotenv');
dotenv.config();

const sequelize = require('./util/database');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/admin', adminRoutes);

sequelize.sync({
    // force: true
}).then(() => {
    app.listen(process.env.PORT || 3000);
}).catch(err => {
    console.log(err);
})
