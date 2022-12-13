<?php defined('BASEPATH') OR exit('No direct script access allowed');?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
		<script type="text/javascript" src="<?php echo BASE_URL?>assets/js/jquery.min-2.1.4.js"></script>
		<script type="text/javascript" src="<?php echo BASE_URL?>assets/js/socket.io.min-1.7.4.js"></script>
		<style type="text/css">
		* {
		   s font-family: "Ubuntu",sans-serif;
		}
	
		.nowrap table {
		    border-collapse: collapse;
		    font-size: 15px;
		}
		
		.nowrap table tbody td:first-child {
		    white-space: normal;
		}
		
		.odd td {
		    background: #f5f5f5 none repeat scroll 0 0;
		}
		
		.nowrap td, .nowrap th, td.nowrap, p.nowrap {
		    white-space: pre;
		}
		
		.nowrap thead td, thead th {
		    background: #cdcdcd none repeat scroll 0 0;
		    height: 35px;
		    font-size: 20px;
		}
		
		.nowrap thead th {
		    padding: 0.2em 0.5em;
		    text-align: center;
		    font-size: 16px;
		    font-weight: bold;
		}
		
		.nowrap td, th {
		    border-color: #bbb;
		    border-width: 0 1px 1px 0;
		    padding: 0.2em 0.3em;
		}
	</style>
		
	</head>
	<body>	
	
	<?php $count_rows = count($rows);?>
	
	
	<fieldset>
	<legend>คิวจาก Kios</legend>
		<table width="100%" align="center" class="nowrap" id="tb_view_kios" cellspacing="0">
			<thead>
			<tr>
				<th width="5%">ลำดับ</th>
				<th width="25%">HN</th>
				<th width="40%">ชื่อ - สกุล</th>
				<th width="20%">หมายเลขคิว</th>
				<th width="10%">#</th>
			</tr>
			</thead>
			<tbody>
			<?php if ($count_rows > 0):?>
				<?php $i=1; foreach($rows as $row):?>
				<tr <?php echo ($i % 2 == 0)?NULL:"class=\"odd\""?> >
			      <td align="center"><?php echo $i?></td>
			      <td><?php echo $row->hn?></td>
			      <td><?php echo "{$row->pa_pre_name}{$row->pa_name} {$row->pa_lastname}";?></td>
			      <td><?php echo $row->queueNumber?></td>
			      <td align="center"><button onclick="window.opener.kiosWindowLocation ('/nano/index.php?option=com_rec&act=show&hn=<?php echo "{$row->hn}&kios_id={$row->kios_id}"?>');window.close();">เลือก</button></td>
			    </tr>
			    <?php $i++; endforeach;?>
			<?php endif;?>
		  	</tbody>
		</table>
	</fieldset>
	
	<script>

	    $(function () {
	
			var websocket_ip = "<?php echo ($_SERVER['SERVER_NAME'] == "::1")?"localhost":$_SERVER['SERVER_NAME'];?>";
	        
	        var group = "med" !== undefined ? "broadcast":"med";
	
	        //var websocket = io('http://<?php echo ($_SERVER['SERVER_NAME'] == "::1")?"localhost":$_SERVER['SERVER_NAME'];?>:1337');
	        var websocket = io("http://" + websocket_ip + ":1337");
	
	        //Message Received
	        websocket.on(group, function(msg){
	
	            //var json = JSON.parse(ev.data);
	
	            //alert(msg.kios_id);
	            
	            $.getJSON("<?php echo BASE_URL?>index.php/Queuekios/view_json_kios", function(result){
		            
		            var ik=1;
		            
		            var newRowTboby;
		            
				    $.each(result, function(i, field){
					    
					    //alert(field.hn);
					    
					    newRowTboby += "<tr>";
					      newRowTboby += "<td align=\"center\">" + ik + "</td>";
					      newRowTboby += "<td>" + field.hn + "</td>";
					      newRowTboby += "<td>" + field.pa_pre_name + field.pa_name + " " + field.pa_lastname + "</td>";
					      newRowTboby += "<td>" + (field.queueNumber ? field.queueNumber : '') + "</td>";
					      newRowTboby += "<td align=\"center\"><button onclick=\"window.opener.kiosWindowLocation ('/nano/index.php?option=com_rec&act=show&hn=" + field.hn + "&kios_id=" + field.kios_id +"');window.close();\">เลือก</button></td>";
					    newRowTboby += "</tr>";
				    
					    //$("#tb_view_kios tbody").append(newRowTboby);
				    	//$("div").append(field + " ");	
				    	
				    	ik++;
				      
				    });
				    
				    //$("#tb_view_kios tbody").append(newRowTboby);
				    $("#tb_view_kios tbody").html(newRowTboby);
				});
	
	        });
	
	    });
	
	</script>
	</body>
</html>