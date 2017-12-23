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

        app.addFaIcons();

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

        setTimeout(app.addSocialPluginHideArrow, 1000);
        setTimeout(app.showSocialPlugin, 5000);
    };

    app.showSocialPlugin = function () {
        $(app.constants.SOCIAL_PLUGIN_CONTAINER_SELECTOR).animate({
            left: "0"
        }, 1000, function() {
            //animation complete.
        });
    };

    app.hideSocialPlugin = function () {
        $(app.constants.SOCIAL_PLUGIN_CONTAINER_SELECTOR).animate({
            left: "-500px"
        }, 1000, function() {
            //animation complete.
        });
    };

    app.addSocialPluginHideArrow = function () {
        var $arrow = $(app.constants.SOCIAL_PLUGIN_CONTAINER_ARROW_HTML);

        $(app.constants.SOCIAL_PLUGIN_CONTAINER_SELECTOR)
        .find('ul')
        .append($arrow);

        setTimeout(function () {
            $arrow.on('click', app.hideSocialPlugin);
        }, 1000);
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

    app.addFaIcons = function () {
        app.addEnvelopeIconToContactHeaders();

        app.addSearchIconToContactHeaders();

        app.addUsersIconToContactHeaders();

        app.addFolderIconToCategoriesHeaders();

        app.addTagIconToCategoriesHeaders();

        app.addCalendarIconToCategoriesHeaders();

        app.addPageIconsToRecentEntries();
    };

    app.addEnvelopeIconToContactHeaders = function () {
        var $contactHeader  = $("#text-22 .widget-title");

        $contactHeader .each(function () {
            var $this = $(this),
                thisText = $this.text();

            $this.html(app.constants.ENVELOPE_ICON_HTML + thisText);
        });
    }

    app.addSearchIconToContactHeaders = function () {
        var $contactHeader  = $("#search-2 .widget-title");

        $contactHeader .each(function () {
            var $this = $(this),
                thisText = $this.text();

            $this.html(app.constants.SEARCH_ICON_HTML + thisText);
        });
    }

    app.addUsersIconToContactHeaders = function () {
        var $contactHeader  = $("#s2_form_widget-2 .widget-title");

        $contactHeader .each(function () {
            var $this = $(this),
                thisText = $this.text();

            $this.html(app.constants.USERS_ICON_HTML + thisText);
        });
    }

    app.addFolderIconToCategoriesHeaders = function () {
        var $categoriesHeader  = $( "#tag_cloud-7 .widget-title");

        $categoriesHeader .each(function () {
            var $this = $(this),
                thisText = $this.text();

            $this.html(app.constants.FOLDER_OPEN_ICON_HTML + thisText);
        });
    }

    app.addTagIconToCategoriesHeaders = function () {
        var $categoriesHeader  = $( "#tag_cloud-6 .widget-title");

        $categoriesHeader .each(function () {
            var $this = $(this),
                thisText = $this.text();

            $this.html(app.constants.TAG_ICON_HTML + thisText);
        });
    }

    app.addCalendarIconToCategoriesHeaders = function () {
        var $categoriesHeader  = $( "#recent-posts-2 .widget-title");

        $categoriesHeader .each(function () {
            var $this = $(this),
                thisText = $this.text();

            $this.html(app.constants.CALENDAR_ICON_HTML + thisText);
        });
    }

    app.addPageIconsToRecentEntries = function () {
        var $anchors = $('#secondary .widget.widget_recent_entries ul li a');

        $anchors.each(function () {
            var $this = $(this),
                thisText = $this.text();

            $this.html('<i class="fa fa-file-text" style="font-size: 14px;margin-right: 5px;"></i>' + thisText);
        }); 
    };

    app.constants.SOCIAL_PLUGIN_CONTAINER_SELECTOR = '#socialIconsParent';

    app.constants.SOCIAL_PLUGIN_CONTAINER_ARROW_HTML = '<li class="arrow"><i class="fa fa-arrow-left" aria-hidden="true"></i></li>';

    app.constants.SOCIAL_PLUGIN_RQEUIRE_URL = 'https://blog.kevinchisholm.com/js/social-plugin/require.js';

    app.constants.OO_JS_INTERVIEW_QUESTIONS_POST_URL = 'https://blog.kevinchisholm.com/object-oriented-javascript/javascript-interview-questions-object-oriented-javascript/';

    app.constants.OO_JS_INTERVIEW_QUESTIONS_JS_URL = 'https://sub1.kevinchisholm.com/blog/images/oojs-interview.js';

    app.constants.ENVELOPE_ICON_HTML = '<i class="fa fa-envelope-o" style="margin-right: 5px;"></i>';

    app.constants.SEARCH_ICON_HTML = '<i class="fa fa-search" style="margin-right: 5px;"></i>';

    app.constants.USERS_ICON_HTML = '<i class="fa fa-user-plus" style="margin-right: 5px;"></i>';

    app.constants.TAG_ICON_HTML = '<i class="fa fa-tags" style="margin-right: 5px;"></i>';

    app.constants.CALENDAR_ICON_HTML = '<i class="fa fa-calendar" style="margin-right: 5px;"></i>';

    app.constants.FOLDER_OPEN_ICON_HTML = '<i class="fa fa-folder-open-o"" style="margin-right: 5px;"></i>';

    //initialize the applcation
    app.init();
})(window, window.jQuery);