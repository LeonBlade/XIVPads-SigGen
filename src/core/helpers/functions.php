<?php

/*  General Functions
 *  - Whole bunch of random general functions, global.
 */

// Show some kind of data in a pre format
function show($data)
{
    echo '<pre>'. print_r($data, true) .'</pre>';
}

// Generate a random hash
function getRandomString($length)
{
    $randstr = "";
    for($i=0; $i<$length; $i++)
    {
        $randnum = mt_rand(0,61);
        if($randnum < 10)
        {
            $randstr .= chr($randnum+48);
        }
        else if($randnum < 36)
        {
            $randstr .= chr($randnum+55);
        }
        else
        {
            $randstr .= chr($randnum+61);
        }
    }
    return $randstr;
}