(function (_win, $) {

    'use strict';

    /*global window: false */

    var app = {};

    //initializes the applcation
    app.init = function(){
        $(document).ready(app.start);
    };

    //starts the application
    app.start = function () {
        app.loadOoJsInteriewQuestionsJs();
    };

    app.loadOoJsInteriewQuestionsJs = function () {
        $.getScript('https://sub1.kevinchisholm.com/blog/images/oojs-interview.js');
    };

    //initialize the applcation
    app.init();
})(window, window.jQuery);