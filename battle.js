let randomNum;
let spawn;
let move;
let flies = [
];

function drawPlayer() {
    fill(color(255, 0, 0))
    noStroke();
    rect(player.posX, player.posY, player.sizeX, player.sizeY);
}

function drawBattleBox() {
    fill(0);
    strokeWeight(5);
    stroke(255);
    if (!inBattle) {
        battleBox.sizeX = 700
        rect(canvasX / 2, battleBox.posY, battleBox.sizeX, battleBox.sizeY);
    } else {
        battleBox.sizeX = 200;
        rect(canvasX / 2, battleBox.posY, battleBox.sizeX, battleBox.sizeY);
    }
}

//every 10s, the flies target the players position and go towards that position
//this happens 5 times
function targetFlies() {
    for (let i = 0; i < 5; i++) {
        console.log(flies[i].posX)
        circle(flies[i].posX, flies[i].posY, 8);
        let move = setInterval(() => {
            flies[i].posX = lerp(flies[i].posX, player.posX, 0.1);
            flies[i].posY = lerp(flies[i].posY, player.posY, 0.1);
        }, 1500);
        flies[i].collision(player);
        setTimeout(() => {
            inBattle = false;
            disableUI = false;
            inUI = false;
            fightUI = false;
            actUI = false;
            itemUI = false;
            fightUI = false;
            invuln = false;
            clearInterval(move)
        }, 5000);
    }
}

//circles flying down from the top to the bottom of the battle box
function flyParade() {
    for (let i = 0; i < flies.length; i++) {
        flies[i].posY += flies[i].velY
        fill(255);
        circle(flies[i].posX, flies[i].posY, 8);
        flies[i].collision(player);
        if (flies[i].posY >= battleBox.posY + 100) {
            flies.splice(0, 1);
        }
        setTimeout(() => {
            if (flies[0].posY >= battleBox.posY + 100) {
                inBattle = false;
                disableUI = false;
                inUI = false;
                fightUI = false;
                actUI = false;
                itemUI = false;
                fightUI = false;
                invuln = false;
                clearInterval(spawn);
            }
        }, 13000);
    }

}

function generateFlies() {
    flies = []
    if (randomNum == 1) {
        spawn = setInterval(() => {
            let x = canvasX / 2 + random(-80, 80);
            let y = battleBox.posY - 100;
            flies.push(new Attack(x, y, 0, 2));
        }, 500);

    } else if (randomNum == 0) {
        for (let i = 0; i < 4; i++) {
            let x = canvasX / 2;
            let y = battleBox.posY - 100;
            flies.push(new Attack(x, y, 0, 0))
        }
    }
}



function movement() {
    if (inBattle) {
        if (keyIsDown(RIGHT_ARROW)) {
            player.posX += player.velX;
        }

        if (keyIsDown(LEFT_ARROW)) {
            player.posX -= player.velX;
        }

        if (keyIsDown(UP_ARROW)) {
            player.posY -= player.velY;
        }

        if (keyIsDown(DOWN_ARROW)) {
            player.posY += player.velY;
        }
    }
}

function colisionCheckBorder() {
    if (player.posX >= canvasX / 2 + battleBox.sizeX / 2 - player.sizeX / 2) {
        player.posX = canvasX / 2 + battleBox.sizeX / 2 - player.sizeX / 2;
    }
    if (player.posX <= canvasX / 2 - battleBox.sizeX / 2 + player.sizeX / 2) {
        player.posX = canvasX / 2 - battleBox.sizeX / 2 + player.sizeX / 2;
    }
    if (player.posY >= battleBox.posY + battleBox.sizeY / 2 - player.sizeY / 2) {
        player.posY = battleBox.posY + battleBox.sizeY / 2 - player.sizeY / 2;
    }
    if (player.posY <= battleBox.posY - battleBox.sizeY / 2 + player.sizeY / 2) {
        player.posY = battleBox.posY - battleBox.sizeY / 2 + player.sizeY / 2;
    }
}