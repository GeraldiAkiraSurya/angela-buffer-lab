<?php  
  session_start();
  $_SESSION['id'] = "";
  $_SESSION['email']="";
  $_SESSION['nama']="";
  $_SESSION['token']="";
  $_SESSION = [];
  session_unset();
  session_destroy();

    ?>