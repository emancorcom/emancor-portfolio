
// SCROLL PAST HERO SECTION LOGO SHRINKS

// Function to change the state of the logo
function changeLogoState(isIntersecting) {
  const logo = document.querySelector('.logo-mark');
  if (isIntersecting) {
    logo.classList.remove('scrolled');
  } else {
    logo.classList.add('scrolled');
  }
}

// Create an Intersection Observer instance
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    changeLogoState(entry.isIntersecting);
  });
}, {
  threshold: 0.8 // Adjust the threshold as needed
});

// Observe the hero section
const heroSection = document.querySelector('.column');
console.log(heroSection);
observer.observe(heroSection);


// SCROLL DOWN WEBPAGE HEADER HIDES - SCROLL UP HEADER SHOWS

let lastScrollY = window.scrollY;
const header = document.querySelector('header'); // Adjust the selector to match your header element
let timeoutId;
let isHiding = false; // Flag to track if the header is scheduled to be hidden

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY) {
    // Scrolling down
    if (!isHiding) {
      isHiding = true;
      timeoutId = setTimeout(() => {
        header.classList.add('hidden');
      }, 500); // Adjust the delay as needed (200ms in this example)
    }
  } else {
    // Scrolling up
    clearTimeout(timeoutId);
    header.classList.remove('hidden');
    isHiding = false; // Reset the flag
  }

  lastScrollY = currentScrollY;
});
