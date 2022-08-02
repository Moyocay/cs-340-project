const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();
const path = require('path');
const handlebars = require('express-handlebars');

app.set('view engine', 'hbs');

app.engine('hbs', handlebars.engine({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: 'hbs',
    defaultLayout: 'index'
}));

//Configuring express server
app.use(bodyparser.json());
app.use(express.static('public'));

//MySQL details
// var mysqlConnection = mysql.createConnection({
//     host: 'classmysql.engr.oregonstate.edu',
//     user: 'cs340_villarmo',
//     password: '4980',
//     database: 'cs340_villarmo',
//     multipleStatements: true
// });
var mysqlConnection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'moises',
    password: 'moyocay28',
    database: 'cs340',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});

require('./CRUD/UserModule')(app, mysqlConnection);

app.get('/', function (req, res) {
    res.redirect('/login');
});
app.get('/login', function (req, res) {
    // res.sendFile(path.join(__dirname, 'public/html/login.html'));
    res.render('login', {layout: 'emptyBackground'});
});
app.get('/register', function (req, res) {
    // res.sendFile(path.join(__dirname, 'public/html/register.html'));
    res.render('register', {layout: 'emptyBackground'});
});
app.get('/home', function (req, res) {
    res.render('main');
});
app.get('/myAccount', function (req, res) {
    res.render('myaccount');
});
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
