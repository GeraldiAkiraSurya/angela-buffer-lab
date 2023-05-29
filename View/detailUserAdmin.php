<?php 
  if(session_status()!=2){
  session_start();
}

  if (!isset($_SESSION['token'])) {
    header("location: loginadmin");      
  }
  ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buffer Labs</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
    
    
    <style>
        body {
          /* background-image:linear-gradient(rgba(0, 0, 0, 0.5),
                       rgba(0, 0, 0, 0.5)), url("assets\\images\\background.png"); */

        }
    </style>



    <link rel="icon" href="..\assets\images\Logo-Serviam.png"> 
    <link href=".\\style\login.css" rel="stylesheet">
</head>
<body>
    
<table class="table table-bordered">
  <thead class="table-dark">
    <tr>
      <th scope="col">Misi</th>
      <th scope="col">Soal</th>
      <th scope="col">Waktu Pertama Mengerjakan</th>
      <th scope="col">Waktu Pertama Benar</th>
      <th scope="col">Jumlah percobaan</th>
    </tr>
  </thead>
  <tbody>
        <?php
        $i=0;
        echo  "<tr>
                <td rowspan=\"5\">1</td>";
        for($i=$i;$i<5;$i++){
            echo "
            <td>{$data[$i]['soal']}</td>
            <td>{$data[$i]['waktuPertama']}</td>
            <td>{$data[$i]['waktuBenar']}</td>
            <td>{$data[$i]['tries']}</td>
            </tr> 
            ";
        }

        echo  "<tr>
                <td rowspan=\"12\">2.1</td>";
        for($i=$i;$i<5+12;$i++){
            echo "
            <td>{$data[$i]['soal']}</td>
            <td>{$data[$i]['waktuPertama']}</td>
            <td>{$data[$i]['waktuBenar']}</td>
            <td>{$data[$i]['tries']}</td>
            </tr> 
            ";
            }

        echo  "<tr>
            <td rowspan=\"14\">2.2</td>";
        for($i=$i;$i<5+12+14;$i++){
            echo "
            <td>{$data[$i]['soal']}</td>
            <td>{$data[$i]['waktuPertama']}</td>
            <td>{$data[$i]['waktuBenar']}</td>
            <td>{$data[$i]['tries']}</td>
            </tr> 
            ";
            }
        
        echo  "<tr>
            <td rowspan=\"7\">3</td>";
        for($i=$i;$i<5+12+14+7;$i++){
            echo "
            <td>{$data[$i]['soal']}</td>
            <td>{$data[$i]['waktuPertama']}</td>
            <td>{$data[$i]['waktuBenar']}</td>
            <td>{$data[$i]['tries']}</td>
            </tr> 
            ";
            }

        echo  "<tr>
            <td rowspan=\"7\">4</td>";
        for($i=$i;$i<5+12+14+7+7;$i++){
            echo "
            <td>{$data[$i]['soal']}</td>
            <td>{$data[$i]['waktuPertama']}</td>
            <td>{$data[$i]['waktuBenar']}</td>
            <td>{$data[$i]['tries']}</td>
            </tr> 
            ";
            }
        
        echo  "<tr>
            <td rowspan=\"7\">5</td>";
        for($i=$i;$i<5+12+14+7+7+7;$i++){
            echo "
            <td>{$data[$i]['soal']}</td>
            <td>{$data[$i]['waktuPertama']}</td>
            <td>{$data[$i]['waktuBenar']}</td>
            <td>{$data[$i]['tries']}</td>
            </tr> 
            ";
            }
      
?>
  </tbody>
</table>




</body>
</html>