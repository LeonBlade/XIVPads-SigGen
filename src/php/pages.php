<?php
// Page number, to select, the page.
$num = isset($_GET['p']) ? intval(trim($_GET['p'])) : null;

// no numz
if (!$num) return;

// Load required template, rest is done in moooostachez
switch($num)
{
    case 5:
        $template = TEMPLATES .'/templates.create.html';
        break;
}

// if no template
if (!$template) return;

// get template
$template = file_get_contents($template);

// preg match any includes
if(preg_match_all('/{+(.*?)}/', $template, $includes))
{
    // loop through all found pages
    foreach($includes[1] as $i => $file)
    {
        // check file exists
        // has to contain .html, be less than 64. Otherwise a bunch of javascript will get detected
        if (stripos($file, '.html') !== false && strlen($file) <= 64)
        {
            if (!file_exists(TEMPLATES . '/'. $file)) {
                die('File: '. $file .' does not exist');
            }

            // replace
            $template = str_ireplace($includes[0][$i], file_get_contents(TEMPLATES . '/'. $file), $template);
        }
    }
}

// echo template aka page
echo $template;