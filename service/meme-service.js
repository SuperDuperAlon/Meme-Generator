"use strict";

const KEY_STORAGE = "memeDB";
var gMeme;
var gLineIdx = 0;

console.log(gMeme);

var gImgs = [
  { id: 1, url: "./assets/images/1.jpg", keywords: ["funny", "cat"] },
  { id: 2, url: "./assets/images/2.jpg", keywords: ["funny", "cat"] },
  { id: 3, url: "./assets/images/3.jpg", keywords: ["funny", "cat"] },
  { id: 4, url: "./assets/images/4.jpg", keywords: ["funny", "cat"] },
  { id: 5, url: "./assets/images/5.jpg", keywords: ["funny", "cat"] },
  { id: 6, url: "./assets/images/6.jpg", keywords: ["funny", "cat"] },
  { id: 7, url: "./assets/images/7.jpg", keywords: ["funny", "cat"] },
  { id: 8, url: "./assets/images/8.jpg", keywords: ["funny", "cat"] },
  { id: 9, url: "./assets/images/9.jpg", keywords: ["funny", "cat"] },
  { id: 10, url: "./assets/images/10.jpg", keywords: ["funny", "cat"] },
  { id: 11, url: "./assets/images/11.jpg", keywords: ["funny", "cat"] },
  { id: 12, url: "./assets/images/12.jpg", keywords: ["funny", "cat"] },
  { id: 13, url: "./assets/images/13.jpg", keywords: ["funny", "cat"] },
  { id: 14, url: "./assets/images/14.jpg", keywords: ["funny", "cat"] },
  { id: 15, url: "./assets/images/15.jpg", keywords: ["funny", "cat"] },
  { id: 16, url: "./assets/images/16.jpg", keywords: ["funny", "cat"] },
  { id: 17, url: "./assets/images/17.jpg", keywords: ["funny", "cat"] },
  { id: 18, url: "./assets/images/18.jpg", keywords: ["funny", "cat"] },
  { id: 19, url: "./assets/images/19.jpg", keywords: ["funny", "cat"] },
];

function getMeme() {
  gMeme = loadFromStorage(KEY_STORAGE);
  return gMeme;
}

function getImages() {
  return gImgs;
}
function setTextLine(inputValue) {
  var meme = getMeme();
  meme.lines[meme.selectedLineIdx].txt = `${inputValue}`;
  _saveMemeToStorage();
  return gMeme;
}

function setColor(inputValue) {
  gMeme.lines[gMeme.selectedLineIdx].textColor = `${inputValue}`;
  _saveMemeToStorage();
  return gMeme;
}

function setFontSize(val) {
  gMeme.lines[gMeme.selectedLineIdx].fontSize += val;
  _saveMemeToStorage();
  return gMeme;
}

function setImg(value) {
  console.log(value);
  _createMeme(value);
}

function addLine() {
  gMeme.lines.push(_createLine());
  _saveMemeToStorage();
}

function switchLine() {
  gMeme.selectedLineIdx = gMeme.selectedLineIdx + 1;
  if (gMeme.selectedLineIdx === gMeme.lines.length) {
    gMeme.selectedLineIdx = 0;
  }
  _saveMemeToStorage();
}

function deleteLine() {
  gMeme.lines.splice(gMeme.selectedLineIdxs, 1);
  _saveMemeToStorage();
}

function changeAlign(value) {
  gMeme.lines[gMeme.selectedLineIdx].textAlign = value;
  _saveMemeToStorage();
}

function changeFontStyle(value) {
  gMeme.lines[gMeme.selectedLineIdx].fontStyle = value;
  console.log(gMeme.lines[gMeme.selectedLineIdx]);
  _saveMemeToStorage();
}

function moveLine(value) {
  var currLine = gMeme.lines[gMeme.selectedLineIdx];
  currLine.position.y = currLine.position.y + value;
  console.log(currLine.position.y);
  _saveMemeToStorage();
}

function highlightLine() {
  var currLine = gMeme.selectedLineIdx;
  console.log(currLine);
}

function _createMeme(value) {
  console.log(value);
  gMeme = {
    selectedImgId: value,
    selectedLineIdx: 0,
    lines: [
      {
        txt: "Add Text Here",
        fontSize: 20,
        textAlign: "center",
        textColor: "white",
        fontStyle: "impact",
        position: {
          x: gElCanvas.width / 2,
          y: 50,
        },
      },
      {
        txt: "Add Text Here",
        fontSize: 20,
        textAlign: "center",
        textColor: "white",
        fontStyle: "impact",
        position: {
          x: gElCanvas.width / 2,
          y: gElCanvas.height - 50,
        },
      },
    ],
  };
  _saveMemeToStorage();
}

function _createLine() {
  var newLine = {
    txt: "Add Text Here",
    fontSize: 20,
    textAlign: "center",
    textColor: "white",
    fontStyle: "impact",
    position: {
      x: gElCanvas.width / 2,
      y: gElCanvas.height / 2,
    },
  };

  return newLine;
}

function _saveMemeToStorage() {
  saveToStorage(KEY_STORAGE, gMeme);
}
