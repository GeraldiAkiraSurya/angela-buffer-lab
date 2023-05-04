<?php  
$url=$_SERVER['REDIRECT_URL'];
$base ="/angela-buffer-lab/";

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    switch($url){
        case $base."login":
            require_once 'view.php'; 
            echo View::createView("index.php");
            break;
            case $base."register":
                require_once 'view.php'; 
                echo View::createView("signUp.php");
                break;
                case $base."play":
                    require_once 'view.php'; 
                    echo View::createView("game.php");
                break;
                
                case $base."find":
                    require_once 'view.php';
                    echo View::createView("find.php");
                break;

        default:
        header("Location:login");
        break;
        }
}else if ($_SERVER["REQUEST_METHOD"] == "POST"){
    switch($url){
        case $base."masuk":
            // require_once 'view.php';
            // echo View::createView("index.html");
            require_once 'Database\databaseController.php';
            $myDB=new bufferDatabase();
            $myDB->loginUSer();
            break;
        case $base."daftar":
            require_once 'Database\databaseController.php';
            $myDB=new bufferDatabase();
            $myDB->signupUser();

            break;
            default:
            header("Location:login");
            break;
        }

}else{
    header("Location:login");
}


?> 
