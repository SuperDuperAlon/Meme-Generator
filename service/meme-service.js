"use strict";

const KEY_STORAGE = "memeDB";
var gMeme;

var gImgs = [
  { id: 1, url: "./assets/images/1.jpg", keywords: ["trump", "politics"] },
  { id: 2, url: "./assets/images/2.jpg", keywords: ["puppies", "cute", "dog"] },
  { id: 3, url: "./assets/images/3.jpg", keywords: ["baby", "cute", "dog"] },
  { id: 4, url: "./assets/images/4.jpg", keywords: ["cute", "cat"] },
  { id: 5, url: "./assets/images/5.jpg", keywords: ["funny", "baby"] },
  { id: 6, url: "./assets/images/6.jpg", keywords: ["aliens", "funny"] },
  { id: 7, url: "./assets/images/7.jpg", keywords: ["funny", "baby"] },
  { id: 8, url: "./assets/images/8.jpg", keywords: ["movie", "funny"] },
  { id: 9, url: "./assets/images/9.jpg", keywords: ["funny", "cat"] },
  { id: 10, url: "./assets/images/10.jpg", keywords: ["baby", "funny"] },
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
  // gImages = setKeywordsFilter(userInput)
  return gImgs;
  console.log(gImgs);
}

function setKeywordsFilter(userInput) {
  console.log(userInput);
  const images = gImgs;
  const filteredData = images.filter((value) => {
    const searchStr = userInput.toLowerCase();
    const oneItemMatches = value.keywords.some((item) =>
      item.toLowerCase().includes(searchStr)
    );

    return oneItemMatches;
  });
  console.log(filteredData);
  return filteredData;
}

function setTextLine(inputValue) {
  var meme = getMeme();
  console.log(meme.selectedLineIdx);
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
  _createMeme(value);
}

function switchLine() {
  gMeme.selectedLineIdx = gMeme.selectedLineIdx + 1;
  if (gMeme.selectedLineIdx === gMeme.lines.length) {
    gMeme.selectedLineIdx = 0;
  }
  console.log(gMeme.selectedLineIdx);
  _saveMemeToStorage();
}

function deleteLine() {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1);
  gMeme.selectedLineIdx - 1;
  if (gMeme.selectedLineIdx < 0) {
    gMeme.selectedLineIdx = 0;
  }
  _saveMemeToStorage();
}

function changeAlign(value) {
  gMeme.lines[gMeme.selectedLineIdx].textAlign = value;
  _saveMemeToStorage();
}

function changeFontStyle(value) {
  gMeme.lines[gMeme.selectedLineIdx].fontStyle = value;
  _saveMemeToStorage();
}

function moveLine(value) {
  var currLine = gMeme.lines[gMeme.selectedLineIdx];
  currLine.position.y = currLine.position.y + value;
  _saveMemeToStorage();
}

function _createMeme(value) {
  console.log(value);
  gMeme = {
    selectedImgId: value,
    selectedLineIdx: 0,
    lines: [],
  };
  _saveMemeToStorage();
}

function addLine() {
  gMeme.selectedLineIdx = gMeme.lines.length;
  switch (gMeme.selectedLineIdx) {
    case 0:
      gMeme.lines.push(_createLine(gElCanvas.width / 2, 50));
      break;
    case 1:
      gMeme.lines.push(_createLine(gElCanvas.width / 2, gElCanvas.height - 50));
      break;
    default:
      gMeme.lines.push(_createLine(gElCanvas.width / 2, gElCanvas.height / 2));
      break;
  }
  _saveMemeToStorage();
}

function _createLine(x, y) {
  var newLine = {
    txt: "Add Text Here",
    fontSize: 20,
    textAlign: "center",
    textColor: "white",
    fontStyle: "impact",
    position: {
      x: x,
      y: y,
    },
  };

  return newLine;
}

function _saveMemeToStorage() {
  saveToStorage(KEY_STORAGE, gMeme);
}
