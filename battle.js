let randomNum;
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
        flies[i].targetX = player.posX;
        flies[i].targetY = player.posY;
        circle(flies[i].posX, flies[i].posY, 8);
        setTimeout(() => {
            let originX = flies[i].posX - flies[i].targetX;
            let originY = flies[i].posY - flies[i].targetY;
            let path = Math.sqrt(originX * originX + originY * originY);
            console.log(path);
        }, 1000);
    }
}

//circles flying down from the top to the bottom of the battle box
function flyParade() {
    for (let i = 0; i < flies.length; i++) {
        flies[i].posY += flies[i].velY
        //console.log(flies[i].posY);
        //console.log(player.posX);
        fill(255);
        circle(flies[i].posX, flies[i].posY, 8);
        if (player.posX >= flies[i].posX - 4 && player.posX <= flies[i].posX + 4 && player.posY >= flies[i].posY - 4 && player.posY <= flies[i].posY + 4 && invuln == false) {
            player.hp -= 3;
            console.log("Hit!");
            invuln = true
            setTimeout(() => {
                invuln = false;
            }, 1000);
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
            }
        }, 3000);
    }

}

function generateFlies() {
    flies = []
    if (randomNum == 1) {
        for (let i = 0; i < 20; i++) {
            flies.push(flies[i] = { posX: canvasX / 2 + random(-100, 100), posY: battleBox.posY - 100 - random(0, 400), velY: 1 });
        }
    } else if (randomNum == 0) {
        for (let i = 0; i < 4; i++) {
            flies.push(flies[i] = { posX: canvasX / 2, posY: battleBox.posY - 100, velX: 4, velY: 4, targetX: 0, targetY: 0 })
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