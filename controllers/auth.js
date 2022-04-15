const express = require('express');
const mysql = require('mysql');
const { DEC8_BIN } = require('mysql/lib/protocol/constants/charsets');
const bcrypt = require('bcryptjs');
const async = require('hbs/lib/async');
const connection = mysql.createConnection({
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.Motdepass,
    database : process.env.DATABASE
});


exports.register = (req,res)=>{
    console.log(req.body);

    const {name,email,password,passwordconfirm} = req.body; 

    connection.query('select email from users where email =?',[email],async (error,results)=>{
        if(error){
            console.log(error);
        }
        if(results.length > 0){
            
            return res.render('register',{
                message_email:'That email is already in registred'
            });
        }else if(password !== passwordconfirm){
            return res.render('register',{
                message_password:'The password doesnt match'   
            })
        }

        let hashedpassword  = await bcrypt.hash(password,8);
        console.log(hashedpassword);
        

        connection.query('insert into users set ?',{name:name,email:email,password:hashedpassword},(error,results)=>{
            if(error){
                console.log('instert data errors:'+error);
            }else{
                console.log('results of insert:'+results);
                return res.render('register',{
                    message:'registered succesfully'
                })
            }
        })

        
    });



    

}