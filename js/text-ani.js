
// HERO TEXT ANIMATION

var wordClasses = ['word', 'word2']; // Add the classes you want to target
var wordArrays = {}; // Store arrays of words for each class

// Initialize the words for each class
wordClasses.forEach(function (wordClass) {
  var words = document.getElementsByClassName(wordClass);
  wordArrays[wordClass] = []; // Initialize an array for this class

  for (var i = 0; i < words.length; i++) {
    splitLetters(words[i], wordClass);
  }

  // Start the animation for this class with a different interval
  startAnimation(wordClass);
});

function startAnimation(className) {
  var currentWord = 0;
  var words = wordArrays[className];

  // Make sure the first word is visible
  words[currentWord][0].parentElement.style.opacity = 1;

  setInterval(function () {
    changeWord(className, currentWord, words);
    currentWord = (currentWord == words.length - 1) ? 0 : currentWord + 1;
  }, 3000); // Change word every 4 seconds (you can adjust this interval)
}

function changeWord(className, currentWordIndex, wordArray) {
  var cw = wordArray[currentWordIndex];
  var nw = currentWordIndex == wordArray.length - 1 ? wordArray[0] : wordArray[currentWordIndex + 1];

  // Animate current word out
  for (var i = 0; i < cw.length; i++) {
    animateLetterOut(cw, i);
  }

  // Animate next word in
  for (var i = 0; i < nw.length; i++) {
    nw[i].className = 'letter behind';
    nw[0].parentElement.style.opacity = 1;
    animateLetterIn(nw, i);
  }
}

function animateLetterOut(cw, i) {
  setTimeout(function () {
    cw[i].className = 'letter out';
  }, i * 80);
}

function animateLetterIn(nw, i) {
  setTimeout(function () {
    nw[i].className = 'letter in';
  }, 340 + (i * 80));
}

function splitLetters(word, className) {
  var content = word.innerHTML;
  word.innerHTML = '';
  var letters = [];
  for (var i = 0; i < content.length; i++) {
    var letter = document.createElement('span');
    letter.className = 'letter';
    letter.innerHTML = content.charAt(i);
    word.appendChild(letter);
    letters.push(letter);
  }

  wordArrays[className].push(letters);
}




