"use strict";

function onGallery() {
  renderGallery();
}

function renderGallery() {
  const images = getImages();
  const elGallery = document.querySelector(".gallery");
  console.log(elGallery);
  console.log("yes");

  var imageHTML = images
    .map(
      (image) => `
        <img src="assets/${image.id}.jpg" onclick="onImageSelect(${image.id})">`
    )
    .join("");

  elGallery.innerHTML = imageHTML;
}

function onImageSelect(id) {
  setImg(id);
  renderMeme();
}
