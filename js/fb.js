var user_name = '',friendCache = {};

function  onAuthResponseChange(response){
    console.log('onAuthResponseChange',response);
}

function onStatusChange(response){
    if(response.status!='connected'){
        login(logincallback);
    }
    else{
        console.log("client already given access before");
        FB.api('/me?fields=first_name', function(data) {
             user_name = data.first_name;
        });
    }
}

function login(callback){
    FB.login(callback,{scope:'email,user_friends'});
}

function logincallback(response){
    if(response.status!=='connected'){
        console.log("client did not give access ");
    }
    else{
        console.log("client given access 1st time");
        FB.api('/me?fields=first_name', function(data) {
             user_name = data.first_name;
        });

    }
}

function inviteFriends(id){
    console.log("invite friends called!!");
    
    var msg = 
        (id=='fbinvite')?'girl and math is a wonderful game jst try it out !!!':'I double dare you to beat my score in this mind-boggling game';
    
    var options = {
        method:'apprequests',
        message:msg
    }
    
    FB.ui(options,function(response){
        console.log(response);
    });
}

function reRequest(scope, callback) {
  FB.login(callback, { scope: scope, auth_type:'rerequest'});
}

var imgsrc = 'https://ieeenitb.org/GAM/images/temp.png';

function fbshare(prize){
    if(prize.length>3) sendBrag('won a '+prize+' in this brainstorming game',imgsrc,function(response){});
    else               sendBrag('this game helps improve your calculation power and agility',imgsrc,function(response){});                          
}



function sendBrag(caption,picture, callback) {
      console.log(picture);
      
      setTimeout(function(){
          FB.ui({ 
             method: 'feed',
             caption: caption,
             picture: picture,
             name: 'Checkout my achievement in Girl and Math!',
             link: 'https://apps.facebook.com/girl_and_math'     
           }, callback);
      },1000);

}

function getPermissions(callback) {
  FB.api('/me/permissions', function(response){
    if( !response.error ) {
      friendCache.permissions = response.data;
      callback();
    } else {
      console.error('/me/permissions', response);
    }
  });
}


function hasPermission(permission) {
  for( var i in friendCache.permissions ) {
    if( 
      friendCache.permissions[i].permission == permission 
      && friendCache.permissions[i].status == 'granted' ) 
      return true;
  }
  return false;
}