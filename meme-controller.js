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
        meme.lines[0].textColor,
        meme.lines[0].fontSize,
        meme.lines[0].textAlign,
        meme.lines[0].fontStyle
      );
    } else if (i === 1) {
      drawText(
        meme.lines[1].txt,
        gElCanvas.width / 2,
        gElCanvas.height - 50,
        meme.lines[1].textColor,
        meme.lines[1].fontSize,
        meme.lines[1].textAlign,
        meme.lines[1].fontStyle
      );
    } else {
      drawText(
        meme.lines[i].txt,
        gElCanvas.width / 2,
        gElCanvas.height / 2,
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

function onSwitchLine() {
  switchLine();
  renderMeme();
}

function onDeleteLine() {
  deleteLine();
  renderMeme();
}

function onChangeAlign(value) {
  console.log(value);
  changeAlign(value);
  renderMeme();
}
function onChangeFontStyle(value) {
  changeFontStyle(value);
  renderMeme();
}

function onDownloadImage(elLink) {
  console.log("dk");
  const imgContent = gElCanvas.toDataURL("image/jpeg"); // image/jpeg the default format
  elLink.href = imgContent;
}

function onShareFb() {
  const imgDataUrl = gElCanvas.toDataURL("image/jpeg"); // Gets the canvas content as an image format

  // A function to be called if request succeeds
  function onSuccess(uploadedImgUrl) {
    // Encode the instance of certain characters in the url
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`
    );
  }
  // Send the image to the server
  doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {
  // Pack the image for delivery
  const formData = new FormData();
  formData.append("img", imgDataUrl);
  console.log("formData:", formData);
  // Send a post req with the image to the server
  fetch("//ca-upload.com/here/upload.php", { method: "POST", body: formData })
    .then((res) => res.text())
    .then((url) => {
      console.log("url:", url);
      onSuccess(url);
    });
}
