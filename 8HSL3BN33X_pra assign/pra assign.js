function scrollToSection(sttSection) {
    var section = document.getElementById('sttSection');
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// DOM Elements
let spinnerEle = document.getElementById("spinner");
let timerEle = document.getElementById("timer");
let quoteDisplayEle = document.getElementById("quoteDisplay");
let resultEle = document.getElementById("result");
let quoteInputEle = document.getElementById("quoteInput");
let submitBtnEle = document.getElementById("submitBtn");
let resetBtnEle = document.getElementById("resetBtn");

let counter = 0;
let timerRunning = false; // To track if the timer is running
let intervalId = null; // Store the interval ID for the timer

spinnerEle.classList.toggle("d-none");

// Start the timer when user clicks inside the typing input
quoteInputEle.addEventListener('focus', function() {
    if (!timerRunning) {
        timerRunning = true;
        startCounting();
    }
});

// Function to start the counting (timer)
function startCounting() {
    intervalId = setInterval(function() {
        counter += 1;
        timerEle.textContent = counter;
    }, 1000);
}

// Fetch a new random quotation
function getQuotation() {
    let options = {
        method: "GET"
    };
    fetch("https://apis.ccbp.in/random-quote", options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinnerEle.classList.add("d-none");
            let quote = jsonData.content;
            quoteDisplayEle.textContent = quote;
        });
}

// Initially load a random quote
getQuotation();

// Reset button functionality
resetBtnEle.onclick = function() {
    spinnerEle.classList.remove("d-none");
    getQuotation();

    // Reset the timer and other elements
    clearInterval(intervalId); // Stop the timer
    timerRunning = false; // Allow timer to start again after reset
    counter = 0; // Reset counter
    timerEle.textContent = counter;
    resultEle.textContent = "";
    quoteInputEle.value = ""; // Clear input
};

// Submit button functionality to check the typing accuracy
submitBtnEle.onclick = function() {
    if (quoteInputEle.value.trim() === quoteDisplayEle.textContent.trim()) {
        clearInterval(intervalId); // Stop the timer
        resultEle.textContent = "You typed in " + counter + " seconds";
    } else {
        resultEle.style.color = "red";
        resultEle.textContent = "You typed an incorrect sentence";
    }
};

let userInputEl = document.getElementById("userInput");
let spinnerEl1 = document.getElementById("spinner");
let factEl = document.getElementById("fact");
let errorEl = document.getElementById("error");


function g(event) {
    let userInputVal = userInputEl.value.trim();
    if (userInputVal === "") {
        errorEl.textContent = "*Enter a Number";
        factEl.classList.add("d-none");
        return;
    } else {
        errorEl.classList.add("d-none")
    }
    if (isNaN(userInputVal)) {
        errorEl.textContent = "Enter a valid Number";
        factEl.classList.add("d-none");
        return;
    }
    let url = "https://apis.ccbp.in/numbers-fact?number=" + userInputVal;
    let options = {
        method: "GET"
    };
    spinnerEl1.classList.remove("d-none");
    factEl.classList.add("d-none");
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            factEl.classList.remove("d-none");
            spinnerEl1.classList.add("d-none");
            let {
                fact
            } = jsonData;
            factEl.textContent = fact;
        });
}

userInputEl.addEventListener("keyup", g);

let jokeTextEl = document.getElementById("jokeText");
let spinnerEl = document.getElementById("spinner");
let jokeBtnEl = document.getElementById("jokeBtn");
let options = {
    method: "Get"
};

function getRandomJoke() {
    spinnerEl.classList.remove("d-none");
    jokeTextEl.classList.add("d-none");
    fetch("https://apis.ccbp.in/jokes/random", options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            let randomJoke = jsonData.value;
            spinnerEl.classList.add("d-none");
            jokeTextEl.classList.remove("d-none");
            jokeTextEl.textContent = randomJoke;
        })
}
jokeBtnEl.addEventListener("click", getRandomJoke);

let wordCloud = ["Hello", "hii", "how", "what", "you", "yourself", "name", "victory", "food", "lovely", "beautiful", "written", "where", "who", "awesome"];
let wordsContainerEl = document.getElementById("wordsContainer");
let userInputEll = document.getElementById("userInput1");
let errorMsgEl = document.getElementById("errorMsg");
let errorMsg = "Please enter a word.";

function createAndAddWordToWordCloud(word) {
    let randomFontSize = Math.ceil(Math.random() * 40) + "px";
    let wordEl = document.createElement("span");
    wordEl.textContent = word;
    wordEl.style.fontSize = randomFontSize;
    wordEl.classList.add("m-3");
    wordsContainerEl.appendChild(wordEl);
}
for (let word of wordCloud) {
    createAndAddWordToWordCloud(word);
}

function onAddWordToWordCloud() {
    let userEnteredWord = userInputEll.value;
    if (userEnteredWord !== "") {
        userInputEll.value = "";
        errorMsgEl.textContent = "";
        createAndAddWordToWordCloud(userEnteredWord);
    } else {
        errorMsgEl.textContent = errorMsg;
    }
}

function applyChanges() {
    let backgroundColorInputElement = document.getElementById("bgColorInput").value;
    let fontColorInputElement = document.getElementById("fontColorInput").value;
    let fontSizeInputElement = document.getElementById("fontSizeInput").value;
    let fontWeightInputElement = document.getElementById("fontWeightInput").value;
    let paddingInputElement = document.getElementById("paddingInput").value;
    let borderRadiusInputElement = document.getElementById("borderRadiusInput").value;
    let custom = document.getElementById("customButton");


    custom.style.backgroundColor = backgroundColorInputElement;
    custom.style.fontSize = fontSizeInputElement;
    custom.style.color = fontColorInputElement;
    custom.style.fontWeight = fontWeightInputElement;
    custom.style.padding = paddingInputElement;
    custom.style.borderRadius = borderRadiusInputElement;
}
applyChanges();