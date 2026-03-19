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
    atk: 20
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
        textX: 17,
        g: 100
    },
    actButton = {
        sizeX: buttonX,
        sizeY: buttonY,
        addPos: 4.8,
        isSelected: false,
        text: "ACT",
        textX: 35,
        g: 100
    },
    itemButton = {
        sizeX: buttonX,
        sizeY: buttonY,
        addPos: 8.6,
        isSelected: false,
        text: "ITEM",
        textX: 27,
        g: 100
    },
    mercyButton = {
        sizeX: buttonX,
        sizeY: buttonY,
        addPos: 12.4,
        isSelected: false,
        text: "MERCY",
        textX: 8,
        g: 100
    }
]

let textBox = [
    fightText = {
        enemies: [
            froggit = {
                enemyName: "froggit",
                enemyHp: 50,
                enemyDef: 2,
                enemyAtk: 3,
                selected: false
            }
        ]
    },
    actText = {
        actions: [
            check = {
                actionName: "Check",
                selected: false
            },
            flirt = {
                actionName: "Flirt",
                selected: false,
                txt: "Froggit didn't understand what you said, but was flattered anyway."
            }
        ]
    },
    itemText = [
        monsterCandy = {
            itemName: "Monster candy",
            hpRestore: 10
        }
    ],
    mercyText = {
        mercyTxt: [
            spare = {
                txt: "Spare",
                selected: false
            },
            run = {
                txt: "run",
                selected: false
            }
        ]
    }
]

let inBattle = false
let buttonSel = 0;


function setup() {
    createCanvas(canvasX, canvasY);
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
        textSize(32);
        fill(255, uiButtons[i].g, 0);
        noStroke();
        text(uiButtons[i].text, canvasX / 16 * uiButtons[i].addPos + uiButtons[i].textX, canvasY / 1.045);
    }

}

function keyPressed() {
    if (!inBattle) {
        if (keyIsDown(LEFT_ARROW)) {
            buttonSel--
        }
        if (keyIsDown(RIGHT_ARROW)) {
            buttonSel++
        }

        if (buttonSel >= 4) {
            buttonSel = 3;
        } else if (buttonSel <= -1) {
            buttonSel = 0
        }

        if (keyIsDown(LEFT_ARROW)) {
            uiButtons[buttonSel].isSelected = true
            if (uiButtons[buttonSel + 1].isSelected && buttonSel != -1) {
                uiButtons[buttonSel + 1].isSelected = false
            }
        }
        if (keyIsDown(RIGHT_ARROW)) {
            uiButtons[buttonSel].isSelected = true
            if (uiButtons[buttonSel - 1].isSelected && buttonSel != 4) {
                uiButtons[buttonSel - 1].isSelected = false
            }
        }
    }
}

function boxText() {

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