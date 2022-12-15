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
  drawImg(meme.selectedImgId);
}

function renderText() {
  var meme = getMeme();
  for (var i = 0; i < meme.lines.length; i++) {
    if (i === 0) {
      drawText(
        meme.lines[0].txt,
        gElCanvas.width / 2,
        50,
        meme.lines[0].fontColor,
        meme.lines[0].fontSize
      );
    } else if (i === 1) {
      drawText(
        meme.lines[1].txt,
        gElCanvas.width / 2,
        gElCanvas.height - 50,
        meme.lines[1].fontColor,
        meme.lines[1].fontSize
      );
    } else {
      drawText(
        meme.lines[i].txt,
        gElCanvas.width / 2,
        gElCanvas.height / 2,
        meme.lines[i].fontColor,
        meme.lines[i].fontSize
      );
    }
  }
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
  addLine();
  renderMeme();
}

function onSwitchLine(val) {
  switchLine(val);
  renderMeme();
}

function onDeleteLine() {
  deleteLine();
  renderMeme();
}
