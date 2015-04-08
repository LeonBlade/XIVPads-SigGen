<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, maximum-scale=1">
    <meta name="title" content="XIVSigs">
    <meta name="description" content="XIVSigs, a Signature Generator for FFXIV">
    <meta name="publisher" content="Premium Virtue (Josh Freeman) - @viion">
    <meta name="copyright" content="Premium Virtue (Josh Freeman) - @viion">
    <meta name="author" content="Premium Virtue (Josh Freeman) - @viion">
    <meta name="audience" content="Final Fantasy, Video Game">
    <meta name="robots" content="index,follow">
    <title>XIVSigs</title>
    <link rel="shortcut icon" href="favicon.ico">

    <link href="http://fonts.googleapis.com/css?family=Roboto:400,100,300,700,900,500italic,500,700italic" rel="stylesheet" type="text/css">
    <link href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="css/loaders.css" rel="stylesheet" type="text/css">
    <link href="css/main.css" rel="stylesheet" type="text/css">
</head>
<body>
    <div class="site">
    <?php
        require __DIR__ .'/../src/templates/header.html';
        require __DIR__ .'/../src/templates/main.html';
        require __DIR__ .'/../src/templates/footer.html';
    ?>
    </div>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/mustache.js/0.8.1/mustache.min.js"></script>
    <script src="http://xivsync.com/lodestoneapi.min.js"></script>
    <script src="js/main.js"></script>
    <script>$(function() { xiv.init(); });</script>
    <script>
    // dev
    $(function() { $('nav .menu #5').trigger('click'); });
    </script>
</body>
</html>