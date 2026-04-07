//spaget code

let canvasX = 800;
let canvasY = 600;
let battleBox = {
    sizeX: 700,
    sizeY: 200,
    posY: canvasY / 1.7,
}
let player = {
    posX: canvasX / 2,
    posY: battleBox.posY,
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
        addPos: 2.3,
        isSelected: true,
        text: "FIGHT",
        textX: -50,
        g: 100,
        id: 0
    },
    actButton = {
        sizeX: buttonX,
        sizeY: buttonY,
        addPos: 6.1,
        isSelected: false,
        text: "ACT",
        textX: -30,
        g: 100,
        id: 1
    },
    itemButton = {
        sizeX: buttonX,
        sizeY: buttonY,
        addPos: 9.95,
        isSelected: false,
        text: "ITEM",
        textX: -40,
        g: 100,
        id: 2
    },
    mercyButton = {
        sizeX: buttonX,
        sizeY: buttonY,
        addPos: 13.7,
        isSelected: false,
        text: "MERCY",
        textX: -50,
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
    rectMode(CENTER);
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

    if (fightUI || actUI || itemUI || mercyUI) {
        fill(255)
    } else if (inUI) {
        fill(255, 215, 0);
    }
    textSize(32);
    text(currentText, 60, 295);
}

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



function keyPressed() {
    if (!inBattle) {
        if (keyIsDown(LEFT_ARROW) && !inUI) {
            buttonSel--
            if (!inBattle) {
                drawButtons();
            }
        }
        if (keyIsDown(RIGHT_ARROW) && !inUI) {
            buttonSel++
            if (!inBattle) {
                drawButtons();
            }
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
        } else if (key === "z" && itemUI == true) {
            itemText();
        } else if (key === "z" && mercyUI == true) {
            mercyText();
        }
        for (let i = 0; i < uiButtons.length; i++) {
            if (uiButtons[0].isSelected == true && inUI) {
                if (key === "z" && uiButtons[0].isSelected && inUI) {
                    fightUI = true;
                    break;
                }
            } else if (uiButtons[1].isSelected == true && inUI) {
                if (key === "z" && uiButtons[1].isSelected && inUI) {
                    actUI = true;
                    actText();
                    break;
                }
            } else if (uiButtons[2].isSelected == true && inUI) {
                if (key === "z" && uiButtons[2].isSelected && inUI) {
                    itemUI = true;
                    break;
                }
            } else if (uiButtons[3].isSelected == true && inUI) {
                if (key === "z" && uiButtons[3].isSelected && inUI) {
                    mercyUI = true;
                    break;
                }
            }
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


