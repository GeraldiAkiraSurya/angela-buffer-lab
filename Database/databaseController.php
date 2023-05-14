<?php  
require_once 'Database/mysqlDB.php';
require_once 'Database/controllerPassword.php';

class bufferDatabase{  //disatuka karena fungsi-fungsi yang beririsan
        protected $db;
        protected $soal;
        public function __construct(){
            $this->db=new MySQLDB("localhost","root","","buffer-labs");
            //CONFIG
            $this->soal=array(
                array(1,1)
                ,array(1,2)
                ,array(1,3)
                ,array(1,4)
                ,array(1,5)
                ,array(2.1,1)
                ,array(2.1,2)
                ,array(2.1,3)
                ,array(2.1,4)
                ,array(2.1,5)
                ,array(2.1,5)
                ,array(2.1,6)
                ,array(2.1,7)
                ,array(2.1,8)
                ,array(2.1,9)
                ,array(2.1,10)
                ,array(2.1,11)
                ,array(2.1,12)
                ,array(2.2,1)
                ,array(2.2,2)
                ,array(2.2,3)
                ,array(2.2,4)
                ,array(2.2,5)
                ,array(2.2,6)
                ,array(2.2,7)
                ,array(2.2,8)
                ,array(2.2,9)
                ,array(2.2,10)
                ,array(2.2,11)
                ,array(2.2,12)
                ,array(2.2,13)
                ,array(2.2,14)
                ,array(3,1)
                ,array(3,2)
                ,array(3,3)
                ,array(3,4)
                ,array(3,5)
                ,array(3,5)
                ,array(3,6)
                ,array(3,7)
                ,array(4,1)
                ,array(4,2)
                ,array(4,3)
                ,array(4,4)
                ,array(4,5)
                ,array(4,6)
                ,array(4,7)
                ,array(5,1)
                ,array(5,2)
                ,array(5,3)
                ,array(5,4)
                ,array(5,5)
                ,array(5,6)
                ,array(5,7)
            );
        }

        public function loginUser(){
            $username=$_POST['email'];
            $passwordInput=$_POST['password'];
            $userInfo=$this->getAccountInfo($username);
            if($userInfo!= -1){
                $passwordDB=$userInfo[0]['password'];

               
                $verify =Password::decode($passwordInput,$passwordDB);
                if($verify){
                    $generateToken = bin2hex(random_bytes(25));

                    $query ="UPDATE `user` SET `lastLogin` = NOW(),`token`= '$generateToken' ,`numLogin`=`numLogin`+1 WHERE `email`= '$username'";
                    $res=$this->db->executeNonSelectQuery($query);

                    Session_start();
                    $_SESSION['id']=$userInfo[0]['id'];
                    $_SESSION['email']=$username;
                    $_SESSION['nama']=$userInfo[0]['nama'];
                    $_SESSION['token']=$generateToken;


                    header("location: play");
                    
                }else { 
                    header("location: login?wrong=1");
                }
            }else{
                header("location: login?wrong=2"); #kalau tidak ada
            }
        }

        private function getAccountInfo($username){
            $query ="SELECT * FROM `user` WHERE `email` = '$username'"; 
            $res=$this->db->executeSelectQuery($query);

           if($res != NULL){  
               return $res; 
           }else{
               return -1;
     
           }
       }


       public function signupUser(){

        $nama= $this->db->escapeString($_POST['nama']);
        $nama=HTMLSPECIALCHARS($nama);

        $sekolah= $this->db->escapeString($_POST['sekolah']);
        $sekolah=HTMLSPECIALCHARS($sekolah);

        $tingkat= $this->db->escapeString($_POST['tingkat']);
        $tingkat=HTMLSPECIALCHARS($tingkat);

        $absen= $this->db->escapeString($_POST['absen']);
        $absen=HTMLSPECIALCHARS($absen);

        $email= $this->db->escapeString($_POST['email']);
        $email=HTMLSPECIALCHARS($email);

        $password= $this->db->escapeString($_POST['password']);
        $password=HTMLSPECIALCHARS($password);
    

        $passwordHash=Password::encode($password);
       
    
        $query ="INSERT INTO `user` 
        (`nama`,`sekolah`,`tingkat`,`absen`,`email`,`password`) 
        VALUES ('$nama',$sekolah,$tingkat,$absen,'$email','$passwordHash')";


        $id=$this->db->executeNonSelectQueryGetId($query);


        $this->createPengerjaan($id);

        // $this->login($username,$password);
        header("location: login");
    }

    
    private function checkToken($username,$token){
        $userInfo=$this->getAccountInfo($username);
        $dbToken=$userInfo[0]['token'];
        if($dbToken==$token){
            return true;
        }else{
            return false;
        }

   }


    public function hit(){

        $id=$_POST['id'];
        $token=$_POST['token'];
        $value=$_POST['value'];

        $query ="UPDATE `user` SET `power`=`power`-$value WHERE `id`=$id AND `token`='$token' AND `power`>0";
        $res=$this->db->executeNonSelectQuery($query);
 
        if($res==0){
            return "dead";
        }else{
            return "true";
        }

    }

    private function createPengerjaan($id){
        $query ="INSERT INTO `pengerjaan` (`userId`,`misi`,`soal`) VALUES";
        $colon=false;
        foreach ($this->soal as $row){
            if($colon){
                $query.=",";
            }
            $query.="($id,$row[0],$row[1])";
            $colon=true;
        }
        $res=$this->db->executeNonSelectQuery($query);
    }

    public function start(){

        if(isset($_POST['id']) && isset($_POST['email']) && isset($_POST['misi']) && isset($_POST['soal']) && isset($_POST['token'])){
            $id=$_POST['id'];
            $email=$_POST['email'];
            $misi=$_POST['misi'];
            $soal=$_POST['soal'];
            $token=$_POST['token'];

            if(!$this->checkToken($email,$token)){
                header('HTTP/1.0 401 Unauthorized');
                exit();
            }
    
            $query ="UPDATE `pengerjaan` SET`tries`=`tries`+1 WHERE `userId`=$id AND `misi`='$misi' AND `soal`= $soal";
            $res=$this->db->executeNonSelectQuery($query);
     
            if($res==0){
                echo "fail";
            }else{
                echo "true";
            }

            $query ="UPDATE `pengerjaan` SET `waktuPertama`=NOW() WHERE `userId`=$id AND `misi`='$misi' AND `soal`= $soal AND `waktuPertama` is NULL";
            $res=$this->db->executeNonSelectQuery($query);

        }else{
            header("location: login");
        }
        
    }

    public function failed(){
        if(isset($_POST['id']) && isset($_POST['email']) && isset($_POST['misi']) && isset($_POST['soal']) && isset($_POST['token'])){
            $id=$_POST['id'];
            $email=$_POST['email'];
            $misi=$_POST['misi'];
            $soal=$_POST['soal'];
            $token=$_POST['token'];

            if(!$this->checkToken($email,$token)){
                header('HTTP/1.0 401 Unauthorized');
                exit();
            }
    
            $query ="UPDATE `pengerjaan` SET `tries`= `tries`+1 WHERE `userId`=$id AND `misi`='$misi' AND `soal`= $soal";
            $res=$this->db->executeNonSelectQuery($query);
     
            if($res==0){
                echo "dead";
            }else{
                echo "true";
            }

        }else{
            header("location: login");
        }
        
    }

    public function done(){
        if(isset($_POST['id']) && isset($_POST['email']) && isset($_POST['misi']) && isset($_POST['soal']) && isset($_POST['token'])){
            $id=$_POST['id'];
            $email=$_POST['email'];
            $misi=$_POST['misi'];
            $soal=$_POST['soal'];
            $token=$_POST['token'];

            if(!$this->checkToken($email,$token)){
                header('HTTP/1.0 401 Unauthorized');
                exit();
            }
    
            $query ="UPDATE `pengerjaan` SET `waktuBenar`=NOW() WHERE `userId`=$id AND `misi`='$misi' AND `soal`= $soal";
            $res=$this->db->executeNonSelectQuery($query);
     
            if($res==0){
                echo "dead";
            }else{
                echo "true";
            }

        }else{
            header("location: login");
        }
        
    }

    public function heal(){

        $id=$_POST['id'];
        $token=$_POST['token'];
        $value=$_POST['value'];

        $query ="UPDATE `user` SET `power`=`power`+$value WHERE `id`=$id AND `token`='$token'";

        $res=$this->db->executeNonSelectQuery($query);
 
        if($res==0){
            return "max";
        }else{
            return "true";
        }

    }


    public function viewProfile(){

        if(session_status()!=2){
            session_start();
        }
        if(isset($_SESSION['id'])){
        $id=$_SESSION['id'];
        }else {
            header("Location:login");
        }

        $query ="SELECT `nama`, `tingkat`, `absen`, `email`, `lastLogin`, `numLogin`, `misi`, max(`waktuBenar`) AS 'waktuSelesai', MIN(`waktuPertama`) AS `waktuMulai`, SUM( CASE WHEN `pengerjaan`.`waktuBenar` IS NULL THEN 0 else 1 END ) as `benar`, COUNT(`soal`) as jumlahSoal FROM user INNER JOIN pengerjaan ON `user`.`id`=`pengerjaan`.`userId` WHERE `user`.`id`=$id GROUP BY `misi`;";

        $res=$this->db->executeSelectQuery($query);
 
        return $res;

    }


    public function mission(){

        if(session_status()!=2){
            session_start();
        }
        if(isset($_SESSION['id'])){
        $id=$_SESSION['id'];
        }else {
            header("Location:login");
        }

        $query ="SELECT * FROM `pengerjaan`; ";

        $res=$this->db->executeSelectQuery($query);

        $arr= ["1"=>array(), "2.1"=> array(), "2.2"=> array(), "3"=> array(), "4"=>array(), "5"=>array()];

        $lastSoal=TRUE; //true kalau dia not null

        foreach($res as $row){
            $misi=$row['misi'];
            $soal=$row['soal'];
            $mulai=$row['waktuPertama'];
            $selesai=$row['waktuBenar'];

            $selectedMisi=array();

            if($mulai==NULL){
                if($lastSoal || $selesai !=NULL  ){
                    $selectedMisi[$soal]=TRUE; 
                }else{
                    $selectedMisi[$soal]=FALSE;
                }


            }else{
                $selectedMisi[$soal]=TRUE; 
            }

            array_push($arr[strval($misi)],$selectedMisi);
    
            if($selesai==NULL){
                $lastSoal=FALSE;
            }else{
                $lastSoal=TRUE;
            }


        }

        return json_encode($arr);

    }



}


   















?>