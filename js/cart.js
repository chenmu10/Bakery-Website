$(document).ready(function(){

function renderRaw(cat_id,title,description,price,pic_url)
{
 var html="";    
 var html_part_1="";
 var html_part_2="";
 var html_part_3="";
 var html_part_4="";
 var html_part_5="";
 var html_part_6="";
 var html_part_7="";

html_part_1="<div class='row'><div class='col-md-6 col-xs-12'>";
html_part_1+="<div class='col-md-2 col-xs-2'>";

html_part_1+="</span></button></div><div class='col-md-4 col-xs-9'>";
html_part_1+="<span>כמות:</span>";
html_part_1+="<input id='amount_cat_";
				
html_part_2="'class='form-control input-sm' type='text'>";
html_part_2+=" </div><div class='col-md-4 col-xs-12'>";				
html_part_2+="<h4><strong id='amount_price_";				
               
html_part_3="'>";

html_part_4="</strong></h4></div></div>";               
html_part_4+="<div class='col-md-4 col-xs-12'><h4><strong>";				
                
html_part_5="</strong></h4><h4><small>";				
				
html_part_6="</small></h4></div><div class='col-md-2 col-xs-12'>";				
html_part_6+="<img alt='product_1' class='img-responsive' src='";		
				
html_part_7="'></div> </div></div><hr>";	

html=html_part_1+cat_id+html_part_2+cat_id+html_part_3+price+html_part_4+title+html_part_5+description+html_part_6+pic_url+html_part_7;
return html;			
}

function approve()
{
    alert("קנייה אושרה ותחכה לך במאפייה!    הינך מועבר/ת לעמוד הראשי.");
    location.href = "../index.html";
}

function renderOrder(token)
{
       var dynamicUrl=window.location.href;
       var pos = dynamicUrl.indexOf("html/");
       dynamicUrl=dynamicUrl.substring(0, pos);

                $.ajax(
                    {
                        type: "POST",
                        url: dynamicUrl  + "php/save.php",
                        data: {'action': 'getdata' , token: token},
                        success: function (json) {
                            var jsonParsed = JSON.parse(json);
                            var order =""; 
                            var cat_info="";
                            var temp_amount=0;
                            var total_price=0;

                            console.log("ok");

                            order=jsonParsed.result.data.order[2];
                            cat_info=jsonParsed.result.data.category;

                           for (var i=0,  end= order.length; i < end; i++) {
                                 temp_amount=order[i];
                                 if  ( temp_amount>0){
                                  html= renderRaw(cat_info[i][0],cat_info[i][1],cat_info[i][2],cat_info[i][3],cat_info[i][4]);
                                  $( "#rows_render_start" ).after(html);
                                   $( "#amount_cat_"+cat_info[i][0] ).val(temp_amount);
                                 }
                             }
                                updateSum(6);
                                $( "#approve" ).on('click', function() {approve(); });
                        },

                       error: function(xhr, desc, err) {
                       console.log(xhr + "\n" + err);
                       alert ("ajax failed");
                        }
                }
                );
}

function updateSum(length){
     var total_sum=0;
     var amount_prefix="amount_cat_";
     var price_prefix="amount_price_";
     var temp_amount=0; 
     var temp_price=0;
     var total_text=""; 
      
        for (var i=1; i <= length; i++) {
       //alert(i);
       if ($("#"+amount_prefix+i).length){
          temp_amount=$("#"+amount_prefix+i).val();
          temp_price=$("#"+price_prefix+i).html();
          temp_price = temp_price.replace(/[^\/\d]/g,'');
          total_sum=total_sum+(temp_price*temp_amount);
        }
    }
    total_text=' סה"\כ '+ total_sum+' ש"\ח '; 
    $("#grand_total").html(total_text);                                   
}

function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}

var token="";
token=$_GET('token');

if (token==null || token== undefined){
    alert("oops something went wrong");
}
else{
     renderOrder(token);
}
});
		