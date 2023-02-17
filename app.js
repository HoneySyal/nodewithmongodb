const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const connction = require('./connection/conn').connect; // impoting connection file 

const adminRouter = require('./routers/admin');
const fbAdminRouter = require('./routers/fbadmin');

app.use(express.json());
const port = process.env.PORT;

app.use('/admin', adminRouter);
app.use('/fb/admin', fbAdminRouter);

// calling 
connction((result) => {
  console.log(result)
});

app.listen(port, () => {
  console.log('Server is running http://localhost:' + port + '/');
});


