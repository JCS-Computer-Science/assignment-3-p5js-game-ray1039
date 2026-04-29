const buttonX = 140;
const buttonY = 65;
const canvasX = 800;
const canvasY = 600;
let battleBox = {
    sizeX: 700,
    sizeY: 200,
    posY: canvasY / 1.7,
}

let player = new Player(canvasX / 2, battleBox.posY, 30, 30, 3, 3, 20, 1, 20, { name: "Monster Candy", hpRestore: 10 });
let soulImg;
let soulHitImg;
let hitImg;

let frogImg;
let frogHitImg;
let frogCurrent;
let enemy = {
    name: "froggit",
    hp: 100,
    dmg: 4,
    canSpare: false
};

let targetImg;


let uiButtons = [];
let fightImg;
let actImg;
let itemImg;
let mercyImg;
let fightSelImg;
let actSelImg;
let itemSelImg;
let mercySelImg;


let inBattle = false;
let invuln = false;
let inUI = false;
let disableUI = false;
let buttonSel = 0;
let currentFlavourText;
let currentFlavourTextBottom;
let currentText;
let currentTextTwo;
let currentTextThree;
let hudDmg = 50;
let hitText;
let gameOver = false;
let hitActive = false;


/** This function loads resources that will be used later. */
function preload() {
    font = loadFont('./Determination Mono Web/DeterminationMonoWebRegular.ttf');
    frogImg = loadImage('gameassets/Froggit.png');
    soulImg = loadImage('gameassets/Soul.png');
    soulHitImg = loadImage('gameassets/SoulHit.png');
    targetImg = loadImage('gameassets/Target.png');
    hitImg = loadImage("gameassets/empty.png");
    fightImg = loadImage('gameassets/fight_unselected.png');
    actImg = loadImage('gameassets/act_unselected.png');
    itemImg = loadImage('gameassets/item_unselected.png');
    mercyImg = loadImage('gameassets/mercy_unselected.png');
    fightSelImg = loadImage('gameassets/fight_selected.png');
    actSelImg = loadImage('gameassets/act_selected.png');
    itemSelImg = loadImage('gameassets/item_selected.png');
    mercySelImg = loadImage('gameassets/mercy_selected.png');
    frogHitImg = loadImage('gameassets/Froggit.png');
}


function setup() {
    createCanvas(canvasX, canvasY);
    textFont(font);
    rectMode(CENTER);
    imageMode(CENTER);
    uiButtons.push(new Button(buttonX, buttonY, 2.3, true, fightImg, fightSelImg, fightImg));
    uiButtons.push(new Button(buttonX, buttonY, 6.1, false, actImg, actSelImg, actImg));
    uiButtons.push(new Button(buttonX, buttonY, 9.95, false, itemImg, itemSelImg, itemImg));
    uiButtons.push(new Button(buttonX, buttonY, 13.7, false, mercyImg, mercySelImg, mercyImg));
    currentFlavourText = "*Froggit hopped close!"
    frogCurrent = frogImg;
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


    image(frogCurrent, canvasX / 2, 170, 150, 150);
    if (enemy.canSpare && !fightUI && !actUI && !itemUI && !mercyUI && !inUI && !gameOver) {
        currentFlavourText = "*Froggit seems reluctant to fight you";
    } else if (flavourText == 1 && !fightUI && !actUI && !itemUI && !mercyUI && !inUI && !gameOver) {
        currentFlavourText = "*Froggit doesn't seem to know why it's here.";
    } else if (flavourText == 2 && !fightUI && !actUI && !itemUI && !mercyUI && !inUI && !gameOver) {
        currentFlavourText = "*Froggit hops to and fro.";
    } else if (flavourText == 3 && !fightUI && !actUI && !itemUI && !mercyUI && !inUI && !gameOver) {
        currentFlavourText = "*The battlefield is filled with the ";
        currentFlavourTextBottom = "smell of mustard seed.";
    } else if (flavourText == 4 && !fightUI && !actUI && !itemUI && !mercyUI && !inUI && !gameOver) {
        currentFlavourText = "*You are intimidated by Froggit's ";
        currentFlavourTextBottom = "raw strength. Only kidding.";
    }

    //textbox ui
    if (disableUI) {
        fill(255)
    } else if (inUI && !actUI && !attacking) {
        image(soulImg, 80, 285, player.sizeX - 5, player.sizeY - 5);
        fill(255);
    }


    //textbox ui selection
    textSize(32);
    if (arr[0].isSelected && !disableUI && actUI && !enemy.canSpare) {
        fill(255);
        text(currentText, 100, 295);
        image(soulImg, 80, 285, player.sizeX - 5, player.sizeY - 5);
    } else if (enemy.canSpare && !disableUI && !actUI && !fightUI && !itemUI) {
        fill(255, 215, 0)
        text(currentText, 100, 295)
    } else {
        fill(255);
        text(currentText, 100, 295);
        text(currentFlavourText, 60, 295);
        text(currentFlavourTextBottom, 60, 355);
    }

    if (arr[1].isSelected && !disableUI && actUI) {
        fill(255);
        text(currentTextTwo, 370, 295);
        image(soulImg, 350, 285, player.sizeX - 5, player.sizeY - 5);
    } else {
        fill(255)
        text(currentTextTwo, 370, 295);
    }

    if (arr[2].isSelected && !disableUI && actUI) {
        fill(255);
        image(soulImg, 80, 345, player.sizeX - 5, player.sizeY - 5);
        text(currentTextThree, 100, 355);
    } else {
        fill(255)
        text(currentTextThree, 100, 355);
    }

    if (inBattle) {
        if (randomNum == 0) {
            targetFlies();
        } else if (randomNum == 1) {
            flyParade();
        }
    }


    //attacking
    if (attacking && !disableUI) {
        disableButtons = true;
        fill(255);
        image(targetImg, canvasX / 2, 350, 562 * 1.25, 128 * 1.6)
        rect(x, battleBox.posY, 20, battleBox.sizeY - 20)
        currentText = "";
        currentTextTwo = "";
        currentTextThree = "";
        x += 5;
    }
    if (x >= 736) {
        attacking = false;
        arr.currentText = "";
        arr.currentTextTwo = "";
        arr.currentTextThree = "";
        inBattle = true;
        randomNum = Math.round(random(0, 1));
        generateFlies();
    }

    image(hitImg, canvasX / 2, 150, 26 * 1.5, 110 * 1.7);

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
    if (enemy.hp <= 0) {
        fill(255);
        currentText = "";
        currentTextThree = "";
        currentFlavourText = "*You win! You got nothing because ";
        currentFlavourTextBottom = "it does not affect the game."
        gameOver = true;
        disableButtons = true;
    }

    if (hitActive) {
        fill(0);
        stroke(255, 0, 0)
        textSize(40);
        text(hitText, 400, 100);
    }
}


function drawFrames() {
    disableUI = true;
    setTimeout(() => {
        hitImg = loadImage('gameassets/hit_frame1.png');
    }, 100);
    setTimeout(() => {
        hitImg = loadImage('gameassets/hit_frame2.png');
    }, 200);
    setTimeout(() => {
        hitImg = loadImage('gameassets/hit_frame3.png');
    }, 300);
    setTimeout(() => {
        hitImg = loadImage('gameassets/hit_frame4.png');
    }, 400);
    setTimeout(() => {
        hitImg = loadImage('gameassets/hit_frame5.png');
    }, 500);
    setTimeout(() => {
        hitImg = loadImage('gameassets/hit_frame6.png');
    }, 600);
    setTimeout(() => {
        hitImg = loadImage('gameassets/empty.png');
        frogCurrent = frogHitImg;
    }, 700);
    setTimeout(function () {
        currentText = "";
        currentTextTwo = "";
        currentTextThree = "";
        inBattle = true;
        randomNum = Math.round(random(0, 1));
        hitActive = false;
        generateFlies();
    }, 2500)
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
    if (keyIsDown(90) && x >= 390 && x <= 410 && !disableUI) {
        attacking = false;
        enemy.hp -= player.atk;
        hitText = player.atk;
        setTimeout(() => {
            text(player.atk, canvasX / 2, 100);
            hitActive = true;
        }, 800);
        drawFrames();
    } else if (keyIsDown(90) && x >= 145 && x <= 260 && !disableUI || keyIsDown(90) && x >= 535 && x <= 650 && !disableUI) {
        attacking = false;
        enemy.hp -= Math.round(player.atk / 1.5);
        setTimeout(() => {
            hitText = Math.round(player.atk / 1.5);
            hitActive = true;
        }, 800);
        drawFrames();
    } else if (keyIsDown(90) && x >= 261 && x <= 398 && !disableUI || keyIsDown(90) && x >= 411 && x <= 534 && !disableUI) {
        attacking = false;
        enemy.hp -= Math.round(player.atk / 1.3);
        setTimeout(() => {
            hitText = Math.round(player.atk / 1.3);
            hitActive = true;
        }, 800);
        drawFrames();
    } else if (keyIsDown(90) && x >= 80 && x <= 145 && !disableUI || keyIsDown(90) && x >= 650 && x <= 736 && !disableUI) {
        attacking = false;
        enemy.hp -= Math.round(player.atk / 1.8);
        setTimeout(() => {
            hitText = Math.round(player.atk / 1.8);
            hitActive = true;
        }, 800);
        drawFrames();
    }
}