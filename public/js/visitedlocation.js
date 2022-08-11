const endpoint_visit = url + "VisitedLocation";
const endpoint_location = url + "Location";

document.addEventListener('DOMContentLoaded', function () {
    getVisitedLocations();
    getAvailable();
}, false);

function getAvailable() {

    var requestUrl = endpoint_location;
    //HTTP Request
    fetch(requestUrl, {
        method: 'get'
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log("Result: " + data);

        if (data != null) {
            if (data.data.length >= 1) {
                //Login success!
                console.log("UserData: " + JSON.stringify(data));

                data.data.forEach(item => {
                    addItemToTableAvailable(item);
                });
            }
        }
    }).catch(function (err) {
        // Error :(
        console.log("Error!: " + err);
    });
}
function getVisitedLocations() {
    var _username = getValue('_username');

    var params = {
        username: _username
    }

    var requestUrl = endpoint_visit + formatParams(params);
    //HTTP Request
    fetch(requestUrl, {
        method: 'get'
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log("Result: " + data);

        if (data != null) {
            if (data.data.length >= 1) {
                //Login success!
                console.log("UserData: " + JSON.stringify(data));

                data.data.forEach(item => {
                    addItemToTable(item);
                });
            }
        }
    }).catch(function (err) {
        // Error :(
        console.log("Error!: " + err);
    });
}
function addItemToTable(item) {
    var table = document.getElementById("myTable");

    var rowNode = document.createElement("tr");

    var cell_id = document.createElement("th");
    var cell_loc = document.createElement("td");
    var cell_desc = document.createElement("td");
    var cell_x = document.createElement("td");
    var cell_y = document.createElement("td");
    var cell_active = document.createElement("td");


    cell_id.appendChild(document.createTextNode(item.id_location));
    cell_loc.appendChild(document.createTextNode(item.location_name));
    cell_desc.appendChild(document.createTextNode(item.location_desc));
    cell_x.appendChild(document.createTextNode(item.x_position));
    cell_y.appendChild(document.createTextNode(item.y_position));
    cell_active.appendChild(document.createTextNode((item.loc_sw_active = 1 ? 'Active' : 'Not Active')));

    rowNode.appendChild(cell_id);
    rowNode.appendChild(cell_loc);
    rowNode.appendChild(cell_desc);
    rowNode.appendChild(cell_x);
    rowNode.appendChild(cell_y);
    rowNode.appendChild(cell_active);

    table.appendChild(rowNode);
}

function addItemToTableAvailable(item) {
    var table = document.getElementById("available_table");

    var rowNode = document.createElement("tr");

    var cell_id = document.createElement("th");
    var cell_loc = document.createElement("td");
    var cell_desc = document.createElement("td");
    var cell_x = document.createElement("td");
    var cell_y = document.createElement("td");
    var cell_active = document.createElement("td");
    var cell_btn = document.createElement("td");
    var button = document.createElement("button");


    cell_id.appendChild(document.createTextNode(item.id_location));
    cell_loc.appendChild(document.createTextNode(item.location_name));
    cell_desc.appendChild(document.createTextNode(item.location_desc));
    cell_x.appendChild(document.createTextNode(item.x_position));
    cell_y.appendChild(document.createTextNode(item.y_position));
    cell_active.appendChild(document.createTextNode((item.loc_sw_active = 1 ? 'Active' : 'Not Active')));
    button.appendChild(document.createTextNode("Visit now!"));
    button.classList.add("btn-primary");
    button.type = "button";
    button.onclick = function () {
        buttonClick(item.id_location);
    }
    cell_btn.appendChild(button);

    rowNode.appendChild(cell_id);
    rowNode.appendChild(cell_loc);
    rowNode.appendChild(cell_desc);
    rowNode.appendChild(cell_x);
    rowNode.appendChild(cell_y);
    rowNode.appendChild(cell_active);
    rowNode.appendChild(cell_btn);

    table.appendChild(rowNode);
}
function clearTable() {
    $("#myTable tr").remove();
}

function buttonClick(id_location) {

    var _id_user = getValue('_id_user');

    var payload = {
        operation: 1,
        id_user: _id_user,
        id_location: id_location
    }
    console.log("RequestUrl POST: " + endpoint_visit);
    console.log("DataToSend: " + JSON.stringify(payload));

    let dataReceived = "";
    let dataToSend = JSON.stringify(payload);
    fetch(endpoint_visit, {
        credentials: "same-origin",
        mode: "same-origin",
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: dataToSend
    })
        .then(resp => {
            if (resp.status === 200) {
                return resp.json()
            } else {
                alert("There was an error...");
                console.log("Status: " + resp.status)
                return Promise.reject("server")
            }
        })
        .then(dataJson => {
            if (dataJson != null) {
                // dataReceived = JSON.parse(dataJson);
                clearTable();
                getVisitedLocations();
                alert("Location visited successfully!");
            }
        })
        .catch(err => {
            if (err === "server") return
            console.log(err)
        })
}