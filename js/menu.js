var navigations = document.querySelectorAll(".nav--list li a");
function toggleActive(elem){
    var current = document.querySelector("a.active");
    if(current)
    {
        current.className = current.className.replace("active", "");
    }

    elem.currentTarget ? elem.currentTarget.className += " active" : elem.className += " active";
}
navigations.forEach(function(link) {
    link.addEventListener("click", toggleActive, false);
});

