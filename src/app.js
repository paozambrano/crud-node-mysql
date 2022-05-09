const express = require('express');
const path = require('path')
const morgan = require('morgan')
const mysql = require('mysql');
const myConnection = require ('express-myconnection');
const app = express();

//importing routes
const customerRoutes = require('./routes/customer');
const { urlencoded } = require('express');

//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Middlewares

app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password:'',
    port: 3306,
    database: 'crudnode'
}, 'single'));
app.use(express.urlencoded({extended: false}))
//Routes
app.use('/', customerRoutes)

//static file.
app.use (express.static(path.join(__dirname, 'public')))

//starting the server

app.listen(app.get('port'), ()=>{
    console.log('Server on port 3000')
})