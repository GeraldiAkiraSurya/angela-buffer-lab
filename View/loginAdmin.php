


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
                       rgba(0, 0, 0, 0.5)), url("assets\\images\\background.png");

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
<body >
<div class="d-flex flex-column">
  <div class="d-flex justify-content-center">
    <div class="d-flex justify-content-center align-middle text-center" id="form-modal">

    
      <form action="masukAdmin" method="POST">
          <img class="mb-4" src="assets\images\logo.jpeg" alt="" width="72" height="72">
          <img class="mb-4" src="assets\images\Logo-Serviam.png" alt="" width="72" height="72">
          <h1 class="h3 mb-3 fw-normal">Silahkan Masuk - Admin</h1>

          <div class="form-floating">
            <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="email">
            <label for="floatingInput">Username</label>
          </div>
          <br>
          <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name="password">
            <label for="floatingPassword">Password</label>
          </div>


          <?php
         if (isset($_GET['wrong'])) { ?>
   
        <p style="color:red;" >email dan password tidak cocok</p>
        <?php
        } 
        ?>
          <!-- <div class="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me"> Remember me
            </label>
          </div> -->
          <br>
          <button class="w-100 btn btn-lg btn-primary" type="submit">Masuk</button>
          
          <p class="mt-5 mb-3 text-muted">&copy; <a href="https://instagram.com/geraldiakira?igshid=YmMyMTA2M2Y=">IF UNPAR</a> 2023</p>
        </form>
      </div>
  </div>
</div>


  



</body>
</html>