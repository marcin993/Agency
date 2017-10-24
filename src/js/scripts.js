/*!
Site scripts
*/

(function($){
    $(document).ready(function() {

        function smoothScroll() {
            $("a[href^='#']").on("click", function(e) {
                if(window.innerWidth < 900) {
                    var offset = 0;
                } else {
                    var offset = 70;
                }

                if(e.target.nodeName.toLowerCase() !== "a") {
                    var id = "#" + e.target.parentNode.hash.slice(1);
                } else {
                    var id = "#" + e.target.hash.slice(1);
                }

                e.preventDefault();
                var targetOffset = parseFloat($(id).offset().top - offset);

                $("html, body").animate({
                    scrollTop: targetOffset
                }, 1000);

                window.location.href = id;
            });
        }
        smoothScroll();

        function navFixed() {
            $(window).on("scroll", function(e) {
            var navPanel = document.querySelector(".nav-panel");

            if($(window).scrollTop() > 110) {
                if(!navPanel.classList.contains("nav-fixed")) {
                    navPanel.classList.add("nav-fixed");
                }
            } else {
                if(navPanel.classList.contains("nav-fixed")) {
                    document.querySelector(".nav-panel").classList.remove("nav-fixed");
                }
            }
            });
        }
        navFixed();

    });
})(jQuery);

//Mobile nav toggle
document.querySelector(".nav-btn").onclick = function() {
    document.querySelector(".menu").classList.toggle("menu-open");
}

//Waypoints
var navLinks = document.querySelectorAll("nav a[href^='#']");

function waypoints() {
    for(var i = 0; i < navLinks.length; i++) {
        var target = document.querySelector("." + this.navLinks[i].textContent.toLowerCase().trim().toString().replace(" ", "-"));

        if(i == 0) {
            new Waypoint({
                element: document.querySelector("header"),
                handler: function() {
                    addNavClass("home");
                },
                offset: 70
            });

            new Waypoint({
                element: document.querySelector("header"),
                handler: function() {
                    addNavClass("home");
                },
                offset: "-50%"
            });
        } else {
            new Waypoint({
                element: target,
                handler: function(direction) {
                    if(direction == "down") {
                        addNavClass(this.element);
                    }
                },
                offset: 72
            });

            new Waypoint({
                element: target,
                handler: function(direction) {
                    if(direction == "up") {
                        addNavClass(this.element);
                    }
                },
                offset: "-50%"
            });
        }
    }

    function addNavClass(elem) {
        removeNavClass();

        for (var i = 0; i < navLinks.length; i++) {
            if(elem == "home") {
                navLinks[0].classList.add("active");
            } else {
                var section = elem.classList[0];
                var link = navLinks[i].textContent.toLowerCase().trim().toString().replace(" ", "-");

                if(link == section) {
                    navLinks[i].classList.add("active");
                }
            }
        }
    }

    function removeNavClass() {
        for(var i = 0; i < navLinks.length; i++) {
            navLinks[i].classList.remove("active");
        }
    }
}

if(window.innerWidth < 900) {
    window.onresize = function() {
       if(window.innerWidth >= 900) {
           waypoints();
        }
    }
} else {
    waypoints();
}

function map() {
    //API key: AIzaSyAtOH9wKKzvadROjMd6uXqkt5k5dDY3aIw
    var map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: 48.8574495, lng: 2.3455843},
        disableDefaultUI: true,
        scrollwhell: true,
        zoom: 16
    });

    //Colors
    var white = "#ffffff";
    var main = "#282828";
    var road = "#383838";
    var water = "#004044";
    var transport = "#003a52";

    var mapsStyle = {
        default: [
            {
                elementType: "geometry",
                stylers: [{color: main}]
            },
            {
                elementType: "labels.text.fill",
                stylers: [{color: white}]
            },
            {
                elementType: "labels.text.stroke",
                stylers: [{visibility: "off"}]
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{color: road}]
            },
            {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{color: transport}]
            },
            {
                featureType: "transit.station",
                elementType: "labels.text.stroke",
                stylers: [{visibility: "on"}]
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{color: water}]
            },
        ]
    }

    map.setOptions({styles: mapsStyle["default"]});
}
