module.exports = function (app, mysql, config) {

    let mysqlConnection = null; 
    //Create / Update operations
    app.post('/api/Location', (req, res) => {
        mysqlConnection = mysql.createConnection(config);
        let userData = req.body;
        var parameters = "SET @_operation = ?; " +
            "SET @_id_location = ?; " +
            "SET @_location_name = ?; " +
            "SET @_location_desc = ?; " +
            "SET @_id_user = ?; " +
            "SET @_x_pos = ?; " +
            "SET @_y_pos = ?; " +
            "SET @_picture = ?; ";
        var procedure = "CALL sp_crud_location(@_operation, @_id_location, @_location_name, @_location_desc, @_id_user, @_x_pos, @_y_pos, @_picture);"
        var dataValues = [userData.operation, userData.id_location, userData.location_name, userData.location_desc,userData.id_user, userData.x_pos, userData.y_pos, userData.picture];
        mysqlConnection.query(parameters + procedure, dataValues, (err, rows, fields) => {
            if (!err){
                var resultJson = {
                    data : [],
                    code : "OK",
                    msg: ""
                };
                resultJson.data = rows;
                res.send(resultJson);
            } else {
                var resultJson = {
                    data : [],
                    code : "ERROR",
                    msg: err.sqlMessage
                };
                resultJson.data = err;
                res.send(resultJson);
            } 
        })
        mysqlConnection.end();
    });


    app.get('/api/Location', (req, res) => {
        mysqlConnection = mysql.createConnection(config);
        if (req.query.username != null) {
            mysqlConnection.query('SELECT * FROM location where id_location = ? and sw_active = 1;', [req.query.id_location], (err, rows, fields) => {
                if (!err){
                    var resultJson = {
                        data : [],
                        code : "OK",
                        msg: ""
                    };
                    resultJson.data = rows;
                    res.send(resultJson);
                } else {
                    var resultJson = {
                        data : [],
                        code : "ERROR",
                        msg: err.sqlMessage
                    };
                    resultJson.data = err;
                    res.send(resultJson);
                } 
            })
        } else {
            mysqlConnection.query('SELECT * FROM location where sw_active = 1;', (err, rows, fields) => {
                if (!err){
                    var resultJson = {
                        data : [],
                        code : "OK",
                        msg: ""
                    };
                    resultJson.data = rows;
                    res.send(resultJson);
                } else {
                    var resultJson = {
                        data : [],
                        code : "ERROR",
                        msg: err.sqlMessage
                    };
                    resultJson.data = err;
                    res.send(resultJson);
                } 
            })
        }
        mysqlConnection.end();
    });

    app.get('/api/VisitedLocation', (req, res) => {
        mysqlConnection = mysql.createConnection(config);
        if (req.query.username != null) {
            mysqlConnection.query('SELECT * FROM visited_locations_view where username = ?;', [req.query.username, req.query.id_user], (err, rows, fields) => {
                if (!err){
                    var resultJson = {
                        data : [],
                        code : "OK",
                        msg: ""
                    };
                    resultJson.data = rows;
                    res.send(resultJson);
                } else {
                    var resultJson = {
                        data : [],
                        code : "ERROR",
                        msg: err.sqlMessage
                    };
                    resultJson.data = err;
                    res.send(resultJson);
                } 
            })
        } else {
            mysqlConnection.query('SELECT * FROM visited_locations_view', (err, rows, fields) => {
                if (!err){
                    var resultJson = {
                        data : [],
                        code : "OK",
                        msg: ""
                    };
                    resultJson.data = rows;
                    res.send(resultJson);
                } else {
                    var resultJson = {
                        data : [],
                        code : "ERROR",
                        msg: err.sqlMessage
                    };
                    resultJson.data = err;
                    res.send(resultJson);
                } 
            })
        }
        mysqlConnection.end();
    });

    app.post('/api/VisitedLocation', (req, res) => {
        mysqlConnection = mysql.createConnection(config);
        let userData = req.body;
        var parameters = "SET @_operation = ?; " +
            "SET @_id_user = ?; " +
            "SET @_id_location = ?; ";
        var procedure = "CALL sp_crud_visited_locations(@_operation, @_id_user, @_id_location);"
        var dataValues = [userData.operation, userData.id_user, userData.id_location];
        mysqlConnection.query(parameters + procedure, dataValues, (err, rows, fields) => {
            if (!err){
                var resultJson = {
                    data : [],
                    code : "OK",
                    msg: ""
                };
                resultJson.data = rows;
                res.send(resultJson);
            } else {
                var resultJson = {
                    data : [],
                    code : "ERROR",
                    msg: err.sqlMessage
                };
                resultJson.data = err;
                res.send(resultJson);
            } 
        })
        mysqlConnection.end();
    });

}