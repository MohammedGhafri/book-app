'use strict';
require('dotenv').config();

const express = require('express');
const superagent = require('superagent');
const methodOverride=require('method-override');


const server = express();
const pg = require('pg');


server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.set('view engine', 'ejs');


const client = new pg.Client(process.env.DATABASE_URL);
const PORT = process.env.PORT;

server.use(methodOverride('_method'))
server.use(express.static('./public'));



//Servers
server.get('/', show);// main page Which show the selected books
server.get('/search', searching);
server.post('/select', addTo);// route to page that do "select book"
server.post('/takeBook', doSearch);
server.get('/books/:bookID',viewFull);
server.delete('/del/:del_id',deletFun);
server.put('/update/:update_id',updateFun);
// let SQL = `UPDATE tasks SET title=$1,description=$2,contact=$3, status=$4, category=$5 WHERE id=$6;`;


function updateFun(req,res){
    const SQL=`UPDATE book SET img=$1,title=$2,auther=$3,description=$4,isbn=$5,bookShelf=$6 WHERE id=$7`
    const {image, title, auther, description,isbn, shelf}=req.body;
    const value=[image, title, auther, description,isbn, shelf,req.params.update_id];
    
    client.query(SQL,value)
    .then(data=>{

        res.redirect(`/books/${req.params.update_id}`)
    })

}

function deletFun(req,res){
    const SQL=`DELETE FROM book WHERE id=$1;`
    const value=[req.params.del_id];
    client.query(SQL,value)
    .then(()=>{

        res.redirect('/')
    })
}


function viewFull(req,res){
    console.log(req.params);
    const SQL=`SELECT * FROM book WHERE id=$1;`
    const value=[req.params.bookID];
    client.query(SQL,value)
    .then(details=>{
        // console.log(details.rows[0])
        res.render('./pages/books',{bookdetails:details.rows[0]})
    })
}




function searching(req, res) {
    res.render('./pages/searches/new.ejs');

}


function doSearch(req, res) {
    const name = req.body.name;
    const search = req.body.TypeOfSearch;

    const URL = `https://www.googleapis.com/books/v1/volumes?q=${name}+${search}`;
    superagent.get(URL)

        .then(result => result.body.items.map(book => new Book(book)))
        .then(renderData => {

            res.render('./pages/searches/show.ejs', { bookData: renderData })
        });

}








function addTo(req, res) {

    let SQL = `INSERT INTO book (img, title, auther, description,isbn, bookShelf) VALUES ($1,$2,$3,$4,$5,$6);`
    let safeValues = [req.body.image, req.body.title, req.body.auther, req.body.description, req.body.isbn, req.body.shelf];
    client.query(SQL, safeValues)
        .then(() => {


            res.redirect('/');

        })

}



function show(req, res) {
    const SQL = 'SELECT * FROM book;'
    client.query(SQL)
        .then(result => {
            // console.log(result.rows);
            res.render('./pages/index.ejs', { data: result.rows })

        })
}
server.get('*', (req, res) => {
    res.status(404).send(`This route doesn't exist`);
})
client.connect()
    .then(() => {

        server.listen(PORT, () => {
            console.log(`The PORT is : ${PORT}`);
        })
    })




function Book(item) {

    this.image = ((item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : 'https://i.imgur.com/J5LVHEL.jpg');

    this.title = item.volumeInfo.title;
    this.authors = ((item.volumeInfo.authors) ? item.volumeInfo.authors[0] : 'unKnown');
    this.description = item.searchInfo ? item.searchInfo.textSnippet : "not avaliable";
    this.ISBN = item.volumeInfo.industryIdentifiers ? item.volumeInfo.industryIdentifiers[0].identifier.slice(item.volumeInfo.industryIdentifiers[0].identifier.indexOf(":") + 1) : "not avalaible";


}