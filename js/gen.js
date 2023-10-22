function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}


let container = document.getElementById("container");

function raceGen() {
    container.innerHTML = "";

    let imgWidth = 50;
    let imgHeight = 50;
    let yOffset = 22.5;
    document.querySelector('.genRace').style.display = 'none';
    document.querySelector('.startRace').style.display = 'inline-block';

    for (let i = 0; i < Math.floor(Math.random() * 10 + 2); i++) {
        let img = document.createElement("img");
        let btn = document.createElement("button")
        
        //Button
        btn.textContent = `Bet on car ${i + 1}`;
        btn.id = "btnthing"
        btn.style.backgroundColor = "#444444";
        btn.style.color = "white";
        btn.style.padding = "10px 24px";
        btn.style.fontSize = "14px";
        btn.style.border = "none";
        btn.style.cursor = "pointer";
        btn.style.borderRadius = "3px";
        btn.style.position = "absolute";
        btn.style.left = 90 + "%"
        btn.style.top = 0.25 + yOffset + i * 7.1 + "%";
        //Image
        img.id = "car" + (i + 1);
        img.src = "/images/car.png";
        img.alt = "Car " + (i + 1);
        img.style.position = "absolute";
        img.style.left = "3.5%";
        img.style.top = yOffset + i * 7.1 + "%";
        container.appendChild(btn)

        
        img.onload = function () { // img.onload eftersom att bilden måste ha laddat in för canvas att kunna rita, annars ritas en blank canvas
        /* Använde mig av chatgpt då mitt förra försök av att modifiera färgen av car.png var misslyckande.
        Men förstår lite vad detta gör*/
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

