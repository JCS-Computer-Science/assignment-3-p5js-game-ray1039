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
    velX: 6,
    velY: 6,
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
    name: "Papyrus",
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
    } else {
        drawPlayer();
    }
    boxText();
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

function drawButtons() {
    for (let i = 0; i < uiButtons.length; i++) {
        //console.log(buttonSel);
        if (uiButtons[i].isSelected) {
            uiButtons[i].g = 215;
        }
        if (uiButtons[i].isSelected == false) {
            uiButtons[i].g = 100;
        }
        fill(0, 0, 0);
        strokeWeight(4);
        stroke(255, uiButtons[i].g, 0);
        rect(canvasX / 16 * uiButtons[i].addPos, canvasY / 1.135, uiButtons[i].sizeX, uiButtons[i].sizeY);
        textSize(40);
        fill(255, uiButtons[i].g, 0);
        noStroke();
        text(uiButtons[i].text, canvasX / 16 * uiButtons[i].addPos + uiButtons[i].textX, canvasY / 1.045);
        if (uiButtons[i].isSelected == true && key === "z") {
            inUI = true;
        } else if (uiButtons[i].isSelected == true && key === "x") {
            inUI = false;
        }
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
    }
}

function boxText() {
    for (let i = 0; i < uiButtons.length; i++) {
        if (uiButtons[0].isSelected == true && inUI) {
            fill(255, 215, 0);
            textSize(32);
            currentText = enemy.name;
            text("*" + currentText, 60, 295);
            if (keyIsDown(90) && uiButtons[0].isSelected && inUI) {
                fightText();
            }
        } else if (uiButtons[1].isSelected == true && inUI) {
            fill(255, 215, 0);
            textSize(32);
            currentText = "Check";
            text("*" + currentText, 60, 295);
            if (key === "z" && uiButtons[1].isSelected && inUI) {
                actText();
            }
        } else if (uiButtons[2].isSelected == true && inUI) {
            fill(255, 215, 0);
            textSize(32);
            currentText = player.candy.name;
            text("*" + currentText, 60, 295);
            if (keyIsDown(90) && uiButtons[2].isSelected && inUI) {
                itemText();
            }
        } else if (uiButtons[3].isSelected == true && inUI) {
            fill(255, 215, 0);
            textSize(32);
            currentText = "Spare";
            text("*" + currentText, 60, 295);
            if (keyIsDown(90) && uiButtons[3].isSelected && inUI) {
                mercyText();
            }
        }
    }
}

//this isn't the best way to do this but I cant make a seperate script for some reason
function fightText() {

}

function actText() {
    fill(255);
    currentText = "ATK: " + enemy.dmg + " DEF: (I can't be bothered :P)"
    text(currentText, 60, 295);
}

function itemText() {

}

function mercyText() {

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

