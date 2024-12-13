let isAnimating = false; // Prevent multiple simultaneous animations
const animationTime = 500; // Miliseconds
let fileName = ""; // path to database
let task = ""; // what will the button do and display
let game = "";
let clickSfx = new Audio("assets/sfx/clickSfx.mp3");
let volumeSlider = document.getElementById("volumeSlider");
const everythingButton = document.getElementById("everythingButton");
const husk = document.getElementById("insert");
const generateDropdown = document.getElementById("generateDropdown");
const playDropdown = document.getElementById("playDropdown");
const drawArea = document.getElementById("drawArea");
const clickerStuff = document.getElementById("clickerStuff");

function updateVolume() {
    let volume = volumeSlider.value / 100; // Normalize to range 0-1
    clickSfx.volume = volume;
}

volumeSlider.addEventListener("input", updateVolume);

document.addEventListener("click", function(event) {
    // Check if the clicked element has the 'clickable' class
    if (!event.target.classList.contains("active") && event.target.classList.contains("clickable")) {
        clickSfx.pause();
        clickSfx.currentTime = 0;
        clickSfx.play().catch(err => console.error("Audio play failed:", err));
    }

    resetActiveAll();
}, true);

document.addEventListener('DOMContentLoaded', function() { 
    // Initialize all dropdown triggers with custom options
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {
        alignment: 'left',
        closeOnClick: true, // Prevent dropdown from closing when clicking on a tab inside the dropdown
        coverTrigger: false, // Make the dropdown appear below the trigger
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {
        opacity: 0.3
    });
  });

async function generate() {
    if (isAnimating) return; // Ignore clicks while animating

    isAnimating = true; // Mark animation as active

    try {
        // Fade out
        husk.style.opacity = 0;
        await new Promise(resolve => setTimeout(resolve, animationTime)); // Wait for fade-out

        // Fetch and update text
        const response = await fetch(`data/${fileName}.json`);
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
    generateDropdown.classList.add("active");
    task = "";
    isAnimating = false;
    clickerStuff.style.display = "none";
}

function websiteTabSwitch() {
    resetActiveAll()
    task = "generate";
    fileName = "websiteideas";
    everythingButton.innerText = "Generate a web idea";
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

function tipsTabSwitch() {
    resetActiveAll()
    task = "generate";
    fileName = "tips";
    everythingButton.innerText = "Generate a tip";
}


function everythingButtonPlay() {  // when "Play" tab is clicked
    husk.innerText = "";
    resetTabStyle();
    everythingButton.innerText = "Let's . . .";
    playDropdown.classList.add("active")
    task = "";
    isAnimating = false;
    clickerStuff.style.display = "none";
}

let drawingInitialized = false;

function drawTabSwitch() {
    resetActiveAll()
    task = "play";
    game = "draw";
    drawingInitialized = false;
    everythingButton.innerText = "Clear";
    play();
};

drawArea.width  = window.innerWidth;    // todo dynamic display
drawArea.height = window.innerHeight - 60;
// Move these functions outside of the `play` function
let paint = false;
let colour = "white";

function painting(e) {
    paint = true;
    const context = drawArea.getContext("2d");
    context.beginPath(); // Begin a new path for drawing
}

function finish(e) {
    paint = false; // Stop painting when the mouse is released
}

function draw(e) {
    if (!paint) return; // Don't draw unless mouse is pressed
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    
    const context = drawArea.getContext("2d");
    context.strokeStyle = colour; // Set the drawing color
    context.lineWidth = 5;
    context.lineCap = "round";
    
    context.lineTo(x, y); // Draw a line to the current mouse position
    context.stroke();
}

function clickerTabSwitch() {
    resetActiveAll()
    task = "play";
    game = "click";
    husk.style.opacity = 1;
    everythingButton.innerText = "Gather clicks!";
    play();
};

let clicks = 0;
let CPC = 1; // clicks per click
let CPS = 0; // clicks per second

function everythingButtonPLACEHOLDER1() {  // when "PLACEHOLDER1" tab is clicked
    husk.innerText = "";
    resetTabStyle();
    everythingButton.innerText = "PLACEHOLDER1";
    const PLACEHOLDER1Dropdown = document.getElementById("PLACEHOLDER1Dropdown");
    PLACEHOLDER1Dropdown.classList.add("active")
    task = "";
    isAnimating = false;
    clickerStuff.style.display = "none";
}

function everythingButtonPLACEHOLDER2() {  // when "PLACEHOLDER2" tab is clicked
    husk.innerText = "";
    resetTabStyle();
    everythingButton.innerText = "PLACEHOLDER2";
    const PLACEHOLDER2Dropdown = document.getElementById("PLACEHOLDER2Dropdown");
    PLACEHOLDER2Dropdown.classList.add("active")
    task = "";
    isAnimating = false;
    clickerStuff.style.display = "none";
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
    // spaghetti starts here, whenever you switch a tab it disables drawing, i don't feel like doing it in a better way
    drawingInitialized = false;
    drawArea.removeEventListener("mouseup", finish);
    drawArea.removeEventListener("mousemove", draw);
    drawArea.removeEventListener("mousedown", painting); 
};


function resetActiveAll() { // makes all dropdowns appear not clicked in   |  after some time this is gonna be the spaghetti nest
    generateDropdown.classList.remove("active"),
    playDropdown.classList.remove("active"),
    PLACEHOLDER1Dropdown.classList.remove("active"),
    PLACEHOLDER2Dropdown.classList.remove("active"),
    // spaghetti starting here, when switching tabs, clicker will disappear
    updateVolume() ;  
}

// Define clearContent() outside the play function for global access
function clearContent() {    
    const context = drawArea.getContext("2d");
    context.clearRect(0, 0, drawArea.width, drawArea.height); // Clear the canvas
}

updateVolume();

function play() {
    if (!drawingInitialized && game == "draw") {  // Check if drawing hasn't been initialized
        drawingInitialized = true;  // Set the flag to true to prevent re-initialization

        // Add event listeners
        drawArea.addEventListener("mouseup", finish);
        drawArea.addEventListener("mousemove", draw);
        drawArea.addEventListener("mousedown", painting);
    } else if (drawingInitialized && game == "draw") {
        clearContent(); // Clear the canvas when reactivating
        drawArea.width  = window.innerWidth;    // very scuffed dynamic resize
        drawArea.height = window.innerHeight - 60;
    }

    if (game == "click") {
        document.getElementById("clickerStuff").style.display = "flex";
        husk.innerText = `Clicks: ${clicks}`;
        clicks += CPC;
    }
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