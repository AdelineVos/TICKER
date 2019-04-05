(function() {
    var ticker = $("#ticker");
    var left = ticker.offset().left;
    var reqId;
    var res = "";
    var j = 0;
    //var working = false;

    $.ajax({
        url: "/ticker.json",
        method: "GET",
        success: function swiper(links) {
            //working = true;
            for (j; j < links.length; j++) {
                res +=
                    '<a class="link" href="' +
                    links[j].link +
                    '">' +
                    links[j].headline +
                    "</a>";
            }

            ticker.html(res);

            for (var i = 0; i < $(".link").length; i++) {
                var hlinks = $(".link");
                hlinks.eq(i).on("mouseenter", function(e) {
                    cancelAnimationFrame(reqId);
                    $(e.target).css({
                        color: "blue",
                        textDecoration: "underline"
                    });
                });
                hlinks.eq(i).on("mouseleave", function(e) {
                    left++;
                    moving();
                    $(e.target).css({
                        color: "purple",
                        textDecoration: "none"
                    });
                });
            }
        }
    });
    function moving() {
        var hlinks = $(".link");
        left--;
        if (left < -hlinks.eq(0).outerWidth()) {
            left += hlinks.eq(0).outerWidth();
            $("#ticker").append($(".link").eq(0));
            hlinks = $(".link");
        }
        ticker.css("left", left + "px");
        reqId = requestAnimationFrame(moving);
    }
    reqId = requestAnimationFrame(moving);
})();
