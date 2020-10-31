/////////////////balcony Post 1.3
/////////////////
/////////////////
// if SPACE you save the drawing and drawing will stop
// if you click the mouse drawing begins again
// if you CONTROL drawing stops and choose file is obvius. You can load a local file & on off leyers
// if you click again drawing resumes
// while drawing if you keep Option/Alt pressed down thwe thicknes of your drawing brass will stay the same.
// if you keep pressing z you substrackt brightness & x add brightness to black.
// prees V to togle Video on and off
//Shift (on mac) ==> start = false
//move the video width and height by holding down key  1 or 2 or 3 and pressing the key arrows
//keep pressing key 1 or  2 or 3 and with the mouse move video or image position
//if start = true then § key reverses collors
//Control key is pressed and video is playing undernith starts erasing 
// z set brash to thin


/////////////////
let cnv;
let floor1 = null; 
let floor2 = null; 
let floor3 = null;
let balcony;
let pirate;


let countBlack = 1;
let countWhite = 1;
// const offPlus = 0.6;
const offPlus = 0.5;
let offSetPlus = offPlus;
let offSetMinus = 1;
let colorOne; 
let colorTwo;

let start = true;
let startGate = true;
let showControl = false;
let freeze = false;
let colorBrightness = 0;
let erasing  = false;
let videoImageOn1 = true;
let videoImageOn2 = true;
let videoImageOn3 = true;

let moveVideoWidth1 = 0;
let moveVideoHeight1 = 0;
let grabXposition1;
let grabYposition1;
let videoXposition1 = 0;
let videoYposition1 = 0;
let fileName1Type;

let moveVideoWidth2 = 0;
let moveVideoHeight2 = 0;
let grabXposition2;
let grabYposition2;
let videoXposition2 = 0;
let videoYposition2 = 0;

let moveVideoWidth3 = 0;
let moveVideoHeight3 = 0;
let grabXposition3;
let grabYposition3;
let videoXposition3 = 0;
let videoYposition3 = 0;

let balconyOn = true;
let nameOfSavedFile;

let fileName1;

let moveVideoPosition = false;
let defaultSequence = true;

let backgroundColor = 5;
let balconyOpacityValue;
let showHelp = false;
let skipInstructions = true;


/////////////////
/////////////////SETUP
function setup(){

  frameRate(60);
  cnv =createCanvas(windowWidth, windowHeight);
  cnv.mousePressed(whenMouseIsPressed);
  //
  offSetSlider = createSlider(10, 200, 50 );
  offSetSlider.position (30, 20);
  offSetSlider.hide();

  inputFloor1 = createFileInput(handleFloor1File);
  inputFloor1.position(30, 140);
  inputFloor1.class('externalFile');
  
  buttonOnOff1 = createButton("1 on");
  buttonOnOff1.position(inputFloor1.x + inputFloor1.width, 140);
  buttonOnOff1.hide();
  buttonOnOff1.mousePressed(onOff1);
  buttonOnOff1.class('input');
  
  opacityslider1 = createSlider(0, 255, 30);
  opacityslider1.position( width - opacityslider1.width - 40, 40);
  opacityslider1.style('width', '80px');

  buttonPlus1 = createButton("Yes");
  buttonPlus1.position(width - buttonPlus1.width - 5 - 40, 40);
  buttonPlus1.mousePressed(doit);
  buttonPlus1.class("input");
  buttonPlus1.id("doit1");


  r1 = createInput("255");
  g1 = createInput("255");
  b1 = createInput("255");
  r1.class("numberInput");
  g1.class("numberInput");
  b1.class("numberInput");
  r1.position (width - opacityslider1.width - 250 - 40, 40);
  g1.position (width - opacityslider1.width - 180 - 40, 40);
  b1.position (width - opacityslider1.width - 110 - 40, 40);
  r1.attribute("type", "number"); r1.attribute("min", "0"); r1.attribute("max", "255"); 
  g1.attribute("type", "number"); g1.attribute("min", "0"); g1.attribute("max", "255");
  b1.attribute("type", "number"); b1.attribute("min", "0"); b1.attribute("max", "255");
  
  //
  inputFloor2 = createFileInput(handleFloor2File);
  inputFloor2.position(30, 110);
  inputFloor2.class('externalFile');

  buttonOnOff2 = createButton("2 on");
  buttonOnOff2.position(inputFloor2.x + inputFloor2.width, 110);
  buttonOnOff2.hide();
  buttonOnOff2.mousePressed(onOff2);
  buttonOnOff2.class('input');
  //
  inputFloor3 = createFileInput(handleFloor3File);
  inputFloor3.position(30, 80);
  inputFloor3.hide();
  inputFloor3.class('externalFile');

  buttonOnOff3 = createButton("3 on");
  buttonOnOff3.position(inputFloor3.x + inputFloor3.width, 80);
  buttonOnOff3.hide();
  buttonOnOff3.mousePressed(onOff3);
  buttonOnOff3.class('input');
  
  piretLence = createSlider(0, 255, 0);
  piretLence.position( width - 40, 40);
  piretLence.style('width', '20px');
  // text("pirate", width - 40, 40 )
  //
  nameOfSavedFile = createInput("balconyPost");
  nameOfSavedFile.position (30, 40);
  nameOfSavedFile.hide();
    
  buttonOnOffBalcony = createButton("on");
  buttonOnOffBalcony.position(inputFloor3.x + inputFloor3.width, 40);
  buttonOnOffBalcony.hide();
  buttonOnOffBalcony.mousePressed(OnOffBalcony);
  buttonOnOffBalcony.class('input');

  balcony = createGraphics(width, height);
  pirate = createGraphics(width, height);
  how = createGraphics(width, height);


  //help text
  helpRGB = createP("RGB");
  helpRGB.class("help");
  helpRGB.hide();
  helpRGB.mouseOver(showRGBhelp)
  helpRGB.mouseOut(hideRGBhelp)
  helpLeyers = createP("< layers");
  helpLeyers.class("help");
  helpLeyers.hide();
  helpLeyers.mouseOver(showLeyersHelp)
  helpLeyers.mouseOut(hideLeyersHelp)

  helpSpace = createP("space bar");
  helpSpace.class("help");
  helpSpace.hide();
  helpSpace.mouseOver(showSpaceHelp);
  helpSpace.mouseOut(hideSpaceHelp);
  helpS = createP("S");
  helpS.class("help");
  helpS.hide();
  helpS.mouseOver(showShelp);
  helpS.mouseOut(hideShelp);
  helpOption = createP("⌥ alt");
  helpOption.class("help");
  helpOption.hide();
  helpOption.mouseOver(showOptionHelp);
  helpOption.mouseOut(hideOptionHelp);
  helpControl = createP("ctrl");
  helpControl.class("help");
  helpControl.hide();
  helpControl.mouseOver(showControlHelp);
  helpControl.mouseOut(hideControlHelp);
  helpShift = createP("shift");
  helpShift.class("help");
  helpShift.hide();
  helpShift.mouseOver(showShiftHelp);
  helpShift.mouseOut(hideShiftHelp);
  helpZ = createP("Z");
  helpZ.class("help");
  helpZ.hide();
  helpZ.mouseOver(showZhelp);
  helpZ.mouseOut(hideZhelp);
  helpX = createP("X");
  helpX.class("help");
  helpX.hide();
  helpX.mouseOver(showXhelp);
  helpX.mouseOut(hideXhelp);
  helpC = createP("C");
  helpC.class("help");
  helpC.hide();
  helpC.mouseOver(showChelp);
  helpC.mouseOut(hideChelp);
  helpV = createP("V");
  helpV.class("help");
  helpV.hide();
  helpV.mouseOver(showVhelp);
  helpV.mouseOut(hideVhelp);
  helpH = createP("H");
  helpH.class("help");
  helpH.hide();
  helpH.mouseOver(showHhelp);
  helpH.mouseOut(hideHhelp);
  helpReverse = createP("~ ");
  helpReverse.class("help");
  helpReverse.hide();
  helpReverse.mouseOver(showReverseHelp);
  helpReverse.mouseOut(hideReverseHelp);
  help123 = createP("1 2 3");
  help123.class("help");
  help123.hide();
  help123.mouseOver(show123help);
  help123.mouseOut(hide123help);
  helpArrows = createP("⇦ ⇨ ⇧ ⇩");
  helpArrows.class("help");
  helpArrows.hide();
  helpArrows.mouseOver(show123help);
  helpArrows.mouseOut(hide123help);

 


  //secontary text
  introText("text1", "your balcony", width/3, height/3, "wellcome", 1000, 3000 );
  introText("text2", " ... move around", width/3, height/3, "wellcome", 6000  , 7000 );
  introText("text3", " ... click and drag ", width/3, height/3 + 30, "wellcome", 9000  , 4000 );
  // introText("text3", " ... for an introduction press ..i..", width/3 , height/3 + 60, "wellcome", 11000  , 3000 );
  introText("text4", " ... and if you need help", width/3, height/3, "wellcome", 16000  , 3000 );
  introText("text5", " ...press H", width/2, height/3, "secontaryText", 20000  , 4000 );
 
 



    rgbText = createP(" ...first of all press CONTROL<br/>You can add color above everything <br/> with red  green and  blue  values <br/> and a transparency slider...<br/>then click the Yes box to enter. ");
    rgbText.position (width - opacityslider1.width - 110 - 40- 200, 180);
    rgbText.hide();
    rgbText.class("secontaryText")
    leyerText = createP("...first of all press CONTROL to open the Menu<br/> You have 4 layer <br/> the one that you draw <br/> and 3 more underneath that are empty <br/>where you can load mp4 videos <br/>or png and jpg images. ");//
    leyerText.position (30, 180);
    leyerText.hide();
    leyerText.class("secontaryText")
    spaceText = createP("save what you see in a file <br/> enter your file's name at the top left input box");
    spaceText.position (width/2.4, height/1.4);
    spaceText.hide();
    spaceText.class("secontaryText");
    commandText = createP("you can erase <br/> only if you draw above <br/> a loaded layer ");
    commandText.position (width/2.4, height/1.4);
    commandText.hide();
    commandText.class("secontaryText");
    optionText = createP("keep you brash <br/> at the same size ");
    optionText.position (width/2.4, height/1.4);
    optionText.hide();
    optionText.class("secontaryText");
    controlText = createP("open menu... stops drawing <br/> click to start again ");
    controlText.position (width/2.4, height/1.4);
    controlText.hide();
    controlText.class("secontaryText");
    shiftText = createP("stop...<br/> or start");
    shiftText.position (width/2.4, height/1.4);
    shiftText.hide();
    shiftText.class("secontaryText");
    zText = createP("draw thin");
    zText.position (width/2.4, height/1.4);
    zText.hide();
    zText.class("secontaryText");
    xText = createP("make it darker");
    xText.position (width/2.4, height/1.4);
    xText.hide();
    xText.class("secontaryText");
    cText = createP("make it lighter");
    cText.position (width/2.4, height/1.4);
    cText.hide();
    cText.class("secontaryText");
    vText = createP("layers hide <br/> and layers show <br/> but the top will not change");
    vText.position (width/2.4, height/1.4);
    vText.hide();
    vText.class("secontaryText");
    hText = createP("Help!");
    hText.position (width/2.4, height/1.4);
    hText.hide();
    hText.class("secontaryText");
    reverseText = createP("reverse drawing colors");
    reverseText.position (width/2.4, height/1.4);
    reverseText.hide();
    reverseText.class("secontaryText");
    one23Text = createP("press 1 2 or 3 <br/> and click your mouse <br/> or use the arrow keys <br/> to move or adjust <br/> your layers ");
    one23Text.position (width/2.4, height/1.4);
    one23Text.hide();
    one23Text.class("secontaryText");
    
  // noLoop();
};


/////////////////KEY
function keyPressed(){
  print(keyCode);
  switch (keyCode) {

    // //i
    // case 73:
    //   skipInstructions = true;
    //   break;
    //SPACE
    case 32:
      save(changeFileName() + '.png');
      //start = false;
      break;
    case 17:
      showControl = !showControl;
      // start = !showControl;
      countBlack = 1;
      countWhite = 1;
      start = false;
      break;
    //v
    case 86:
      videoImageOn1 = !videoImageOn1;
      videoImageOn2 = !videoImageOn2;
      videoImageOn3 = !videoImageOn3;
      break;
    //SHIFT 
    case 16:
      startGate = !startGate;
      print(startGate)
      if(startGate){
       cursor(ARROW);
      }
      break;
    //§ 
    case 192:
      defaultSequence = !defaultSequence;
      break;
    //h 
    case 72:
      if(showHelp){
        hideHelpFunction();
        
        showHelp = false;
      }
      else{
        showHelpFunction()

        showHelp = true;
      }
      break;
   


    default:
      break;
    }
  }

  function introText(name, words,positionWidth, posithionHeight, textClass, delay, endTime){
    setTimeout(() => {
        name = createP(words, );
        name.position (positionWidth, posithionHeight);
        name.id(textClass);
        setTimeout(() => {
          name.remove();
        }, endTime);
    }, delay);
 
  }

function hideHelpFunction(){
  helpSpace.hide();
  helpRGB.hide();
  helpLeyers.hide();
  helpS.hide();
  helpOption.hide();
  helpControl.hide();
  helpShift.hide();
  helpZ.hide();
  helpX.hide();
  helpC.hide();
  helpV.hide();
  helpH.hide();
  helpReverse.hide();
  help123.hide();
  helpArrows.hide();
}
function showHelpFunction(){
  helpSpace.show();
  helpRGB.show();
  helpLeyers.show();
  helpS.show();
  helpOption.show();
  helpControl.show();
  helpShift.show();
  helpZ.show();
  helpX.show();
  helpC.show();
  helpV.show();
  helpH.show();
  helpReverse.show();
  help123.show();
  helpArrows.show();
}

//Show help text
function showRGBhelp(){
  if(showHelp){
    rgbText.show();
  }
}
function hideRGBhelp(){
  rgbText.hide();
}
function showSpaceHelp(){
  if(showHelp){
    spaceText.show();
  }
}
function hideSpaceHelp(){
  spaceText.hide();
}
function showShelp(){
  if(showHelp){
    commandText.show();
  }
}
function hideShelp(){
  commandText.hide();
}
function showOptionHelp(){
  if(showHelp){
    optionText.show();
  }
}
function hideOptionHelp(){
  optionText.hide();
}
function showControlHelp(){
  if(showHelp){
    controlText.show();
  }
}
function hideControlHelp(){
  controlText.hide();
}
function showShiftHelp(){
  if(showHelp){
    shiftText.show();
  }
}
function hideShiftHelp(){
  shiftText.hide();
}
function showZhelp(){
  if(showHelp){
    zText.show();
  }
}
function hideZhelp(){
  zText.hide();
}
function showXhelp(){
  if(showHelp){
    xText.show();
  }
}
function hideXhelp(){
  xText.hide();
}
function showChelp(){
  if(showHelp){
    cText.show();
  }
}
function hideChelp(){
  cText.hide();
}
function show123help(){
  if(showHelp){
    one23Text.show();
  }
}
function hide123help(){
  one23Text.hide();
}
function showLeyersHelp(){
  if(showHelp){
    leyerText.show();
  }
}
function hideLeyersHelp(){
  leyerText.hide();
}
function showVhelp(){
  if(showHelp){
    vText.show();
  }
}
function hideVhelp(){
  vText.hide();
}
function showHhelp(){
  if(showHelp){
    hText.show();
  }
}
function hideHhelp(){
  hText.hide();
}
function showReverseHelp(){
  if(showHelp){
    reverseText.show();
  }
}
function hideReverseHelp(){
  reverseText.hide();
}


  function getBigerBlack(){
    if(freeze){
      countBlack = countBlack;
    }else{
      countBlack += offSetPlus;
    }
  };
  function getSmallerBlack(){
      countBlack -= offSetMinus;
  };
  function getBigerWhite(){
    if(freeze){
      countWhite = countWhite;
    }else{
      countWhite += offSetPlus;  }
  };
  function getSmallerWhite(){
      countWhite -= offSetMinus;
  };


function handleFloor3File(file) {
    countBlack =  1;
    countWhite = 1;
    // balcony.clear();
    clear();
    start = false;

    ////////
    if (file.type === 'video') {
      floor3 = createVideo(file.data);
      floor3.size(displayWidth,displayHeight); 
      floor3.hide();
      floor3.position(0,0); //??
      floor3.loop();
      floor3.volume(0);
      floor3.play(); 
  
      moveVideoPosition = false;//????
      grabXposition3 = 0;//????  I do not know if this is doing something
      grabYposition3 = 0;//???


    }
    else if(file.type === 'image'){
      floor3 = createImg(file.data, '');
      floor3.hide();
    }
    else {
      floor3 = null;
    }
    showControl = false;

}

function handleFloor2File(file){
  countBlack = 1;
  countWhite = 1;
  start = false;
  if (file.type === 'video') {
    floor2 = createVideo(file.data);
    floor2.size(displayWidth,displayHeight); 
    floor2.hide();
    floor2.position(0,0); //??
    floor2.loop();
    floor2.volume(0);
    floor2.play(); 

    moveVideoPosition = false;//????
    grabXposition1 = 0;//????  I do not know if this is doing something
    grabYposition1 = 0;//???
  }
  else if(file.type === 'image'){
    floor2 = createImg(file.data, '');
    floor2.hide();
  }
  else {
    floor2 = null;
  }
  showControl = false;
}

function handleFloor1File(file){
  
  countBlack =  1;
  countWhite = 1;
  start = false;
  if (file.type === 'video') {
    fileName1Type = "video";
    floor1 = createVideo(file.data);
    fileName1 = file.data;
    floor1.size(displayWidth,displayHeight); 
    floor1.hide();
    floor1.position(0,0); //??
    floor1.loop();
    floor1.volume(0);
    floor1.play(); 

    moveVideoPosition = false;//????
    grabXposition1 = 0;//????  I do not know if this is doing something
    grabYposition1 = 0;//???

    balcony.background(r1.value(), 0, high), g1.value(), b1.value(), opacityslider1.value(); //works like a vail infront
  }
  else if(file.type === 'image'){
    fileName1Type = "image";
    fileName1 = file.data;
    floor1 = createImg(file.data, '');
    floor1.hide();

    balcony.background(r1.value(), g1.value(), b1.value(), opacityslider1.value()); 
  }
  else {
    floor1 = null;
    balcony.background(r1.value(), g1.value(), b1.value(), opacityslider1.value()); 
  }
  showControl = false;
}

function brightnessFunction(){
  //x 88
  if(keyIsDown(88) && colorBrightness >= 0 ){
    colorBrightness -= 1;
  }
  //c 67
  if(keyIsDown(67) && colorBrightness <= 255){
    colorBrightness += 1;
  }
  print("colorBrightness " + colorBrightness);
}
function whenMouseIsPressed(){ //better name
  showControl = false;
  start = true;
  startGate = true;
  cursor(ARROW)
}
function changeFileName(){
  return nameOfSavedFile.value();
}
function doit(){
  print(fileName1Type);
  if(fileName1Type === "video"){
    
    floor1 = createVideo(fileName1);
    floor1.size(displayWidth,displayHeight); 
    floor1.hide();
    floor1.position(0,0); //??
    floor1.loop();
    floor1.volume(0);
    floor1.play(); 
  
    moveVideoPosition = false;//????
    grabXposition1 = 0;//????  I do not know if this is doing something
    grabYposition1 = 0;//???
  
    balcony.background(r1.value(), g1.value(), b1.value(), opacityslider1.value()); //works like a vail infront
  }
  else if(fileName1Type === "image"){
    floor1 = createImg(fileName1, '');
    floor1.hide();

    balcony.background(r1.value(), g1.value(), b1.value(), opacityslider1.value()); //works like a vail infront
  }
  else{
    balcony.background(r1.value(), g1.value(), b1.value(), opacityslider1.value()); //works like a vail infront
  }

}



function floorOne(key){

     //left                                                
     if(keyIsDown(37) && keyIsDown(key)){
      moveVideoWidth1 += -10; 
    }
    //right
    else if(keyIsDown(39) && keyIsDown(key)){
      moveVideoWidth1 += 10; 
    }
    //up
    else if(keyIsDown(38) && keyIsDown(key)){
      moveVideoHeight1 += - 10;
    }
    //down
    else if(keyIsDown(40) && keyIsDown(key)){
      moveVideoHeight1 += + 10;
    }
    
    //1
    if(keyIsDown(key)){
      grabXposition1  = mouseX;
      grabYposition1 = mouseY;
      if(keyIsDown(key) && mouseIsPressed){
        moveVideoPosition = true;
        start = false;
      }
    }
    else{
      moveVideoPosition = false;
    };

    if(floor1 !== null && videoImageOn1){

      if(moveVideoPosition){
        videoXposition1 = grabXposition1;
        videoYposition1 = grabYposition1;
      }

     
      pirate.background(backgroundColor, piretLence.value()); //works like a KIALI!!
      image(floor1, videoXposition1 , videoYposition1, width + moveVideoWidth1, height + moveVideoHeight1); 
      
    }
    else if(floor1 !== null && !videoImageOn1){
      clear();
      image(floor1, 0, 0, width/100, height/100); 
    }
}
function floorTwo(key){                                                
  //left                                                
    if(keyIsDown(37) && keyIsDown(key)){
      moveVideoWidth2 += -10; 
    }
    //right
    else if(keyIsDown(39) && keyIsDown(key)){
      moveVideoWidth2 += 10; 
    }
    //up
    else if(keyIsDown(38) && keyIsDown(key)){
      moveVideoHeight2 += - 10;
    }
    //down
    else if(keyIsDown(40) && keyIsDown(key)){
      moveVideoHeight2 += + 10;
    }

    //2
    if(keyIsDown(50)){
      grabXposition2  = mouseX;
      grabYposition2 = mouseY;
      if(keyIsDown(key) && mouseIsPressed){
        moveVideoPosition = true;
        start = false;
      }
    }
    else{
      moveVideoPosition = false;
    };

    if(floor2 !== null && videoImageOn2){

      if(moveVideoPosition){
        videoXposition2 = grabXposition2;
        videoYposition2 = grabYposition2;
      }
      image(floor2, videoXposition2, videoYposition2, width + moveVideoWidth2, height + moveVideoHeight2); 
      
    }
    else if(floor2 !== null && !videoImageOn2){
    // clear();
      image(floor2, 0, 0, width/100, height/100); 
    }
}
function floorThree(key){                                                
  //left                                                
    if(keyIsDown(37) && keyIsDown(key)){
      moveVideoWidth3 += -10; 
    }
    //right
    else if(keyIsDown(39) && keyIsDown(key)){
      moveVideoWidth3 += 10; 
    }
    //up
    else if(keyIsDown(38) && keyIsDown(key)){
      moveVideoHeight3 += - 10;
    }
    //down
    else if(keyIsDown(40) && keyIsDown(key)){
      moveVideoHeight3 += + 10;
    }

    //3
    if(keyIsDown(key)){
      grabXposition3  = mouseX;
      grabYposition3 = mouseY;
      if(keyIsDown(key) && mouseIsPressed){
        moveVideoPosition = true;
        start = false;
      }
    }
    else{
      moveVideoPosition = false;
    };

    if(floor3 !== null && videoImageOn3){

      if(moveVideoPosition){
        videoXposition3 = grabXposition3;
        videoYposition3 = grabYposition3;
      }
      image(floor3, videoXposition3, videoYposition3, width + moveVideoWidth3, height + moveVideoHeight3); 
      
    }
    else if(floor3 !== null && !videoImageOn3){
    // clear();
      image(floor3, 0, 0, width/100, height/100); 
    }
}

function onOff1(){
  videoImageOn1 = !videoImageOn1;
}
function onOff2(){
  videoImageOn2 = !videoImageOn2;
}
function onOff3(){
  videoImageOn3 = !videoImageOn3;
}
function OnOffBalcony(){
  balconyOn = !balconyOn;
}
function helpCursor(){
  how.background(255, 255); 
  how.stroke(255, 255, 100, 255);
  how.ellipse(mouseX, mouseY, countWhite+1);
  how.noFill();
  how.stroke(255, 0, 0, 80);
  how.ellipse(mouseX, mouseY, countBlack+1);
  how.noFill();
  image(how, 0, 0, width, height);
}

/////////////////
/////////////////DRAW

function draw(){
  print("frames presecont: " + getFrameRate())

//helpCursor();

  offSetPlus = offSetSlider.value()/100;
  
  balconyOpacityValue = map(opacityslider1.value(), 0, 255, 0, 1);
  buttonPlus1.id("doit1").style("background-color", `rgb(${r1.value()}, ${g1.value()}, ${b1.value()}, ${balconyOpacityValue})`);
  //
  helpRGB.position(width - mouseX/7 + width/20, height - height/1.06 );
  helpLeyers.position(width- width/1.37, height - height/1.01 - mouseY/4);
  helpSpace.position(width/2 - width/30, height - mouseY/10);
  helpS.position(width/2 - width/5, height - mouseY/4.6);
  helpOption.position(width/2 - width/5, height - mouseY/10);
  helpControl.position(width/2 - width/3.5, height - mouseY/10);
  helpShift.position(width/2 - width/2.8, height - mouseY/6);
  helpZ.position(width/2 - width/4, height - mouseY/6);
  helpX.position(width/2 - width/6, height - mouseY/6);
  helpC.position(width/2 - width/12, height - mouseY/6);
  helpV.position(width/2 - width/90, height - mouseY/6);
  helpH.position(width/2 + width/30, height - mouseY/6);
  helpReverse.position(width/2 - width/2.5, height - mouseY/4);
  help123.position(width/2 - width/2.9, height - mouseY/4);
  helpArrows.position(width/2 + width/5, height - mouseY/10);


  //
  if(!startGate  ){
    cursor(MOVE);
  }
  else if(!start){
    cursor(MOVE);
  }
  else{
    cursor(ARROW);
  }
  

    // on off balcony
    if(videoImageOn1){
      buttonOnOff1.html("1 on");
    }else{
      buttonOnOff1.html("1 OFF");
    }
    if(videoImageOn2){
      buttonOnOff2.html("2 on");
    }else{
      buttonOnOff2.html("2 OFF");
    }
    if(videoImageOn3){
      buttonOnOff3.html("3 on");
    }else{
      buttonOnOff3.html("3 OFF");
    }
    if(balconyOn){
      buttonOnOffBalcony.html("on");
    }else{
      buttonOnOffBalcony.html("OFF");
    }
    
    floorOne(49);
    floorTwo(50);
    floorThree(51);
      
    brightnessFunction();

    //OPTION (mac)
    if(keyIsDown(18) && start && startGate){
      freeze = true;
      cursor(HAND);
    }else{
      freeze = false;
    };
    //s 
    if(keyIsDown(83) ){
      balcony.erase(); 
      pirate.erase(); 
      // noCursor();
    }else{
      balcony.noErase();
      pirate.noErase();
    };
    // z
    if(keyIsDown(90)){
      countBlack -= offSetMinus;
      countWhite -= offSetMinus; 
     
    }
              

    if(showControl === true){
      offSetSlider.show();
      r1.show();
      g1.show();
      b1.show();
      inputFloor2.show();
      inputFloor3.show();
      inputFloor1.show();
      buttonOnOff1.show();
      buttonOnOff2.show();
      buttonOnOff3.show();
      opacityslider1.show();
      // piretLence it to be worked on!
      // piretLence.show(); 
      buttonOnOffBalcony.show();
      nameOfSavedFile.show();
      opacityslider1.show();
      buttonPlus1.show();
    }else{
      offSetSlider.hide();
      r1.hide();
      g1.hide();
      b1.hide();
      inputFloor3.hide();
      inputFloor2.hide();
      inputFloor1.hide();
      buttonOnOff1.hide();
      buttonOnOff2.hide();
      buttonOnOff3.hide();
      opacityslider1.hide();
      piretLence.hide();
      buttonOnOffBalcony.hide();
      nameOfSavedFile.hide();
      opacityslider1.hide();
      buttonPlus1.hide();
    }

    //reversing color
    if(defaultSequence){
      colorOne = colorBrightness;
      colorTwo = 255;
    }else{
      colorOne = 255;
      colorTwo = colorBrightness;
    }


    if(start === true && startGate === true && !moveVideoPosition){


      if(!mouseIsPressed){
        if((movedX || movedX) && !freeze){
          countBlack -= offSetPlus/2.5;
          //
          if(countBlack <=-20){
            countBlack = -20;
          }
          //
          balcony.strokeWeight(countBlack);
          balcony.stroke(colorOne);
          balcony.line(mouseX,mouseY,pmouseX,pmouseY);

          pirate.strokeWeight(countBlack);
          pirate.stroke(colorOne);
          pirate.line(mouseX,mouseY,pmouseX,pmouseY);
        }else{
          getBigerBlack();
          balcony.strokeWeight(countBlack);
          balcony.stroke(colorOne);
          balcony.line(mouseX,mouseY,pmouseX,pmouseY);

          pirate.strokeWeight(countBlack);
          pirate.stroke(colorOne);
          pirate.line(mouseX,mouseY,pmouseX,pmouseY);
        }
        if(countWhite >=0.2){
          getSmallerWhite();
        }
        
      }
      
      else if(mouseIsPressed){

        if((movedX || movedX)  && !freeze){
          countWhite -= offSetPlus/2.5;
          //
          if(countWhite <=-20){
            countWhite = -20;
          }
          //
          balcony.strokeWeight(countWhite);
          balcony.stroke(colorTwo);
          balcony.line(mouseX,mouseY,pmouseX,pmouseY);

          pirate.strokeWeight(countWhite);
          pirate.stroke(colorTwo);
          pirate.line(mouseX,mouseY,pmouseX,pmouseY);
        }else{
          getBigerWhite();
          balcony.strokeWeight(countWhite);
          balcony.stroke(colorTwo);
          balcony.line(mouseX,mouseY,pmouseX,pmouseY);

          pirate.strokeWeight(countWhite);
          pirate.stroke(colorTwo);
          pirate.line(mouseX,mouseY,pmouseX,pmouseY);
        }
          if(countBlack >=0.2){
            getSmallerBlack();
          }
      }

  
    }
//  
 
    

  if(balconyOn){
    image(pirate, 0, 0, width, height);
    image(balcony, 0, 0, width, height);
    // print(width + " " + height);
  }
};

// control = MENU
// shift = STOP START
// spacebar = SAVE
// H = elp
// ~ = REVERS
// Z = THINER
// X = DARKER
// C = LIGHTER
// S = ERASE
// V = ON OFF



















