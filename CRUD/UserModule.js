module.exports = function(app, mysqlConnection){

//Creating GET Router to fetch all the learner details from the MySQL Database
app.get('/User', (req, res) => {
    mysqlConnection.query('SELECT * FROM User', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

    //other routes..
}