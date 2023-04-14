<?php  
require_once 'Database\mysqlDB.php';
require_once 'Database\controllerPassword.php';

class bufferDatabase{  //disatuka karena fungsi-fungsi yang beririsan
        protected $db;
        public function __construct(){
            
            $this->db=new MySQLDB("localhost","root","","buffer-labs");
        }

        public function loginUser(){
            $username=$_POST['email'];
            $passwordInput=$_POST['password'];
            $userInfo=$this->getAccountInfo($username);
            if($userInfo!= -1){
                $passwordDB=$userInfo[0]['password'];

               
                $verify =Password::decode($passwordInput,$passwordDB);
                if($verify){
                    $generateToken = bin2hex(random_bytes(40));

                    $query ="UPDATE `user` SET `lastLogin` = NOW(),`token`= '$generateToken' WHERE `email`= '$username'";
                    $res=$this->db->executeNonSelectQuery($query);

                    Session_start();
                    $_SESSION['email']=$username;
                    $_SESSION['nama']=$userInfo[0]['nama'];
                    $_SESSION['token']=$generateToken;


                    header("location: play");
                    
                }else { 
                    header("location: play?wrong=1");
                }
            }else{
                header("location: play?wrong=2"); #kalau tidak ada
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
        var_dump($_POST);

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



        $res=$this->db->executeNonSelectQuery($query);
        // $this->login($username,$password);
        header("location: loginPages");
    }



















    }
?>