const endpoint = url + "Location";

function create(){
    var input_location_name = document.getElementById("location_name").value;
    var input_location_desc = document.getElementById("location_desc").value;
    var input_x_position = document.getElementById("x_position").value;
    var input_y_position = document.getElementById("y_position").value;

    if (isEmpty(input_location_name) && isEmpty(input_location_desc)){
        //No fields can be empty
        alert("No fields can be empty!");
        console.log("No fields can be empty!");
        return;
    }

    let isExecuted = confirm("Are you sure to create this location?");
    if (!isExecuted) {
        return;
    }

    var payload = {
        operation: 1,
        id_location: 0,
        location_name: input_location_name,
        location_desc: input_location_desc,
        id_user: localStorage.getItem('_id_user'),
        x_pos: input_x_position,
        y_pos: input_y_position,
        picture: null
    };

    console.log("RequestUrl POST: " + endpoint);
    console.log("DataToSend: " + JSON.stringify(payload));

    let dataReceived = "";
    let dataToSend = JSON.stringify(payload);
    fetch(endpoint, {
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
            if (dataJson != null){
                alert("Location created successfully!");
                dataReceived = JSON.parse(dataJson.data);
            }
        })
        .catch(err => {
            if (err === "server") return
            console.log(err)
        })

    // console.log(`Received: ${dataReceived}`)
}