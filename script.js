//spaget code

let canvasX = 800;
let canvasY = 600;
let battleBox = {
    sizeX: 700,
    sizeY: 200,
    posY: canvasY / 2.3,
}
let player = {
    posX: canvasX / 2 - 15,
    posY: battleBox.posY + 75,
    sizeX: 30,
    sizeY: 30,
    velX: 3,
    velY: 3,
    hp: 20,
    def: 1,
    atk: 20,
    candy: {
        name: "Monster Candy",
        hpRestore: 10
    }
}

let buttonX = 130;
let buttonY = 65;
let uiButtons = [
    attackButton = {
        sizeX: buttonX,
        sizeY: buttonY,
        addPos: 1,
        isSelected: true,
        text: "FIGHT",
        textX: 15,
        g: 100,
        id: 0
    },
    actButton = {
        sizeX: buttonX,
        sizeY: buttonY,
        addPos: 4.8,
        isSelected: false,
        text: "ACT",
        textX: 37,
        g: 100,
        id: 1
    },
    itemButton = {
        sizeX: buttonX,
        sizeY: buttonY,
        addPos: 8.6,
        isSelected: false,
        text: "ITEM",
        textX: 23,
        g: 100,
        id: 2
    },
    mercyButton = {
        sizeX: buttonX,
        sizeY: buttonY,
        addPos: 12.4,
        isSelected: false,
        text: "MERCY",
        textX: 15,
        g: 100,
        id: 3
    }
]

let enemy = {
    name: "froggit",
    hp: 1000,
    dmg: 3,
}

let inBattle = false;
let inUI = false;
let buttonSel = 0;
let currentText;

/** This function loads resources that will be used later. */
function preload() {
    font = loadFont('./Determination Mono Web/DeterminationMonoWebRegular.ttf');
}


function setup() {
    createCanvas(canvasX, canvasY);
    textFont(font);
}

function draw() {
    background(0);
    drawBattleBox();
    movement();
    colisionCheckBorder();
    if (!inBattle) {
        drawButtons();
        boxText();
    } else {
        drawPlayer();
    }
    text(currentText, 60, 295);
    console.log(actUI);

}

function drawPlayer() {
    fill(color(255, 0, 0))
    noStroke();
    rect(player.posX, player.posY, player.sizeX, player.sizeY);
}

function drawBattleBox() {
    let c = color(0, 0, 0)
    fill(c);
    strokeWeight(5);
    stroke(255);
    if (!inBattle) {
        battleBox.sizeX = 700
        rect(canvasX / 2 - battleBox.sizeX / 2, battleBox.posY, battleBox.sizeX, battleBox.sizeY);
    } else {
        battleBox.sizeX = 200;
        rect(canvasX / 2 - battleBox.sizeX / 2, battleBox.posY, battleBox.sizeX, battleBox.sizeY);
    }
}



function keyPressed() {
    if (!inBattle) {
        if (keyIsDown(LEFT_ARROW) && !inUI) {
            buttonSel--
        }
        if (keyIsDown(RIGHT_ARROW) && !inUI) {
            buttonSel++
        }

        if (buttonSel >= 4) {
            buttonSel = 3;
        } else if (buttonSel <= -1) {
            buttonSel = 0
        }

        if (keyIsDown(LEFT_ARROW) && !inUI) {
            uiButtons[buttonSel].isSelected = true
            if (uiButtons[buttonSel + 1].isSelected && buttonSel != -1) {
                uiButtons[buttonSel + 1].isSelected = false
            }
        }
        if (keyIsDown(RIGHT_ARROW) && !inUI) {
            uiButtons[buttonSel].isSelected = true
            if (uiButtons[buttonSel - 1].isSelected && buttonSel != 4) {
                uiButtons[buttonSel - 1].isSelected = false
            }
        }
        if (key === "z" && fightUI == true) {
            fightText();
        } else if (key === "z" && actUI == true) {
            actText();
            console.log("Pressed");

        } else if (key === "z" && itemUI == true) {
            itemText();
        } else if (key === "z" && mercyUI == true) {
            mercyText();
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
    if (player.posX >= canvasX / 2 + battleBox.sizeX / 2 - player.sizeX) {
        player.posX = canvasX / 2 + battleBox.sizeX / 2 - player.sizeX;
    }
    if (player.posX <= canvasX / 2 - battleBox.sizeX / 2) {
        player.posX = canvasX / 2 - battleBox.sizeX / 2;
    }
    if (player.posY >= battleBox.posY + battleBox.sizeY - player.sizeY) {
        player.posY = battleBox.posY + battleBox.sizeY - player.sizeY;
    }
    if (player.posY <= battleBox.posY) {
        player.posY = battleBox.posY;
    }
}

function createAtk() {

}

