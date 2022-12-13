<?php defined('BASEPATH') OR exit('No direct script access allowed');
	
use ElephantIO\Client;
use ElephantIO\Engine\SocketIO\Version1X;

class Queuekios extends CI_Controller {

	public function __construct () {
		
		parent::__construct();
		
		$this->load->database();
		
		$this->load->library('session');

		$this->load->model(array('mdl_queuekios'));

	}

	public function index ($date_select = NULL) {
		
		$data['rows'] = $this->mdl_queuekios->get()->result();
		
		//$data['count_rows'] = count($data['rows']);

		$this->load->view('view_kios', $data);
	}
	
	public function elephantio_client ($kios_id = NULL, $emit_data=NULL) {
		
		$client_name = ($_SERVER['REMOTE_ADDR'] == "::1")?"localhost":$_SERVER['REMOTE_ADDR'];

        $client = new Client(new Version1X(HOST_PORT_SOCKET));
        
        $emit_data = ($emit_data)?$emit_data:array('queuetype' => 'requestqueue', 'client_request' => $client_name, 'kios_id' => NULL);

        $client->initialize();

        $client->emit('broadcast', $emit_data);

        $read = $client->read();
        
        $client->close();
        
        return $read;
                        
        //return json_encode($emit_data);
    }

	/*
	public function elephantio_client ($kios_id = NULL, $emit_data=NULL) {
		
		$client_name = ($_SERVER['REMOTE_ADDR'] == "::1")?"localhost":$_SERVER['REMOTE_ADDR'];

        $client = new Client(new Version1X("http://{$_SERVER['SERVER_NAME']}:1337"));
        
        $emit_data = ($emit_data)?$emit_data:array('queuetype' => 'requestqueue', 'client_request' => $client_name, 'kios_id' => $kios_id);

        $client->initialize();

        $client->emit('broadcast', $emit_data);

        //$read = $client->readJson();
        $read = $client->read();
        
        $client->close();

        //$read = substr($read, 2);

        //print_r($read);
        
        return $read;
                        
        //return json_encode($emit_data);
    }
    */

    public function curl_elephantio_client ($kios_id = NULL) {
		
		$curl = curl_init();

		$emit_data = array('queuetype' => (@$_REQUEST['queuetype'])?$_REQUEST['queuetype']:'requestqueue', 'client_request' => $_SERVER['REMOTE_ADDR'], 'kios_id' => (@$_REQUEST['kios_id'])?$_REQUEST['kios_id']:$kios_id);
		
		//$curl_url = "http://192.168.44.30/miracle/ci_kios/index.php/Queuekios/elephantio_client/{$kios_id}";
		
		curl_setopt($curl, CURLOPT_URL, base_url("Queuekios/elephantio_client/{$kios_id}"));
	
		curl_setopt($curl, CURLOPT_POST, 1);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($curl, CURLOPT_POSTFIELDS, $emit_data);
		
		$response = curl_exec($curl);

		return json_encode($emit_data);
		
		curl_close($curl);
		
	}
	
	public function form_kios ($queuekios_id = NULL) {
		
		$this->load->library('curl');
		
		//if ($this->mdl_queuekios->run_validation()) {
			
		if ($_GET) { //$_REQUEST && $this->input->get_post('submit')
			
			$this->mdl_queuekios->run_validation();

			$last_id = $this->mdl_queuekios->save($queuekios_id);

			//echo $last_id;
			
			//echo $this->curl_elephantio_client($last_id);
			
			$data = array('queuetype' => 'requestqueue', 'client_request' => $_SERVER['REMOTE_ADDR'], 'kios_id' => NULL);

			$read = $this->elephantio_client($last_id, $data);
			
			//var_dump($read); //json_decode($read, true);
			
			echo $read;
			
			
			//$response = $this->curl->curl_post('http://192.168.44.30/htdocs/ci_kios/index.php/Queuekios/elephantio_client');
									
			//echo $response;
			
			exit();

        }
		else {
			
			$this->load->view('form_kios');
		}
        
	}

	public function emit_kios($all=TRUE) {

		//$result = $this->db->get($this->table)->order_by('id', 'DESC')->limit(1);

		$result = $this->mdl_queuekios->get_last_id()->order_by('kios_queue.id DESC')->limit(1)->get()->result_array();

		//print_r ($result);
			
		$kios_id = (count($result) > 0 && $all == FALSE)?$result[0]['kios_id']:NULL;

		$data = array('queuetype' => 'requestqueue', 'client_request' => $_SERVER['REMOTE_ADDR'], 'kios_id' => $kios_id);

		$read = $this->elephantio_client($kios_id, $data);
		
		//var_dump($read); //json_decode($read, true);
		
		echo $read;
		
		exit();
	}
	
	public function view_kios ($queuekios_id = NULL) {

		$data['rows'] = $this->mdl_queuekios->get()->result();

		$this->load->view('view_kios', $data);
	}

	public function select_kios ($kios_id = NULL) {

		$client_name = ($_SERVER['REMOTE_ADDR'] == "::1")?"localhost":$_SERVER['REMOTE_ADDR'];
		
		$client = new Client(new Version1X(HOST_PORT_SOCKET));
        
        $emit_data = array('queuetype' => 'requestqueue', 'client_request' => $client_name, 'kios_id' => $kios_id);

        $client->initialize();

        $client->emit('broadcast', $emit_data);

        //$read = $client->readJson();
        $read = $client->read();

		var_dump($read);
		
        $client->close();

        exit();

        //$data['rows'] = $this->mdl_queuekios->get()->result();

		//$this->load->view('view_kios', $data);
	}
	
	/*
	public function select_kios ($kios_id = NULL) {

		$client_name = ($_SERVER['REMOTE_ADDR'] == "::1")?"localhost":$_SERVER['REMOTE_ADDR'];
		
		$client = new Client(new Version1X("http://{$_SERVER['SERVER_NAME']}:1337"));
        
        $emit_data = array('queuetype' => 'requestqueue', 'client_request' => $client_name, 'kios_id' => $kios_id);

        $client->initialize();

        $client->emit('broadcast', $emit_data);

        //$read = $client->readJson();
        $read = $client->read();

		var_dump($read);
		
        $client->close();

        exit();

        //$data['rows'] = $this->mdl_queuekios->get()->result();

		//$this->load->view('view_kios', $data);
	}
	
	*/
	
	public function view_json_kios ($queuekios_id = NULL) {
		
		$rows = $this->mdl_queuekios->get()->result_array();
		
		if ($queuekios_id) {
			
			$rows = $this->mdl_queuekios->filter_select_kios_id($queuekios_id)->get()->result_array();
		}

		//$this->load->view('view_kios', $data);

		if (count($rows) > 0) {

			echo json_encode($rows);
		}
		else {

			echo json_encode(array());
		}
		
		
	}
	
	public function get_remed () {

		$hn = $this->input->get_post ('hn');
		
		$query = $this->db->get_where('medrec.nano_patient', array('hn' => $hn));
		
		$row = $query->row(); 
		
		$fields = "pa_id={$row->id}&id_sess=" . $this->session->userdata('id_sess');
		
		$curl = curl_init();
		
		curl_setopt($curl, CURLOPT_URL, "http://{$_SERVER['SERVER_NAME']}/jitavej/order/checkremed");
	
		curl_setopt($curl, CURLOPT_POST, 1);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($curl, CURLOPT_POSTFIELDS, $fields);
		
		echo $response = curl_exec($curl);
		
		curl_close($curl);
		
	}
	
	public function test_elephantio_client ($kios_id = NULL, $emit_data=NULL) {
		
		$client_name = ($_SERVER['REMOTE_ADDR'] == "::1")?"localhost":$_SERVER['REMOTE_ADDR'];

        $client = new Client(new Version1X(HOST_PORT_SOCKET));
        
        $emit_data = ($emit_data)?$emit_data:array('queuetype' => 'requestqueue', 'client_request' => $client_name, 'kios_id' => NULL);

        $client->initialize();

        $client->emit('broadcast', $emit_data);

        $read = $client->read();
        
        $client->close();
        
        return $read;
                        
        //return json_encode($emit_data);
    }
	
	public function test_curl() {
		
		$this->load->library('curl');
		
		//$response = $this->curl->curl_post('http://192.168.44.30/htdocs/ci_kios/index.php/Queuekios/elephantio_client');
									
		//echo $response;
		
		echo $this->test_elephantio_client();
			
		exit();
	}

}
