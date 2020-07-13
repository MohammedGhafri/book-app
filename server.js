'use strict';
require('dotenv').config();

const express=require('express');
const superagent=require('superagent');

const server=express();

const PORT=process.env.PORT;

server.use(express.json());
server.use(express.urlencoded({extended:true}));

server.set('view engine','ejs');



server.use(express.static('./public'));


// server.get('')

server.get('/',(req,res)=>{
    // res.status(200).send('hi there');
    // res.render('./pages/index.ejs');
    res.render('./pages/index.ejs');

})
server.get('/hello',(req,res)=>{
    console.log("annnnnyyyyyy")
    // res.render('./pages/index.ejs');
    res.render('./pages/searches/new.ejs');

})
// server.get('/search',(req,res)=>{
    
//     console.log('Get request',req.body);


//     res.render('./pages/searches/new.ejs');
// })
function Book(item){
    this.image=item.volumeInfo.imageLinks.thumbnail||'https://i.imgur.com/J5LVHEL.jpg';
    this.title=item.volumeInfo.title;
    this.authors=item.volumeInfo.authors||'The Auther is Unknown';
    this.description=item.searchInfo.textSnippet;
    this.ISBN=item.volumeInfo.industryIdentifiers[0].identifier.slice(item.volumeInfo.industryIdentifiers[0].identifier.indexOf(":")+1);

}
server.post('/searches',(req,res)=>{
    console.log('Get request',req.body);
    // res.status(200).send(req.query);
    console.log(req.body.TypeOfSearch)
    const name=req.body.name;
    const search=req.body.TypeOfSearch;
    
    const URL=`https://www.googleapis.com/books/v1/volumes?q=${name}+${search}`;
    superagent.get(URL)
    // .then(result=>{
    //     res.send(result.body.items);

    // })
    .then(result=> result.body.items.map(book=>new Book(book)))
    .then(renderData=> { 
        console.log(renderData);
        res.render('./pages/searches/show.ejs',{bookData:renderData})
    });
    
    


    // .then(renderData=>  res.send(renderData));

    // res.render('show',{bookData:renderData})
    // res.send(renderData)
    // res.render('./pages/index.ejs');
})
server.get('*',(req,res)=>{
    res.status(404).send(`This route doesn't exist`);
})
server.listen(PORT,()=>{
    console.log(`The PORT is : ${PORT}`);
})



// app.use(express.static('./public'));