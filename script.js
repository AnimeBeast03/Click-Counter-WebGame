// geting references
const counter = document.getElementById("counter");
const clickBtn = document.getElementById("click");
const resetBtn = document.getElementById("reset");
const msg = document.getElementById("msg");



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
        // give a popup effect to the counter
        counter.animate([
            { fontSize: "50vw", top: "5vh" },
            { fontSize: "60vw", top: "0vh" },
            { fontSize: "50vw", top: "5vh" }
        ], {
            duration: 250
        });
        checkClickTime();
        update();
    }
    else {
        msg.style.display = "block";
        msg.textContent = "Limit Reached";
    }
});



//when reset button is pressed
resetBtn.addEventListener("pointerdown",function() {
    count = 0;
    counter.textContent = count;
    resetBtn.style.display = "none";
    msg.style.display = "none";
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



// update counter and change text color every on 10th count
function update() {
    count+=1;
    counter.textContent = count;
    resetBtn.style.display = "block";
    if (Number.isInteger(count/colorChangeAt)) {
        var r = Math.floor(Math.random()*226);
        var g = Math.floor(Math.random()*226);
        var b = Math.floor(Math.random()*226);
        counter.style.color = "rgb(" + r + "," + g + "," + b + ")";
    }
}
