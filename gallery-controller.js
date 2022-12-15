"use strict";

function onGallery() {
  renderGallery();
}

function renderGallery() {
  const images = getImages();
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
  setImg(id);
  renderMeme();
}
