let numSquares = 6;
let colors = [];
let pickedColor = pickColor();
let squares = document.querySelectorAll(".square");
let colorDisplay = document.getElementById("colorDisplay");
let messageDisplay = document.querySelector("#message");
let h1 = document.querySelector("h1");
let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode");

init();

function init() {
    //mode buttons
    setModeButtons();
    //sets up square listeners
    setSquareListeners();
    reset();
}

resetButton.addEventListener("click", function () {
    reset();
})

function setSquareListeners() {
    for (let i = 0; i < squares.length; i++) {
        //add click listeners
        squares[i].addEventListener("click", function () {
            //grab color of clicked square
            let clickedColor = this.style.backgroundColor;
            //compare to pickedColor
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                changeColors(clickedColor);
                resetButton.textContent = "Play Again?";
                h1.style.backgroundColor = clickedColor;
            }
            else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        })
    }
}

function setModeButtons() {
    for (let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            if (this.textContent === "Easy") {
                numSquares = 3;
            }
            else {
                numSquares = 6;
            }
            reset();
        })
    }
}


function reset() {
    //generate new colors
    colors = generateRandomColors(numSquares);
    //pick random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked color
    colorDisplay.textContent = pickedColor;
    //reset message to nothing
    messageDisplay.textContent = "";
    //reset the play again text to new colors
    resetButton.textContent = "New Colors";
    //change colors of squares
    for (let i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        }
        else {
            squares[i].style.display = "none";
        }
    }
    //set heading back to default blue color
    h1.style.background = "steelblue";
}


function changeColors(color) {
    //loop through all squares
    for (let i = 0; i < squares.length; i++) {
        //change each color to match given color
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    //Math.floor rounds off decimals. This generates a random number between 0-colors.length
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    //make an array
    let arr = [];
    //add num random colors to array
    for (let i = 0; i < num; i++) {
        //get random color and push into colors array
        arr.push(randomColor());
    }
    //return array
    return arr;
}


function randomColor() {
    //pick a red from 0-255
    let r = Math.floor(Math.random() * 256);
    //pick a green from 0-255
    let g = Math.floor(Math.random() * 256);
    //pick a blue from 0-255
    let b = Math.floor(Math.random() * 256);
    //rgb(r, g, b)
    return "rgb(" + r + ", " + g + ", " + b + ")";
}