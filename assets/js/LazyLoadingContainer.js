
var LazyLoadingContainer = function (element, options) {
    this.element = $(element);
    this.payload = this.element.find('script');
    this.options = $.extend(this.defaults, options);
    this.waypoints = typeof $.waypoints == 'function';

    if (this.element && this.payload && this.waypoints) {
        this.init();
    }
};

$.extend(LazyLoadingContainer.prototype, {
    defaults: {

    },

    init: function () {
        this.loaded = false;
        this.element.waypoint($.proxy(this.load, this), {
            offset: screen.height,
            triggerOnce: true
        });
    },
    load: function (direction) {
        if (this.loaded === false) {
            var content = this.payload.html();
            this.element
                .html(content)
            ;
            this.loaded = true;
        }
    }
});

LazyLoadingContainer.wakeAll = function () {
    andr3 = andr3 || {};
    andr3.lazyLoadingContainers = [];
    $('.lazyloading-container')
        .each(function () {
            andr3.lazyLoadingContainers.push(new LazyLoadingContainer(this));
        })
    ;
};