function login() {
  const endpoint = url + "User";
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

    if (data != null) {
      if (data.length == 1) {
        //Login success!
        window.location.href = "/home";
        localStorage.setItem('_username', input_username);
        localStorage.setItem('_password', input_password);
        localStorage.setItem('_first_name', data[0].first_name)
        localStorage.setItem('_id_user', data[0].id_user)
      } else {
        alert("User not found :(");
      }
    }
  }).catch(function (err) {
    // Error :(
    console.log("Error!");
    alert("An error has occurred during login...");
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