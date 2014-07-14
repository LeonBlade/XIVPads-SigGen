<?php
namespace Modules\Signatures;

/*  - app: Generate
 *  Functions related to generating signatures
 */

class App extends \Helpers\Templating\Templating 
{
    // Templates
    const MAIN_TEMPLATE = 'templates/signature/index.html';
    const MAX_INPUT_SIZE = 64;

    // vars
    private $vars;

    // INit
    function __construct($params = null)
    {
        $this->vars = $params['_vars'];
        $this->showPage();
    }

    /*  - showPage()
     *  Renders the page for this app
     */
    private function showPage()
    {
        /*
        $key = 'index';
        $this->addTemplate([$key => self::MAIN_TEMPLATE]);
        $this->display($key,
        [
            'maxInputSize' => self::MAX_INPUT_SIZE,
        ]);
        */
    }
}

