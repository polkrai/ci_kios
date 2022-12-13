<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Testcurl extends CI_Controller {

    public function __construct() {
	    
    	parent::__construct();
    	
        $this->load->library('curl');
    }

    public function index() {
   
        $responce = $this->curl->curl_get('Testcurl/get_message');
        
        echo '<h1>Simple Get</h1>';
        echo '<p>--------------------------------------------------------------------------</p>';
        
        if($responce) {
            
            echo $responce;
            
            
            echo '<br/><p>--------------------------------------------------------------------------</p>';
            echo '<h3>Debug</h3>';
            echo '<pre>';
            print_r($this->curl->info);
            echo '</pre>';
            
        } 
        else {
	        
            echo '<strong>cURL Error</strong>: '.$this->curl->error_string;
        }
    }
    
    public function curl_post() {
    
        $responce = $this->curl->curl_post('Testcurl/message', array('message'=>'Sup buddy'));
        
        echo $responce;exit();
        
        echo '<h1>Simple Post</h1>';
        echo '<p>--------------------------------------------------------------------------</p>';
        
        if($responce) {
            
            echo $responce;
          
            echo '<br/><p>--------------------------------------------------------------------------</p>';
            echo '<h3>Debug</h3>';
            echo '<pre>';
            print_r($this->curl->info);
            echo '</pre>';
            
        } 
        else {
	        
            echo '<strong>cURL Error</strong>: '.$this->curl->error_string;
        }
    }
    
    public function message() {
	    
        echo "<h2>Posted Message</h2>";
        echo $_POST['message'];
    }
    
    public function get_message() {
	    
        echo "<h2>Get got!</h2>";
    }

    public function advance() {
    
        $this->curl->create('Testcurl/cookies')->set_cookies(array('message'=>'Im advanced :-p'));

        $responce = $this->curl->execute();
        
        echo '<h1>Advanced</h1>';
        echo '<p>--------------------------------------------------------------------------</p>';
        
        if($responce) {
            
            echo $responce;
            
            echo '<br/><p>--------------------------------------------------------------------------</p>';
            echo '<h3>Debug</h3>';
            echo '<pre>';
            print_r($this->curl->info);
            echo '</pre>';
            
        } 
        else {
	        
            echo '<strong>cURL Error</strong>: '.$this->curl->error_string;
        }
    }
    
    public function cookies() {
	    
        echo "<h2>Cookies</h2>";
        
        print_r($_COOKIE);
    }
}