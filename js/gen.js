function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

let container = document.getElementById("container");
let carbet;
let raceInProgress = false;  // Declare raceInProgress in the global scope
let winner = null;

function raceGen() {
    container.innerHTML = "";

    let imgWidth = 50;
    let imgHeight = 50;
    let yOffset = 22.5;
    document.querySelector('.genRace').style.display = 'none';

    let carPositions = [];

    for (let i = 0; i < Math.floor(Math.random() * 10 + 2); i++) {
        let img = document.createElement("img");
        let btn = document.createElement("button");

        // Button
        btn.textContent = `Bet on car ${i + 1}`;
        btn.id = "btnbet" + (i + 1);
        btn.classList.add("bet-button");
        btn.style.backgroundColor = "#444444";
        btn.style.color = "white";
        btn.style.padding = "10px 24px";
        btn.style.fontSize = "14px";
        btn.style.border = "none";
        btn.style.cursor = "pointer";
        btn.style.borderRadius = "3px";
        btn.style.position = "absolute";
        btn.style.left = 87.5 + "%";
        btn.style.top = 0.25 + yOffset + i * 7.1 + "%";
        container.appendChild(btn);
        btn.addEventListener("click", function () {
            carbet = "car" + (i + 1);
            document.querySelector('.betting').style.display = 'flex';
        });

        // Image
        let imgId = "car" + (i + 1);
        img.id = imgId;
        img.src = "/images/car.png";
        img.alt = "Car " + (i + 1);
        img.style.position = "absolute";
        img.style.left = "3.5%";
        img.style.top = yOffset + i * 7.1 + "%";

        img.onload = function () {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            canvas.width = imgWidth;
            canvas.height = imgHeight;
            ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
            ctx.globalCompositeOperation = "source-in";
            ctx.fillStyle = randomColor();
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            img.onload = null;
            img.src = canvas.toDataURL();
        };

        // Track car positions
        carPositions.push({
            id: imgId,
            buttonId: "btnbet" + (i + 1),
            position: 0,
            speed: Math.random() * 2 + 1,
        });

        container.appendChild(img);
    }

    function animate() {
        if (raceInProgress) {
            carPositions.forEach(car => {
                car.position += car.speed;

                if (car.position >= container.clientWidth - imgWidth - 50) {
                    if (!winner) {
                        winner = car.id;
                        if (winner === carbet) {
                            document.querySelector('.winner').innerHTML = `Winner: ${winner} <br> you won ${amountBet * (carPositions.length)} sek`;
                        } else {
                            document.querySelector('.winner').innerHTML = `Winner: ${winner} <br> you lost ${amountBet} sek`;
                        }
                        
                        console.log(winner)
                        // Hide the buttons with the class 'bet-button'
                        let betButtons = document.querySelectorAll('.bet-button');
                        betButtons.forEach(button => {
                            // Check if the button corresponds to the winning car
                            if (carPositions.some(c => c.buttonId === button.id)) {
                                button.style.display = 'none';
                            }
                        });

                        raceInProgress = false;
                    }
                }

                let img = document.getElementById(car.id);

                // Check if the img element exists
                if (img) {
                    img.style.position = "absolute";
                    img.style.left = car.position + "px";
                    img.style.top = yOffset + carPositions.findIndex(c => c.id === car.id) * 7.1 + "%";
                }
            });

            requestAnimationFrame(animate);
        }
    }

    // Define raceStart in the global scope
    window.raceStart = function () {
        let betButtons = document.querySelectorAll('.bet-button');
        betButtons.forEach(button => {
            // Check if the button corresponds to the winning car
            if (carPositions.some(c => c.buttonId === button.id)) {
                button.style.display = 'none';
            }
        });
        document.querySelector('.startRace').style.display = 'none';
        raceInProgress = true;
        winner = null;
        animate();
    };
}
