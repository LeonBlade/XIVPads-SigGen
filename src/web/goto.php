<?php
// Include the main file that does all the magic
include "../core/inc.php";

// Get i var
$maxParam = 64;
$i = substr(trim($_PARAMS['i']), 0, $maxParam);

// Handle i
if ($i)
{
    // Get app name
    $app = explode('/', $i)[0];

    // Get page
    if (isset($ajaxPageRoutes[$app]))
    {
        // Get app file
        $app = $ajaxPageRoutes[$app];

        // Include it
        include __DIR__.'/../core/'.$app;
    }
    else
    {
        // error
        echo 'Invalid path';
    }
}
else
{
    echo 'No Path';
}