<?php  
require_once 'Database\mysqlDB.php';

class bufferDatabase{  //disatuka karena fungsi-fungsi yang beririsan
        protected $db;
        public function __construct(){
            
            $this->db=new MySQLDB("localhost","root","","buffer-labs");
        }

        public function loginUser($username,$passwordInput){
            $userInfo=$this->getAccountInfo($username);
            if($userInfo!= -1){
                $passwordDB=$userInfo[0]['password'];

               
                // $verify =Password::decode($passwordInput,$passwordDB);
                if($passwordDB==$passwordInput){
                    header("location: play");
                    
                }else { 
                    header("location: play?wrong=1");
                }
            }else{
                header("location: play?wrong=2"); #kalau tidak ada
            }
            return null;
        }

        private function getAccountInfo($username){
            $query ="SELECT * FROM `user` where `email` = '$username'"; 
            $res=$this->db->executeSelectQuery($query);

           if($res != NULL){  
               return $res; 
           }else{
               return -1;
     
           }
       }



    }
?>