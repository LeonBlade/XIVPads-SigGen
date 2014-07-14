<?php

// Quick Time
define('TIME_60SECONDS',    60);
define('TIME_60MINUTES',    TIME_60SECONDS * 60);
define('TIME_6HOURS',       TIME_60MINUTES * 6);
define('TIME_12HOURS',      TIME_60MINUTES * 12);
define('TIME_24HOUR',       TIME_60MINUTES * 24);
define('TIME_1WEEK',        TIME_24HOUR * 7);
define('TIME_30DAYS',       TIME_24HOUR * 30);
define('TIME_90DAYS',       TIME_24HOUR * 90);
define('TIME_180DAYS',      TIME_24HOUR * 180);

// Session
define('SESSION_DEFAULT_EXPIRE_TIME',   TIME_24HOUR);
define('COOKIE_DEFAULT_EXPIRE_TIME',    TIME_24HOUR);

// Cache Control
define('CACHE_CONTROL_TIMEOUT', TIME_24HOUR);

# ----------------------------------------------------------------------------------- #

// Errors
define('ERRORS_SHOW', isset($_GET['debug']) ? true : false);