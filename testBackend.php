
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/console-ban@5.0.0/dist/console-ban.min.js"></script>
</head>
<body>
    
<?php



if(session_status()!=2){
    session_start();
  }

  if (isset($_SESSION['id'])) {
    
    echo "
        <script>
        const userid={$_SESSION['id']}
        const nama='{$_SESSION['nama']}'
        const token='{$_SESSION['token']}'
        const email='{$_SESSION['email']}'
        </script>
        ";
        


  }

  echo '<script src="logic.js" defer></script>'


  
  
// const nama={$_SESSION['nama']}
//         const token={$_SESSION['token']}
//         const email={$_SESSION['email']}

?>

<button onclick="minHealth()">kena hit</button>

<br>

<button onclick="start('1',2)">ngerjain soal baru</button>

<br>

<button onclick="nyobalLagi('1',2)">nyoba lagi</button>

<br>

<button onclick="done('1',2)">DONE</button>

<br>

<button onclick="plusHealth()">NGEHEAL</button>




</body>
</html>













