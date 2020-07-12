'use strict';
require('dotenv').config();

const express=require('express');
const superagent=require('superagent');

const server=express();

const PORT=process.env.PORT;

server.use(express.json());
server.use(express.urlencoded({extended:true}));


// server.use(express.static('./public'));


// server.get('')

server.get('/',(req,res)=>{
    // res.status(200).send('hi there');
    res.render('./pages/index.ejs');

})
server.get('/hello',(req,res)=>{
    console.log("annnnnyyyyyy")
    res.render('./pages/index.ejs');
})

server.listen(PORT,()=>{
    console.log(`The PORT is : ${PORT}`);
})



// app.use(express.static('./public'));