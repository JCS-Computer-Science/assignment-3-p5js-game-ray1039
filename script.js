//spaget code

let canvasX = 800;
let canvasY = 600;
let battleBox = {
    sizeX: 700,
    sizeY: 200,
    posY: canvasY / 1.7,
}

let player = new Player(canvasX / 2, battleBox.posY, 30, 30, 3, 3, 20, 1, 20, { name: "Monster Candy", hpRestore: 10 });

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
    dmg: 4,
    canSpare: false
}

let inBattle = false;
let invuln = false;
let inUI = false;
let disableUI = false;
let buttonSel = 0;
let currentText;
let currentTextTwo;
let currentTextThree;
let hudDmg = 50;

/** This function loads resources that will be used later. */
function preload() {
    font = loadFont('./Determination Mono Web/DeterminationMonoWebRegular.ttf');
}


function setup() {
    createCanvas(canvasX, canvasY);
    textFont(font);
    rectMode(CENTER);
    imageMode(CENTER);
}

function draw() {
    background(0);
    drawBattleBox();
    player.movement();
    player.colisionCheckBorder();
    drawHud();
    if (!inBattle) {
        drawButtons();
    } else {
        drawPlayer();
    }

    if (fightUI && disableUI || actUI && disableUI || itemUI && disableUI || mercyUI && disableUI) {
        fill(255)
    } else if (inUI) {
        fill(255, 215, 0);
    }

    textSize(32);
    text(currentText, 60, 295);
    text(currentTextTwo, 350, 295);
    text(currentTextThree, 60, 355)
    if (inBattle) {
        if (randomNum == 0) {
            targetFlies();
        } else if (randomNum == 1) {
            flyParade();
        }
    }

    if (player.hp <= 0) {
        fill(255, 0, 0)
        rect(canvasX / 2, canvasY / 2, 1000, 1000)
        inBattle = false;
        disableUI = true;
        inUI = false;
        fightUI = false;
        actUI = false;
        itemUI = false;
        fightUI = false;
        invuln = false;
    }
}

//draws the ui elements that display player name, hp, and lvl
function drawHud() {
    textSize(38);
    noStroke();
    fill(255);
    text("LV 1", 190, 500);
    text("Chara", 48, 500);
    text(player.hp + " / 20", 440, 500);
    textSize(32);
    text("HP", 330, 500);
    fill(255, 0, 0);
    rect(400, 490, 50, 45);
    rectMode(CORNER);
    fill(255, 215, 0)
    rect(375, 467, hudDmg, 45);
    rectMode(CENTER);
}

function keyPressed() {
    if (!inBattle) {
        //for the buttons to set them to different color
        if (keyIsDown(LEFT_ARROW) && !inUI && !disableUI) {
            buttonSel--
            if (!inBattle) {
                drawButtons();
            }
        }
        if (keyIsDown(RIGHT_ARROW) && !inUI && !disableUI) {
            buttonSel++
            if (!inBattle) {
                drawButtons();
            }
        }

        //checks to see if buttonsel is greater than 3 or less than 0
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

        //a seperate part for selecting item inside the act menu
        if (keyIsDown(LEFT_ARROW) && inUI && !disableUI && !actUI) {
            optionSelect--
        }
        if (keyIsDown(RIGHT_ARROW) && inUI && !disableUI && !actUI) {
            optionSelect++
        }


        //this selects things in the text box
        if (key === "z" && fightUI == true) {
            disableUI = true;
            fightText();
        } else if (key === "z" && actUI == true) {
            disableUI = true;
            actText();
        } else if (key === "z" && itemUI == true) {
            disableUI = true;
            itemText();
        } else if (key === "z" && mercyUI == true) {
            disableUI = true;
            mercyText();
        }

        //this selects the button currently highlighted
        for (let i = 0; i < uiButtons.length; i++) {
            if (uiButtons[0].isSelected == true && inUI) {
                if (key === "z" && uiButtons[0].isSelected && inUI) {
                    fightUI = true;
                    break;
                }
            } else if (uiButtons[1].isSelected == true && inUI) {
                if (key === "z" && uiButtons[1].isSelected && inUI) {
                    actUI = true;
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
            if (uiButtons[i].isSelected == true && key === "z") {
                inUI = true;
                boxText();
                //this backs out of the textbox and allows for another button to be selected
            } else if (uiButtons[i].isSelected == true && key === "x" && inUI && !disableUI) {
                inUI = false;
                fightUI = false;
                actUI = false;
                itemUI = false;
                fightUI = false;
                disableUI = false;
                currentText = "";
                currentTextTwo = "";
                currentTextThree = "";
            }
        }
    }
}







