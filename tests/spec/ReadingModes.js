
var customMatchers = {
    toBeInReadingMode: function (util, customEqualityTesters) {
        return {
            compare: function (actual, expected) {
                var result = {};

                var actual = $('body').attr('data-reading-mode');

                result.pass = actual == expected;
                result.message = 'Reading Mode is ' + (result.pass ? '':'NOT') + ' [' + expected + '] is ['+ actual +']';

                return result;
            }
        };
    },
    toBeAnimating: function (util, customEqualityTesters) {
        return {
            compare: function (actual, expected) {
                var result = {};

                var actual = $('body').attr('data-reading-mode');
                var firstExample = $('.only-' + actual).first();

                result.pass = firstExample.length != 0 && firstExample.hasClass('animated');

                result.message = 'Reading Mode is ' + (result.pass ? '':'NOT') + ' animating.';

                return result;
            }
        };
    }
};

describe('ReadingModes', function () {
    var readingModes;

    beforeEach(function () {
        jasmine.addMatchers(customMatchers);

        var fix = jasmine.getFixtures();
        fix.fixturesPath = 'spec/fixtures/';
        fix.load('ReadingModes.html');

        readingModes = new ReadingModes ($('.reading-modes [data-mode]'));

    });

    it("Default reading mode is FULL", function () {
        expect().toBeInReadingMode('full');
    });
    it("Changes to QUICK reading mode", function () {
        expect(readingModes.activate('quick')).toBeInReadingMode('quick');
    });
    it("Changes to SEMIFULL reading mode", function () {
        expect(readingModes.activate('semifull')).toBeInReadingMode('semifull');
    });
    it("Changes to FULL reading mode", function () {
        expect(readingModes.activate('full')).toBeInReadingMode('full');
    });

    it("Starts animation right away", function () {
        expect(readingModes.activate('full')).toBeAnimating();
    });

});

describe('ReadingModes - Animation Stops', function () {
    var readingModes;

    beforeEach(function (done) {
        jasmine.addMatchers(customMatchers);

        var fix = jasmine.getFixtures();
        fix.fixturesPath = 'spec/fixtures/';
        fix.load('ReadingModes.html');

        readingModes = new ReadingModes ($('.reading-modes [data-mode]'));

        readingModes.activate('full');

        var actual = $('body').attr('data-reading-mode');
        var firstExample = $('.only-' + actual).first();

        setTimeout(function () {
            console.log("499ms, has class animated:",firstExample.hasClass('animated'));
        }, 499);
        setTimeout(function () {
            console.log("500ms, has class animated:",firstExample.hasClass('animated'));
            done();
        }, 500);
    });

    it("Stops animation at the right time", function () {

        expect(expect().not.toBeAnimating()).not.toBeAnimating();

    });
});
