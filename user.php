<?php


if(session_status()!=2){
    session_start();
  }

  if (isset($_SESSION['id'])) {
    
    echo "
        <script>
        const userid={$_SESSION['id']}
        const playerName='{$_SESSION['nama']}'
        const token='{$_SESSION['token']}'
        const email='{$_SESSION['email']}'


        </script>
        ";
        



  }

  echo '<script src="logic.js" defer></script>' 


  ?>