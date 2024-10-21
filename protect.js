$(document).ready(function() {
    $("img.protect").bind("contextmenu", function(e) {
        return false;
    });

    $("img.protect").mousedown(function(e) {
        return false;
    });
});
