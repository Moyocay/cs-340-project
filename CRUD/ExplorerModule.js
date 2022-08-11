module.exports = function (app, mysql, config) {
    app.get('/api/Explorer', (req, res) => {
        mysqlConnection = mysql.createConnection(config);
        mysqlConnection.query('SELECT username, COUNT(username) AS `visits` FROM visited_locations_view GROUP BY username ORDER BY COUNT(username) DESC LIMIT 10;', (err, rows, fields) => {
            if (!err) {
                var resultJson = {
                    data: [],
                    code: "OK",
                    msg: ""
                };
                resultJson.data = rows;
                res.send(resultJson);
            } else {
                var resultJson = {
                    data: [],
                    code: "ERROR",
                    msg: err.sqlMessage
                };
                resultJson.data = err;
                res.send(resultJson);
            }
        });
        mysqlConnection.end();
    });
}