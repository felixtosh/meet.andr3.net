
var andr3 = {};


ReadingModes = function (element) {
    this.element = element;
    this.element.on('click', $.proxy(this.handleClick, this));

    this.enableKeys();
};

$.extend(ReadingModes.prototype, {


    enableKeys: function () {
        $(document).on('keyup', $.proxy(this.handleKey, this));
    },
    handleKey: function (event) {
        var mode,
            key = event.keyCode;
        switch (key) {
            case 49: // [1]
                mode = 'quick';
                break;
            case 50: // [2]
                mode = 'semifull';
                break;
            case 51: // [3]
                mode = 'full';
                break;
        }

        this.activate(mode);
    },
    handleClick: function (event) {
        var element = $(event.target);

        var mode = 'full';
        switch(element.attr('data-mode')) {
            case 'quick':
            case 'semifull':
            case 'full':
                mode = element.attr('data-mode');
        }


        this.activate(mode);
    },
    markForDeletion: function (mode) {
        var targets,
            bits,
            self = this;
        switch (mode) {
            case 'quick':
                targets = ['semifull', 'full'];
                break;
            case 'semifull':
                targets = ['semifull', 'full'];
                break;
            case 'full':
                targets = ['semifull', 'full'];
                break;
        }
        for (var i=0;i<targets.length;i++) {
            bits = $('.only-' + targets[i]);
            bits
                .addClass('t-marked-for-deletion')
            ;
        }
        setTimeout(function () {
            self.activate(mode);
            $('.t-marked-for-deletion')
                .removeClass('t-marked-for-deletion')
            ;
        }, 1000);
    },
    activate: function (mode) {
        $('body').attr('data-reading-mode', mode);
        var bits = $('.only-' + mode);
        bits
            .addClass('animated')
        ;
        setTimeout(function () {
            bits.removeClass('animated');
        }, 500);
    }
});

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
    andr3.readingModes = new ReadingModes ($('.reading-modes'));


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
