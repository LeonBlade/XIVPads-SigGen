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