
var LazyLoadingImage = function (element, options) {
    this.element = $(element);
    this.options = $.extend(this.defaults, options);
    this.waypoints = typeof $.waypoints == 'function';

    if (this.element && this.waypoints) {
        this.init();
    }
};


$.extend(LazyLoadingImage.prototype, {
    defaults: {

    },

    init: function () {
        this.loaded = false;
        this.element.waypoint($.proxy(this.load, this), {
            offset: screen.height,
            triggerOnce: true
        });
    },
    shouldUpgrade: function () {
        return screen.width >= 800; 
    },
    load: function (direction) {

        if (this.shouldUpgrade() && this.loaded === false) {

            // Responsive Enhance by @joshje
            var img = new Image();
            var fullImg = this.element.attr('data-fullsrc');
            img.onload = $.proxy(this.upgrade, this, fullImg);
            img.src = fullImg;

            this.loaded = true;
        }
    },
    upgrade: function (fullImg) {
        this.element.attr('src', fullImg);
    }
});

LazyLoadingImage.wakeAll = function () {
    andr3 = andr3 || {};
    andr3.LazyLoadingImages = [];
    $('.lazyloading-image,[data-fullsrc]')
        .each(function () {
            andr3.LazyLoadingImages.push(new LazyLoadingImage(this));
        })
    ;
};
