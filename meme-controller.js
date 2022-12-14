"use strict";

let gElCanvas;
let gCtx;

function onEditor() {
  gElCanvas = document.getElementById("canvas");
  gCtx = gElCanvas.getContext("2d");
  renderMeme();
}

function renderMeme() {
  var meme = getMeme();
  console.log(meme.lines[0].txt);
  console.log(meme.selectedImgId);
  drawImg(meme.selectedImgId, meme.lines[0].txt);
}

function drawText(text, x, y) {
  gCtx.lineWidth = 2;
  gCtx.strokeStyle = "black";
  gCtx.fillStyle = "white";
  gCtx.font = "40px impact";
  gCtx.textAlign = "center";
  gCtx.textBaseline = "middle";

  gCtx.fillText(text, x, y); // Draws (fills) a given text at the given (x, y) position.
  gCtx.strokeText(text, x, y); // Draws (strokes) a given text at the given (x, y) position.
}

function drawImg(imgId, memeTxt) {
  const elImg = new Image(); // Create a new html img element
  elImg.src = `/assets/${imgId}.jpg`; // Send a network req to get that image, define the img src
  // setTimeout(() => {
  //     gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
  // }, 10);
  // When the image ready draw it on the canvas
  elImg.onload = () => {
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
    drawText(memeTxt, gElCanvas.width / 2, 50);
    drawText("Add Lower Text Here", gElCanvas.width / 2, gElCanvas.height - 50);
  };
}

function onCreateInput(value) {
  // let currMeme = getMeme()
  setTextLine(value);
  console.log(value);
  renderMeme();
}
