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
        console.log('enabled', enabled);
        var $buttons = $('.templates-create .menu span:not(:first-child)');
        if (enabled) {
            $buttons.removeClass('disabled');
            return;
        }

        $buttons.addClass('disabled');
    },
}