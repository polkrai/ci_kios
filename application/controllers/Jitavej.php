<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Jitavej extends MX_Controller {

    function __construct () {

        parent::__construct();
        
        $this->load->database();

        //$this->load->library('session');
    }

    public function index () {

        header('Content-Type: application/json; charset=utf-8');

        $hn = $this->input->get_post('hn');

        $sql = "SELECT id FROM jvkk.nano_queue AS queue INNER JOIN (SELECT MAX(id) AS vn_id FROM medrec.nano_visit WHERE hn = '{$hn}') AS visit ON (visit.vn_id = queue.vn_id)";

        //echo $sql;exit();

        $result = $this->db->query($sql);

        if ($result->num_rows() > 0) {

            echo "{\"id\" : {$result->row()->id}}";
        }
        else {

            echo "{\"id\" : null}";
        }
    }
}