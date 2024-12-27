let carStart = new Audio('audio/carStart.mp3');
let carrun = new Audio('audio/carrun.mp3');
let music = new Audio('audio/music.mp3');
let updown = new Audio('audio/updown.mp3');
let gameover = new Audio('audio/gameover.mp3');
let finishgame = new Audio('audio/finishgame.mp3');
let lesstimeleft = new Audio('audio/lesstimeleft.mp3');
let carBreak = new Audio('audio/carBreak.mp3');
let coin = new Audio('audio/coin.mp3');
let wrongword = new Audio('audio/wrongword.mp3')
const typingText = document.querySelector(".typing-text p"),
  inpField = document.querySelector(".input-field"),
  timeTag = document.querySelector(".time span b"),
  wpmTag = document.querySelector(".wpm span"),
  bordColor = document.querySelector(".start-bord-text"),
  wheel1 = document.querySelector(".wheel1 img"),
  wheel2 = document.querySelector(".wheel2 img"),
  building = document.querySelector(".tree"),
  play = document.querySelector(".play"),
  player1 = document.querySelector(".car"),
  players = document.querySelector(".players"),
  coinCount = document.querySelector(".coin span"),
  redCar = document.querySelector('.otherCar1'),
  blueCar = document.querySelector('.otherCar2'),
  yellowCar = document.querySelector('.otherCar3'),
  nextBtn = document.querySelector(".next-btn"),
  instruction = document.querySelector(".instruction"),
  Game = document.querySelector(".game"),
  result = document.querySelector(".result-box"),
  Replay_btn = document.querySelector(".Replay-btn"),
  result_wpm = document.querySelector('.result-wpm span'),
  result_TimeTaken = document.querySelector('.result-TimeTaken span'),
  result_Correct = document.querySelector('.result-Correct span'),
  result_CorrectWord = document.querySelector('.result-CorrectWord span')
result_Coin = document.querySelector('.result-Coin span')

let p = 0,
  groundSize = 3000;
let charIndex = 0;
let timer,
  maxTime = 60,
  timeleft = maxTime, isTyping, CorrectWord = 0;
let coins = 0;
var a = 450;
var b = 40;
let image = document.createElement("img");
image.setAttribute("src", "images/coin.png");
image.setAttribute("class", "coin1");
image.style.position = "absolute";
image.style.left = a + "px";
image.style.top = b + "px";
players.appendChild(image);
let coin1 = document.querySelector(".coin1");
function randmParagraph() {
  let paragraphs = [pera1, pera2, pera3, pera4, pera5, pera6, pera7, pera8, pera9, pera10]
  const ranIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "=>";
  paragraphs[ranIndex].split("").forEach(char => {
    let span = `<span>${char}</span>`
    typingText.innerHTML += span;
  });
  typingText.querySelectorAll("span")[0].classList.add("active");

}
function initTyping() {
  let characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];
  if (charIndex < characters.length) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;

    }
    if (characters[charIndex].innerText === typedChar) {
      characters[charIndex].classList.add("correct");
      if (typedChar == " ") {
        CorrectWord++;
        wheel1.classList.add("Running")
        wheel2.classList.add("Running")
        play.style.width = groundSize + 100 + "px"
        building.style.width = groundSize + 100 + "px"
        groundSize += 100;
        move(p, p + 100);
        p += 100;
        let top = parseInt(window.getComputedStyle(player1).getPropertyValue("top"))
        let left = parseInt(window.getComputedStyle(player1).getPropertyValue("left"))
        let val = Math.abs(top - b);
        if ((left - 60) == a && (top == b || ((top < b) && (val <= 30)) || ((top > b) && (val <= 10)))) {
          coins++;
          coin.play();
          coinCount.innerHTML = coins;
          coin1.style.display = "none";
          result_Coin.innerHTML = coins;
          setTimeout(regenerateCoin, 2000)
        }
        else if ((left - 260) == a) {
          setTimeout(regenerateCoin, 2000)

        }
        function regenerateCoin() {
          let arr = [0, 10, 30, 50, 70, 90, 120, 110, 130, 140]
          a = a + 800;
          b = arr[Math.floor(Math.random() * arr.length)]
          coin1.style.left = a + "px";
          coin1.style.top = b + "px";
          coin1.style.display = "block";
        }
        let blueCarA = parseInt(window.getComputedStyle(blueCar).getPropertyValue("top"));
        let blueCarB = parseInt(window.getComputedStyle(blueCar).getPropertyValue("left"));
        if (top > blueCarA) {
          player1.style.zIndex = 999;
          blueCar.style.zIndex = 100;
        }
        if (((left + 90) == blueCarB) && ((top == blueCarA))) {
          carBreak.play();
          blueCar.style.left = blueCarB + 2000 + "px";
        }
        else if ((left - 210) == blueCarB) {
          blueCar.style.left = blueCarB + 2000 + "px";
          let arr = [0, 10, 30, 50, 70, 90, 120, 110];
          let t = arr[Math.floor(Math.random() * arr.length)]
          blueCar.style.top = t + "px";
        }
        let redCarA = parseInt(window.getComputedStyle(redCar).getPropertyValue("top"))
        let redCarB = parseInt(window.getComputedStyle(redCar).getPropertyValue("left"))
        if (top > redCarA) {
          player1.style.zIndex = 999;
          redCar.style.zIndex = 100;
        }

        if (((left + 90) == redCarB) && ((top == redCarA))) {
          carBreak.play();
          redCar.style.left = redCarB + 2000 + "px"
        }
        else if ((left - 210) == redCarB) {
          redCar.style.left = redCarB + 2000 + "px"
          let arr = [0, 10, 30, 50, 70, 90, 120, 110];
          let t = arr[Math.floor(Math.random() * arr.length)]
          redCar.style.top = t + "px";
        }
        let yellowCarA = parseInt(window.getComputedStyle(yellowCar).getPropertyValue("top"))
        let yellowCarB = parseInt(window.getComputedStyle(yellowCar).getPropertyValue("left"))

        if (top > yellowCarA) {
          player1.style.zIndex = 999;
          yellowCar.style.zIndex = 100;
        }
        if (((left + 90) == yellowCarB) && ((top == yellowCarA))) {
          carBreak.play();
          yellowCar.style.left = yellowCarB + 2000 + "px"
        }
        else if ((left - 210) == yellowCarB) {
          yellowCar.style.left = yellowCarB + 2000 + "px"
          let arr = [0, 10, 30, 50, 70, 90, 120, 110];
          let t = arr[Math.floor(Math.random() * arr.length)]
          yellowCar.style.top = t + "px";
        }
      }

      else {
        wheel1.classList.remove("Running")
        wheel2.classList.remove("Running")
      }
    }
    else {
      wrongword.play();
      characters[charIndex].classList.add("incorrect");
      inpField.value = inpField.value.slice(0, -1);
      charIndex--;
    }
    charIndex++;

    characters.forEach(span => span.classList.remove("active"));
    characters[charIndex].classList.add("active");
    result_Correct.innerHTML = charIndex;
    result_CorrectWord.innerHTML = CorrectWord;
  }
  else {
    music.pause();
    lesstimeleft.pause();
    finishgame.play();
  }
}
function resetGame() {
  location.reload();
}
inpField.addEventListener("input", initTyping)
Replay_btn.addEventListener('click', resetGame)
function initTimer() {
  if (timeleft > 0) {
    if (timeleft < 12) {
      lesstimeleft.play();
      timeTag.classList.add("lesstimeleft")
    }
    timeleft--;
    timeTag.innerText = timeleft;
    let wpm = Math.round((CorrectWord / (maxTime - timeleft)) * 60);
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    wpmTag.innerText = wpm;
    result_wpm.innerHTML = wpm

  }
  else {
    clearInterval(timer);
    Game.style.display = "none";
    result.style.display = "flex";
    music.pause();
    gameover.play();
    lesstimeleft.pause();
  }
  result_TimeTaken.innerHTML = 60 - timeleft + "Sec"
}
function set() {
  bordColor.style.backgroundColor = "yellow";
}
function go() {
  bordColor.style.backgroundColor = "green";
  music.play();
  music.loop = true;


}

window.onkeydown = function (event) {
  if (event.which == 8) {
    event.preventDefault();
  }
}
function move(p, max) {
  anim = setInterval(animate, 20);
  function animate() {
    if (p > max) { }
    else {
      p += 10;
      carrun.play();
      building.style.left = -p + "px"
      play.style.left = -p + "px"
      player1.style.left = p + "px"
      player1.style.marginLeft = -100 + "px"
    }
  }
}
function movetop() {
  updown.play();
  let top = parseInt(window.getComputedStyle(player1).getPropertyValue("top"))
  top -= 10;
  if (top > -10) {
    player1.style.top = top + "px";
  }
}
function movebottom() {
  updown.play();
  let top = parseInt(window.getComputedStyle(player1).getPropertyValue("top"))
  top += 10;
  if (top < 130) {
    player1.style.top = top + "px";
  }
}
document.addEventListener("keydown", event => {
  if (event.key === "ArrowUp") { movetop(); }
  if (event.key === "ArrowDown") { movebottom(); }
})
nextBtn.addEventListener("click", () => {
  carStart.play();
  setTimeout(set, 1000);
  setTimeout(go, 2000);
  instruction.style.display = "none";
  Game.style.display = "block";

  setTimeout(randmParagraph, 2000);
})
