<?php

class Users{
    private $_name;
    private $_password;
    private $_admin;

    public function getName():String{
        return $this->_name;
    }

    public function setName($newName){
        $this->_name = $newName;
    }

    public function getPassword():String{
        return $this->_password;
    }

    public function setPassword($newPassword){
        $this->_password = $newPassword;
    }

    public function getAdmin():String{
        return $this->_admin;
    }

    public function setAdmin($newAdmin){
        $this->_admin = $newAdmin;
    }
}