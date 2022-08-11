$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

document.addEventListener('DOMContentLoaded', function () {
    init();
}, false);

function init(){
    var title = document.getElementById("title");
    var first_name = localStorage.getItem('_first_name');
    if (title != null)
    title.innerHTML = "Welcome " + first_name + "!";
    
}
function formatParams(params) {
    return "?" + Object
        .keys(params)
        .map(function (key) {
            return key + "=" + encodeURIComponent(params[key])
        })
        .join("&")
}

function getValue(item) {
    return localStorage.getItem(item);
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
function logout(){
    let isExecuted = confirm("Are you sure you want to log out?");
    if (!isExecuted) {
        return;
    } else {
        window.location.href = "/login";
    }
}

function comingSoon(){
    alert("This isyet to be implemented...");
}