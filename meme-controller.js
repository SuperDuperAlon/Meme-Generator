"use strict";

let gElCanvas;
let gCtx;
let gIsSelected = false;

function onEditor() {

  document.querySelector('.gallery').style.display = 'none';
  document.querySelector('.editor').style.display = 'flex';
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
        meme.lines[0].position.x,
        meme.lines[0].position.y,
        meme.lines[0].textColor,
        meme.lines[0].fontSize,
        meme.lines[0].textAlign,
        meme.lines[0].fontStyle
      );
    } else if (i === 1) {
      drawText(
        meme.lines[1].txt,
        meme.lines[1].position.x,
        meme.lines[1].position.y,
        meme.lines[1].textColor,
        meme.lines[1].fontSize,
        meme.lines[1].textAlign,
        meme.lines[1].fontStyle
      );
    } else {
      drawText(
        meme.lines[i].txt,
        meme.lines[i].position.x,
        meme.lines[i].position.y,
        meme.lines[i].textColor,
        meme.lines[i].fontSize,
        meme.lines[i].textAlign,
        meme.lines[i].fontStyle
      );
    }
  }
}

function drawText(text, x, y, color, size, align, font) {
  gCtx.lineWidth = 1;
  gCtx.strokeStyle = "black";
  gCtx.fillStyle = color;
  gCtx.font = `${size}px ${font}`;
  gCtx.textAlign = `${align}`; // shift to end and start
  gCtx.textBaseline = "middle";
  // gCtx.lineJoin = 'round'

  // multiline https://codepen.io/nishiohirokazu/pen/jjNyye
  // var lineHeight = size * 1.286 * 1.5;
  // var textWidth = gCtx.measureText(text).width;
  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
  // gCtx.strokeRect(x - textWidth / 2, y, textWidth + 50, lineHeight);
}
// memeTxt, memeColor, memeFontSize
function drawImg(imgId) {
  const elImg = new Image();
  elImg.src = `./assets/images/${imgId}.jpg`;
  elImg.onload = () => {
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
    renderText();
    renderRecEditor();
  };
}

function onCreateInput(value) {
  gIsSelected = true;
  setTextLine(value);
  renderMeme();
}

function onChangeColor(value) {
  gIsSelected = true;
  setColor(value);
  gIsSelected = false;
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

function onSwitchLine() {
  switchLine();
  highlightLine();
  renderMeme();
}

function onDeleteLine() {
  deleteLine();
  gIsSelected = false;
  renderMeme();
}

function onChangeAlign(value) {
  changeAlign(value);
  renderMeme();
}

function onChangeFontStyle(value) {
  changeFontStyle(value);
  renderMeme();
}

function onMoveLine(val) {
  moveLine(val) 
  renderMeme()
}

function renderRecEditor() {
  if (!gIsSelected) return;
  var meme = getMeme();
  var currLine = meme.lines[meme.selectedLineIdx];
  console.log(currLine);
  console.log(
    currLine.position.x -
      10 -
      (currLine.txt.length * 0.5 * currLine.fontSize) / 2,
    currLine.position.y - 1 * currLine.fontSize,
    currLine.txt.length * (0.55 * currLine.fontSize),
    1.4 * currLine.fontSize
  );
  if (currLine.textAlign === "end") {
    drawRect(
      currLine.position.x - 20 - currLine.txt.length * 0.5 * currLine.fontSize,
      currLine.position.y - 0.7 * currLine.fontSize,
      currLine.txt.length * (0.75 * currLine.fontSize),
      1.4 * currLine.fontSize
    );
  }
  if (currLine.textAlign === "center") {
    drawRect(
      currLine.position.x -
        10 -
        (currLine.txt.length * 0.5 * currLine.fontSize) / 2,
      currLine.position.y - 0.7 * currLine.fontSize,
      currLine.txt.length * (0.75 * currLine.fontSize),
      1.4 * currLine.fontSize
    );
  }
  if (currLine.textAlign === "start") {
    drawRect(
      currLine.position.x - 20,
      currLine.position.y - 0.7 * currLine.fontSize,
      currLine.txt.length * (0.75 * currLine.fontSize),
      1.4 * currLine.fontSize
    );
  }
}

function drawRect(x, y, width, height) {
  gCtx.beginPath();
  gCtx.rect(x, y, width, height);
  gCtx.strokeStyle = "#ffffff";
  gCtx.fillRect(x, y, 5, 5);
  gCtx.fillStyle = "#ffffff";
  gCtx.stroke();
}

function onDownloadImage(elLink) {
  gIsSelected = false;
  console.log("dk");
  const imgContent = gElCanvas.toDataURL("image/jpeg"); // image/jpeg the default format
  elLink.href = imgContent;
}

function onShareFb() {
  gIsSelected = false;
  const imgDataUrl = gElCanvas.toDataURL("image/jpeg");
  function onSuccess(uploadedImgUrl) {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`
    );
  }
  doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {
  const formData = new FormData();
  formData.append("img", imgDataUrl);
  console.log("formData:", formData);
  fetch("//ca-upload.com/here/upload.php", { method: "POST", body: formData })
    .then((res) => res.text())
    .then((url) => {
      console.log("url:", url);
      onSuccess(url);
    });
}
