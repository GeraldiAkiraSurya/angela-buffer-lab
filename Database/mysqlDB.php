<?php

class MySQLDB{
	// Nomor 0
	private $source;
	private $userName;
	private $password;
	private $database;
	private $connection;

	function __construct($source,$userName,$password,$database){
		$this->souce=$source;
		$this->userName=$userName;
		$this->password=$password;
		$this->database=$database;
	}

	function OpenConnect(){
		$this->connection= new mysqli($this->source,$this->userName,$this->password,$this->database);
	}

	function closeConnect(){
		$this->connection->close();
	}

	function escapeString($str){
		$this->OpenConnect();
		$res= $this->connection->real_escape_string($str);
		$this->closeConnect();
		return $res;
	}

	function executeSelectQuery($query){
		$this->OpenConnect();
		$resQuery=$this->connection->query($query);

		$toarr=[];
		if($resQuery){
			while($row =$resQuery->fetch_assoc()){
				$toarr[]=$row;
			}
		}
		$this->closeConnect();
		return $toarr;
	}

	function executeNonSelectQuery($query){
		$this->OpenConnect();
		$resQuery=$this->connection->query($query);
		$id= $this->connection->insert_id;
		$this->closeConnect();
		return $id;

	}
}

?>