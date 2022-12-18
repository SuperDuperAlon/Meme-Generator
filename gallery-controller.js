"use strict";

function onGallery() {
  document.querySelector(".editor").style.display = "none";
  document.querySelector(".gallery").style.display = "grid ";
  renderGallery();
}

function renderGallery() {
  const images = getImages()
  // const userInput = onKeywordsFilter()
  const elGallery = document.querySelector(".gallery .grid-container");

  var imageHTML = images
    .map(
      (image) => `<div class="grid-item shadow">
        <img src="./assets/images/${image.id}.jpg" onclick="onImageSelect(${image.id})">
        </div>`
    )
    .join("");

  elGallery.innerHTML = imageHTML;
}

function onImageSelect(id) {
  onEditor();
  setImg(id);
  renderMeme();
}

function onKeywordsFilter(userInput) {
  setKeywordsFilter(userInput)
    renderGallery();
}
