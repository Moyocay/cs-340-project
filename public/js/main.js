const endpoint = url + "Explorer";

document.addEventListener('DOMContentLoaded', function () {
    getTopExplorers();
}, false);

function getTopExplorers() {

    var requestUrl = endpoint;
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
                var i = 1;
                data.data.forEach(item => {
                    addItemsToTable(item, i++);
                });
            }
        }
    }).catch(function (err) {
        // Error :(
        console.log("Error!: " + err);
    });
}
function addItemsToTable(item, i) {
    var table = document.getElementById("myTable");

    var rowNode = document.createElement("tr");

    var cell_pos = document.createElement("th");
    var cell_user = document.createElement("td");
    var cell_loc = document.createElement("td");


    cell_pos.appendChild(document.createTextNode(i));
    cell_user.appendChild(document.createTextNode(item.username));
    cell_loc.appendChild(document.createTextNode(item.visits));

    rowNode.appendChild(cell_pos);
    rowNode.appendChild(cell_user);
    rowNode.appendChild(cell_loc);

    table.appendChild(rowNode);
}