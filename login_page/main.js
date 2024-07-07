document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const emailInput = document.querySelector("input[type='email']");
    const passwordInput = document.querySelector("input[type='password']");
    const gameSection = document.getElementById("game-section");
    const gameMessage = document.getElementById("game-message");
    const guessInput = document.getElementById("guess-input");
    const guessButton = document.getElementById("guess-button");
    const gameResult = document.getElementById("game-result");
    const playAgainButton = document.getElementById("play-again");

    let randomNumber;
    let attempts;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = emailInput.value;
        const password = passwordInput.value;

        if (validateEmail(email) && validatePassword(password)) {
            // Hide login form and show game section
            form.style.display = "none";
            gameSection.style.display = "block";
            startGame();
        } else {
            alert("Invalid email or password");
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePassword(password) {
        // Add your password validation logic here
        return password.length >= 6;
    }

    function startGame() {
        randomNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        gameResult.textContent = "";
        guessInput.value = "";
        playAgainButton.style.display = "none";
    }

    guessButton.addEventListener("click", () => {
        const guess = parseInt(guessInput.value, 10);
        attempts++;
        if (isNaN(guess) || guess < 1 || guess > 100) {
            gameResult.textContent = "Please enter a number between 1 and 100.";
        } else if (guess === randomNumber) {
            gameResult.textContent = `Congratulations! You guessed the number in ${attempts} attempts.`;
            playAgainButton.style.display = "block";
        } else if (guess < randomNumber) {
            gameResult.textContent = "Too low! Try again.";
        } else {
            gameResult.textContent = "Too high! Try again.";
        }
    });

    playAgainButton.addEventListener("click", startGame);
});

