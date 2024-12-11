let isAnimating = false; // Prevent multiple simultaneous animations
const animationTime = 700; // Miliseconds
let fileName = "";
let task = "";
let clickSfx = new Audio("/assets/sfx/clickSfx.mp3");
clickSfx.volume = 0.3;
const everythingButton = document.getElementById("everythingButton");

document.querySelectorAll(".clickable").forEach(element => {
    element.addEventListener("click", () => {
        clickSfx.pause();
        clickSfx.currentTime = 0;

        clickSfx.play().catch(err => console.error("Audio play failed:", err));
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {
        alignment: 'left',
        closeOnClick: true, // Close the dropdown when an option is selected
        coverTrigger: false,
    });
});

async function generate() {
    if (isAnimating) return; // Ignore clicks while animating

    isAnimating = true; // Mark animation as active
    const husk = document.getElementById("insert");

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
        husk.innerText = "Choose an option first";
        husk.style.opacity = 1; // Ensure visibility
    } finally {
        isAnimating = false; // Allow new animations
    }
};

function everythingButtonGenerate() {
    everythingButton.innerText = "Generate";
    task = "none";
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

function websiteTabSwitch() {
    task = "generate";
    resetTabStyle(); // Reset styles for all tabs
    const websiteTabButton = document.getElementById("WebsiteIdeasTab");
    websiteTabButton.classList.add("active");
    fileName = "websiteIdeas";
    everythingButton.innerText = "Generate a website idea";
};

function jokesTabSwitch() {
    task = "generate";
    resetTabStyle(); // Reset styles for all tabs
    const jokesTabButton = document.getElementById("JokesTab");
    jokesTabButton.classList.add("active");
    fileName = "jokes";
    everythingButton.innerText = "Generate a joke";
};

function quotesTabSwitch() {
    task = "generate";
    resetTabStyle(); // Reset styles for all tabs
    const quotesTabButton = document.getElementById("QuotesTab");
    quotesTabButton.classList.add("active");
    fileName = "quotes";
    everythingButton.innerText = "Generate a quote";
};

function questionsTabSwitch() {
    task = "generate";
    resetTabStyle(); // Reset styles for all tabs
    const questionsTabButton = document.getElementById("QuestionsTab");
    questionsTabButton.classList.add("active");
    fileName = "questions";
    everythingButton.innerText = "Generate a question";
};

function resetTabStyle() {
    const tabs = document.querySelectorAll(".s3");
    tabs.forEach(tab => {
        tab.classList.remove("active"); // Remove the 'active' class
    });
};

function play() {
    return
}

function execute() {
    const husk = document.getElementById("insert");

    // Execute the corresponding tasks
    if (!fileName) {
        // If no fileName is set, notify the user
        husk.innerText = "Choose an option first";
        husk.style.opacity = 1; // Ensure it's visible
        return;
    }

    if (task === "generate") { generate(); } 
    else if (task === "play") { play(); }
}