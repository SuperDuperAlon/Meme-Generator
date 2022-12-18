"use strict";

let gElCanvas;
let gCtx;

function onEditor() {
  document.querySelector(".gallery").style.display = "none";
  document.querySelector(".editor").style.display = "flex";
  gElCanvas = document.getElementById("canvas");
  gCtx = gElCanvas.getContext("2d");
}

function renderMeme() {
  var meme = getMeme();
  console.log(meme);
  drawImg(meme.selectedImgId);
  
}

function drawText(text, x, y, color, font, size, align) {
  gCtx.lineWidth = 1;
  gCtx.strokeStyle = "black";
  gCtx.fillStyle = `${color}`;
  gCtx.font = `${size}px ${font}`;
  gCtx.textAlign = `${align}`;
  gCtx.textBaseline = "middle";
  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
}

function renderText() {
  const meme = getMeme();
  meme.lines.forEach((line) => {
    drawText(line.txt, line.position.x, line.position.y, line.textColor, line.fontStyle, line.fontSize, line.textAlign);
  });
}

function drawImg(imgId) {
  const elImg = new Image();
  elImg.src = `./assets/images/${imgId}.jpg`;
  elImg.onload = () => {
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
    renderText();
    // drawRect(100, 100, 150, 150)
  };
}

function onCreateInput(value) {
  setTextLine(value);
  renderMeme();
}

function onOpenColorPicker() {
  document.querySelector(".color-editor").style.opacity = "100%";
}

function onChangeColor(value) {
  setColor(value);
  renderMeme();
  document.querySelector(".color-editor").style.opacity = "0%";
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
  changeAlign(value);
  renderMeme();
}

function onChangeFontStyle(value) {
  changeFontStyle(value);
  renderMeme();
}

function onMoveLine(val) {
  moveLine(val);
  renderMeme();
}


function drawRect(x, y, width, height) {
  gCtx.beginPath()
  gCtx.rect(x, y, width, height);
  gCtx.strokeStyle = "#ffffff";
  gCtx.fillRect(x, y, 5, 5);
  gCtx.fillStyle = "#ffffff";
  gCtx.stroke();
}


function renderRecEditor() {
  var meme = getMeme();
  console.log(meme);
  var currLine = meme.lines[meme.selectedLineIdx];
  console.log(currLine);
  if (currLine.textAlign === "end") {
    drawRect(
      currLine.position.x - 20,
      currLine.position.y,
      100, 
      100
    );
  }
  else if (currLine.textAlign === "center") {
    drawRect(
      currLine.position.x - 20,
      currLine.position.y,
      100, 
      100
    );
  }
  else if (currLine.textAlign === "start") {
    drawRect(
      currLine.position.x - 20,
      currLine.position.y - 0.7 * currLine.fontSize,
      currLine.txt.length * (0.75 * currLine.fontSize),
      1.4 * currLine.fontSize
    );
  }
}



function onDownloadImg(elLink) {
  renderMeme();
  const imgContent = gElCanvas.toDataURL("image/jpeg"); // image/jpeg the default format
  elLink.href = imgContent;
}

function onShareFb() {
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
  fetch("//ca-upload.com/here/upload.php", { method: "POST", body: formData })
    .then((res) => res.text())
    .then((url) => {
      onSuccess(url);
    });
}

function toggleMenu() {
  document.body.classList.toggle("menu-open");
}

function onWebApiShare() {
  if (navigator.share) {
    navigator
      .share({
        title: "Alon's Meme Generator",
        url: "https://superduperalon.github.io/Meme-Generator/",
      })
      .then(() => {
        console.log("thanks for share");
      })
      .catch(console.error);
  }
}
