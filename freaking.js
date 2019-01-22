var checker = 0;
var timeout;
var score = 0;
var highscore = 0;
var BGcolor = ['#d2d231', '#2196f3', '#9c27b0', '#ff5722', '#8bc34a', '#8bb6bb', 'rgb(198, 157, 41)', '#edbc47', '#2dc210', '#10a3c2'];
$(document).ready(function() {
    // var interval;
    var x=getCookie("highscore");
    if(x==undefined)
        $("#highscore").text("highscore : 0");
    else
        $("#highscore").text("highscore : "+x);
    function start() {
        score = 0;
        $("#score").text("score : " + score);
        $(".text").animate({
            right: '0%',
        });
        $(".time").css("width", '100%');
        $(".time").animate({
            right: '0%'
        });
        $(".button").css("display", 'block');
        $(".button").animate({
            right: '0%'
        });
        math();
        $(".start").animate({
            right: '-100%'
        });
        $(".start").css("display", "none");
        timeout = setTimeout(gameOver, 5000);

        // interval = setInterval(math, 5000);
    }
    $("#start").click(function() {
        start();
    });

    $("#right").click(function() {
        clearTimeout(timeout);
        right();
    });
    $("#wrong").click(function() {
        clearTimeout(timeout);
        wrong();
    })


    function math() {
        var a = Math.floor((Math.random() * 10) + 1);
        var b = Math.floor((Math.random() * 10) + 1);
        var c = Math.floor((Math.random() * 10));
        $("body").css("background-color", BGcolor[c]);
        if (c >= 0 && c < 3) {
            c = 0;
        } else if (c >= 3 && c < 6)
            c = 1;
        else
            c = -1;
        var sum = a + b + c;
        check();

        function check() {
            if ((a + b) == sum)
                checker = 1;
            else
                checker = 0;
        }
        $("#math").text(a + " + " + b + " = " + sum);
        $("#time").css('width', '100%');
        $("#time").animate({
            width: '0'
        }, 5000);
    }


    function right() {
        if (checker == 1) {
            score++;
            $("#score").text("score : " + score);
            $("#time").stop();
            math();
            // clearInterval(interval);
            // interval=setInterval(math, 5000);
        } else {
            // clearInterval(interval);
            gameOver();
        }
    }

    function wrong() {
        if (checker == 1) {
            // clearInterval(interval);
            gameOver();
        } else {
            score++;
            $("#score").text("score : " + score);
            $("#time").stop();
            math();
            // clearInterval(interval)
            // interval=setInterval(math, 5000);
        }
    }

    function gameOver() {
        $(".button").animate({
            right: '-100%'
        });
        $(".button").css("display", 'none');
        $("#time").stop();

        $(".start").css("display", "block");
        $(".time").css("width", '0%');
        $(".start").animate({
            right: '0%'
        });
        $(".text").animate({
            right: '-100%',
        });
        $(".time").animate({
            right: '-100%'
        });
        var scoreCookie = getCookie("highscore");
        if (score > highscore) {
            highscore = score;
            
            if (scoreCookie == undefined)
                setCookie("highscore",highscore,365);
            else if (highscore > scoreCookie)
                setCookie("highscore",highscore,365);
        }
        scoreCookie = getCookie("highscore");
        $("#score-text").text("score :" + score);
        $("#highscore").text("high score :" + scoreCookie);
    }

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
});