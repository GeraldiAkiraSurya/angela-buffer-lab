
<!DOCTYPE html>
<html lang="en">
<head>
<?php require_once 'user.php';?>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/console-ban@5.0.0/dist/console-ban.min.js"></script>

</head>
<body>


  

<button onclick="minHealth()">kena hit</button>

<br>

<button onclick="startTest()">ngerjain soal baru</button>
misi
<input type="text" placeholder="misi" id="a">
soal
<input type="number" placeholder="soal" id="b">
<br>

<button onclick="doneTest()">DONE</button>
misi
<input type="text" placeholder="misi" id="c">
soal
<input type="number" placeholder="soal"id="d">

<br>

<button onclick="plusHealth()">NGEHEAL</button>

<br>

<button onclick="missionMenu()">ngambilMisi</button>



<script>
let a=document.getElementById("a")
let b=document.getElementById("b")
let c=document.getElementById("c")
let d=document.getElementById("d")



function startTest(){
    start(a.value,b.value)
}

function doneTest(){
    done(c.value,d.value)
}

</script>


</body>
</html>













