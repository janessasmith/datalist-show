/**
 * Created by zhenglu on 2016/7/17.
 */
$(function() {
    var containerWidth = 1920;
    var containerHeight = 1080;
    var scaleAndLocation = getScaleAndLocation(containerWidth, containerHeight);

    function getScaleAndLocation(width, height) {
        // 用于"transform": "scale(" + scale + ")",
        var scale = 1;
        // 缩放后居中的位置,
        var location = {
                x: 0,
                y: 0
            }
            // var clientWidth = document.body.clientWidth;
            // var clientHeight = document.body.clientHeight;
        var clientWidth = window.innerWidth;
        var clientHeight = window.innerHeight;
        if (clientWidth / clientHeight < width / height) {
            scale = clientWidth / width;
            location.y = (clientHeight - height * scale) / 2;
        } else {
            scale = clientHeight / height;
            location.x = (clientWidth - width * scale) / 2;
        }
        return {
            scale: scale,
            location: location
        };
    }
    if (scaleAndLocation.scale != 1) {
        $("body").css("overflow", "hidden");
        $("#cb-container").css({
            "-moz-transform-origin": "left top",
            "-webkit-transform-origin": "left top",
            "-o-transform-origin": "left top",
            "-ms-transform-origin": "left top",
            "transform-origin": "left top",
            "-moz-transform": "scale(" + scaleAndLocation.scale + ")",
            "-webkit-transform": "scale(" + scaleAndLocation.scale + ")",
            "-o-transform": "scale(" + scaleAndLocation.scale + ")",
            "-ms-transform": "scale(" + scaleAndLocation.scale + ")",
            "transform": "scale(" + scaleAndLocation.scale + ")",
            "-moz-transform-origin": "left top",
            "-webkit-transform-origin": "left top",
            "-o-transform-origin": "left top",
            "-ms-transform-origin": "left top",
            "transform-origin": "left top",
            "margin-left": scaleAndLocation.location.x + "px",
            "margin-top": scaleAndLocation.location.y + "px",
        });
    }
});