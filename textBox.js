let fightUI = false;
let actUI = false;
let itemUI = false;
let mercyUI = false;
let optionSelect = 0;
let attacking = false;
let disableButtons = false;
let x = 68;
let arr = [
    optionOne = {
        currentText: "*Check",
        currentTextTwo: "",
        currentTextThree: "",
        isSelected: true
    },
    optionTwo = {
        currentText: "",
        currentTextTwo: "*flirt",
        currentTextThree: "",
        isSelected: false
    },
    optionThree = {
        currentText: "",
        currentTextTwo: "",
        currentTextThree: "*Threaten",
        isSelected: false
    }
]

function boxText() {
    for (let i = 0; i < uiButtons.length; i++) {
        if (uiButtons[0].isSelected == true && inUI) {
            currentText = "*" + enemy.name;
        } else if (uiButtons[1].isSelected == true && inUI && !disableUI) {
            optionSelect = 0;
            currentText = arr[0].currentText;
            currentTextTwo = arr[1].currentTextTwo;
            currentTextThree = arr[2].currentTextThree;
        } else if (uiButtons[2].isSelected == true && inUI) {
            currentText = "*" + player.item.name;
        } else if (uiButtons[3].isSelected == true && inUI) {
            currentText = "*Spare";
        }
    }
}


function actText() {
    fill(255);
    textSize(32);
    if (optionSelect == 0) {
        fill(255);
        currentText = "ATK: " + enemy.dmg + " DEF: 1";
        currentTextThree = "";
    } else if (optionSelect == 1) {
        fill(255);
        currentText = "Froggit didn't understand what you said,";
        currentTextThree = "but was flattered anyway.";
        enemy.canSpare = true;
    } else if (optionSelect == 2) {
        fill(255);
        currentText = "Froggit didn't understand what you said,";
        currentTextThree = "but was scared anyway.";
        enemy.canSpare = true;
    }
    currentTextTwo = "";
    disableButtons = true
    setTimeout(function () {
        currentText = "";
        currentTextTwo = "";
        currentTextThree = "";
        inBattle = true;
        randomNum = Math.round(random(0, 1));
        generateFlies();
    }, 2500)
}


function itemText() {

    currentText = "healed " + player.item.hpRestore + "HP.";
    currentTextTwo = "";
    currentTextThree = "";
    player.hp += player.item.hpRestore;
    hudDmg += 25;
    if (player.hp > 20) {
        currentText = "HP maxed out.";
        player.hp = 20;
        if (hudDmg > 50) {
            hudDmg = 50;
        }
    }

    disableButtons = true
    setTimeout(function () {
        currentText = "";
        currentTextTwo = "";
        currentTextThree = "";
        inBattle = true;
        randomNum = Math.round(random(0, 1));
        generateFlies();
    }, 2500)
}


function mercyText() {
    if (enemy.canSpare) {
        fill(255);
        currentText = "You win!";
        currentTextThree = "You got nothing because it does not affect the game."
        gameOver = true;
        disableButtons = true;
    } else {
        disableButtons = true
        fill(255);
        currentText = "This enemy cannot be spared yet"
        setTimeout(function () {
            currentText = "";
            currentTextTwo = "";
            currentTextThree = "";
            inBattle = true;
            randomNum = Math.round(random(0, 1));
            generateFlies();
        }, 2500)
    }
    currentTextTwo = "";

}

function drawButtons() {
    if (!disableButtons) {
        for (let i = 0; i < uiButtons.length; i++) {
            if (uiButtons[i].isSelected) {
                uiButtons[i].g = 215;
            }
            if (uiButtons[i].isSelected == false) {
                uiButtons[i].g = 100;
            }


            fill(0, 0, 0);
            strokeWeight(4);
            stroke(255, uiButtons[i].g, 0);
            rect(canvasX / 16 * uiButtons[i].addPos, canvasY / 1.07, uiButtons[i].sizeX, uiButtons[i].sizeY);
            textSize(40);
            fill(255, uiButtons[i].g, 0);
            noStroke();
            text(uiButtons[i].text, canvasX / 16 * uiButtons[i].addPos + uiButtons[i].textX, canvasY / 1.045);
        }
    }

}