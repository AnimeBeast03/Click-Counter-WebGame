// get html elements
const container = document.getElementsByClassName("container")[0];
const itemList = document.getElementsByClassName("item");



// game configurations (can be changed)
let startCount = 0;
let maxCount = 200;
let colorChangeAt = 10; // color changes every n clicks 
let clickDistance = 200; // time taken in mili-seconds between two clicks
// global game variables (can not be changed)
let actualCount = startCount;
let lastClick = 0;
const items = {};



// call game functions
stalkItems();
gameReset();
// make buttons functionable
items.clickBtn.addEventListener("pointerdown",handleButtonInput);
items.resetBtn.addEventListener("pointerdown",handleButtonInput);



// all functions
function stalkItems() {
    // store all items inside an object
    for (let i = 0; i < itemList.length; i++) {
        let name = itemList[i].dataset.name;
        items[name] = itemList[i];
    }
}
function gameReset() {
    // make the game ready to start (again)
    items.fire.style.visibility = "hidden";
    items.counter.textContent = actualCount;
    items.counter.style.color = "black";
    items.msg.style.visibility = "hidden";
    items.resetBtn.style.visibility = "hidden";
}
function handleButtonInput(event) {
    // click button functionability
    if (event.target.dataset.name == "clickBtn") {
        if (actualCount < maxCount) {
            actualCount++;
            items.counter.textContent = actualCount;
            items.resetBtn.style.visibility = "visible";
            if (Number.isInteger(actualCount/colorChangeAt)) {
                let r = Math.floor(Math.random()*226);
                let g = Math.floor(Math.random()*226);
                let b = Math.floor(Math.random()*226);
                items.counter.style.color = "rgb(" + r + "," + g + "," + b + ")";
            }
            makeCounterPopup();
            checkClickTime();
            updateProgressBar();
        } else {
            items.msg.style.visibility = "visible";
        }
    }
    // reset button functionability
    if (event.target.dataset.name == "resetBtn") {
        actualCount = startCount;
        gameReset();
        updateProgressBar();
    }
}
function makeCounterPopup() {
    // makes counter text popup a little
    items.counter.animate([
        { fontSize: "40cqw", top: "25%"},
        { fontSize: "60cqw", top: "15%"}
    ], {
        duration: 250
    });
}
function checkClickTime() {
    // check click timing and make fire visible accordingly 
    let freshClick = Date.now();
    if (freshClick - lastClick < clickDistance) {
        items.fire.style.visibility = "visible";
    } else {
        items.fire.style.visibility = "hidden";
    }
    lastClick = freshClick;
}
function updateProgressBar() {
    let percentage = (actualCount/maxCount)*100;
    items.progressbar.style.background = "linear-gradient(to right, red " + percentage + "%, lightgreen " + percentage + "%)";
}
