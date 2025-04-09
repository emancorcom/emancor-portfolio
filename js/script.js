// HERO IMAGE SCALE WIDTH ON SCROLL

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const newWidth = 0 + scrollY * 0.1112;
  const div = document.getElementById('scalable-div');

  div.style.width = `${Math.min(newWidth, 100)}%`; // Set a maximum width of 500px
});


// CONTENT IMAGE SCALE WIDTH ON SCROLL
function scaleDivOnScroll(id) {
  window.addEventListener('scroll', () => {
    const div = document.getElementById(id);
    const rect = div.getBoundingClientRect();

    const offset = 900;
    const scrollY = Math.max(0, -rect.top + offset);

    const newWidth = 0 + scrollY * 0.117; // Scale width with scroll position
    div.style.width = `${Math.min(newWidth, 100)}%`; // Set a maximum width of 100%

  });
}

scaleDivOnScroll('scalable-div-1');
scaleDivOnScroll('scalable-div-2');
scaleDivOnScroll('scalable-div-3');
scaleDivOnScroll('scalable-div-4');



// CONTENT IMAGE SCALE WIDTH ON SCROLL
function scaleDivOnScroll(id) {
  window.addEventListener('scroll', () => {
    const div = document.getElementById(id);
    const rect = div.getBoundingClientRect();

    const offset = 900;
    const scrollY = Math.max(0, -rect.top + offset);

    const newWidth = 0 + scrollY * 0.1525; // Scale width with scroll position
    div.style.width = `${Math.min(newWidth, 100)}%`; // Set a maximum width of 100%

  });
}

scaleDivOnScroll('scalable-small-div-1');
scaleDivOnScroll('scalable-small-div-2');
scaleDivOnScroll('scalable-small-div-3');
