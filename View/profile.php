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

    <link rel="icon" href="assets\images\Logo-Serviam.png">  
    <link href="style\\login.css" rel="stylesheet">

<style>
      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
    </style>


</head>
<body>
    


      <?php

        $total=0;
        foreach($data as $row){
            $total+=$row['jumlahSoal'];
        }

        $totalSelesai=0;
        foreach($data as $row){
            $totalSelesai+=$row['benar'];
        }

        $percentSelesai=round( (($totalSelesai/$total)*100),2);

        $loginTime = new DateTime($data[0]['lastLogin']);
        $loginTimeFormated=date_format($loginTime,'H:i:s d-m-Y')

      ?>




      <p>Nama: <?= $data[0]['nama']; ?> </p>
      <p>Status: SMA ST. Angela </p>
      <p>Login Terakhir: <?= $loginTimeFormated ?> </p>
      <p>Jumlah Login: <?= $data[0]['numLogin']; ?></p>
      <p>Progress Misi: <?= $percentSelesai?>%</p>

      <?php
        
        $total=0;
        foreach($data as $row){
            $percentMisi=round( (($row['benar']/$row['jumlahSoal'])*100),2);
            $startTime = new DateTime($row['waktuMulai']);
            $endTime = new DateTime($row['waktuSelesai']);
            $diffTime=date_diff($startTime,$endTime);

        ?>
        <p>Misi<?= $row['misi']?> : <?= $percentMisi?>%<?php if($percentMisi==100){ echo " dalam ".$diffTime->format("%H jam %i menit %s detik");    } ?></p>
        

        <?php
        }?>







</body>
</html>