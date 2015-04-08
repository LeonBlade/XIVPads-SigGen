xiv.general =
{
    page: function(data) {
        if (!data) {
            console.error('No page?', data);
            return;
        }

        $('main').html(data);
    },

    loading: function() {
        $('main').html('<div class="loading"><h1>loading</h1><div class="loader-outter"><div class="loader-inner ball-scale-multiple"><div></div><div></div><div></div></div></div></div>');
    },

    loadingXIVSyncHtml: function() {
        return '<div class="box10">&nbsp;<div class="loader-inner ball-clip-rotate-pulse"><div></div><div></div></div></div>\
                <div class="box90 p2"><h3>Searching XIVPads ...</h3></div>';
    },

    render: function(id, data)
    {
        // Get the html
        var template = $(id).html();

        if (typeof template === 'undefined') {
            console.log('undefined: ', id);
            return;
        }

        template = template.trim();

        // Parse (for performance)
        Mustache.parse(template);

        // Get rendered result
        var rendered = Mustache.render(template, data);

        // Return rendered result
        return rendered;
    },
}