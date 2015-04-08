<?php
// show print_r, pretty.
function show($text) {
    echo '<pre>'. print_r($text, true) .'</pre>';
}