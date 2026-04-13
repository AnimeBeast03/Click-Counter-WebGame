// geting references
const counter = document.getElementById("counter");
const clickBtn = document.getElementById("click");
const resetBtn = document.getElementById("reset");
const msg = document.getElementById("msg");
const progressBarBase = document.getElementById("progressBarBase");
const progressBarTop = document.getElementById("progressBarTop");



// game configurations
let count = 0;
let maxCount = 200;
let colorChangeAt = 10;
let clickTime = 200;
// other required variables
let lastClick = 0;
let freshClick = 0;



// starting game status
counter.textContent = count;
resetBtn.style.display = "none";
msg.style.display = "none";



// when click button is pressed
clickBtn.addEventListener("pointerdown",function() {
    if (count < maxCount) {
        doPopup();
        checkClickTime();
        updateCount();
        updateBar();
    }
});



//when reset button is pressed
resetBtn.addEventListener("pointerdown",function() {
    count = 0;
    counter.textContent = count;
    resetBtn.style.display = "none";
    msg.style.display = "none";
    updateBar();
});



// check time between two clicks and show fire emoji
function checkClickTime() {
    freshClick = Date.now();
    if (freshClick - lastClick < clickTime) {
        msg.style.display = "block";
        msg.textContent = String.fromCodePoint(0x1F525);
    } else {
        msg.style.display = "none";
    }
    lastClick = freshClick;
}



// update counter and change text color every on nth count
function updateCount() {
    count+=1;
    counter.textContent = count;
    resetBtn.style.display = "block";
    if (Number.isInteger(count/colorChangeAt)) {
        var r = Math.floor(Math.random()*226);
        var g = Math.floor(Math.random()*226);
        var b = Math.floor(Math.random()*226);
        counter.style.color = "rgb(" + r + "," + g + "," + b + ")";
    }
    if (count >= maxCount) {
        msg.style.display = "block";
        msg.textContent = "Limit Reached";
    }
}



// update the progress bar
function updateBar() {
    let persentCount = (count/maxCount)*100;
    let baseWidth = Math.trunc((progressBarBase.offsetWidth/window.innerWidth)*100);
    let topWidth = baseWidth*(persentCount/100);
    progressBarTop.style.width = topWidth + "vw";
}



// give a popup effect to the counter
function doPopup() {
    if (window.innerWidth >= 967) {
        counter.animate([
            { fontSize: "10vw", top: "-10vh" },
            { fontSize: "13vw", top: "-18vh" },
            { fontSize: "10vw", top: "-10vh" }
        ], {
            duration: 250
        });
    } else {
        counter.animate([
            { fontSize: "50vw", top: "5vh" },
            { fontSize: "60vw", top: "0vh" },
            { fontSize: "50vw", top: "5vh" }
        ], {
            duration: 250
        });
    }
}
