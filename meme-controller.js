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
  drawImg(meme.selectedImgId, meme.lines[0].txt, meme.lines[0].color, meme.lines[0].size);
}

function drawText(text, x, y, color, size) {
  gCtx.lineWidth = 2;
  gCtx.strokeStyle = "white";
  gCtx.fillStyle = color;
  gCtx.font = `${size}px impact`;
  gCtx.textAlign = "center";
  gCtx.textBaseline = "middle";

  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
}

function drawImg(imgId, memeTxt, memeColor, memeFontSize) {
  const elImg = new Image();
  elImg.src = `./assets/images/${imgId}.jpg`;
  elImg.onload = () => {
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
    drawText(memeTxt, gElCanvas.width / 2, 50, memeColor, memeFontSize);
    drawText("Add Lower Text Here", gElCanvas.width / 2, gElCanvas.height - 50);
  };
}

function onCreateInput(value) {
  setTextLine(value);
  renderMeme();
}

function onChangeColor(value) {
  setColor(value);
  renderMeme();
}

function onChangeFontSize(num) {
    setFontSize(num)
    renderMeme()
}