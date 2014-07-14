<?php

// Shutdown function, runs at the end of PHP Excution.
function shutdown() 
{ 
    global $Core, $Log;

    // Disconnect database 
    //$Core->DCDB(); 

    // Dev debugging
    #if (ERRORS_SHOW) $Log->show();
    //$Log->show();
    //$Log->save('test', true);
}

// Register function to run at the end of php execution
register_shutdown_function('shutdown');