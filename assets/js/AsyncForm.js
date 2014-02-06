
var AsyncForm = function (element, options) {

    this.element = $(element);
    this.options = $.extend(this.defaults, options);

    this.init();
};

$.extend(AsyncForm.prototype, {
    defaults: {

    },

    init: function () {
        this.element
            .on('submit', $.proxy(this.handleSubmit, this))
        ;
    },
    handleSubmit: function (event) {
        event.preventDefault();

        var formData = this.element.serialize();
        var url = this.element.attr('action');

        $.ajax({
            url: this.element.attr('action'),
            type: 'POST',
            data: formData,
            complete: $.proxy(this.handleComplete, this),
            error: $.proxy(this.handleError, this),
            success: $.proxy(this.handleSuccess,this)
        });

        this.loading('on');
    },

    handleComplete: function (xhr) {
    },
    handleError: function () {
        return;
        if(console){
            alert('An error occured, try later or throw an email to me@andr3.net Sorry for the inconvenience.');
        }
    },
    handleSuccess: function (result, xhr, delay) {
        if (delay !== false) {
            setTimeout($.proxy(this.handleSuccess, this, result, xhr, false), 2000);
        }
        this.loading('off');
        var element = this.element;

        element
            .find('[data-for-status=saved]')
            .removeAttr('aria-hidden')
        ;

        // setTimeout'ed to allow the display: none to become display: block
        // and then allow browser to interpolate the transition for opacity/left values
        setTimeout(function () {
            element.attr('data-status', 'saved');
        }, 0);
    },

    loading: function (status) {
        var wheel = this.element.find('progress');
        if (!wheel.length) {
            wheel = $('<progress value="10" max="100"></progress><i class="html-icon">&#xe60b;</i>');
            wheel.appendTo(this.element);
        }

        if (status == 'on') {
            wheel
                .attr('aria-hidden', 'false')
            ;
            setTimeout(function () {
                wheel
                    .attr('value', 10)
                    .removeClass('t-off')
                    .addClass('t-on')
                ;
            }, 0);

            this.element
                .find('button[type=submit]')
                .prop('disabled', true)
            ;

        } else {
            wheel.animate({
                value: 100
            });
            wheel
                .removeClass('t-on')
                .addClass('t-off')
            ;
            // Make the complete state visible for 500ms after completion
            setTimeout(function () {
                wheel
                    .attr('aria-hidden', 'true')
                ;
            }, 1500);

            this.element
                .find('button[type=submit]')
                .prop('disabled', false)
            ;
        }

    }

});
