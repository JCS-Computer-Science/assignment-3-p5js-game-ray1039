let randomNum;
let flies = [
];

function targetFlies() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            flies[i].targetX = player.posX
            flies[i].targetY = player.posY
            // if (flies.posX != flies.targetX && flies.posY != flies.targetY) {
            //     posX += velX;
            //     posY += velY;
            // }
            console.log(flies);
        }, 1000);
    }
}

function flyParade() {
    for (let i = 0; i < flies.length; i++) {
        flies[i].posY += flies[i].velY
        console.log(flies[i].posY);
        fill(255);
        circle(flies[i].posX, flies[i].posY, 5);
        if (flies[0].posY >= battleBox.posY + 100) {
            inBattle = false;
            disableUI = false;
        }
    }

}

function generateFlies() {
    flies = []
    for (let i = 0; i < 20; i++) {
        flies.push(flies[i] = { posX: canvasX / 2 + random(-100, 100), posY: battleBox.posY - 100 - random(0, 400), velY: 1 });
    }
}

