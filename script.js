// Find elementerne i DOM'en
const startButton = document.querySelector(".play-button");
const guessButtons = document.querySelectorAll(".guess-button");
const randomNumberDisplay = document.querySelector(".number-output");

let min = 0;
let max = 100;
let computerGuess;

// Tilføj eventlistener til at starte spillet
startButton.addEventListener("click", startGame);

// Spillet er startet
function startGame() {
  // Nulstil gæt-intervallet sådan at spillet kan genstartes
  min = 0;
  max = 100;

  //Nustil classes på knapper, tekst og body
  document.querySelector("body").classList.remove("success");
  document.querySelector(".number-output").classList.remove("bounce");
  document.querySelector("#too-high").classList.remove("shake");
  document.querySelector("#too-low").classList.remove("shake");

  // Fjern .inactive class fra gætteknapperne
  guessButtons.forEach((button) => {
    button.classList.remove("inactive");
  });

  // Generér det første gæt fra computeren
  computerGuess = generateGuess(min, max);
  randomNumberDisplay.textContent = `Is it ${computerGuess}?`;

  // Deaktiver startknappen
  startButton.classList.add("inactive");
}

// Det første gæt fra computeren vil altid være 50 af logiske årsager.
function generateGuess(min, max) {
  return Math.floor((min + max) / 2);
}

// Alt efter hvordan brugeren klikker, vil computerGuess reguleres og lave et nyt max og min
guessButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const feedback = button.id;

    if (feedback === "too-high") {
      max = computerGuess - 1;
      document.querySelector("#too-high").classList.add("shake");
    } else if (feedback === "too-low") {
      min = computerGuess + 1;
      document.querySelector("#too-low").classList.add("shake");
    }

    computerGuess = generateGuess(min, max);
    randomNumberDisplay.textContent = `Is it ${computerGuess}?`;

    // Hvis computerens gæt er korrekt
    if (feedback === "just-right") {
      randomNumberDisplay.textContent = `I guessed it! It is ${computerGuess}.`;

      // Deaktiver gætteknapperne
      guessButtons.forEach((button) => {
        button.classList.add("inactive");
      });

      // Aktivér startknappen
      startButton.classList.remove("inactive");

      //Tilføj grøn baggrund
      document.querySelector("body").classList.add("success");

      //Tilføj success animation
      document.querySelector(".number-output").classList.add("bounce");
    }
  });
});
