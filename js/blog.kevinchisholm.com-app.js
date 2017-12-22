(function (_win, $) {

    'use strict';

    /*global window: false */

    var  app = {};

    app.name = 'kevinChisholmBlogApp';

    app.constants = {};

    //initializes the applcation
    app.init = function () {
        _win[app.name] = app;

        $(document).ready(app.start);
    };

    //starts the application
    app.start = function () {
        app.loadOoJsInteriewQuestionsJs();

        app.loadSocialPlugin();

        app.report();
    };

    app.report = function () {
        var msg = app.name + ' - loaded @ ' + (new Date().getTime());

        if (_win.console) {
            _win.console.log(msg);
        }
    };

    app.loadSocialPlugin = function () {
        app.loadRequireJs().done(app.initSocialPlugin);
    };

    app.loadRequireJs = function () {
        return $.getScript(app.constants.SOCIAL_PLUGIN_RQEUIRE_URL);
    };

    app.initSocialPlugin = function () {
        require.config({
            baseUrl: "/js/social-plugin/"
        });
    
        require(["social-menu"], function(menu) {
            menu.init(['facebook','twitter','pinterest','googleplus','email']);
        });
    };

    app.loadOoJsInteriewQuestionsJs = function () {
        var constants = app.constants;
    
        if (_win.location.href !== constants.OO_JS_INTERVIEW_QUESTIONS_POST_URL){
            return;
        }

        $.getScript(constants.OO_JS_INTERVIEW_QUESTIONS_JS_URL);
    };

    app.constants.SOCIAL_PLUGIN_RQEUIRE_URL = 'https://blog.kevinchisholm.com/js/social-plugin/require.js';

    app.constants.OO_JS_INTERVIEW_QUESTIONS_POST_URL = 'https://blog.kevinchisholm.com/object-oriented-javascript/javascript-interview-questions-object-oriented-javascript/';

    app.constants.OO_JS_INTERVIEW_QUESTIONS_JS_URL = 'https://sub1.kevinchisholm.com/blog/images/oojs-interview.js';


    //initialize the applcation
    app.init();
})(window, window.jQuery);