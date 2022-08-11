const endpoint = 'http://localhost:8080/api/User';
// const endpoint = 'http://flip3.engr.oregonstate.edu:8080/api/User';


function register() {
    var input_firstname = document.getElementById("first_name").value;
    var input_lastname = document.getElementById("last_name").value;
    var input_username = document.getElementById("username").value;
    var input_password = document.getElementById("password").value;
    var input_repassword = document.getElementById("re_password").value;


    if (isEmpty(input_firstname) && isEmpty(input_lastname) && isEmpty(input_username) && isEmpty(input_password) && isEmpty(input_repassword)) {
        //No fields can be empty
        console.log("No fields can be empty!");
        alert("No fields can be empty!");
        return;
    }
    if (input_password != input_repassword) {
        //Passwords must be the same!
        console.log("Passwords must be the same!");
        alert("Passwords must be the same!");
        return;
    }
    var payload = {
        operation: 1,
        id_user: 0,
        first_name: input_firstname,
        last_name: input_lastname,
        username: input_username,
        password: input_password
    }
    // var requestUrl = endpoint + formatParams(params);
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
            if (dataJson != null) {
                if (dataJson.code == "ERROR") {
                    if (dataJson.data.code == "ER_DUP_ENTRY"){
                        alert("Username already exists, try another one.");
                    } else {
                        alert("An error has ocurred during registration...");
                    }
                } else if (dataJson.code == "OK") {
                    alert("User created successfully!");
                    window.location.href = '/login';
                    dataReceived = JSON.parse(dataJson);
                }
            }
        })
        .catch(err => {
            if (err === "server") return
            console.log(err)
        })

    console.log(`Received: ${dataReceived}`)
}

function isEmpty(value) {
    if (value == null) {
        return true;
    } else if (value == '') {
        return true;
    } else {
        return false;
    }
}