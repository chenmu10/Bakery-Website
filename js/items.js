$(document).ready(function(){

function saveForm() {

    var dynamicUrl=window.location.href;
    var pos = dynamicUrl.indexOf("html/");
    dynamicUrl=dynamicUrl.substring(0, pos);

    var amount_of_categories= 6 ; 
    var order = []; 
    var data_to_send="";
    var temp_cat="";
    var temp_value=""
    var i;
    var token="false";
    var flag_selected="false";
    
    for (i = 1; i <= amount_of_categories; i++) {
          temp_cat="#cat_"+i;
          flag_selected=$(temp_cat).parent().parent().find('button').hasClass( "btn-success" );
          if (flag_selected) {temp_value=$(temp_cat).val();}
          else {temp_value=0;}
         order[i-1]=temp_value;
    }
    data_to_send=JSON.stringify(order);

                $.ajax({
                        type: "POST",
                        url: dynamicUrl+ "php/save.php",
                        data: {'action': 'save' , data: data_to_send},
                        success: function (json) {
                            var jsonParsed = JSON.parse(json);
                            token=jsonParsed.result.msg.token;
                            goToCart(token);
                        },
                       error: function(xhr, desc, err) {
                       console.log(xhr + "\n" + err);
                       alert ("ajax failed");
                        }
                } );
}

function goToCart(token) { 
   var link=  "cart.html?token="+token;
   window.location.href = link;
}

    $(".shopping_cart").on("click",function(){
		 var $el = $(this);
         textNode = this.lastChild;
		 divNode=$(this);
		 divNode.toggleClass('btn-info',0);
		 divNode.toggleClass('btn-success',1);
		 $el.find('span').toggleClass('glyphicon-shopping-cart',0);
         $el.find('span').toggleClass('glyphicon-ok',1);
         textNode.nodeValue = ($el.hasClass('shopping_cart') ? ' נוסף לסל ' : ' הוסף לסל ')
         $el.toggleClass('shopping_cart');
    });

 $("#mySubmit").on("click",function(){
        saveForm();
  });


});				