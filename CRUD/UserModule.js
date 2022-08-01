module.exports = function (app, mysqlConnection) {

    //Create / Update operations
    app.post('/api/User', (req, res) => {
        let userData = req.body;
        var parameters = "SET @_operation = ?; " +
            "SET @_id_user = ?; " +
            "SET @_username = ?; " +
            "SET @_password = ?; " +
            "SET @_first_name = ?; " +
            "SET @_last_name = ?; " +
            "SET @_sw_active = ?; ";
        var procedure = "CALL sp_crud_user(@_operation, @_id_user, @_username, @_password, @_first_name, @_last_name,@_sw_active);"
        var dataValues = [userData.operation, userData.id_user, userData.username, userData.password, userData.first_name, userData.last_name, userData.sw_active];
        mysqlConnection.query(parameters + procedure, dataValues, (err, rows, fields) => {
            if (!err)
                res.send(rows);
            else
                res.send(err.sqlMessage);
        })
    });

    //Creating GET Router to fetch all the learner details from the MySQL Database
    // app.get('/api/User', (req, res) => {
    //     mysqlConnection.query('SELECT * FROM User', (err, rows, fields) => {
    //         if (!err)
    //             res.send(rows);
    //         else
    //             console.log(err);
    //     })
    // });

    //Creating GET Router to fetch all the learner details from the MySQL Database
    app.get('/api/User', (req, res) => {
        if (req.query.username != null) {
            mysqlConnection.query('SELECT * FROM User where username = ? AND password = MD5(?) AND sw_active = 1;', [req.query.username, req.query.password], (err, rows, fields) => {
                if (!err)
                    res.send(rows);
                else
                    console.log(err);
            })
        } else {
            mysqlConnection.query('SELECT * FROM User', (err, rows, fields) => {
                if (!err)
                    res.send(rows);
                else
                    console.log(err);
            })
        }

    });

    app.delete('/api/User/:username', (req, res) => {
        mysqlConnection.query('UPDATE User SET sw_active = 0 where username = ?;', [req.params.username], (err, rows, fields) => {
            if (!err)
                res.send(rows);
            else
                console.log(err);
        })
    });
}