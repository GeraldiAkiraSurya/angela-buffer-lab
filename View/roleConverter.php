<?php  
    class Role{
        public function __construct(){           
        }
        public static function convert($str){
            if($str==10){
                return 'Dosen';
            }else if($str==11){
                return 'Guru';
            }else if($str==12){
                return 'Mahasiswa S2';
            }else if($str==13){
                return 'Mahasiswa S1';
            }else if($str==14){
                return 'Pelajar SMA';
            }
        }
    }
  ?>