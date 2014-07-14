<?php
//use Helpers\DB\Database;
//use Helpers\Cache\Mem;
//use Helpers\Cache\Json;
//use Helpers\Browser\Cookie;
//use Helpers\Browser\Session;
//use Helpers\Timers\Time;
//use Helpers\Validate\Strings;
//use Helpers\Validate\Sanitize;

// Get helpers
use Helpers\Templating\Templating;

// Get modules
use Modules\Index\Index;


/*  Core
 *  - Contains class access to a lot of cool stuff.
 */
class Core
{
    // Core 
    public $DB;
    public $Memcached;

    // Cool stuff
    public $Json;
    public $Cookie;
    public $Session;
    public $Time;
    public $Validation;
    public $Sanitize;
    public $Templating;

    // Modules
    public $Index;

    // Initialize
    function __construct()
    {
        $this->Templating = new Templating;
        $this->Index = new Index;
    }

    // DC Database
    public function DCDB()
    {
        $this->DB->disconnect();
    }
}