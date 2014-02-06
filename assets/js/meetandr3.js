
var andr3 = {};

$(function () {

    // Control the flow of animations
    var animations = animations || [];
    animations.push(new ControlledAnimation(
        $('header > [data-ratio=one-screen]'),
        'header-animation', {
            initialDelay: 1,
            delay: 1,
            runOnce: true
        }
    ));

    $('.restart-animations').on('click', function () {
        if(localStorage) {
            for (animation in animations) {
                animations[animation].reenable();
            }
        }
    });
    // end of Control the flow of animations

    // Video controls
    $('.play-video').on('click', function () {
        var video = $(this).parent().find('video');
        if (video.length) {
            video = video[0];
            if (typeof video.play == 'function') {
                (video.paused ? video.play() : video.pause());
            }
        }
    });
    // end of Video controls


    // Reading Modes
    andr3.readingModes = new ReadingModes ($('.reading-modes [data-mode]'));


    // Make stuff sticky, but not if is a touch device
    if (!Modernizr.touch) {
        // Sticky stuff
        $('.make-this-sticky').sticky();
    }
    // end of Make stuff sticky

    // Boxes on/off

    // Big offset (50% screen height)
    $('.intro-quote')
        .addClass('t-off')
        .waypoint(function (direction) {
            $(this)
                .removeClass('t-off')
                .addClass('t-on')
            ;
        }, { offset: screen.height * 0.5 });
    ;

    // Small offset (25% screen height)
    $('.reading-modes')
        .addClass('t-off')
        .waypoint(function (direction) {
            $(this)
                .removeClass('t-off')
                .addClass('t-on')
            ;
        }, { offset: screen.height * 0.25 })
    ;

    // Turn offs (no offset)
    $('[data-turn-off]')
        .waypoint(function (direction) {
            $(this.getAttribute('data-turn-off'))
                .removeClass(direction == 'down' ? 't-on' : 't-off')
                .addClass(direction == 'down' ? 't-off' : 't-on')
            ;
        }, { offset: 0 })
    // end of Boxes on/off


    // Form submission
    andr3.contactForm = new AsyncForm($('#frm_contact'));
    $('#frm_contact .again button').on('click', function (event) {
        var frm = $(this).parents('form');
        frm.attr('data-status', 'unsubmitted');
        frm.get(0).reset();
        smoothScrollTo(frm);
    });

    // Anchors
    $('.actions a[href^=#]').on('click', function (event) {
        var targetId = $(this).attr('href');
        smoothScrollTo($(targetId), function () { 
            window.location.hash = targetId.replace(/^\#/, '');
        });
        event.preventDefault();
    });

    LazyLoadingContainer.wakeAll();
    LazyLoadingImage.wakeAll();
});


(function () {
    var vd = document.createElement('video');
    if (typeof vd.canPlayType == 'function') {
        var needFlashVideoPlayer =  vd.canPlayType('video/webm') == '' &&
                                    vd.canPlayType('video/mp4') == '' &&
                                    vd.canPlayType('video/ogv') == '';
        if (needFlashVideoPlayer) {
            var pathToVideoJs = '/vendor/video.js/';
            $('<link rel="stylesheet" href="' + pathToVideoJs +  'video-js.css">')
                .appendTo($('head'));
            $('<script src="' + pathToVideoJs +  'video.js">')
                .appendTo($('head'));
            videojs.options.flash.swf = pathToVideoJs + "video-js.swf"
        }
    }
})();
