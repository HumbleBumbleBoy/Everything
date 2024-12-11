let isAnimating = false; // Prevent multiple simultaneous animations
const animationTime = 700; // Miliseconds
let fileName = ""; // path to database
let task = ""; // what will the button do and display
let clickSfx = new Audio("/assets/sfx/clickSfx.mp3");
clickSfx.volume = 0.3;
const everythingButton = document.getElementById("everythingButton");
const husk = document.getElementById("insert");
const generateDropdown = document.getElementById("generateDropdown");
const playDropdown = document.getElementById("playDropdown");

document.querySelectorAll(".clickable").forEach(element => { // everything that has "clickable" as class will make a noise
    element.addEventListener("click", () => {
        clickSfx.pause();
        clickSfx.currentTime = 0;

        clickSfx.play().catch(err => console.error("Audio play failed:", err));
    });
});

document.addEventListener('DOMContentLoaded', function() { // property and execute of dropdown menus
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {
        alignment: 'left',
        closeOnClick: true, // Close the dropdown when an option is selected
        coverTrigger: false,
    });
});

document.addEventListener('click', function(event) {
    // Check if the clicked element is not inside any dropdown or button
    const clickedInsideDropdown = event.target.closest('.dropdown-trigger') || event.target.closest('.choiceButton');

    // If the clicked element is outside the dropdowns or the button, reset active state
    if (!clickedInsideDropdown) {
        everythingButton.innerText = ". . .";
        resetActiveAll();
    }
}, true);

async function generate() {
    if (isAnimating) return; // Ignore clicks while animating

    isAnimating = true; // Mark animation as active

    try {
        // Fade out
        husk.style.opacity = 0;
        await new Promise(resolve => setTimeout(resolve, animationTime)); // Wait for fade-out

        // Fetch and update text
        const response = await fetch(`/code/data/${fileName}.json`);
        const responses = await response.json();
        let randomResponse = responses[Math.floor(Math.random() * responses.length)];
        husk.innerText = randomResponse;

        // Fade in
        husk.style.opacity = 1;
        await new Promise(resolve => setTimeout(resolve, animationTime)); // Wait for fade-in
    } catch (error) {
        console.error("Failed to fetch responses:", error);
        husk.innerText = "Choose an option first"; // this happens when data is unable to generate, but it's 99% because user didn't choose an option
        husk.style.opacity = 1; // Ensure visibility
    } finally {
        isAnimating = false; // Allow new animations
    }
};

function everythingButtonGenerate() {  // when "generate" tab is clicked
    husk.innerText = "";
    resetTabStyle();
    everythingButton.innerText = "Generate . .  .";
    generateDropdown.classList.add("active")
    task = "";
    isAnimating = false;
}

function websiteTabSwitch() {
    resetActiveAll()
    task = "generate";
    fileName = "websiteIdeas";
    everythingButton.innerText = "Generate a website idea";
};

function jokesTabSwitch() {
    resetActiveAll()
    task = "generate";
    fileName = "jokes";
    everythingButton.innerText = "Generate a joke";
};

function quotesTabSwitch() {
    resetActiveAll()
    task = "generate";
    fileName = "quotes";
    everythingButton.innerText = "Generate a quote";
};

function questionsTabSwitch() {
    resetActiveAll()
    task = "generate";
    fileName = "questions";
    everythingButton.innerText = "Generate a question";
};


function everythingButtonPlay() {  // when "Play" tab is clicked
    husk.innerText = "";
    resetTabStyle();
    everythingButton.innerText = "Let's . . .";
    playDropdown.classList.add("active")
    task = "";
    isAnimating = false;
}

function drawTabSwitch() {
    resetActiveAll()
    task = "play";
    everythingButton.innerText = "Change colour";
};

function clickerTabSwitch() {
    resetActiveAll()
    task = "play";
    everythingButton.innerText = "Gather points!";
};


function everythingButtonPLACEHOLDER1() {  // when "PLACEHOLDER1" tab is clicked
    husk.innerText = "";
    resetTabStyle();
    everythingButton.innerText = "PLACEHOLDER1";
    const PLACEHOLDER1Dropdown = document.getElementById("PLACEHOLDER1Dropdown");
    PLACEHOLDER1Dropdown.classList.add("active")
    task = "";
    isAnimating = false;
}

function everythingButtonPLACEHOLDER2() {  // when "PLACEHOLDER2" tab is clicked
    husk.innerText = "";
    resetTabStyle();
    everythingButton.innerText = "PLACEHOLDER2";
    const PLACEHOLDER2Dropdown = document.getElementById("PLACEHOLDER2Dropdown");
    PLACEHOLDER2Dropdown.classList.add("active")
    task = "";
    isAnimating = false;
}

function animateHusk() {
    task = "generate";
    const husk = document.getElementById("insert");
    husk.style.opacity = 0; // Start invisible
    setTimeout(() => {
        husk.style.opacity = 1; // Fade in after x seconds
    }, animationTime);
};

function resetTabStyle() {
    const tabs = document.querySelectorAll(".s3");
    tabs.forEach(tab => {
        tab.classList.remove("active"); // Remove the 'active' class
    });
};

function resetActiveAll() { // makes all dropdowns appear not clicked in
    generateDropdown.classList.remove("active"),
    playDropdown.classList.remove("active"),
    PLACEHOLDER1Dropdown.classList.remove("active"),
    PLACEHOLDER2Dropdown.classList.remove("active")
}

function play() {
    return
}

function execute() {
    resetActiveAll() // makes all dropdown buttons not appear clicked
    // Execute the corresponding tasks
    if (!fileName && task === "generate" || task === "") {
        // If no fileName is set, notify the user
        husk.innerText = "Choose an option first";
        husk.style.opacity = 1;
        setTimeout(() => {
            husk.style.opacity = 0;
        }, 1000)
         // Ensure it's visible
        return;
    }

    if (task === "generate") { generate(); } 
    else if (task === "play") { play(); }
}