(function (_win, $) {

    'use strict';

    /*global window: false */

    var  app = {};

    app.name = 'kevinChisholmBlogApp';

    app.constants = {};

    app.config = {
        debugOverride: false
    };

    //initializes the applcation
    app.init = function () {
        if (app.appDisabled()) {
            console.warn(app.name + ' DISABLED');

            return;
        }

        _win[app.name] = app;

        $(document).ready(app.start);
    };

    //starts the application
    app.start = function () {
        app.loadOoJsInteriewQuestionsJs();

        app.loadSocialPlugin();

        // app.addVideoIconsToRecentEntries();

        app.report();
    };

    app.report = function () {
        var msg = app.name + ' - loaded @ ' + (new Date().getTime());

        if (_win.console) {
            _win.console.log(msg);
        }
    };

    app.appDisabled = function () {
        return !app.config.debugOverride && app.debugQs() ? true : false;
    };

    app.debugQs = function () {
        var qsObject = app.queryToObject();

        return (qsObject.debug && qsObject.debug === 'true') ? true : false;
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

    app.queryToObject = function () {
        var i = 0,
            retObj = {},
            pair = null,
            //get the query string, omitting the "?"
            sPageURL = window.location.search.substring(1),
            //use the ampersand as a separator
            qArr = sPageURL.split('&');

        //each element in qArr is not a key/val pair
        //so we need to turn each one of these pairs
        //into a two-element array
        for (; i < qArr.length; i++){
            //use the "=" as a separator
            pair = qArr[i].split('=');
            //pair is now a two-element array
            //so the "key" is the first element of that array
            //and the "val" is the second element
            //so now we just add this "pair" to our return object
            retObj[pair[0]] = pair[1];
        };

        //return the new object
        return retObj;
    };

    // app.addVideoIconsToRecentEntries = function () {
    //     var $anchors = $('#secondary .widget.widget_recent_entries ul li a');
        
    //     $anchors.each(function () {
    //         var $this = $(this),
    //             thisText = $this.text();
            
    //         $this.html('<i class="fa fa-file-video-o" style="font-size: 14px;margin-right: 5px;"></i>' + thisText);
    //     }); 
    // };

    app.constants.SOCIAL_PLUGIN_RQEUIRE_URL = 'https://blog.kevinchisholm.com/js/social-plugin/require.js';

    app.constants.OO_JS_INTERVIEW_QUESTIONS_POST_URL = 'https://blog.kevinchisholm.com/object-oriented-javascript/javascript-interview-questions-object-oriented-javascript/';

    app.constants.OO_JS_INTERVIEW_QUESTIONS_JS_URL = 'https://sub1.kevinchisholm.com/blog/images/oojs-interview.js';


    //initialize the applcation
    app.init();
})(window, window.jQuery);