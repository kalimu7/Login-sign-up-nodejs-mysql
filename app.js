const  express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const { append } = require('express/lib/response');
const jwt = require('jsonwebtoken');
dotenv.config({path : './.env'});





//should always be on the top
const server = express();




//connect database

const connection = mysql.createConnection({
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.Motdepass,
    database : process.env.DATABASE
});

connection.connect((error)=>{
    if(error){
        console.log(error);
    }else{
        console.log('DB connected ...');
    }
})
//setup the view engine
server.set('view engine','hbs');
// comment  server.set('views','./views');


//setup static files
server.use(express.static('public')); 
server.use('/CSS',express.static('/CSS'));
server.use('IMG',express.static('/IMG'));

//parse urlencooded.
server.use(express.urlencoded({extended:false}));
//parse json body
server.use(express.json());



//starting server
//define routes 
server.use('/',require('./routes/pages'));
server.use('/auth',require('./routes/auth'));

const port =5000;
const domainename = 'localhost';
server.listen(port,domainename,()=>{
    console.log(`server running on http://${domainename}:${port}`);
})