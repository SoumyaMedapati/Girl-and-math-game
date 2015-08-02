function getCanvasContext(id){
    if(_(id).getContext('2d')) return _(id).getContext('2d');
    else console.log("browser does not support canvas !");
}

function drawImage(img,sX,sY,dX,dY,ctx){
    if(resources.hasOwnProperty(img)) ctx.drawImage(resources[img],sX,sY,dX,dY);
    else {
        loadImage(img);
        setTimeout(function(){ ctx.drawImage(resources[img],sX,sY,dX,dY);},300);
    }
}

function drawRect(sX,sY,dX,dY,ctx,color,opacity){    
    ctx.fillStyle   = color!==null?color:'white';
    
    ctx.globalAlpha = opacity!==null?opacity:1;
    ctx.fillRect(sX,sY,dX,dY);
    ctx.globalAlpha = 1;
}

function drawArc(cX,cY,rad,start,stop,color,width){
    picasso.beginPath();
    picasso.lineWidth = width;
    picasso.strokeStyle = color;
    picasso.arc(cX,cY,rad,start,stop);
    picasso.closePath();
    picasso.stroke();    
}

function drawBubble(cX,cY,rad,start,stop,color,width,opacity){
    
    picasso.globalAlpha = opacity!==null?opacity:1;
    
    picasso.beginPath();
    picasso.lineWidth = width;
    picasso.strokeStyle = color;
    picasso.fillStyle = color;
    picasso.arc(cX,cY,rad,start,stop);
    picasso.closePath();
    picasso.fill();
    
    picasso.stroke();                                                    // debug stats
                                                                         // picasso.fillStyle = 'red';
                                                                         // picasso.fillRect(cX-rad,cY-rad,rad*2,rad*2);
    picasso.globalAlpha = 1;
}

function strokeLine(sX,sY,eX,eY,color){
        picasso.strokeStyle = color?color:'red';
        picasso.beginPath();
        picasso.moveTo(sX,sY);
        picasso.lineTo(eX,eY);
        picasso.stroke();
}


function clearCanvas(sX,sY,dW,dH){
    picasso.clearRect(sX,sY,dW,dH);
}

function clearWholeCanvas(){
    picasso.clearRect(0,0,width,height);
}

function drawBackButton(){
        drawArc(width/10,width/10,width/30,0,360,'red');
        fill(picasso,'white');
        strokeLine(0.9,1,1,0.9,'red');
        strokeLine(0.9,1,1.2,1,'red');
        strokeLine(0.9,1,1,1.1,'red');
}

function drawFButton(){
        drawArc((width/10)*9,width/10,width/30,0,360,'red');
        fill(picasso,'white');
        strokeLine(9.16,1,9,0.89,'red');
        strokeLine(8.86,1,9.16,1,'red');
        strokeLine(9.16,1,9,1.12,'red');
}

function drawPauseB(){
        drawArc(refX*0.65,refX*0.7,width/30,0,360,'red');
        fill(picasso,'white');
        strokeLine(1-0.1,1.1+0.05,1-0.1,0.7+0.1,'red');
        strokeLine(1.2-0.1,1.1+0.05,1.2-0.1,0.7+0.1,'red');
}

function drawCloseB(){
        drawArc(width/10,width/10,width/20,0,360,'red');
        fill(picasso,'white');
        strokeLine((1)*refX,(1)*refX,(2)*refX,(1)*refX,'yellow');
        strokeLine((1.3-0.5+0.05)*refX,(1.3-0.5+0.3+0.01)*refX,(1.6-0.5+0.05)*refX,(1.6-0.5-0.3+0.01)*refX,'red');
}

function fill(ctx,color){
    ctx.fillStyle = color;
    ctx.fill();
}

function drawImage(dir,x,y,w,h,context){
    if(resources.hasOwnProperty(dir)){
        context.drawImage(resources[dir],x,y,w,h);
    } 
}


function drawPausePanel(){
    console.log(khatam);
    if(khatam!==1){
        picasso.globalAlpha = 0.4;
        picasso.fillStyle = '#F44336';
        picasso.fillRect(0,0,width,height);
        picasso.globalAlpha = 1;
    }else{
        picasso.globalAlpha = 0.4;
        picasso.fillStyle = '#F44336';
        picasso.fillRect(0,0,width,height);
        picasso.globalAlpha = 1;
    }
    
    picasso.fillStyle = 'white';
    
    
    if(khatam==1){
         picasso.fillRect((width/10)*3,(width/10),(width/10)*4,(width/10)*2.8);
         drawImage('share',(width/10)*4.8,(width/10)*1.5,width/20,width/20,picasso);
         drawImage('challenge',(width/10)*4.8,(width/10)*2.7,width/20,width/20,picasso);

         drawText('share',4.8*refX,2.3*refX,'1em cursive','#F06292');
         drawText('challenge',4.7*refX,3.4*refX,'1em cursive','#F06292');
         drawText('Congratulations!!',4.5*refX,0.6*refX,'1.1em cursive','white');
        writeScore();
    }
    
    drawImage('replay',(width/10)*3.6,(width/10)*1.5,width/20,width/20,picasso);
    drawImage('close',(width/10)*6,(width/10)*1.5,width/20,width/20,picasso);    
    drawText('replay',3.6*refX,2.3*refX,'1em cursive','#F06292');
    drawText('exit',6.1*refX,2.3*refX,'1em cursive','#F06292');
}


function drawText(txt,dX,dY,font,color){
                 picasso.font = font?font:'1.4em cursive';
                 picasso.fillStyle = color?color:'white';
                 picasso.fillText(txt,dX,dY);
}

function strokeText(txt,dX,dY,font,color){
                 picasso.font = font?font:'2em blackadder ITC';
                 picasso.strokeStyle = color?color:'white';
                 picasso.strokeText(txt,(width/10)*dX,(height/10)*dY);
}
