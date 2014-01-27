

$(function () {

    // Control the flow of animations
    var animations = animations || [];
    animations.push(new ControlledAnimation(
        $('header .box'),
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

    if (!Modernizr.touch) {
        // Sticky stuff
        $('.make-this-sticky').sticky();
    }
});
