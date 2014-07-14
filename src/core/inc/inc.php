<?php

// Root path variable
$rootPath = __DIR__ .'/';

/*  General functions
 */
require_once __DIR__ .'/../helpers/functions.php';

/*  Config
 */
require_once __DIR__ .'/../../config/config.php';

/*  - Include a all the core files
 *  defines ...
 *  autoload ...
 *  shutdown ...
 *  class ...
 *  routes ...
 */
require_once __DIR__ .'/inc.defines.php';
require_once __DIR__ .'/inc.autoload.php';
require_once __DIR__ .'/inc.shutdown.php';
require_once __DIR__ .'/inc.class.php';
require_once __DIR__ .'/inc.routes.php';

/*  Global "Log" class
 */
use Helpers\Logging\Log;
$Log = new Log();

/*  Global "Core" class
 *  - Database, Memcache, Json, Header Control
 *
 *  This is created so there are very few global variable 
 *  to access, and that contains an object which contains
 *  functionality to core methods.
 */
$Core = new Core();

/*  $_PARAMS
 *  merged version of $_POST and $_GET
 */
$_PARAMS = array_merge($_POST, $_GET);