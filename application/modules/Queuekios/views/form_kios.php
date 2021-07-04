<?php defined('BASEPATH') OR exit('No direct script access allowed');?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="<?php echo BASE_URL?>assets/css/bootstrap.min.css">
	<script src="<?php echo BASE_URL?>assets/js/jquery.min-2.1.4.js" ></script>
	
	<style>
		body {
		    font-family: Arial, sans-serif;
		    font-size: 18px;
		    line-height: 1.42857143;
		    color: #333;
		    background-color: #fff;
		}
		
		.h4, h4 {
		    font-size: 28px;
		}
		
	</style>

	<script type="text/javascript">
		/*
		$(document).ready(function () {
			
			$("#form").submit(function (event) {
				
			    event.preventDefault();
			    
			    var form = $('#form')[0];
			    
			    alert(form.action);
         
                var dataget = new FormData(form);
                			    
			    $.ajax({
                    type: "GET",
                    enctype: 'multipart/form-data',
                    url: form.action,
                    data: $("#form").serialize(),
                    processData: false,
                    contentType: false,
                    cache: false,
                    timeout: 800000,
                    success: function (data) {
	                    
                        $("#output").html(data.responseText);
                        
                        console.log("SUCCESS : ", data.responseText);
                        
                        $("#btnSubmit").prop("disabled", false);
                    },
                    error: function (e) {
	                    
                        $("#output").html(e.responseText);
                        
                        console.log("ERROR : ", e);
                        
                        $("#btnSubmit").prop("disabled", false);
                    }
                });	  		
                
            });
		});
		*/
	</script>
</head>
<body>
	
	<div class="col-sm-6 col-sm-offset-3">
	    <h4>บันทึกคิวตู้ Kios</h4>
	    <div class="notification is-danger">
			<?php echo validation_errors(); ?>
    	</div>
	    <span id="output"></span>
	    	
	    <form id="form" action="<?php echo site_url('Queuekios/form_kios')?>" method="get" enctype="multipart/form-data" >
		    
	        <div id="hn-group" class="form-group">
	          <label for="hn">HN :</label>
	          <input type="text" class="form-control" id="hn" name="hn" placeholder="HN" value="<?php echo set_value('hn');?>" />
	        </div>
	
	        <div id="cid-group" class="form-group">
	          <label for="cid">เลขบัตรประชาชน :</label>
	          <input type="text"class="form-control" id="cid" name="cid" placeholder="เลขบัตรประชาชน" maxlength="13" value="<?php echo set_value('cid');?>" />
	        </div>
	
	        <div id="queue-group" class="form-group">
	          <label for="queue_number">หมายเลขคิว</label>
	          <input type="text" class="form-control" id="queueNumber" name="queueNumber" placeholder="Queue Number" value="<?php echo set_value('queueNumber');?>" />
	        </div>
	
	        <button type="submit" class="btn btn-success" id="btnSubmit" name="btnsubmit" value="submit">Submit</button>
	    </form>
	      
    </div>
	
</body>
</html>