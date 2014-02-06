ReadingModes = function (element) {
    this.element = element;
    this.element.on('click', $.proxy(this.handleClick, this));
    this.element.siblings('input').on('focus', $.proxy(this.handleInputChange, this));

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
    handleInputChange: function (event) {
        var element = $(event.currentTarget);
        element.prop('checked', true);
      
        this.activateByElement(element.next('label,button'));  
    },
    handleClick: function (event) {
        var element = $(event.currentTarget);

        this.activateByElement(element);
    },
    activateByElement: function (element) {
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
        // Set global state on <body>
        $('body').attr('data-reading-mode', mode);

        // Activate checkbox
        $('[data-mode=' + mode + '] input').prop('checked', true);

        // Animate each itsy bitsy bit
        var bits = $('.only-' + mode);
        bits
            .addClass('animated')
        ;
        // ALRIGHT! Enough is enough!
        setTimeout(function () {
            bits.removeClass('animated');
        }, 500);
    }
});
