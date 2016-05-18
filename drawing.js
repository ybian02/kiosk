$(function(){
  $(window).scroll(function(){
    var winTop = $(window).scrollTop();
    if(winTop >= window.innerHeight){
      $("header").addClass("sticky-header");
      $("header").removeClass("nonsticky-header");
    }else{
      $("header").removeClass("sticky-header");
      $("header").addClass("nonsticky-header");
    }//if-else
  });//win func.
});//ready func.




//set canvas
var c = document.getElementById('canvas');
var ctx = c.getContext("2d");

// var background = new Image();
// background.src = "http://i.imgur.com/U2FdPpe.png";

// background.setAttribute("crossOrigin","anonymous");

// background.onload = function() {
//   ctx.drawImage(background,0,0);
// }

resizeWindow();

// Default position
var DefaultPos = {x:0, y:0};

// window.addEventListener('resize', resizeWindow);
document.addEventListener('mousemove', draw);
document.addEventListener('mousedown', setPosition);
document.addEventListener('mouseenter', setPosition);

function setCanvasBG(){
  ctx.beginPath();
  ctx.rect(0, 0, c.width, c.height);
  ctx.fillStyle = "transparent";
  ctx.fill();
}

//initialise canvas items
setCanvasBG();  //bg color

//window resize
function resizeWindow(){
	c.width  = c.parentElement.offsetWidth;
	c.height = c.parentElement.offsetHeight;		
  setCanvasBG();  
  $('p').show();
}

//new mouse event position
function setPosition(e){
	DefaultPos.x = e.clientX-c.getBoundingClientRect().left;
	DefaultPos.y = e.clientY-c.getBoundingClientRect().top;
}
//drawing canvas object 
function draw(e){
  //left click define
  if (e.buttons !== 1) return;
 
	ctx.beginPath(); //path begin
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.strokeStyle = "black";
  
  ctx.moveTo(DefaultPos.x, DefaultPos.y);
  setPosition(e);
  ctx.lineTo(DefaultPos.x, DefaultPos.y);
  
  ctx.stroke();
}

//save canvas
$("#save").click(function() {
  var html = " ";
  html += "<img style='background-image:url(http://i.imgur.com/U2FdPpe.png);background-repeat:no-repeat'' src='" + c.toDataURL() + "' alt='from canvas'/>";
  var pageStyle = "<style>body{margin:0; padding: 0;} </style>";
  var tab = window.open();
  tab.document.write(html + pageStyle);
});

$('canvas, p').click(function(){
   $('p').hide();
});
//Clear canvas
$("#clear").click(function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
	setCanvasBG(); 
  $('p').show();
});


