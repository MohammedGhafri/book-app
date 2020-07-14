'use strict';
require('dotenv').config();

const express=require('express');
const superagent=require('superagent');

const server=express();

const PORT=process.env.PORT;

server.use(express.json());
server.use(express.urlencoded({extended:true}));

server.set('view engine','ejs');

const pg=require('pg');

const client =new pg.Client(process.env.DATABASE_URL);


server.use(express.static('./public'));


// server.get('')

// server.get('/',(req,res)=>{
//     // res.status(200).send('hi there');
//     // res.render('./pages/index.ejs');
//     res.render('./pages/index.ejs');

// })
server.get('/search',(req,res)=>{
    // console.log("annnnnyyyyyy")
    // res.render('./pages/index.ejs');
    res.render('./pages/searches/new.ejs');

})
server.get('/',show);
server.post('/select',addTo);
server.post('/takeBook',(req,res)=>{
    // console.log('Get request',req.body);
    // res.status(200).send(req.query);
    // console.log(req.body.TypeOfSearch)
    const name=req.body.name;
    const search=req.body.TypeOfSearch;
    
    const URL=`https://www.googleapis.com/books/v1/volumes?q=${name}+${search}`;
    superagent.get(URL)
    // .then(result=>{
        //     res.send(result.body.items);
        
    // })
    // new Book(book)
    .then(result=> result.body.items.map(book=>new Book(book)))
    .then(renderData=> { 
        // console.log(renderData);
        res.render('./pages/searches/show.ejs',{bookData:renderData})
    });
    
    

    
    
})


function addTo(req,res){
    // console.log(req.body);
    let SQL=`INSERT INTO book (img, title, auther, description,isbn, bookShelf) VALUES ($1,$2,$3,$4,$5,$6);`
    let safeValues=[req.body.image,req.body.title,req.body.auther,req.body.description,req.body.isbn,req.body.shelf];
    client.query(SQL,safeValues)
    .then(()=>{
    // res.redirect('/');

        res.redirect('/');
    // console.log("mmmmm")
    })

}
function show(req,res){
const SQL='SELECT * FROM book;'
client.query(SQL)
.then(result=>{
    res.render('./pages/index.ejs',{data:result.rows})
    // console.log(result.rows);
})
}
server.get('*',(req,res)=>{
    res.status(404).send(`This route doesn't exist`);
})
client.connect()
.then(()=>{

    server.listen(PORT,()=>{
        console.log(`The PORT is : ${PORT}`);
    })
})



// app.use(express.static('./public'));
    function Book(item){
        
         this.image=((item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : 'https://i.imgur.com/J5LVHEL.jpg');
      
        this.title=item.volumeInfo.title;
        this.authors=((item.volumeInfo.authors) ? item.volumeInfo.authors[0] : 'unKnown');
        this.description=item.searchInfo ? item.searchInfo.textSnippet : "not avaliable";
        this.ISBN=item.volumeInfo.industryIdentifiers ? item.volumeInfo.industryIdentifiers[0].identifier.slice(item.volumeInfo.industryIdentifiers[0].identifier.indexOf(":")+1) :"not avalaible" ;
        
    
    }