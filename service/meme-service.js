"use strict";

const KEY_STORAGE = "memeDB";
var gMeme = {
  selectedImgId: 19,
  selectedLineIdx: 0,
  lines: [
    {
      txt: "Add Text Here",
      size: 20,
      align: "left",
      color: "red",
    },
  ],
};

var gImgs = [
  { id: 1, url: "/assets/1.jpg", keywords: ["funny", "cat"] },
  // { id: 2, url: "/assets/2.jpg", keywords: ["funny", "cat"] },
  // { id: 3, url: "/assets/3.jpg", keywords: ["funny", "cat"] },
  // { id: 4, url: "/assets/4.jpg", keywords: ["funny", "cat"] },
  // { id: 5, url: "/assets/5.jpg", keywords: ["funny", "cat"] },
  // { id: 6, url: "/assets/6.jpg", keywords: ["funny", "cat"] },
  // { id: 7, url: "/assets/7.jpg", keywords: ["funny", "cat"] },
  // { id: 8, url: "/assets/8.jpg", keywords: ["funny", "cat"] },
  // { id: 9, url: "/assets/9.jpg", keywords: ["funny", "cat"] },
  // { id: 10, url: "/assets/10.jpg", keywords: ["funny", "cat"] },
  // { id: 11, url: "/assets/11.jpg", keywords: ["funny", "cat"] },
  // { id: 12, url: "/assets/12.jpg", keywords: ["funny", "cat"] },
  // { id: 13, url: "/assets/13.jpg", keywords: ["funny", "cat"] },
  // { id: 14, url: "/assets/14.jpg", keywords: ["funny", "cat"] },
  // { id: 15, url: "/assets/15.jpg", keywords: ["funny", "cat"] },
  // { id: 16, url: "/assets/16.jpg", keywords: ["funny", "cat"] },
  // { id: 17, url: "/assets/17.jpg", keywords: ["funny", "cat"] },
  // { id: 18, url: "/assets/18.jpg", keywords: ["funny", "cat"] },
  { id: 19, url: "/assets/19.jpg", keywords: ["funny", "cat"] },
];

function getMeme() {
  gMeme = loadFromStorage(KEY_STORAGE);
  return gMeme;
}

function getImages() {
  return gImgs;
}

function getMemeById(memeId) {
  var meme = gMeme.find((meme) => memeId === meme.selectedImgId);
  return meme;
}

function setTextLine(inputValue) {
  gMeme.lines[0].txt = `${inputValue}`;
  _saveMemeToStorage();
  return gMeme;
}

function setColor(inputValue) {
  gMeme.lines[0].color = `${inputValue}`;
  _saveMemeToStorage();
  return gMeme;
}

function setFontSize(val) {
  gMeme.lines[0].size += val  
  console.log(gMeme.lines[0].size);
  _saveMemeToStorage();
  return gMeme;
}

function setImg(value) {
  gMeme.selectedImgId = value;
  gMeme.lines[0].txt = 'Add Text Here' // Set defense - if currId is equal to set Id - return
  _saveMemeToStorage();
}

function _saveMemeToStorage() {
  saveToStorage(KEY_STORAGE, gMeme);
}
