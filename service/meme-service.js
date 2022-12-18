"use strict";

const KEY_STORAGE = "memeDB";
var gMeme;
var gFilterBy = "";

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
  console.log(gFilterBy);
  const images = gImgs.filter((value) => {
    const searchStr = gFilterBy.toLowerCase();
    // 
    console.log(searchStr);
    const oneItemMatches = value.keywords.some((item) =>
      item.toLowerCase().includes(searchStr)
    );
    console.log(oneItemMatches);
    return oneItemMatches;

  });
  console.log(images);
  return images;
}

function setKeywordsFilter(userInput) {
  gFilterBy = userInput;
  console.log(gFilterBy);
}
// function setKeywordsFilter(userInput) {
//   console.log(userInput);
//   const images = gImgs;
//   const filteredData = images.filter((value) => {
//     const searchStr = userInput.toLowerCase();
//     const oneItemMatches = value.keywords.some((item) =>
//       item.toLowerCase().includes(searchStr)
//     );

//     return oneItemMatches;
//   });
//   console.log(filteredData);
//   return filteredData;
// }

function setTextLine(inputValue) {
  var meme = getMeme();
  meme.lines[meme.selectedLineIdx].txt = `${inputValue}`;
  _saveMemeToStorage();
  return meme;
}

function setColor(inputValue) {
  var meme = getMeme();
  meme.lines[gMeme.selectedLineIdx].textColor = `${inputValue}`;
  _saveMemeToStorage();
  return gMeme;
}

function setFontSize(val) {
  var meme = getMeme();
  meme.lines[gMeme.selectedLineIdx].fontSize += val;
  _saveMemeToStorage();
  return meme;
}

function setImg(value) {
  _createMeme(value);
}

function switchLine() {
  var meme = getMeme();
  meme.selectedLineIdx = gMeme.selectedLineIdx + 1;
  if (meme.selectedLineIdx === gMeme.lines.length) {
    meme.selectedLineIdx = 0;
  }
  _saveMemeToStorage();
}

function deleteLine() {
  var meme = getMeme();
  meme.lines.splice(meme.selectedLineIdx, 1);
  meme.selectedLineIdx = meme.lines.length - 1;
  if (meme.selectedLineIdx < 0) {
    meme.selectedLineIdx = 0;
  }
  _saveMemeToStorage();
}

function changeAlign(value) {
  var meme = getMeme();
  meme.lines[meme.selectedLineIdx].textAlign = value;
  _saveMemeToStorage();
}

function changeFontStyle(value) {
  var meme = getMeme();
  meme.lines[meme.selectedLineIdx].fontStyle = value;
  _saveMemeToStorage();
}

function moveLine(value) {
  var meme = getMeme();
  var currLine = meme.lines[meme.selectedLineIdx];
  currLine.position.y = currLine.position.y + value;
  _saveMemeToStorage();
}

function addLine() {
  var meme = getMeme();

  meme.selectedLineIdx = meme.lines.length;
  switch (meme.selectedLineIdx) {
    case 0:
      meme.lines.push(_createLine(gElCanvas.width / 2, 50));
      break;
    case 1:
      meme.lines.push(_createLine(gElCanvas.width / 2, gElCanvas.height - 50));
      break;
    default:
      meme.lines.push(_createLine(gElCanvas.width / 2, gElCanvas.height / 2));
      break;
  }
  console.log(meme);
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
