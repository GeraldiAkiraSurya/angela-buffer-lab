<?php  
$url=$_SERVER['REDIRECT_URL'];
$base ="/angela-buffer-lab/";

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    require_once 'view.php';
    switch($url){
        case $base:
            echo View::createView("index.php");
            break;
        case $base."login":
            echo View::createView("index.php");
            break;
        case $base."register":
            echo View::createView("View/signUp.php");
            break;
        case $base."play":
            echo View::createView("game.php");
            break;
        case $base."profile":
            require_once 'Database/databaseController.php';
            $myDB=new bufferDatabase();
            $data=$myDB->viewProfile();
            echo View::createView("View/profile.php",$data);
            break;




        case $base."test":
            echo View::createView("testBackend.php");
            break;
        case $base."find":
            echo View::createView("find.php");
            break;
        default:
        header("location: login");
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
            header("location:View/index.php");
            break;
        }

}else{
    header("location:View/index.php");
}


?> 