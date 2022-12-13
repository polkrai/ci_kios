<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	
class Home extends CI_Controller {
	
	private $page_data;
	
	public function __construct() {
	  
		parent::__construct();
		
		$this->_preload_page_data();
	}
	
	public function index() {
	  
		$this->load->view('view_home', $this->page_data);
	
	}
	
	public function login () {
	  
		# Localized instance of the Validation library
		$this->load->library('validate');
		
		# Run the posted form values through the 'login' ruleset.
		$this->validate->is_valid('login');
		
		# Obtain last encountered error, if any
		$error = $this->validate->get_last_error();
		
		# check validation error state
		if(!$error) {
		    
			# passed validation...do login
			$this->load->model('Model_auth');
			$uid    = NULL;
			$active = TRUE;
			
			# clear errors to make way for authentication related errors now
			unset($this->page_data['login_error']);
			
		} 
		else {
		    
			# Validation failed...notify user
			$this->page_data['login_error'] = "Incorrect Login ID or Password"; # Here, I chose to return my own error msg, but you can also use the 'format_errors()' method instead
			                                                                  # which returns a nice HTML <ul><li> list of all resulting errors, both missing and invalid.
			# reload the page with the new error data included
			$this->load->view('view_home', $this->page_data);
			
			return;
		}
		
		$this->load->view('view_home', $this->page_data);
		
		return;
	}
	
	function logout() {
	  
		$this->load->model('Model_auth');
		
		if($this->Model_auth->user_logout($this->session->userdata('uid'))) {
		    
			$this->session->sess_destroy();
		}
		
		redirect('view_home', 'refresh');
		
		return;
	}
	
	private function _preload_page_data() {
	  
		$this->page_data['header_data']['cur_page'] = 'Home';
		$this->page_data['header_data'] = array();
		
		if($this->session->userdata('logged_in')) {
		    
			$this->page_data['logged_in'] = true;
		} 
		else {
		    
		  $this->page_data['logged_in'] = false;
		}
	}
}