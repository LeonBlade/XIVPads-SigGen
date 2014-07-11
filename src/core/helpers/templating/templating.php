<?php

namespace Helpers\Templating;

/*  - Templating
 *  This is a small class that handles very basic
 *  templating, use variables such as {{ xxx }}
 *  for loops and the like, make the html for the loop
 *  its own file, and grab that as a variable.
 *
 *  "Why not use Twig?"
 *  Twig is awesome, but it is far to big for this project.
 *  There is only the main index html for this project and
 *  mostly everything else is minor ajax'd or requires
 *  very little html, some even use mustache.js for JavaScript
 *  templates.
 */

class Templating
{
    // Stores all the templates for this class
    private $templates;
    private $preparedHtml;

    function __construct()
    {
        global $Log, $db_config;
        $Log->add('init '. __CLASS__);
    }

    /*  - addTemplate
     *  @param $array - An array of templates with associated key
     *  @return - will only return false if $array is not an array.
     */
    public function addTemplate($array)
    {
        global $Log;

        if (is_array($array))
        {
            foreach($array as $key => $file)
            {
                // Get values
                $filepath   = __DIR__.'/../../'. $file;

                // Append to templates
                $this->templates[$key] = $filepath;
                $Log->add('[addTemplate] Adding template: '. $key .' > '. $file);
            }
        }
        else
        {
            $Log->add('[addTemplate] param 1 was not an array');
            return false;
        }
    }

    /*  - render
     *  @param $key - Render a template based on the key given 
     *  @param $params - (optional) the params to replace
     *  @param $html - (optional) existing html, doesnt fetch from file.
     *  @return - the formatted html, otherwise false.
     */
    public function render($key, $params = null, $html = null)
    {
        global $Log;

        if ($key || $html)
        {
            // Get file html
            if (!$html)
            {
                $html = $this->get($key);
            }

            if ($html)
            {
                if ($params && is_array($params))
                {
                    $vars = $this->getVariableParams($params);
                    $html = str_ireplace($vars[0], $vars[1], $html);
                }

                return $html;
            }
            else
            {
                $Log->add('[render] template faled for: '. $key);
                return false;
            }
        }
        else
        {
            $Log->add('[render] param 1 is null');
            return false;
        }
    }

    /*  - display
     *  @param $key - Render a template based on the key given 
     *  @param $params - (optional) the params to replace
     *  @return - false if any failures
     *
     *  This will directly echo the template.
     */
    public function display($key, $params = null, $html = null)
    {
        $html = $this->render($key, $params, $html);
        echo $html;
    }

    /*  - get
     *  @param $key - Get a template file 
     *  @return - the html of the template
     */
    public function get($key)
    {
        global $Log;

        if ($key)
        {
            if (isset($this->templates[$key]))
            {
                $file = $this->templates[$key];
                if (file_exists($file))
                {
                    return file_get_contents($file);
                }
                else
                {
                    $Log->add('[get] template file: '. $file .' does not exist.');
                    return false;
                }
            }
            else
            {
                $Log->add('[get] template: '. $key .' has not been added to the template array.');
                return false;
            }
        }
        else
        {
            $Log->add('[get] param 1 is null');
            return false;
        }
    }

    /*  - appendTemplate
     *  @param $html - the html to append onto
     *  @param $var - the variable on the html to replace
     *  @param $array - an array of html to inject
     *  @return - the formatted and replaced html
     */
    public function appendTemplate($html, $var, $array)
    {
        $temp = [];
        foreach($array as $value)
        {
            $temp[] = $value;
        }
        $temp = implode(null, $temp);

        // Set vars
        $newHtml = $this->setVars($html, [$var => $temp]);

        // Return html
        return $newHtml;
    }

    /*  - getVariableParams
     *  @param $params - The parameters to convert
     *  @return - a formatted array of variables: {{ xxx }}, etc
     */
    public function getVariableParams($params)
    {
        $Temp1 = [];
        $Temp2 = [];
        foreach($params as $key => $value)
        {
            $key = trim($key);
            $Temp1[] = '{{'. $key .'}}';
            $Temp1[] = '{{ '. $key .' }}';

            $Temp2[] = $value;
            $Temp2[] = $value;
        }
        return [$Temp1, $Temp2];
    }

    /*  - replaceVars
     *  @param $html - the html to format
     *  @param $params - the params to replace.
     */
    public function setVars($html, $params)
    {
        $vars = $this->getVariableParams($params);
        return str_ireplace($vars[0], $vars[1], $html);
    }



}