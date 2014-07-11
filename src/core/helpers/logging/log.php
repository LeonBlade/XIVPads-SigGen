<?php
namespace Helpers\Logging;

/*  Class: Log
 *
 */
class Log
{
    private $logs = [];
    function __construct()
    {
        $this->add('init '. __CLASS__);
    }

    // Add log text
    public function add($text)
    {
        // Get the debug backtrace
        $debug = debug_backtrace()[1];

        // Assign an ID
        $ID = isset($debug['class']) ? $debug['class'] : $debug['file'];

        // Add to log
        $this->logs[$ID][] = '('. microtime(true) .') '. $text;
    }

    // Show the logs
    public function show($id = null, $orderByTime = null)
    {
        // Sort
        ksort($this->logs);

        // Get logs
        $Logs = $this->logs;

        // If getting a specific ID
        if ($id) $Logs = $Logs[$id];

        // If ordering by time instead of by class
        if ($orderByTime)
        {
            $Logs = $this->logs;
            $newLogs = [];

            foreach($Logs as $Arr)
            {
                foreach($Arr as $Line)
                {
                    $Data = explode(")", $Line);
                    $Time = str_ireplace('(', null, $Data[0]);
                    $Line = trim($Data[1]);
                    $newLogs[$Time][] = $Line;
                }
            }

            ksort($newLogs);
            $Logs = $newLogs;
        }

        // show log
        show($Logs);
    }

    // Print the debug stack trace
    public function stack()
    {
        // Setup stack
        $stack = debug_backtrace();

        // print stack
        show($stack);
    }

    public function lastError()
    {
        // last error
        $error = error_get_last();
        show($error);
    }

    // Save logs to a file
    public function save($filename, $orderByTime = null)
    {
        // File to save to
        $file = __DIR__ . '/../../logs/'. $filename .'-'. time() .'.txt';

        // Get logs
        $Logs = $this->logs;
        
        // If ordering by time instead of by class
        if ($orderByTime)
        {
            $Logs = $this->logs;
            $newLogs = [];

            foreach($Logs as $Arr)
            {
                foreach($Arr as $Line)
                {
                    $Data = explode(")", $Line);
                    $Time = str_ireplace('(', null, $Data[0]);
                    $Line = trim($Data[1]);
                    $newLogs[$Time][] = $Line;
                }
            }

            ksort($newLogs);
            $Logs = $newLogs;
        }

        // Create string array from logs
        $StringArray = [];
        foreach($Logs as $i => $list)
            foreach($list as $value)
                $StringArray[] = '['. $i .'] '. $value;

        // Save
        file_put_contents($file, implode("\n", $StringArray));
    }
}