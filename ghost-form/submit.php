<?php

$ghost_fields_string = var_dump($_POST);


    foreach ($_POST as $key => $value) {
			$ghost_fields_string .= $key.'='.$value.'&';
    	}


$stuff = $form->data;


	//set POST variables
	$url = 'http://agencytourismmarketing.tourism-engine.com/';
	//$url = 'http://www.zogzogzogzogzog.com/zog';
	$url_backup = 'http://agencytourismmarketing.tourism-engine2.com/form-actions/';
	$fields = array(
		'option'=>urlencode('com_chronoforms'),
		'chronoform'=>urlencode('AGENCY'),
		'event'=>urlencode('submit'),
		'lead_source'=>urlencode('Ghost Form Newsletter Signup'),
		'HMS__Behavior_Type__c'=>urlencode('Ghost Form Newsletter'),
		'Webpage__c'=>urlencode('Ghost Form'),
		
	);

//url-ify the data for the POST
	$fields_string = '';
	foreach($fields as $key=>$value) {
		$fields_string .= $key.'='.$value.'&';
	}
	
	//print all arrays that werent set above
	$post_string = '';
	foreach($stuff as $key=>$value) {
		//create strings if values are arrays
		if (is_array($stuff[$key])) {
			$value = implode(',',array_values($value));
		}
		$post_string .= $key.'='.$value.'&';
	}
	
	//remove the trailing ampersand
	$clean = '';
	$clean .= rtrim($post_string,'&');
	$data_yo = $post_string.$fields_string.$ghost_fields_string;
	//print_r($data_yo);
	
	//open connections
	$ch = curl_init();
	
	//set the url, number of POST vars, POST data
	curl_setopt($ch,CURLOPT_URL,$url);
	//curl_setopt($ch,CURLOPT_POST,count($fields));
	curl_setopt($ch,CURLOPT_POSTFIELDS,$data_yo);
	curl_setopt($ch,CURLOPT_FAILONERROR,true);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	
	//execute main curl
	$result = curl_exec($ch);
	
	//close curls
	curl_close($ch);
?>