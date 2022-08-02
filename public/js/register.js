const endpoint = 'http://localhost:8080/api/User';

function register() {
    var input_firstname = document.getElementById("first_name").value;
    var input_lastname = document.getElementById("last_name").value;
    var input_username = document.getElementById("username").value;
    var input_password = document.getElementById("password").value;
    var input_repassword = document.getElementById("re_password").value;


    if (isEmpty(input_firstname) && isEmpty(input_lastname) && isEmpty(input_username) && isEmpty(input_password) && isEmpty(input_repassword)){
        //No fields can be empty
        console.log("No fields can be empty!");
        return;
    }
    if (input_password != input_repassword){
        //Passwords must be the same!
        console.log("Passwords must be the same!");
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
    // //HTTP Request
    // fetch(requestUrl, {
    //     method: 'get'
    // }).then(function (response) {
    //     return response.json();
    // }).then(function (data) {
    //     console.log("Result: " + data);

    //     if (data != null) {
    //         if (data.length == 1) {
    //             //Login success!
    //             window.location.href = "/home";
    //         }
    //     }
    // }).catch(function (err) {
    //     // Error :(
    //     console.log("Error!");
    // });

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
                console.log("Status: " + resp.status)
                return Promise.reject("server")
            }
        })
        .then(dataJson => {
            if (dataJson != null){
                dataReceived = JSON.parse(dataJson)
            }
        })
        .catch(err => {
            if (err === "server") return
            console.log(err)
        })

    console.log(`Received: ${dataReceived}`)
}

function isEmpty(value){
    if (value == null){
        return true;
    } else if (value == ''){
        return true;
    } else {
        return false;
    }
}