// references
var counter = document.getElementById("counter");
var clickBtn = document.getElementById("click");
var resetBtn = document.getElementById("reset");
var msg = document.getElementById("msg");

// variables
var lastClick = 0;
var freshClick = 0;
var clickTime = 200; // miliseconds
var count = 0;
var maxCount = 20;
var colorChangeAt = 10;

// starting game state
counter.textContent = count;
resetBtn.style.display = "none";
msg.style.display = "none";

// when click button is pressed
clickBtn.addEventListener("click",function() {
  if (count < maxCount) {
    checkClickTime();
    update();
  } else {
    msg.style.display = "block";
    msg.textContent = "Limit Reached";
  }
});
//when reset button is pressed
resetBtn.addEventListener("click",function() {
  count = 0;
  counter.textContent = count;
  resetBtn.style.display = "none";
  msg.style.display = "none";
});

// check time between two clicks and shiw fire
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
// update count and change color after every 10th count
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


