<?php

namespace Modules\Index;

/*  - index
 *  Handles all the index stuff
 */

class Index extends \Helpers\Templating\Templating
{
    // Initialize
    function __construct()
    {
        global $Log, $db_config;
        $Log->add('init '. __CLASS__);
    }

    // ---
    
    // Add a file
    public function addFile($type, $file)
    {
        // Get the template
        $html = $this->get($type);

        // Setup file path
        $filepath   = __DIR__ .'/../../../web/'. $file;

        // Create file with version
        $file       = $file .'?v='. filemtime($filepath);

        // Get replace vars
        $result     = $this->setVars($html, ['file' => $file]);

        return $result;
    }

    // Add meta tag
    public function addMeta($type, $data)
    {
        // Get the template
        $html = $this->get($type);

        // Get replace vars
        $result     = $this->setVars($html, ['name' => $data[0], 'content' => $data[1]]);

        return $result;
    }
}