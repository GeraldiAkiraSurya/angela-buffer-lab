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
            case $base."test":
                require_once 'view.php'; 
                echo View::createView("testBackend.php");
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

            require_once 'Database/databaseController.php';
            $myDB=new bufferDatabase();
            $myDB->loginUSer();
            break;
        case $base."daftar":
            require_once 'Database/databaseController.php';
            $myDB=new bufferDatabase();
            $myDB->signupUser();
            break;
        case $base."kenaHit":
            require_once 'Database/databaseController.php';
            $myDB=new bufferDatabase();
            echo $myDB->hit();
            break;
        case $base."beres":
            require_once 'Database/databaseController.php';
            $myDB=new bufferDatabase();
            echo $myDB->done();
            break;
        case $base."mulai":
            require_once 'Database/databaseController.php';
            $myDB=new bufferDatabase();
            echo $myDB->start();
            break;
        case $base."gagal":
            require_once 'Database/databaseController.php';
            $myDB=new bufferDatabase();
            $myDB->failed();
            break;
        case $base."berobat":
            require_once 'Database/databaseController.php';
            $myDB=new bufferDatabase();
            echo $myDB->heal();
            break;



            break;
            default:
            header("Location:login");
            break;
        }

}else{
    header("Location:login");
}


?> 