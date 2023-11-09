function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

let dog = jhund;

let container = document.getElementById("container");

function raceGen() {
    container.innerHTML = "";

    let imgWidth = 50;
    let imgHeight = 50;
    let yOffset = 22.5;

    for (let i = 0; i < Math.floor(Math.random() * 10 + 2); i++) {
        let img = document.createElement("img");
        img.id = "car" + (i + 1);
        img.src = "/images/car.png";
        img.alt = "Car " + (i + 1);
        img.style.position = "absolute";
        img.style.left = "3.5%";
        img.style.top = yOffset + i * 7.1 + "%";

        /* Använde mig av chatgpt då mitt förra försök av att modifiera färgen av car.png var misslyckande.
        Men förstår lite vad detta gör*/
        img.onload = function () { // img.onload eftersom att bilden måste ha laddat in för canvas att kunna rita, annars ritas en blank canvas
            let canvas = document.createElement("canvas"); //Skapar en canvas
            let ctx = canvas.getContext("2d"); //Skapar en rityta i 2d
            canvas.width = imgWidth; // den rityta som canvasen kommer arbeta på är i samma bredd som imgwidth
            canvas.height = imgHeight; // den rityta som canvasen kommer arbeta på är i samma höjd som imgheight
            ctx.drawImage(img, 0, 0, imgWidth, imgHeight); // har ritar den
            ctx.globalCompositeOperation = "source-in"; // har ingen aning vad detta är
            ctx.fillStyle = randomColor(); // har slumpar den färgen
            ctx.fillRect(0, 0, canvas.width, canvas.height); // har fyller den ritningen för att få en komplett bild
            img.onload = null; // Så att den inte ändrar färg om och om igen
            img.src = canvas.toDataURL(); // har byter den från canvas till img
            container.appendChild(img);
        }
    }
}

