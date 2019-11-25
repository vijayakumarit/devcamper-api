const path = require('path')
const express = require('express');
const dotenv = require('dotenv')
const connectdb = require('./config/db')
const errorHandler = require ('./middleware/error')
const fileupload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const colors = require('colors')

dotenv.config({path:'./config/config.env'});

//connect database cluster
connectdb();
const bootscamp = require('./routes/bootcamps')

const courses = require('./routes/courses')
const auth = require('./routes/auth')
const reviews = require('./routes/reviews');
const app = express();

 //Body Parser
 app.use(express.json())

//cookie parser

app.use(cookieParser());

//middleare morgan
if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}

app.use(fileupload());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/bootcamps',bootscamp)
app.use('/api/v1/courses',courses)
app.use('/api/v1/auth',auth)
app.use('/api/v1/reviews', reviews);

app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT} `.yellow.bold)
})
