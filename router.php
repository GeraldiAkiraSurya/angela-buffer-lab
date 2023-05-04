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
<<<<<<< HEAD
=======
                
                case $base."find":
                    require_once 'view.php';
                    echo View::createView("find.php");
                break;
>>>>>>> b2735b9034ff5cf23269295a4493a2621b5956a3

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


<<<<<<< HEAD
  ?>
=======
?> 
>>>>>>> b2735b9034ff5cf23269295a4493a2621b5956a3
