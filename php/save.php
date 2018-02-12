<?php

$username = "b16_19310313";
$password = "dM190193";
$hostname = "sql107.byethost16.com"; 
$db="b16_19310313_1";

if($_POST['action'] == "save") {
    $res['msg']="All is good";
    $con=mysqli_connect($hostname,$username,$password,$db);
    // Check connection
   if (mysqli_connect_errno()){ 
        $res['msg']="fail";
         }
       else{
               $token= time ()."order".rand(0,9);
               $date=time ();
               $data=json_encode($_POST['data']);
               $sql="INSERT INTO orders (token,data,date)";
               $sql.=" VALUES ";
               $sql.="('" . $token . "','" . $data . "','" . $date ."')" ;
               $result=mysqli_query($con,$sql);
              $res['msg']=array("token"=>$token);
              mysqli_close($con);
           }
    die(json_encode(array("status"=>"200","result"=>$res)));
}

else {
       if($_POST['action'] == "getdata") {
                $con2=mysqli_connect($hostname,$username,$password,$db);
                mysqli_set_charset($con2,"utf8");
                // Check connection
                if (mysqli_connect_errno()){ 
                   $res['msg']="fail";
                 }
               else{
                    
                      $token= $_POST['token'];
                      $order_info=array();
                      $category_info=array();
             
                      $sql="SELECT * FROM  cat_pic";
                      $result=mysqli_query($con2,$sql);
                     if ($result){
                    // Fetch ALL
                               $category_info=$result->fetch_all(MYSQLI_NUM);
                         }
                    // Free result set
                    mysqli_free_result($result);

                      $sql="SELECT * FROM  orders WHERE token='" .$token."' ";
                      $result=mysqli_query($con2,$sql);
                     if ($result){
                    // Fetch row
                               $order_info=mysqli_fetch_array($result,MYSQLI_NUM);
                               $order_info[2]= json_decode(substr($order_info[2], 1, -1)) ;
                         }
                    // Free result set
                    mysqli_free_result($result);   

                    $res['msg']="success";  
                    $res['data']= array("category"=>$category_info,"order"=>$order_info);
                    mysqli_close($con2);
             
           }
          die(json_encode(array("status"=>"200","result"=>$res)));
       }
} 



?>





	


									