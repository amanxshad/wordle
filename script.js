var height = 6; //number of guesses
var width = 5; //lenght of word

var row = 0; //current guess attempt
var col = 0; //current letter in the attempt

var gameover = false;
var word = "HIRED";

window.onload = function() {
  initialize();
}



// dark-light mode
const body = document.querySelector("body");
const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const tile = document.getElementsByClassName("tile");
const keyboard = document.getElementsByClassName("keyboard-row");
const toggle = document.getElementById("toggle");
toggle.addEventListener("click", function() {
  toggle.classList.toggle("active");
  body.classList.toggle("active");
  h1.classList.toggle("active");
  h2.classList.toggle("active");
  for (let i = 0; i < keyboard.length; i++) {
    keyboard[i].classList.toggle("active");
  }
  for (let l = 0; l < tile.length; l++) {
    tile[l].classList.toggle("active");
  }
});



//create game board
function initialize() {
  for (var r = 0; r < height; r++) {
    for (var c = 0; c < width; c++) {

      //<span id="0-0" class="tile">p<span>
      let tile = document.createElement("span");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.innerText = "";
      document.getElementById("board").appendChild(tile);
    }
  }



  //listen for keypress
  document.addEventListener("keyup", (e) => {
    if (gameover) return;

    if (e.code >= "KeyA" && e.code <= "KeyZ") {
      if (col < width) {
        let currTile = document.getElementById(row.toString() + "-" + col.toString());
        if (currTile.innerText == "") {
          currTile.innerText = e.code[3];
          col += 1;
        }
      }
    }

    //backspace functionality  
    else if (e.code == "Backspace") {
      if (col > 0 && col <= width) {
        col -= 1;
      }
      let currTile = document.getElementById(row.toString() + "-" + col.toString());
      currTile.innerText = "";
    }

    //Enter functionality  
    else if (e.code == "Enter" && col == width) {
      update();
      row += 1;
      col = 0;
    }

    //gameover
    if (!gameover && row == height) {
      gameover = true;
      document.getElementById("answer").innerText = word;
    }
  })




  // listen Onscreen keyborad click
  const keys = document.querySelectorAll('.keyboard-row button');

  keys.forEach(key => {
    key.addEventListener('click', function(e) {

      let buttonClicked = e.target.dataset.key;
      console.log(buttonClicked);

      //Del button functionality
      if (buttonClicked == "del") {
        if (col > 0 && col <= width) {
          col -= 1;
        }
        let currTile = document.getElementById(row.toString() + "-" + col.toString());
        currTile.innerText = "";
      }

      //Enter button functionality  
      else if (buttonClicked == "enter" && col == width) {
        update();
        row += 1;
        col = 0;
      }

      //display clicked alphabets onto span
      else if (col < width && buttonClicked != "enter") {
        let currTile = document.getElementById(row.toString() + "-" + col.toString());
        if (currTile.innerText == "") {
          currTile.innerText = e.target.innerText;
          col += 1;
        }
      }

    });
  });

}




//accept the guess and show its correctness
function update() {
  let correct = 0;
  for (let c = 0; c < width; c++) {
    let currTile = document.getElementById(row.toString() + "-" + c.toString());
    let letter = currTile.innerText;

    //is letter in correct position?
    if (word[c] == letter) {
      currTile.classList.add("correct");
      correct += 1;
    }//is letter in word?
    else if (word.includes(letter)) {
      currTile.classList.add("present");
    }// not in the word?
    else {
      currTile.classList.add("absent");
    }

    if (correct == width) {
      gameover = true;
    }
  }
}