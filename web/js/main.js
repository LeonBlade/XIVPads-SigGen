var xiv =
{
    init: function()
    {
        xiv.buttons.init();
    },

    buttons: {},
    general: {},
    editor: {},
}
xiv.general =
{
    page: function(data) {
        if (!data) {
            $('main').html(xiv.general.render404());
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

    render404: function() {
        return '<div class="p50 tac"><h3>i\'m a bit lost...</h3><h1 class="fainter mt40 fs50">404</h1></div>';
    },
}
xiv.buttons =
{
    init: function()
    {
        $('nav .menu').on('click', 'span', function()
        {
            var num = $(this).attr('id');

            // Set active state for navigation
            $('nav .menu .active').removeClass('active');
            $(this).addClass('active');

            // load page
            xiv.general.loading();

            // Load
            $.ajax({
                url: 'ajax.php',
                data: { p: num },
                success: xiv.general.page,
                error: function(data, status, text) {
                    console.error(data);
                    console.error(status);
                    console.error(text);
                }
            });
        });
    },
}
xiv.editor =
{
    Character: null,

    init: function()
    {
        xiv.editor.initButtons();
        xiv.editor.initStart();
    },

    // all button actions
    initButtons: function()
    {
        $('.editor').on('click', '#xivsync-go', function(e)
        {
            e.preventDefault();

            // get data
            var $result = $('#xivsync-result'),
                nameOrId = $('#xivsync-name').val(),
                server = $('#xivsync-server').val();

            // check for a name or id
            if (!nameOrId || !server) {
                $result.html('<div class="error">No name or Lodestone ID entered, try again!</div>').show();
                return;
            }

            // Magic
            $result.html(xiv.general.loadingXIVSyncHtml()).show();
            LodestoneAPI.Search.Character(nameOrId, server, function(Character)
            {
                if (Character)
                {
                    // set active character
                    xiv.editor.Character = Character;

                    // render display
                    $result.html(xiv.general.render('#xivsync-return', Character));

                    // enable all buttons
                    xiv.editor.toggleMenu(true);
                    return;
                }

                // no Character return
                $result.html('<div class="error">Could not find character. Try using the Lodestone ID and ensure the character is on XIVPads.com</div>');

                // toggle menu if no character was previously set
                if (!xiv.editor.Character) {
                    xiv.editor.toggleMenu();
                }
            });
        });
    },

    // Start
    initStart: function()
    {
        // disable menu
        xiv.editor.toggleMenu();

        // load character active
        $('#editor-character').fadeIn(300);
    },

    toggleMenu: function(enabled)
    {
        var $buttons = $('.templates-create .menu span:not(:first-child)');
        if (enabled) {
            $buttons.removeClass('disabled');
            return;
        }

        $buttons.addClass('disabled');
    },
}