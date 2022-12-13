<?php defined('BASEPATH') OR exit('No direct script access allowed');?>
<?php $count_rows = count($rows);?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>คิวจากตู้ Kios (<?php echo $count_rows?> คิว)</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="<?php echo BASE_URL?>assets/css/bootstrap.min.css">
	<script src="<?php echo BASE_URL?>assets/js/jquery.min-2.1.4.js" ></script>
	<script src="<?php echo BASE_URL?>assets/js/bootstrap.min.js"></script>
	<script src="<?php echo BASE_URL?>assets/js/socket.io.min-1.7.4.js" ></script>
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
		
		.btn_to_top {
		    display: none;
		    position: fixed;
		    bottom: 10px;
		    right: 10px;
		    z-index: 99;
		    font-size: 16px;
		    border: none;
		    outline: none;
		    background-color: #333;
		    color: white;
		    cursor: pointer;
		    padding: 10px;
		    border-radius: 4px;
		}
	</style>
	<script>

	    $(function () {
	
			//var server_name = "<?php echo ($_SERVER['SERVER_NAME'] == "::1")?"localhost":$_SERVER['SERVER_NAME'];?>";
	        
	        var group = "med" !== undefined ? "broadcast":"med";
	
			//alert(group);
	        //var websocket = io('http://<?php echo ($_SERVER['SERVER_NAME'] == "::1")?"localhost":$_SERVER['SERVER_NAME'];?>:1337');
	        //var websocket = io("http://" + server_name + ":<?php echo SOCKET_PORT?>");
			var websocket = io("<?php echo HOST_PORT_SOCKET?>");
	        //Message Received
	        websocket.on(group, function(msg){
	
	            //var json = JSON.parse(ev.data);

	            if (msg.kios_id == null) {
		            
		            msg.kios_id = "";
	            }
	            
	            //alert(msg.kios_id);
	            
	            $.getJSON("<?php echo BASE_URL?>index.php/Queuekios/view_json_kios/" + msg.kios_id, function(result){
		            
		            var ik=1;
		            
		            var newRowTboby;
		            
		            if(result.length > 0) {
		            
					    $.each(result, function(i, field){
						    
						    //alert(field.hn);
						    
						    newRowTboby += "<tr>";
						      newRowTboby += "<td align=\"center\">" + ik + "</td>";
						      newRowTboby += "<td>" + field.hn + "</td>";
						      newRowTboby += "<td>" + field.pa_pre_name + field.pa_name + " " + field.pa_lastname + "</td>";
						      newRowTboby += "<td>" + (field.queueNumber ? field.queueNumber : '') + "</td>";
						      newRowTboby += "<td align=\"center\">";
						      newRowTboby += "<button onclick=\"window.opener.kiosWindowLocation ('http://<?php echo $_SERVER['SERVER_NAME']?>/nano/index.php?option=com_rec&act=show&hn=" + field.hn + "&kios_id=" + field.kios_id +"');window.close();\" class=\"btn btn-primary btn-xs\">เลือก</button></td>";
						    newRowTboby += "</tr>";
					    
						    //$("#tb_view_kios tbody").append(newRowTboby);
					    	//$("div").append(field + " ");	
					    	
					    	ik++;
					      
					    });
					    
					    //$("#tb_view_kios tbody").append(newRowTboby);
						$("#tb_view_kios tbody").html(newRowTboby);
					}
					else {
						
						$("#tb_view_kios tbody").empty();
					} 
					
				    //document.title = "คิวจากตู้ Kios จำนวนคิวทั้งหมด : คิว";
				    
				    $('title').html("คิวจากตู้ Kios (" + result.length + " คิว)");
				    
				    $("#count_kios").html(result.length);
				  
				});
	
	        });
	
	    });
	
	</script>	
</head>
<body>

<div class="container">
	<div class="row">
		<div class="col-md-12">
        <span style="font-size: 35px;">คิวจากตู้ Kios</span> <span style="float: right;padding-top: 15px;"><span style="font-size: 20px;">จำนวนคิวทั้งหมด : </span><span id="count_kios" style="font-size: 20px;color: #ff0000;"><?php echo $count_rows?></span><span style="font-size: 20px;"> คิว</span></span>
        <div class="table-responsive">

		<table width="100%" align="center" class="table table-bordred table-striped" id="tb_view_kios" cellspacing="0">
			<thead>
			<tr>
				<th width="5%">ลำดับ</th>
				<th width="20%">HN</th>
				<th width="45%">ชื่อ - สกุล</th>
				<th width="20%">หมายเลขคิว</th>
				<th width="10%"><center>#</center></th>
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
			      <td align="center">
			      	<?php if(@$_REQUEST['windowopen']):?>
			      		<button onclick="window.opener.kiosWindowLocation('http://<?php echo $_SERVER['SERVER_NAME']?>/nano/index.php?option=com_rec&act=show&hn=<?php echo "{$row->hn}&kios_id={$row->kios_id}"?>');window.close();" class="btn btn-primary btn-xs">เลือก</button>
			      	<?php else :?>
			      		<button onclick="window.open('http://<?php echo $_SERVER['SERVER_NAME']?>/nano/index.php?option=com_rec&act=show&hn=<?php echo "{$row->hn}&kios_id={$row->kios_id}"?>');" class="btn btn-primary btn-xs">เลือก</button>
			      	<?php endif;?>
			      </td>
			    </tr>
			    <?php $i++; endforeach;?>
			<?php endif;?>
		  	</tbody>
		</table>
		
		</div>
	</div>
</div>
<script type="text/javascript">

$(function () {
	
	console.log("start read");
	
	//openerWindowLocation('url');
	$(window).scroll(function() {
		
		var scrollHeight    = $(document).height();		
	    var scrollPosition  = $(window).height() + $(window).scrollTop();
	    
	    var checkDisplayBut = (scrollHeight - scrollPosition) / scrollHeight;
	    
	    console.log(checkDisplayBut.toFixed(2));
	    
	    if (checkDisplayBut.toFixed(2) <= 0.88) {
		    
		    //alert(checkDisplayBut.toFixed(2) + " < 0.87");
		    
	        $('#btn_to_top').fadeIn();
	    }
	    else { //if(checkDisplayBut.toFixed(2) > 0.30) 
		    
	        $('#btn_to_top').fadeOut();
	    }
	});

	$("#btn_to_top").click(function(event) {
		
	    event.preventDefault();
		
	    $("html, body").animate({ scrollTop: 0 }, "slow");
	    
	    //$("#but_to_top").fadeOut();
		
	    return false;
	});
	
	$('#btn_to_top').fadeOut();
});

</script>
<!-- <button class="btn_to_top" id="btn_to_top" title="ไปที่ด้านบนสุด" style="display: none;">ไปที่ด้านบนสุด</button> -->
</body>
</html>