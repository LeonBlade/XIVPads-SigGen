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
        });
    }
}
xiv.editor =
{

}