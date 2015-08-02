var width = $('#picasso').width(),height = $('#picasso').height(),refX = width/10,refY = height/10, picasso = getCanvasContext('picasso'),
    resources = {},imgcount = 0,imagearr = ['bg','cycle','score','replay','resume','close','challenge','share'],drawTimeout = null,
    signs = ['+','-','*','/'],
    colorarr = ['red','blue','yellow','green','violet','cyan'],score = 0,bubblearr= [],imgparts= [], counters= [],pausekey = 0,
    currentNum,flipflop,keystart = 0,mode = 1,khatam = 0,prize='';

var bubble = function(bubbleId,color,speed,X){
                this.id    = bubbleId;
                this.color = color;
                this.speed = speed;
                this.math  = generateEq();
                this.eqn   = this.math.split(',')[0];
                this.ans   = this.math.split(',')[1];
                this.display = 'block';
                this.posX = X;
              };

function initialiseCanvas(){
    drawImage('score',0,0,width,height,picasso);
    
    //this forms all the bubble objects :) 
    var speed = 0;
    for(var k = 1; k<8; k++){
            speed = k%2==0?2:5;
            bubblearr[bubblearr.length] = new bubble('bubble'+bubblearr.length,colorarr[generateRand(colorarr.length)],speed,k*1.2);
            imgparts[imgparts.length]   = picasso.getImageData(refX*k*1.2 - refX*0,0,refX*1.04,height);
            counters[counters.length]   = 0;
    }
    
    drawRect(0,0,width,height,picasso,null,0.2);
    
    for(var k = 0 ; k<imgparts.length;k++){
        picasso.putImageData(imgparts[k],refX*bubblearr[k].posX - refX*0.5,0);
    }
}


function play(){
    $('#circle1').show();

    initialiseCanvas();
    setTimeout(function(){ 
        $('#homepage').hide();
        $('#picasso').show();
        $('#score').show();
        $('#answerportal').show();  
        
        for(var k = 0;k<bubblearr.length;k++){
            animateCircle(bubblearr[k],counters[k]);
        }
        $('#circle1').hide();
    },1000);
}

function rules(){
    $('#circle2').show();
    setTimeout(function(){ 
        $('#homepage').hide();
        $('#circle2').hide();
        $('#demopage').show();
    },1000);
}

function rulesreturn(){
    $('#demopage').fadeOut(500);
    setTimeout(function(){ $('#homepage').fadeIn();},400);
}
// this loads all the images !!

for(var k = 0; k <imagearr.length; k++){
    loadImage(imagearr[k]);
}

function loadImage(img){
    var tmpimg = new Image();
    tmpimg.src = 'images/'+img+'.png';
    tmpimg.onload = function(){
        resources[img] = tmpimg;
        if(imgcount < imagearr.length - 1){ 
            _('imgloader').style.width = ((imgcount*0.7)/imagearr.length)*100+'%';
            imgcount++;
        }
        else{ 
            showHome();
        }
    }
}

// after loading all the images this shows home :)

function showHome(){
    $('#loader').fadeOut(500);
    setTimeout(function(){ $('#homepage').fadeIn(500)},500);
}

function animateCircle(bubbleObj,counter){
  if(khatam!==1){    
    if(bubbleObj.display == 'block'){
        if(counter+refX*0.5 <= height - refX*0.55) {
            drawBubble(refX*(bubbleObj.posX),counter,refX*0.5,0,360,bubbleObj.color,2,0.8);
            drawText(bubbleObj.eqn,refX*(bubbleObj.posX)- refX*0.25,counter,null,'white');
            drawTimeout =  setTimeout(function(){ repeatTask(bubbleObj,bubbleObj.id);},bubbleObj.speed*15);
        }
        else {
                pausekey = 1;
                khatam = 1;
                playAudio('cheer');
                drawPausePanel();
            //    var tmp = bubbleObj.id.replace('bubble','');
            //    regenerateBubble(tmp);
        }   
    }
  }
}

function regenerateBubble(tmp){
    bubblearr[tmp].color = colorarr[generateRand(colorarr.length)];
    bubblearr[tmp].display = 'block';
    bubblearr[tmp].math = generateEq();
    bubblearr[tmp].eqn = bubblearr[tmp].math.split(',')[0];
    bubblearr[tmp].ans = bubblearr[tmp].math.split(',')[1];
    bubblearr[tmp].speed = tmp%2==0?13:16;
    counters[tmp]   = 0;
    animateCircle(bubblearr[tmp],counters[tmp]);
}

function pausebreak(){
    pausekey = 0 ;
    for(var i = 0 ; i <bubblearr.length;i++){
       repeatTask(bubblearr[i],bubblearr[i].id);
    }
}

function repeatTask(bubbleObj,key){
    
    if(pausekey!==1){
        key = key.replace('bubble','');
        repaint(key);
        counters[key]++;
        animateCircle(bubbleObj,counters[key]);
    }    
    if(khatam!==1)writeScore();
}

function repaint(key){
    picasso.putImageData(imgparts[key],refX*bubblearr[key].posX - refX*0.52,0);        
}

function generateRand(upperL){
    return Math.floor(Math.random()*upperL);
}

function generateNonZero(upperL){
    var num = Math.floor(1  + Math.random()*(upperL - 1));
    return num;
}

function generateEq(){
    
    var num1 = generateRand(10),num2 = generateRand(10),sign = signs[generateRand(4)],eqn = '',ans = 0;
    if(sign=='-'&&(num1 < num2)){ var temp = num2; num2 = num1; num1 = temp }
    
    if(sign!=='/'){
      if(sign == '+')      ans = num1 + num2;
      else if(sign == '-') ans = num1 - num2;
      else if(sign == '*') ans = num1 * num2;
      eqn = num1+" "+sign+" "+num2;    
    }
    
    else {
       var num3 = generateNonZero(10);
       var num4 = num3*generateRand(10);    
       eqn = num4+" "+sign+" "+num3;
       ans = num4/num3;  
    }
    return eqn+','+ans;
}

var sounds = ['J','K','L','M','N','O','P'];

function playAudio(key){
    if(khatam!==1){
    _('soundplayer').src = 'sound/'+key+'.mp3';
    _('soundplayer').play();
    }
}

function writeScore(){
    if(khatam!==1) _('score').innerHTML = 'score&nbsp&nbsp'+score;
}


function _(el){
    return document.getElementById(el);
}

function logObject(obj){
    console.log(JSON.stringify(obj));
}

function log(str){
    console.log(str);
}

$(document).ready(function(){
    console.log("jquery working !!!");
});


$('#answerinput').keypress(function(event){
    if(event.which==13){
        var ans = $('#answerinput').val();
        $('#answerinput').val('');
        
        for(var l=0;l<bubblearr.length;l++){
            if(bubblearr[l].ans==ans){
                playAudio('sound'+sounds[l]);
                score++;
                writeScore();
                console.log(bubblearr[l].id);
                bubblearr[l].display = 'none';
                regenerateBubble(l);
            } 
        }
    }
});

$('#picasso').click(function(evt){
                var rect = _('picasso').getBoundingClientRect();
                var x = evt.clientX - rect.left;
                var y = evt.clientY - rect.top;
                touchlock = 0;
                
                if(pausekey==1){
                    attachListener(x,y,(width/10)*3.6,(width/10)*1.5,width/20,width/20,replayMode,null);
                    if(khatam==1){
                        attachListener(x,y,(width/10)*4.8,(width/10)*1.5,width/20,width/20,sharescore,null);
                        attachListener(x,y,(width/10)*4.8,(width/10)*2.7,width/20,width/20,fbchallenge,null);
                    }
                    attachListener(x,y,(width/10)*6,(width/10)*1.5,width/20,width/20,endGame,null);    
                }
        });

function attachListener(x,y,sX,sY,dX,dY,func,params){
        if(touchlock==0){
            if(x >= sX && x <= sX+dX && y >= dX && y<= sY+dY) {
                func(params);
                console.log("key detected at X:"+ x+" and Y:"+y);
                touchlock = 1;
            }
        }
}

function sharescore(){
     console.log("user wants to share score");
     if(score>70)      prize = 'gold';
     else if(score>55) prize = 'silver';
     else if(score>35) prize = 'bronze';
     fbshare(prize);
}

function replayMode(){
    console.log("replay called");
    pausekey = 0;
    bubblearr = [];
    counters  = [];
    imgparts = [];
    initialiseCanvas();
    for(var k = 0;k<bubblearr.length;k++){
        animateCircle(bubblearr[k],counters[k]);
    }
}

function fbchallenge(){
    console.log("user wants to challenge friend!!");
    inviteFriends('fbchallenge');
}

function endGame(){
    console.log("user wants to end game!!");
    pausekey = 0;
    khatam = 0;
    bubblearr = [];
    counters  = [];
    imgparts  = [];
    clearWholeCanvas();
    $('#picasso').fadeOut(500);
    setTimeout(function(){ 
        $('#answerportal').hide();
        $('#score').hide();
        $('#homepage').fadeIn();
    },300);
}

function buttonPause(){
    console.log("game paused!");
    if(pausekey == 1) pausekey = 0;
    else pausekey = 1;
}