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
          background-image:linear-gradient(rgba(0, 0, 0, 0.5),
                            rgba(0, 0, 0, 0.5)), 
                            url("assets\\scenes\\science_lab.jpg");
          background-repeat: no-repeat;
          background-size: cover;
          background-position: 0% 6%;
          background-size: 1920px 1080px;
        }
    </style>

    <link rel="icon" href="assets\images\Logo-Serviam.png">  
    <link href="style\\profile.css" rel="stylesheet">
  </head>
  <body class="d-flex flex-column min-vh-100 justify-content-center align-items-center">
  
  <img src="assets\images\profile.png" alt="no"  id="boxMain">
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
    $loginTimeFormated=date_format($loginTime,'H:i:s d-m-Y');

    require_once 'roleConverter.php';
  ?>

  <h1 id="judul" class="justify-content-center"><?= $data[0]['nama']; ?> </h1>
  <p class="status" style="top:240px">Status: <?= Role::convert($data[0]['tingkat']) ?> </p>
  <p class="status" style="top:270px">Login Terakhir: <?= $loginTimeFormated ?> </p>
  <p class="status" style="top:300px">Jumlah Login: <?= $data[0]['numLogin']; ?></p>
  <p class="status" style="top:330px">Progress Misi: <?= $percentSelesai?>%</p>

  <?php
    $pos=360;
    $total=0;
    foreach($data as $row){
        $percentMisi=round( (($row['benar']/$row['jumlahSoal'])*100),2);
        $startTime = new DateTime($row['waktuMulai']);
        $endTime = new DateTime($row['waktuSelesai']);
        $diffTime=date_diff($startTime,$endTime);
        

    ?>
    <p class="misi" style="top:<?= $pos?>px">Misi: <?= $row['misi']?> :
    <div class="progress progBar"style="top:<?= $pos+5?>px; height: 14pt; width:700px;">
      <div class="progress-bar" role="progressbar" style="width: <?= $percentMisi?>%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"><?= $percentMisi?>%<?php if($percentMisi==100){ echo " dalam ".$diffTime->format("%H jam %i menit %s detik");    } ?></div>
    </div>
    </p>

    <?php
    $pos+=30;}?>


      <a href="update" class="navButton" style="left:700px">
        <i style="padding:50px;">
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="16px" height="16px"><path d="M 25 2 A 2.0002 2.0002 0 1 0 25 6 C 35.517124 6 44 14.482876 44 25 C 44 35.517124 35.517124 44 25 44 C 14.482876 44 6 35.517124 6 25 C 6 19.524201 8.3080175 14.608106 12 11.144531 L 12 15 A 2.0002 2.0002 0 1 0 16 15 L 16 4 L 5 4 A 2.0002 2.0002 0 1 0 5 8 L 9.5253906 8 C 4.9067015 12.20948 2 18.272325 2 25 C 2 37.678876 12.321124 48 25 48 C 37.678876 48 48 37.678876 48 25 C 48 12.321124 37.678876 2 25 2 z"/></svg>
        </i>
      <br>Update Profile</a>
    
      <a href="find" class="navButton" style="left:900px">
        <i style="padding:33px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-controller" viewBox="0 0 16 16">
            <path d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1v-1z"/>
            <path d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729c.14.09.266.19.373.297.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466.206.875.34 1.78.364 2.606.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527-1.627 0-2.496.723-3.224 1.527-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.34 2.34 0 0 1 .433-.335.504.504 0 0 1-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a13.748 13.748 0 0 0-.748 2.295 12.351 12.351 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.354 12.354 0 0 0-.339-2.406 13.753 13.753 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27-1.036 0-2.063.091-2.913.27z"/>
          </svg>
        </i>
      <br>Play game</a>
      <a href="logout" class="navButton" style="left:1100px">
        <i style="padding:20px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
          </svg>
        </i>
      <br>Logout</a>

  </body>
</html>