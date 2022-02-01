require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(fileupload({
  useTempFiles: true,
}));
//Routes
app.use('/user',require('./routes/userRouter'));
app.use('/api',require('./routes/categoryRouter'));
app.use('/api',require('./routes/upload'));
app.use('/api',require('./routes/productRouter'));
app.use('/api',require('./routes/paymentRouter'));



//connect to mongoDB
const URI = process.env.MONGO_URI;
mongoose.connect(URI, {
  useNewUrlParser: true
},err=> {
  if(err) throw err;
  console.log('connected to mongoDB');
}
);
app.get('/', (req, res) => {
  res.json({msg:"Hello World"});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});