window.smoothScrollTo= function (target, callback) {
    var time = 800; // ms
    var offsetY = 0;
    var destination = $(target).offset().top - offsetY;
    $('html:not(:animated),body:not(:animated)')
        .animate({
            scrollTop: destination
        }, time, typeof callback == 'function' ? callback : function () {} )
    ;
};