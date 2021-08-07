document.addEventListener('keydown',function(event){
         if (event.key === ' '){
             console.log("salta");
             saltar();
         }
});

var imgRex, imgNube, imgCactus, imgSuelo;

function cargaImagenes(){
    imgRex = new Image();
    imgNube = new Image(); 
    imgCactus = new Image();
    imgSuelo = new Image();
    imgRex.src ='img/trex2.png';
    imgNube.src ='img/nube.png';
    imgCactus.src ='img/cactus.png';
    imgSuelo.src ='img/suelo.png';
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
var nivel = {velocidad: 9, puntuacion: 0};
var cactus = {x: ancho+100 , y: suelo-15};
var nube = {x: 400 , y: 100};

function dibujaRex(){
  //  ctx.drawImage(imgRex,0,0,352,247,100,trex.y,70,50);
  ctx.drawImage(imgRex,0,0,184,109,100,trex.y,70,50);
}

function dibujaCactus(){
    ctx.drawImage(imgCactus,0,0,140,250,cactus.x,cactus.y,40,65);
}

function logicaCactus(){
    if(cactus.x< -100){
        cactus.x = ancho + 100;
    }
    else{
        cactus.x -=nivel.velocidad;
    }
}

function dibujaNube(){
    ctx.drawImage(imgNube,0,0,100,80,nube.x,nube.y,80,30);
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



//-----------------------------------------------------------
// BUCLE PRINCIPAL

var FPS = 50;
setInterval(function(){
    principal();
},1000/FPS);

function principal(){
    borraCanvas();
    gravedad();
    //logicaCactus();
    dibujaNube()
    dibujaCactus();                                     
    dibujaRex();
}