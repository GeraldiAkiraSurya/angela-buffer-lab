<?php 
  if(session_status()!=2 ){
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


    <link rel="icon" href="..\assets\images\Logo-Serviam.png"> 
    <link href=".\\style\login.css" rel="stylesheet">

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
      <h3 style="position: fixed; left:850px;">REKAP PESERTA</h3>
      <a href="logout" style="position: fixed; right:0px"><i style="padding:20px;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
      </svg></i><br>Logout</a>


<br><br><br>
<form action="#" method="GET">
<div class="">
    <label>Tingkat</label>
            <select class="form-select" aria-label="Default select example" name="tingkat" onchange="this.form.submit()">
              <option value=10 <?php if(isset($_GET['tingkat']) && $_GET['tingkat']==10){echo 'selected';} ?>>Dosen</option>
              <option value=11 <?php if(isset($_GET['tingkat']) && $_GET['tingkat']==11){echo 'selected';} ?>>Guru</option>
              <option value=12 <?php if(isset($_GET['tingkat']) && $_GET['tingkat']==12){echo 'selected';} ?>>Mahasiswa S2</option>
              <option value=13 <?php if(isset($_GET['tingkat']) && $_GET['tingkat']==13){echo 'selected';} ?>>Mahasiswa S1</option>
              <option value=14 <?php if(isset($_GET['tingkat']) && $_GET['tingkat']==14){echo 'selected';} ?>>Pelajar SMA</option>
            </select>
          </div>
</form>



<table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">No.</th>
      <th scope="col">Nama</th>
      <th scope="col">Email</th>
      <th scope="col">Login Terakhir</th>
      <th scope="col">Jumlah Login</th>
    </tr>
  </thead>
  <tbody>
      <?php
      $i=1;
      foreach ($data as $row){
        echo "
        <form action='detailUser' method='GET'>
        <input type='text' name='urut' value='{$row['id']}' hidden>
        <tr onclick=\"this.previousElementSibling.submit()\">
        <th scope='row'>{$i}</th>
        <td>{$row['nama']}</td>
        <td>{$row['email']}</td>
        <td>{$row['lastLogin']}</td>
        <td>{$row['numLogin']}</td>
        </tr> 
        </form>
        ";
        $i++;
      }
      ?>
  </tbody>
</table>


    </body>
    </html>