// HERO IMAGE SCALE WIDTH ON SCROLL

function updateDivWidthOnScroll() {
  const scrollY = window.scrollY;
  const divs = document.querySelectorAll('.image-scale-container'); // Select all elements with the class

  divs.forEach((div) => {
    // Check window width to determine scaling factor and max width
    if (window.innerWidth <= 1000) {
      const newWidth = 0 + scrollY * 0.1112;
      div.style.width = `${Math.min(newWidth, 100)}%`; // Set a maximum width of 100%
    } else {
      const newWidth = 0 + scrollY * 0.16;
      div.style.width = `${Math.min(newWidth, 138)}vw`; // Set a maximum width of 138vw
    }
  });
}

window.addEventListener('scroll', updateDivWidthOnScroll);
window.addEventListener('resize', updateDivWidthOnScroll);






// IMAGE SCALE WIDTH ON SCROLL

function scaleDivsOnScroll() {
  const divs = document.querySelectorAll('.image-scale-container-2'); // Select all elements with the class

  window.addEventListener('scroll', () => {
    divs.forEach((div) => {
      const rect = div.getBoundingClientRect();

      // Calculate the offset for the individual element
      const offset = 850;
      const scrollY = Math.max(0, -rect.top + offset);

      // Check window width to determine scaling factor and max width
      if (window.innerWidth <= 1000) {
        const newWidth = 0 + scrollY * 0.1112;
        div.style.width = `${Math.min(newWidth, 100)}%`; // Set a maximum width of 100%
      } else {
        const newWidth = 0 + scrollY * 0.163;
        div.style.width = `${Math.min(newWidth, 138)}vw`; // Set a maximum width of 138vw
      }
    });
  });
}

scaleDivsOnScroll();

window.addEventListener('scroll', updateDivWidthOnScroll);
window.addEventListener('resize', updateDivWidthOnScroll);







// HERO TEXT PULLER WIDTH ON SCROLL

function updateTextPullerWidthOnScroll() {
  const scrollY = window.scrollY;
  const elements = document.querySelectorAll('.text-puller');

  elements.forEach((element) => {
    const newWidth = 100 - scrollY * 0.1112; // Shrink width with scroll position
    element.style.width = `${Math.max(newWidth, 0)}%`; // Set a minimum width of 0%
  });
}

window.addEventListener('scroll', updateTextPullerWidthOnScroll);
window.addEventListener('resize', updateTextPullerWidthOnScroll);






// INSTERSECTION OBSERVER
const myobserver = new IntersectionObserver((entries) => {

  // LOOP THROUGH ALL ENTRIES

  entries.forEach((entry) => {

    if (entry.isIntersecting) {
      entry.target.setAttribute("data-viewstate", "active");
    } else {
      entry.target.setAttribute("data-viewstate", "innactive");
    };

  });

});

const mytargets = document.querySelectorAll('.observe-me');
mytargets.forEach((el) => {
  myobserver.observe(el)

});







