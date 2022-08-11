const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();
const path = require('path');
const handlebars = require('express-handlebars');
const config = require('./CRUD/config.js');

app.set('view engine', 'hbs');

app.engine('hbs', handlebars.engine({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: 'hbs',
    defaultLayout: 'index'
}));

//Configuring express server
app.use(bodyparser.json());
app.use(express.static('public'));

require('./CRUD/UserModule')(app, mysql, config);
require('./CRUD/LocationModule')(app, mysql, config);

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
app.get('/newLocation', function (req, res) {
    res.render('newlocation');
});
app.get('/visitedLocation', function (req, res) {
    res.render('visitedlocation');
});
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));

function startMysqlConnection(){
    mysqlConnection.connect((err) => {
        if (!err)
            console.log('Connection Established Successfully');
        else
            console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
    });
}
