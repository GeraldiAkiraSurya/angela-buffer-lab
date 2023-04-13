<?php  
$url=$_SERVER['REDIRECT_URL'];
$base ="/angela-buffer-lab/";

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    switch($url){
        case $base."login":
            require_once 'view.php'; 
            echo View::createView("login.php");
            break;
            case $base."register":
                require_once 'view.php'; 
                echo View::createView("signUp.php");
                break;
                case $base."play":
                    require_once 'view.php'; 
                    echo View::createView("game.html");
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
            header("Location:play");
            break;
        case $base."daftar":
            // require_once 'Controller/controllerLogin-signup.php';
            // $signup=new LoginAndSignUP();
            // $res=$signup-> signupUser();
            header("Location:play");
            break;
        
     


        }

}


  ?>