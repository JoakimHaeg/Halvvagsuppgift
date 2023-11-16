let amountBet;
function formsub(event) {
    event.preventDefault();
    amountBet = document.getElementById('amountBet').value;
    let amountInput = document.getElementById('amountBet');
    if (amountBet <= 0) {
        amountInput.placeholder = "Please enter a valid number: > 0";
        amountInput.value = "";
        console.log("test");
    } else {
        amountBet = Math.round(parseFloat(amountBet));
        console.log(amountBet, carbet);
        let balElement = document.querySelector('.balance-bal');
        let currentBalance = parseFloat(balElement.textContent)
        let newBalance = currentBalance - amountBet
        balElement.textContent = newBalance
        document.querySelector('.betting').style.display = 'none'
        document.querySelector('.startRace').style.display = 'inline-block';
    }
}