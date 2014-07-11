autoload<?

/*  Autoload
 *  - This is XIVPads autoloader, if you load in a library that has its own auto loader
 *  - make sure to add it to the ignore list so it can manage itself!
 */
class AutoLoad
{
    function __construct()
    {
        spl_autoload_register(array(__CLASS__, 'autoload'));
    }

    public function autoload($classname)
    {
        // Lower case for consistency
        $classname = strtolower($classname);

        // Check if we load it or not
        if ($this->loadit($classname))
        {
            // Split it up
            $path = str_ireplace('\\', '/', $classname);

            // Append PHP variable
            $path = $path .'.php';

            // Get the exact path which starts at root
            $path = __DIR__ .'/'. $path;    

            // Include file
            include_once $path;
        }
    }

    private function ignoreFolderList()
    {
        return
        [
            // Ignore frameworks as they likely have their own autoloader
            'frameworks',
        ];
    }

    private function ignorePrefixList()
    {
        return
        [
            // Ignore Twig, the twig autoloader will handle it.
            'twig',
        ];
    }

    private function loadit($classname)
    {
        // Ignore lists
        $ignoreFolderList = $this->ignoreFolderList();
        $ignorePrefixList = $this->ignorePrefixList();

        // Check if ignoring main folder
        $folder = explode("\\", $classname);
        if (in_array($folder[0], $ignoreFolderList)) return false;

        // Check if ignoring prefix
        $prefix = explode("_", $classname);
        if (in_array($prefix[0], $ignorePrefixList)) return false;

        // Return true if not being ignored
        return true;
    }
}
(new AutoLoad());
?>