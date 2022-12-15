"use strict";

let gElCanvas;
let gCtx;

function onEditor() {
  gElCanvas = document.getElementById("canvas");
  gCtx = gElCanvas.getContext("2d");
  // renderMeme()
  renderMeme();
}

function renderMeme() {
  var meme = getMeme();
  drawImg(
    meme.selectedImgId
    // meme.lines[0].txt,
    // meme.lines[0].fontColor,
    // meme.lines[0].fontSize
  );
}

function renderText() {
  var meme = getMeme();
  console.log(meme);
  drawText(
    meme.lines[0].txt,
    gElCanvas.width / 2,
    50,
    meme.lines[0].fontColor,
    meme.lines[0].fontSize
  );
  drawText(
    meme.lines[1].txt,
    gElCanvas.width / 2,
    gElCanvas.height - 50,
    meme.lines[0].fontColor,
    meme.lines[0].fontSize
  );
}

function drawText(text, x, y, color, size) {
  gCtx.lineWidth = 2;
  gCtx.strokeStyle = "white";
  gCtx.fillStyle = color;
  gCtx.font = `${size}px impact`;
  gCtx.textAlign = "center"; // shift to end and start
  gCtx.textBaseline = "middle";
  // gCtx.lineJoin = 'round'

  // multiline https://codepen.io/nishiohirokazu/pen/jjNyye

  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
}
// memeTxt, memeColor, memeFontSize
function drawImg(imgId) {
  const elImg = new Image();
  elImg.src = `./assets/images/${imgId}.jpg`;
  elImg.onload = () => {
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
    renderText();
    // drawText(memeTxt, gElCanvas.width / 2, 50, memeColor, memeFontSize);
    // drawText("Add Lower Text Here", gElCanvas.width / 2, gElCanvas.height - 50);
    // renderMeme()
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
  setFontSize(num);
  renderMeme();
}

function onAddLine() {
  addLine("text");
  renderMeme();
}
