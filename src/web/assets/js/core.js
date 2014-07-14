$(function()
{
    console.log('ready!');
    Site.events.init();
    Site.paging.default();

    dev();
});

// Random global vars
var DEFAULT_PAGE = 'generate/create';

/*  Site
 */
var Site =
{
    events: 
    {
        init: function()
        {
            // tooltips
            var ttSpacing = 8;
            Site.events.tooltips('.tt-top', { my: "center bottom-" + ttSpacing, at: "center top", });
            Site.events.tooltips('.tt-right', { my: "left+"+ ttSpacing +" center", at: "right center" });
            Site.events.tooltips('.tt-left', { my: "right-"+ ttSpacing +" center", at: "left center" });
            Site.events.tooltips('.tt-bottom', { my: "center top+"+ ttSpacing, at: "center bottom", });

            // Ajax
            Site.events.ajaxButtons();
        },

        ajaxButtons: function()
        {
            // Ajax stuff with the ajax class
            $('.ajax').off('click');
            $('.ajax').click(function()
            {
                Site.paging.goto($(this));
            });
        },

        tooltips: function(element, pos)
        {
            $(element).tooltip(
            { 
                position: pos,
                show: { duration: 0 },
                hide: { duration: 0 },
            }).off("focusin focusout"); 
        },
    },

    paging:
    {
        default: function()
        {
            ajax.go({
                data: { i: DEFAULT_PAGE, },

                success: Site.paging.success,
                error: Site.paging.error,
            });
        },

        goto: function(element)
        {
            // pass onto paging
            var page = element.attr('data-page');
            console.log('Load: ' + page);
            if (page && page.length > 1)
            {
                ajax.go(
                {
                    data: { i: page, },

                    success: Site.paging.success,
                    error: Site.paging.error,
                });
            }
            else
            {
                console.log('[error] Page length was too short.');
            }
        },

        success: function(data)
        {
            console.log('Ajax Success');
            $('main').html(data);
            Site.events.init();
        },

        error: function(data)
        {
            console.log('Ajax Error');
            console.log(data);
        },
    }
    
}

/*  Core ajax
 */
var ajax =
{
    default: 'goto.php',

    // Main ajax call, everything runs through this method. Callback is optional, will be fored on both success and error.
    go: function(options, callback)
    {
        if (!options) { return false; }

        var URL     = options.url;
        var Type    = options.type;       // get or post
        var Content = options.content     // Content type, eg: content: "application/json"
        var Data    = options.data;       // Obj: { x: x, y: y }
        var Cache   = options.cache;      // Cache or not
        var Success = options.success;
        var Error   = options.error;
        var Async   = options.async;
        var DType   = options.datatype;

        // If no file set, set default
        if (!URL)       { URL = ajax.default; }
        if (!Type)      { Type = 'GET'} else { Type = Type.toUpperCase(); }
        if (!Cache)     { Cache = true; }
        if (!Async)     { Async = false; }
        if (!Content)   { Content = 'application/x-www-form-urlencoded; charset=UTF-8'; }
        if (!DType)     { DType = 'html'; }

        Cache = false;

        $.ajax({

            url:            URL,
            data:           Data,
            type:           Type,
            cache:          Cache,
            async:          Async,
            contentType:    Content,
            dataType:       DType,

            // On success
            success: function(data)
            { 
                if (Success) 
                { 
                    Success(data);
                } 
                
                if (callback) 
                { 
                    callback();
                } 
            },

            error: function(response, status, thrown)
            { 
                if (Error) 
                { 
                    Error({ response: response, status: status, thrown: thrown }); 
                } 

                if(callback)
                {
                    callback();
                } 
            },
        });
    }
}