<?php defined('BASEPATH') OR exit('No direct script access allowed');

//require APPPATH . '/libraries/REST_Controller.php';

class Nhso extends CI_Controller {

    public function __construct () {
        
        parent::__construct();
        
        $this->load->database();
        
        $this->load->library('session');

        $this->load->model('visits_model');
   }  

   public function visits_get($cid=NULL){

       //$cid = ($this->input->get_post('cid'))?$this->input->get_post('cid'):$cid;

       header('Content-Type: application/json; charset=utf-8');

       $result = $this->visits_model->filter_select($cid)->get();

       if ($result->num_rows() > 0) {

           $json = array('hn' => $result->row()->hn, 'cid' => $result->row()->cid);

            echo json_encode($json);
        }
        else {

            $json = array("status" => FALSE, 'error' => "HN could not be found");

            echo json_encode($json);
        }
   }

    public function visits_put(){

    }

    public function visits_post(){

        header("Content-Type: application/json; charset=UTF-8");

        $streamContextOptions = array("ssl" => array("verify_peer" => false, "verify_peer_name" => false,));

        $json_object = file_get_contents("php://input", false, stream_context_create($streamContextOptions));

        //$result = $decoded_json->data;

        //print_r(json_decode($json_object, TRUE));exit();
        
        $this->visits_post_log($json_object);

        $decoded_json = json_decode($json_object);

        //echo $decoded_json->claimCode;

        $result = $this->visits_model->filter_select($decoded_json->pid)->get();
        
        $claim_date = str_replace("T", " ", $decoded_json->createdDate);

        $cid_date_select = str_replace("-", "", $decoded_json->pid.$decoded_json->createdDate);

        $cid_date_select = substr($cid_date_select, 0, -9);

        $data = array('claim_code' => $decoded_json->claimCode, 
                      'claim_date' => $claim_date,
                      'id_patient' => $result->row()->id_patient,
                      'hn'         => $result->row()->hn,
                      'cid'        => $decoded_json->pid,
                      'cid_date_select' => $cid_date_select);

        if($this->chech_already_exists($data)) {

            $result = $this->db->insert ('medrec.nhso_claimcode', $data);

            if ($result) {

                echo json_encode(array("status" => TRUE, 'insert_id' => $this->db->insert_id()));
            }
            else {

                echo json_encode(array("status" => FALSE, 'error' => "Duplicate key value cid_date_select"));
            }
        }
        else {
            
            echo json_encode(array("status" => FALSE, 'error' => "Duplicate key value cid_date_select"));
        }
   }

   public function chech_already_exists($data_array) {

        //$data = json_decode($json_object, TRUE);

        unset($data_array['cid_date_select']);
        unset($data_array['id_patient']);
        unset($data_array['hn']);

        //print_r ($data_array);exit();

        $num_row = $this->db->get_where('medrec.nhso_claimcode', $data_array)->num_rows();

        if ($num_row > 0){

            return FALSE;
        }
        else {

            return TRUE;
        }
   }
   
   public function visits_post_log($json_object=NULL){
   	
   		header("Content-Type: application/json; charset=UTF-8");

        $streamContextOptions = array("ssl" => array("verify_peer" => false, "verify_peer_name" => false,));

        $json_object = ($json_object)?$json_object:file_get_contents("php://input", false, stream_context_create($streamContextOptions));

   		//print_r ($json_object);
   		
   		$file_name =  APPPATH . "logs/log_" . date('Y-m-d'). ".txt";
   		
   		//chmod($file_name, 0777); 

   		$file_open = fopen($file_name, 'a');
   		
   		fwrite($file_open, $json_object . date('Y-m-d H:i:s') . "\r\n");
   		
   		fclose($file_open);
   }
    
}