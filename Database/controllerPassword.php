<?php  
    class Password{
        public function __construct(){           
        }
        public static function encode($str){
            return password_hash($str, PASSWORD_DEFAULT);
        }

        public static function decode($password,$passwordDB){
            return password_verify($password,$passwordDB);
        }
    }
  ?>