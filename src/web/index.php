<?php
// Include the main file that does all the magic
include "../core/inc/inc.php";

// Templates for index
$Core->Index->addTemplate([
    'index'   => 'templates/index/index.html',
    'css'     => 'templates/index/index.css',
    'js'      => 'templates/index/index.js',
    'meta'    => 'templates/index/index.meta',
]);

// Some vars
$siteData =
[
    'title'     => 'XIVSigs - Final Fantasy XIV Signature Generator',
    'author'    => 'XIVPads Community - Josh Freeman @viion',
    'copyright' => 'XIVSigs &copy; 2014 - all rights reserved - <a href="https://github.com/viion/XIVPads-SigGen">GitHub: XIVPads-SigGen</a>',
];

// Setup html
$indexData =
[
    'title' => $siteData['title'],

    'base'  => $Core->Index->render('index', ['name' => 'Josh Freeman']),

    'js'    => 
    [
        $Core->Index->addFile('js', 'plugins/jqueryui/jqueryui.js'),
        $Core->Index->addFile('js', 'assets/js/core.js'),
    ],

    'css'   =>
    [
        $Core->Index->addFile('css', 'assets/css/core.css'),
    ],

    'meta'  =>
    [
        $Core->Index->addMeta('meta', ['author', $siteData['author']]),
    ],
];

$finalHtml = $indexData['base'];
$finalHtml = $Core->Index->appendTemplate($finalHtml, 'js', $indexData['js']);
$finalHtml = $Core->Index->appendTemplate($finalHtml, 'css', $indexData['css']);
$finalHtml = $Core->Index->appendTemplate($finalHtml, 'meta', $indexData['meta']);
$finalHtml = $Core->Index->Render(null, $siteData, $finalHtml);

// echo!
echo $finalHtml;