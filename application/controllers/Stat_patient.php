<?php defined('BASEPATH') OR exit('No direct script access allowed');

//require APPPATH . '/libraries/REST_Controller.php';

class Stat_patient extends CI_Controller {

    public $date_now, $time_now;

    public function __construct () {

        parent::__construct();

        $this->load->database();

        $this->load->library('session');

        $this->load->model('visits_model');
    }

    public function index ($data_select=NULL) {

        //header('Content-Type: application/json; charset=utf-8');

        //$this->date_now = date('Y-m-d');
        //$this->time_now = date('H:i:s');

        if ($data_select) {

            $this->date_now = $data_select;
        }

        echo "
        \$number_of_service = \$this->db->query(\"SELECT COUNT(id) AS numrows FROM medrec.nano_visit WHERE time_add::date = '{\$this->date_now}'\")->row()->numrows;\$new_service_users = \$this->db->query(\"SELECT COUNT(id) AS numrows FROM medrec.nano_patient WHERE pa_date_add::date = '{\$this->date_now}'\")->row()->numrows;<br />
        \$remed_service     = \$this->db->query(\"SELECT COUNT(id) AS numrows FROM med.neural_order WHERE order_date::date = '{\$this->date_now}' AND mode = 'remed' AND deleted = 'f'\")->row()->numrows;<br />
        \$postal_medicine   = \$this->db->query(\"SELECT COUNT(id) AS numrows FROM med.neural_order WHERE order_date::date = '{\$this->date_now}' AND order_type = 'post' AND deleted = 'f'\")->row()->numrows;<br />
        \$json = array('number_of_service' => \$number_of_service, 'new_service_users' => \$new_service_users, 'old_service_users' => (\$number_of_service-\$new_service_users), 'remed_service' => \$remed_service, 'postal_medicine' => \$postal_medicine);<br />
        ";
        //echo json_encode($json);

    }


    public function patient_info ($data_select=NULL) {

        header('Content-Type: application/json; charset=utf-8');

        $this->date_now = date('Y-m-d');
        $this->time_now = date('H:i:s');

        if ($data_select) {

            $this->date_now = $data_select;
        }

        $number_of_service = $this->db->query("SELECT COUNT(id) AS numrows FROM medrec.nano_visit WHERE time_add::date = '{$this->date_now}'")->row()->numrows;

        $new_service_users = $this->db->query("SELECT COUNT(id) AS numrows FROM medrec.nano_patient WHERE pa_date_add::date = '{$this->date_now}'")->row()->numrows;
        
        $remed_service     = $this->db->query("SELECT COUNT(id) AS numrows FROM med.neural_order WHERE order_date::date = '{$this->date_now}' AND mode = 'remed' AND deleted = 'f' ")->row()->numrows;

        $postal_medicine   = $this->db->query("SELECT COUNT(id) AS numrows FROM med.neural_order WHERE order_date::date = '{$this->date_now}' AND order_type = 'post' AND deleted = 'f' ")->row()->numrows;

        $json = array('number_of_service' => $number_of_service, 'new_service_users' => $new_service_users, 'old_service_users' => ($number_of_service-$new_service_users), 'remed_service' => $remed_service, 'postal_medicine' => $postal_medicine);

        echo json_encode($json);

    }

}