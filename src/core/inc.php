<?php

// Root path variable
$rootPath = __DIR__ .'/';

/*  General functions
 */
require_once __DIR__ .'/helpers/functions.php';

/*  Config
 */
require_once __DIR__ .'/../config/config.php';

/*  Config classses
 *  - Defines for constants and defined settings, global usage
 *  - Auto load for classes and such
 *  - Live DB credentials (will include local if file exists)
 *  - Config class, initializes some global variables.
 */
require_once __DIR__ .'/inc.defines.php';
require_once __DIR__ .'/inc.autoload.php';
require_once __DIR__ .'/inc.shutdown.php';
require_once __DIR__ .'/inc.class.php';

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
