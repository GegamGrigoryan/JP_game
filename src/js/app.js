const imgUrl =
  "https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/external-Samurai-japan-icongeek26-linear-colour-icongeek26.png";
class Game {
  constructor(winCount, playerOneName, playerTwoName) {
    this.winCount = winCount;
    this.playerOneName = playerOneName;
    this.playerTwoName = playerTwoName;

    this.countPlayerOne = 0;
    this.playerCountTwo = 0;

    this.samuraiWidth = document.querySelector(".samurai");
    this.badSamuraiWidth = document.querySelector(".bad-samurai");
    this.samuraiWidthNum = parseInt(this.samuraiWidth.style.width);
    this.badSamuraiWidthNum = parseInt(this.badSamuraiWidth.style.width);
  }

  citations(citations) {
    this.citations = citations;
    citations = [
      ["Не осознав, кто ты есть, невозможно стать самураем."],
      [
        "Оружие самурая не меч, но его дух, растворённый в пустоте. (вокруг, воздухе, ветре.)",
      ],
      ["Не нужно ждать все время смерти. Нужно считать, что ты уже мертв."],
      ["Катана самурая покоится не в ножнах. Она в его душе."],
      ["Меч, даже уроненный со скалы, может убить, прежде чем коснется земли."],
    ];
    const h = document.querySelector("h2");
    let i = 0;
    h.textContent = citations[i];
    setInterval(() => {
      if (i == citations.length) {
        i = 0;
      }
      h.textContent = citations[i++];
    }, 2000);
  }

  createdFaceAndGo(imgUrl, interval) {
    const cells = document.querySelectorAll(".cell");
    let img = document.createElement("img");

    img.style.width = "100%";
    img.style.height = "100%";
    img.classList.add("img-face");

    this.timer = null;
    this.timerFlag = true;

    if (this.timerFlag === true) {
      this.timer = setInterval(fn, interval);
    }
    if (this.timerFlag === false) {
      clearInterval(this.timer);
      this.timerFlag = true;
    }

    function fn() {
      let winWrp = document.querySelector(".win-wrp");
      let imgNoHit = document.createElement("img");
      imgNoHit.src = "https://img.icons8.com/color/2x/fa314a/geisha.png";
      imgNoHit.style.width = "100%";
      imgNoHit.style.height = "100%";
      imgNoHit.classList.add("img-face-no-hit");

      let random = Math.floor(Math.random() * cells.length);
      let randomNohit = Math.floor(Math.random() * cells.length);
      if (random == randomNohit) {
        img.src = "https://img.icons8.com/color/2x/fa314a/geisha.png";
        img.classList.add("img-face-no-hit");
      } else {
        img.src = imgUrl;
        img.classList.remove("img-face-no-hit");
      }
      cells[random].appendChild(img);
      cells[random].style = "border:2px solid #f1a825";
    }
  }
  hit() {
    const field = document.querySelector(".playing-Field-container");

    field.addEventListener("click", (event) => {
      event.preventDefault();
      let theTarget = event.target;
      let img = document.querySelector(".img-face");

      if (theTarget.classList.contains("img-face")) {
        ++this.countPlayerOne;

        theTarget.parentElement.style = "border:1px solid black";
        this.timerFlag = false;
        theTarget.parentElement.removeChild(img);

        this.badSamuraiWidthNum -= 10;
        this.samuraiWidthNum += 10;
        this.badSamuraiWidth.style.width = this.badSamuraiWidthNum + "%";
        this.samuraiWidth.style.width = this.samuraiWidthNum + "%";
      }
      if (!theTarget.classList.contains("img-face")) {
        ++this.playerCountTwo;

        this.badSamuraiWidthNum += 10;
        this.samuraiWidthNum -= 10;

        this.badSamuraiWidth.style.width = this.badSamuraiWidthNum + "%";
        this.samuraiWidth.style.width = this.samuraiWidthNum + "%";
      }
      if (theTarget.classList.contains("img-face-no-hit")) {
        this.win(this.playerOneName);
        const btnReset = document.querySelector(".btn-reset");
        btnReset.textContent = "Пострадал мирный житель";
      }
      if (this.countPlayerOne == this.winCount) {
        this.win(this.playerOneName);
        this.playerCountTwo = 0;
        this.countPlayerOne = 0;
        this.badSamuraiWidth.style.width = 50 + "%";
        this.samuraiWidth.style.width = 50 + "%";
        this.badSamuraiWidthNum = 50;
        this.samuraiWidthNum = 50;
      }
      if (this.playerCountTwo == this.winCount) {
        this.win(this.playerTwoName);
        this.playerCountTwo = 0;
        this.countPlayerOne = 0;
        this.badSamuraiWidth.style.width = 50 + "%";
        this.samuraiWidth.style.width = 50 + "%";
        this.badSamuraiWidthNum = 50;
        this.samuraiWidthNum = 50;
      }
    });
  }
  win(name) {
    let winWrp = document.querySelector(".win-wrp");
    const winner = document.querySelector(".win-name");
    const btnReset = document.querySelector(".btn-reset");

    winner.textContent = `${name} Win`;
    winWrp.classList.add("hiden");
    const cells = document.querySelectorAll(".cell");

    btnReset.addEventListener("click", (event) => {
      event.preventDefault();
      let theTarget = event.target;
      if (theTarget.classList.contains("btn-reset")) {
        winWrp.classList.remove("hiden");
        cells.forEach((el) => (el.style = "border:1px solid black"));
        this.countPlayerOne = 0;
        this.playerCountTwo = 0;
        this.badSamuraiWidth.style.width = 50 + "%";
        this.samuraiWidth.style.width = 50 + "%";
      }
    });
  }
}

let war = new Game(5, "Токугава", "Мосё");
war.citations();
war.createdFaceAndGo(imgUrl, 1000);
war.hit();
