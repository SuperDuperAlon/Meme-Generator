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
  console.log(gMeme);
  return gMeme;
}

function getImages() {
  return gImgs;
}

// function getMemeById(memeId) {
//   var meme = gMeme.find((meme) => memeId === meme.selectedImgId);
//   return meme;
// }

function setTextLine(inputValue) {
  var meme = getMeme();
  console.log(gMeme);
  meme.lines[meme.selectedLineIdx].txt = `${inputValue}`;
  _saveMemeToStorage();
  return gMeme;
}

function setColor(inputValue) {
  gMeme.lines.fontColor = `${inputValue}`;
  _saveMemeToStorage();
  return gMeme;
}

function setFontSize(val) {
  gMeme.lines.fontSize += val;
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

function switchLine(val) {
  gMeme.selectedLineIdx = gMeme.selectedLineIdx + val;
  console.log(gMeme.selectedLineIdx);
  if (gMeme.selectedLineIdx < 0) {
    gMeme.selectedLineIdx = 0;
  }
  if (gMeme.selectedLineIdx > gMeme.lines.length) {
    gMeme.selectedLineIdx = gMeme.lines.length;
  }
  _saveMemeToStorage();
}

function _createMeme(value) {
  gMeme = {
    selectedImgId: value,
    selectedLineIdx: 0,
    lines: [
      {
        txt: "Add Text Here",
        fontSize: 20,
        TextAlign: "center",
        TextColor: "red",
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
    textColor: "red",
  };

  return newLine;
}

function _saveMemeToStorage() {
  saveToStorage(KEY_STORAGE, gMeme);
}
