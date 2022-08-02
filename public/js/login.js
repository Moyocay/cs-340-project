const endpoint = 'http://localhost:8080/api/User';

function login() {
  var input_username = document.getElementById("username").value;
  var input_password = document.getElementById("password").value;

  var params = {
    username: input_username,
    password: input_password
  }
  var requestUrl = endpoint + formatParams(params);
  console.log("RequestUrl: " + requestUrl);

  //HTTP Request
  fetch(requestUrl, {
    method: 'get'
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log("Result: " + data);
    
    if (data != null){
      if (data.length == 1){
        //Login success!
        window.location.href = "/home";
        localStorage.setItem('_username', input_username);
        localStorage.setItem('_password', input_password);  
      }
    }
  }).catch(function (err) {
    // Error :(
    console.log("Error!");
  });
}


function formatParams(params) {
  return "?" + Object
    .keys(params)
    .map(function (key) {
      return key + "=" + encodeURIComponent(params[key])
    })
    .join("&")
}