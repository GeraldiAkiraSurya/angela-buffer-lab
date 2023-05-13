<?php  
class View{

    public static function createView($view, $data=NULL, $data2=NULL, $data3=NULL){
        /*
        karena php typeless maka arr1,arr2,arr3,arr4,dapat berupa variable lainnya 
        tidak dimaksudkan hanya  untuk array saja
        */
        ob_start();
        require $view;
        $content=ob_get_contents();
        // ob_end_clean();
        
        // ob_start();
        // require 'View/layout/layout.php';
        $include=ob_get_contents();
        ob_end_clean();
        return $include;
    }
}
?>


