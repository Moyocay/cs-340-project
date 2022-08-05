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
    title.innerHTML = "Welcome " + first_name + "!";
    
}