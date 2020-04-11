var navigations = document.querySelectorAll(".nav--list li");

navigations.forEach(function(link) {
    link.addEventListener("click", function(event) {
        var current = document.querySelector("li.active");
        if(current)
        {
            current.className = current.className.replace("active", "");
        }

        this.className += " active";
    }.bind(link));
});