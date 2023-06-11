const imgUrl =
  "https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/external-Samurai-japan-icongeek26-linear-colour-icongeek26.png";
class Game {
  constructor(winCount, player, playerTwo) {
    this.winCount = winCount;
    this.player = player;
    this.playerTwo = playerTwo;
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
    img.src = imgUrl;
    img.style.width = "100%";
    img.style.height = "100%";
    img.classList.add("img-face");

    setInterval(() => {
      let random = Math.floor(Math.random() * cells.length);
      cells[random].appendChild(img);
      cells[random].style = "border:2px solid #f1a825";
    }, interval);
  }
  hit() {
    const field = document.querySelector(".playing-Field-container");
    let countPlayer = 0;
    let playerTwo = 0;
    ///шкала жизни
    let samuraiWidth = document.querySelector(".samurai");
    let badSamuraiWidth = document.querySelector(".bad-samurai");
    let samuraiWidthNum = parseInt(samuraiWidth.style.width);
    let badSamuraiWidthNum = parseInt(badSamuraiWidth.style.width);
    //
    field.addEventListener("click", (event) => {
      event.preventDefault();
      let theTarget = event.target;

      if (theTarget.classList.contains("img-face")) {
        ++countPlayer;

        badSamuraiWidthNum += 10;
        samuraiWidthNum -= 10;
        badSamuraiWidth.style.width = badSamuraiWidthNum + "%";
        samuraiWidth.style.width = samuraiWidthNum + "%";
      }
      if (!theTarget.classList.contains("img-face")) {
        ++playerTwo;

        badSamuraiWidthNum -= 10;
        samuraiWidthNum += 10;
        badSamuraiWidth.style.width = badSamuraiWidthNum + "%";
        samuraiWidth.style.width = samuraiWidthNum + "%";
      }
      if (countPlayer == this.winCount) {
        this.win(this.player);
        badSamuraiWidth.style.width = 50 + "%";
        samuraiWidth.style.width = 50 + "%";
      }
      if (playerTwo == this.winCount) {
        this.win(this.playerTwo);
        playerTwo = 0;
        countPlayer = 0;
        badSamuraiWidth.style.width = 50 + "%";
        samuraiWidth.style.width = 50 + "%";
      }
    });
  }
  win(name) {
    let winWrp = document.querySelector(".win-wrp");
    const winner = document.querySelector(".win-name");
    const btnReset = document.querySelector(".btn-reset");

    winner.textContent = `${name} Win`;
    winWrp.classList.add("hiden");
    // this.createdFaceAndGo(undefined, undefined, false)

    btnReset.addEventListener("click", (event) => {
      event.preventDefault();
      let theTarget = event.target;
      if (theTarget.classList.contains("btn-reset")) {
        winWrp.classList.remove("hiden");
        // this.createdFaceAndGo(undefined, undefined, true)
      }
    });
  }
}

let war = new Game(5, "Токугава", "Мосё");
war.citations();
war.createdFaceAndGo(imgUrl, 1000);
war.hit();
