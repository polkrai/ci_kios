<?php defined('BASEPATH') OR exit('No direct script access allowed');

class User_model extends CI_Model {
	
	public function read(){

		$query = $this->db->query("SELECT * FROM public.tbl_user");
		
		return $query->result_array();
	}
	
	public function insert($data){

		$this->user_name     = $data['name'];
		$this->user_password = $data['pass'];
		$this->user_type 	 = $data['type'];
		
		if($this->db->insert('public.tbl_user', $this)) {
			    
			return 'Data is inserted successfully';
		}
		else {
			
			return "Error has occured";
		}
	}
	
	public function update($id, $data){

		$this->user_name	  = $data['name'];
		$this->user_password  = $data['pass'];
		$this->user_type 	  = $data['type'];
		
		$result = $this->db->update('public.tbl_user', $this,array('user_id' => $id));
		
		if($result) {
		
			return "Data is updated successfully";
		}
		else {
		
			return "Error has occurred";
		}
	}
	
	public function delete($id) {

		$result = $this->db->query("DELETE FROM public.tbl_user WHERE user_id = '{$id}'");
		
		if($result) {
		
			return "Data is deleted successfully";
		}
		else {
		
			return "Error has occurred";
		}
	}
}