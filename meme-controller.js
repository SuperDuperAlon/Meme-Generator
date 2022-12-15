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
  console.log(meme);
  console.log(meme.selectedLineIdx);
  drawImg(
    meme.selectedImgId,
    meme.selectedLineIdx,
    meme.lines[meme.selectedLineIdx],
    meme.fontColor,
    meme.fontSize
  );
}

function drawText(text, idx, x, y, color, size) {
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

function drawImg(imgId, idx, memeTxt, memeColor, memeFontSize) {
  const elImg = new Image();
  elImg.src = `./assets/images/${imgId}.jpg`;
  elImg.onload = () => {
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
    drawText(memeTxt, idx, gElCanvas.width / 2, 50, memeColor, memeFontSize);
    drawText("Add Lower Text Here", gElCanvas.width / 2, gElCanvas.height - 50);
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

// function onAddLine() {
//   addLine("text");
// }
