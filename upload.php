<?php
$allowedExtensions = array("jpg","jpeg","gif","png","bmp"); 
foreach ($_FILES as $file) { 
	if ($file['error'] != 0) {
		die();
	}
    if ($file['tmp_name'] > '') { 
      if (!in_array(end(explode(".", 
            strtolower($file['name']))), 
            $allowedExtensions)) { 
       die($file['name'].' is an invalid file type!<br/>'. 
        '<a href="javascript:history.go(-1);">'. 
        '&lt;&lt Go Back</a>'); 
      } 
    } 
  } 

 $url = str_replace(' ', '', $_FILES['fileselect']['name']);
 $url = str_replace(array( '(', ')' ), '', $url);
 $url = preg_replace('/[^a-zA-Z0-9_ %\[\]\.\(\)%&-]/s', '', $url);
 $path =  $_REQUEST['caseid'] . "_" . $url;
 $filepath = 'images/' . $path;

 preg_replace('/[^a-zA-Z0-9_ %\[\]\.\(\)%&-]/s', '', $String);

if (move_uploaded_file($_FILES['fileselect']['tmp_name'], $filepath)) {
	$coords = str_replace(array( '(', ')' ), '', $_REQUEST['coords']);
	$coords = explode(',%20', $coords);
	$lat = $coords[0];
	$long = $coords[1];
	
	$obj = array('url' => $path, 'id' => $_REQUEST['caseid'], 'title' => $_REQUEST['title'],
		'lat' => $lat, 'lon' => $long, 'description' => $_REQUEST['description'], 
		'name' => $_REQUEST['artistname']);

	create_if_not_exists('userdata.json');
	$json = file_get_contents('userdata.json');
	$data = json_decode($json);
	$data[] = $obj;
	file_put_contents('userdata.json', json_encode($data));

	//header("Location: http://krushton.com/streetartmap/map.html");
	header("Location: http://localhost:8888/streetartmap/map.html");
} else {
	echo('Something went wrong.');
}

function create_if_not_exists($filename) {
    if(!is_file($filename)) {
        fclose(fopen($filename,"x")); //create the file and close it
        return true;
    } else return false; //file already exists
}

?>