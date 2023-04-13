<?php  


class database{  //disatuka karena fungsi-fungsi yang beririsan
        protected $db;
        public function __construct(){
            
            $this->db=new MySQLDB("localhost","root","","tubes");
        }

        public function login($username,$passwordInput){
            $userInfo=$this->getAccountInfo($username);
            if($userInfo!= "tidak terdaftar"){
                $role=$userInfo[0]['role'];
                $passwordDB=$userInfo[0]['password'];

               
                $verify =Password::decode($passwordInput,$passwordDB);
                if($verify){
                    Session_start();
                    $_SESSION['role']=$role;
                    require_once 'Model/user.php';
                    $username=$userInfo[0]['username'];
                    if($role=="peserta"){
                        $gambar=$userInfo[0]['gambar'];
                        $nama=$userInfo[0]['nama_lengkap'];
                        $gender=$userInfo[0]['gender'];
                        $tl=$userInfo[0]['tanggal_lahir'];
                        $_SESSION['userInfo']=new user($username,$nama,$gambar,$tl,$gender);
                    } else{
                        $_SESSION['userInfo']=$username;
                    }
                   
                    header("location: $role");
                    
                }else { 
                    header("location: register?wrong=1");
                }
            }else{
                header("location: register?wrong=2"); #kalau tidak ada
            }
        }



    }
?>