var gallery = document.getElementById('title--gallery');
var contact = document.getElementById('title--contact');
var allMenuLinks = document.querySelectorAll('.nav--list li a');
var logoBackground = document.querySelector('.logo');
var gallery_off = gallery.offsetTop - 50;
var contact_off = contact.offsetTop - 50;

window.addEventListener('scroll', function() {
     if ((document.body.scrollTop > gallery_off && document.body.scrollTop < contact_off)
      || (document.documentElement.scrollTop > gallery_off && document.documentElement.scrollTop < contact_off)) {
        logoBackground.style.backgroundImage = "url('./images/circle_bird.png')";
        toggleActive(allMenuLinks[1]);
     }
     else if (document.body.scrollTop > contact_off || document.documentElement.scrollTop > contact_off) {
        logoBackground.style.backgroundImage = "url('./images/circle_flower.png')";
        toggleActive(allMenuLinks[2]);
     }
     else {
        logoBackground.style.backgroundImage = "url('./images/circle_gold.png')";
        toggleActive(allMenuLinks[0]);
     }     
});
