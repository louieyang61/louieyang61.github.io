// Simple slideshow/rotating text effect for the heading
const texts = ["Hi!", "This is Louie Yang!"];
let index = 0;
const textElement = document.getElementById("slideshow-text");

function changeText() {
  textElement.textContent = texts[index];
  index = (index + 1) % texts.length;
}

// Switch text every 2 seconds
setInterval(changeText, 2000);
changeText();
