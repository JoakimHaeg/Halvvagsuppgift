let betadded = document.getElementById("amountBet");

function raceStart() {
    if (betadded.value < 0.5) {
        betadded.value = null;
        betadded.placeholder = "Enter a valid number";
        betadded.classList.add("red-placeholder");
    } else {
        betadded.value = Math.round(betadded.value);
    }
}
