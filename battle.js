let randomNum;
let spawn;
let move;
let targetX = 0;
let targetY = 0;
let delay;
let flies = [];
let flavourText;

function drawPlayer() {
    if (!invuln) {
        fill(color(255, 0, 0))
    } else {
        fill(color(150, 0, 0))
    }
    noStroke();
    rect(player.x, player.y, player.sizeX, player.sizeY);
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
        circle(flies[i].posX, flies[i].posY, 8);
        flies[i].posX = lerp(flies[i].posX, targetX, 0.1);
        flies[i].posY = lerp(flies[i].posY, targetY, 0.1);
        flies[i].collision(player);
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
            flies.splice(i, 1);
        }
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
        setTimeout(() => {
            inBattle = false;
            disableUI = false;
            inUI = false;
            fightUI = false;
            actUI = false;
            itemUI = false;
            fightUI = false;
            invuln = false;
            clearInterval(spawn);
            randomNum = 2;
            disableButtons = false;
            x = 68;
            flavourText = Math.round(random(1, 4));
        }, 10000);

    } else if (randomNum == 0) {
        for (let i = 0; i < 5; i++) {
            let x = canvasX / 2;
            let y = battleBox.posY - 100;
            delay = 30 + 1 * i;

            flies.push(new Targeting(x, y, targetX, targetY))
            move = setInterval(() => {
                targetX = player.x;
                targetY = player.y;
                console.log(targetX);
                console.log(targetY);
            }, 1000 + delay);
        }

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
            randomNum = 2;
            disableButtons = false;
            x = 68;
            flavourText = Math.round(random(1, 4));
        }, 7000);
    }
}
