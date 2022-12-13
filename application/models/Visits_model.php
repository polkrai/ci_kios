<?php (defined('BASEPATH')) OR exit('No direct script access allowed');

class Visits_Model extends MY_Model {

	public $table = 'medrec.nano_visit';

    public $primary_key = 'nano_visit.id';

    public function __construct() {
    
        parent::__construct();
    }

	public function default_select() {

        $this->db->select("nano_visit.id AS vn_id, patient.id AS id_patient, nano_visit.hn, patient.pa_people_number AS cid");
    }

	public function default_join() {
    
        $this->db->join('medrec.nano_patient AS patient', 'patient.id = nano_visit.id_patient');
        //$this->db->join('(SELECT MAX(id), hn FROM medrec.kios_queue GROUP BY hn) AS kios_queue_max_id', 'kios_queue_max_id.max = kios_queue.id');
		//$this->db->join('jvkk.nano_user AS users_created', 'users_created.id = neural_appointment.created_by', 'left');
		//$this->db->join('jvkk.nano_components AS components', 'components.id = neural_appointment.component_id', 'left');
		//$this->db->join('jvkk.nano_user AS users', 'users.id = neural_appointment.user_id', 'left');
    }
    
    /*
    public function default_where() {
    
        $date = date ('Y-m-d');

        //$this->db->where("kios_queue.created_date BETWEEN '{$date} 00:00:00' AND '{$date} 23:59:59'");
        //$this->db->where('kios_queue.is_visit', 'f');
        $this->db->where('nano_patient.hn', 'f');
    }*/

    public function default_order_by() {
    
        $this->db->order_by('nano_visit.id DESC');
        $this->db->limit(1);

    }

    public function validation_rules() {
	    
	    //$this->form_validation->set_data($this->input->get());

        return array(
            'claim_code'  => array(
                'field' => 'claim_code',
                'label' => 'รหัส Claim Code',
                'rules' => 'required'
            )    
        );

		//$this->form_validation->set_rules($rules);
		
		//return $this->form_validation->run();
    }

    
    public function save($id = NULL, $db_array = NULL) {

	    $db_array = parent::db_array();
	    
		$db_array['claim_code'] 	= ($this->input->get_post('claim_code') != "")?$this->input->get_post('claim_code'):NULL;
		
	    $id = parent::save($id, $db_array);

	    return $id;
	}
	
	
	public function deleted($id = NULL, $db_array = NULL)
    {
    	//$db_array = parent::db_array();

    	$db_array['deleted'] = 't';
    	//$db_array['deleted_date'] = date ('Y-m-d H:i:s');
    	//$db_array['deleted_by']   = $this->session->userdata('user_id');

        $id = parent::deleted($id, $db_array);

		return $id;
    }

    public function filter_select($cid=NULL)
    {
        //$this->filter_where('to_char(nano_queue.date_add, \'YYYY-MM-DD\') = ', $date); //com_id1            
        //$this->filter_where('nano_queue.com_id1', '10');
        //$this->filter_where('nano_queue.com_id2', '27');
        //$this->filter_where('nano_queue.action_id', '26');
        if(strlen($cid) == '13'){

            $this->filter_where('patient.pa_people_number', $cid);
        }
        else{


            $this->filter_where('patient.hn', $cid);
        }
        
        
        return $this;
    }
    
    
    public function filter_select_save($hn=NULL) {   	  
		
		$this->filter_where('nano_visit.hn', $hn);
		
        return $this;
    }

}
