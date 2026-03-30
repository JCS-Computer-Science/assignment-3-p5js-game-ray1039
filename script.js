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
        g: 100,
        id: 0
    },
    actButton = {
        sizeX: buttonX,
        sizeY: buttonY,
        addPos: 4.8,
        isSelected: false,
        text: "ACT",
        textX: 35,
        g: 100,
        id: 1
    },
    itemButton = {
        sizeX: buttonX,
        sizeY: buttonY,
        addPos: 8.6,
        isSelected: false,
        text: "ITEM",
        textX: 27,
        g: 100,
        id: 2
    },
    mercyButton = {
        sizeX: buttonX,
        sizeY: buttonY,
        addPos: 12.4,
        isSelected: false,
        text: "MERCY",
        textX: 8,
        g: 100,
        id: 3
    }
]

//this is for all the textbox stuff
let textBox = [
    fightText = [
        froggit = {
            name: "froggit",
            enemyHp: 50,
            enemyDef: 2,
            enemyAtk: 3,
            selected: false
        }
    ],
    actText = [
        check = {
            name: "Check",
            selected: false
        }

    ],
    itemText = [
        monsterCandy = {
            name: "Monster candy",
            hpRestore: 10
        }
    ],
    mercyText = [
        spare = {
            name: "Spare",
            selected: false
        },
    ]
]

let inBattle = false;
let inUI = false;
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
    if (inUI) {
        boxText();
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
        if (uiButtons[i].isSelected == true && key === "z") {
            inUI = true;
        }
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

    for (let i = 0; i < uiButtons.length; i++) {
        if (uiButtons[i].isSelected == true) {
            let select = uiButtons[i];
            for (let i = 0; i < textBox.length; i++) {
                if (textBox[i] == select) {

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

