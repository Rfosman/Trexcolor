document.addEventListener('keydown',function(event){
         if (event.key === ' '){
             console.log("salta");
             if(nivel.muerto == false)
                saltar();
             else {
                nivel.velocidad= 9;
                nube.velocidad = 1;
                nube2.velocidad = 1;
                cactus.x = ancho +100;
                nube.x = 400; 
                nube2.x = 200;
                nivel.marcador = 0;
                nivel.muerto = false; 
             }
         }
});
document.addEventListener('touchstart',function(event){
    if(nivel.muerto == false)
                saltar();
             else {
                nivel.velocidad= 9;
                nube.velocidad = 1;
                nube2.velocidad = 1;
                 cactus.x = ancho +100;
                nube.x = 400; 
                nube2.x = 200;
                nivel.marcador = 0;
                nivel.muerto = false;
             }
    
 }); 
var imgRex, imgNube, imageNube2, imgCactus, imgSuelo, imgCielo;

function cargaImagenes(){
    imgRex = new Image();  
    imgNube = new Image(); 
    imgCactus = new Image();
    imgSuelo = new Image();
    imgCielo = new Image();
    imgRex.src ='img/trex2.png';
    imgNube.src ='img/nube.png';
    imgCactus.src ='img/cactus.png';
    imgSuelo.src ='img/suelo.png';
    imgCielo.src = 'img/cielo.png';
}


var ancho = 700;
var alto = 300;

var canvas,ctx;

function inicializa(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    cargaImagenes();
}


function borraCanvas(){
    canvas.width = ancho;
    canvas.height = alto;
}

var suelo = 200;
var trex = {y: suelo, vy:0, gravedad:2, salto:28, vymax:9, saltando: false };
var nivel = {velocidad: 9, marcador: 0, muerto: false};
var cactus = {x: ancho+100 , y: suelo-15};
var nube = {x: 400 , y: 50, velocidad:1};
var nube2 = {x: 200 , y: 50, velocidad:1}; 
var suelog = {x: 0 , y:suelo+40};
var cielo = {x: 0 , y: 0};
  
function dibujaRex(){
  //  ctx.drawImage(imgRex,0,0,352,247,100,trex.y,70,50);
  ctx.drawImage(imgRex,0,0,184,109,100,trex.y,70,50);
}

//--------------------------------------------
function dibujaCactus(){
    ctx.drawImage(imgCactus,0,0,140,250,cactus.x,cactus.y,40,65);
}

function logicaCactus(){
    if(cactus.x< -100){
        cactus.x = ancho + 100; 
        nivel.marcador++;
    }
    else{
        cactus.x -=nivel.velocidad; 
    }
}
//--------------------------------------------
function dibujaCielo(){
    ctx.drawImage(imgCielo,0,0,700,300,cielo.x,cielo.y,700,300);

}


function dibujaSuelo(){
    ctx.drawImage(imgSuelo,suelog.x,0,700,90,0,suelog.y,700,90);
}

function logicaSuelo(){
    if(suelog.x > 700){
        suelog.x = 0;
    }
    else{
        suelog.x +=nivel.velocidad;
    }
}




//--------------------------------------------

//--------------------------------------------


function dibujaNube(){
    ctx.drawImage(imgNube,0,0,100,80,nube.x,nube.y,80,30);
}

function logicaNube(){
    if(nube.x< -100){
        nube.x = ancho + 100;
    }
    else{
        nube.x -= nube.velocidad;
    }
}

function dibujaNube2(){
    ctx.drawImage(imgNube,0,0,100,80,nube2.x,nube2.y,80,30);
}

function logicaNube2(){
    if(nube2.x< -100){
        nube2.x = ancho + 100;
    }
    else{
        nube2.x -= nube2.velocidad;
    }
}

function saltar(){
    trex.saltando = true;
    trex.vy = trex.salto;
}

function gravedad(){
    if(trex.saltando == true){
        if(trex.y - trex.vy - trex.gravedad > suelo){
            trex.saltando = false;
            trex.vy = 0;
            trex.y = suelo;
        }
        else{
            trex.vy -= trex.gravedad;
            trex.y -= trex.vy;
        }
        
    }
}

function colision(){
   if(cactus.x >= 100  && cactus.x <=170){
       if(trex.y >= suelo-15){
           nivel.muerto = true;
           nivel.velocidad = 0;
           nube.velocidad =0;
           nube2.velocidad =0;
       }
   }
}

function puntuacion(){
    ctx.font = "30px impact";
    ctx.fillStyle = '#555555';
    ctx.fillText(`${nivel.marcador}`,600,50);

    if(nivel.muerto == true){
        ctx.font = "60px impact";
        ctx.fillText(`GAME OVER`,240,150);
    }
}



//-----------------------------------------------------------
// BUCLE PRINCIPAL

var FPS = 50;
setInterval(function(){
    principal();
},1000/FPS);

function principal(){
    borraCanvas();
    gravedad();
    colision();
    logicaSuelo();
    logicaCactus();
    logicaNube();
    logicaNube2();
    dibujaCielo();
    dibujaSuelo();
    dibujaCactus();
    dibujaNube();  
    dibujaNube2();                                   
    dibujaRex();
    puntuacion();
} 