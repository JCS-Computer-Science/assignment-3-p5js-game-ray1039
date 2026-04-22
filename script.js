let canvasX = 800;
let canvasY = 600;
let battleBox = {
    sizeX: 700,
    sizeY: 200,
    posY: canvasY / 1.7,
}

let player = new Player(canvasX / 2, battleBox.posY, 30, 30, 3, 3, 20, 1, 20, { name: "Monster Candy", hpRestore: 10 });
let enemy = {
    name: "froggit",
    hp: 1000,
    dmg: 4,
    canSpare: false
};


let buttonX = 130;
let buttonY = 65;
let uiButtons = [];


let inBattle = false;
let invuln = false;
let inUI = false;
let disableUI = false;
let buttonSel = 0;
let currentText;
let currentTextTwo;
let currentTextThree;
let hudDmg = 50;
let gameOver = false;


/** This function loads resources that will be used later. */
function preload() {
    font = loadFont('./Determination Mono Web/DeterminationMonoWebRegular.ttf');
}


function setup() {
    createCanvas(canvasX, canvasY);
    textFont(font);
    rectMode(CENTER);
    imageMode(CENTER);
    uiButtons.push(new Button(buttonX, buttonY, 2.3, true, "FIGHT", -50, 100, 0));
    uiButtons.push(new Button(buttonX, buttonY, 6.1, false, "ACT", -30, 100, 1));
    uiButtons.push(new Button(buttonX, buttonY, 9.95, false, "ITEM", -40, 100, 2));
    uiButtons.push(new Button(buttonX, buttonY, 13.7, false, "MERCY", -50, 100, 3));
    currentText = "Froggit hopped close!"
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

    //textbox ui
    if (disableUI) {
        fill(255)
    } else if (inUI && !actUI) {
        fill(255, 215, 0);
    }

    //textbox ui selection
    textSize(32);
    if (arr[0].isSelected && !disableUI && actUI) {
        fill(255, 215, 0);
    } else {
        fill(255);
    }
    text(currentText, 60, 295);

    if (arr[1].isSelected && !disableUI && actUI) {
        fill(255, 215, 0);
    } else {
        fill(255)
    }
    text(currentTextTwo, 350, 295);

    if (arr[2].isSelected && !disableUI && actUI) {
        fill(255, 215, 0);
    } else {
        fill(255)
    }
    text(currentTextThree, 60, 355);

    if (inBattle) {
        if (randomNum == 0) {
            targetFlies();
        } else if (randomNum == 1) {
            flyParade();
        }
    }

    if (attacking) {
        disableButtons = true;
        fill(255);
        rect(x, battleBox.posY, 20, battleBox.sizeY - 20)
        currentText = "";
        currentTextTwo = "";
        currentTextThree = "";
        x += 5;
        if (x >= 736) {
            attacking = false;
            arr.currentText = "";
            arr.currentTextTwo = "";
            arr.currentTextThree = "";
            inBattle = true;
            randomNum = Math.round(random(0, 1));
            generateFlies();
        }
    }

    //gameover
    if (player.hp <= 0) {
        fill(0)
        rect(canvasX / 2, canvasY / 2, 1000, 1000)
        gameEnd();
    } else if (gameOver) {
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


function gameEnd() {
    inBattle = false;
    disableUI = true;
    inUI = false;
    fightUI = false;
    actUI = false;
    itemUI = false;
    fightUI = false;
    invuln = false;
    attacking = false;

}


function keyPressed() {
    if (!inBattle) {
        //for the buttons to set them to different color
        if (keyIsDown(LEFT_ARROW) && !inUI && !disableUI) {
            buttonSel--
        }
        if (keyIsDown(RIGHT_ARROW) && !inUI && !disableUI) {
            buttonSel++
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
        if (keyIsDown(LEFT_ARROW) && inUI && !disableUI && actUI) {
            optionSelect--
        }
        if (keyIsDown(RIGHT_ARROW) && inUI && !disableUI && actUI) {
            optionSelect++
        }

        if (optionSelect >= 3) {
            optionSelect = 2;
        } else if (optionSelect <= -1) {
            optionSelect = 0;
        }

        if (keyIsDown(LEFT_ARROW) && inUI && !disableUI && actUI) {
            arr[optionSelect].isSelected = true
            if (arr[optionSelect + 1].isSelected && optionSelect != -1) {
                arr[optionSelect + 1].isSelected = false
            }
        }
        if (keyIsDown(RIGHT_ARROW) && inUI && !disableUI && actUI) {
            arr[optionSelect].isSelected = true
            if (arr[optionSelect - 1].isSelected && optionSelect != 3) {
                arr[optionSelect - 1].isSelected = false
            }
        }


        //this selects things in the text box
        if (key === "z" && fightUI == true) {
            disableUI = true;
            uiButtons[buttonSel].isSelected = false;
            arr[optionSelect].isSelected = false;
            optionSelect = 0;
            buttonSel = 0;
            uiButtons[buttonSel].isSelected = true;
            arr[optionSelect].isSelected = true;
            attacking = true;
        } else if (key === "z" && actUI == true) {
            disableUI = true;
            actText();
            uiButtons[buttonSel].isSelected = false;
            arr[optionSelect].isSelected = false;
            optionSelect = 0;
            buttonSel = 0;
            uiButtons[buttonSel].isSelected = true;
            arr[optionSelect].isSelected = true;
        } else if (key === "z" && itemUI == true) {
            disableUI = true;
            itemText();
            uiButtons[buttonSel].isSelected = false;
            arr[optionSelect].isSelected = false;
            optionSelect = 0;
            buttonSel = 0;
            uiButtons[buttonSel].isSelected = true;
            arr[optionSelect].isSelected = true;
        } else if (key === "z" && mercyUI == true) {

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
                    mercyText();
                    disableUI = true;
                    uiButtons[buttonSel].isSelected = false;
                    arr[optionSelect].isSelected = false;
                    optionSelect = 0;
                    buttonSel = 0;
                    uiButtons[buttonSel].isSelected = true;
                    arr[optionSelect].isSelected = true;
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