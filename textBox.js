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
            currentFlavourText = "";
            currentFlavourTextBottom = "";
            currentText = "*" + enemy.name;
        } else if (uiButtons[1].isSelected == true && inUI && !disableUI) {
            currentFlavourText = "";
            currentFlavourTextBottom = "";
            optionSelect = 0;
            currentText = arr[0].currentText;
            currentTextTwo = arr[1].currentTextTwo;
            currentTextThree = arr[2].currentTextThree;
        } else if (uiButtons[2].isSelected == true && inUI) {
            currentFlavourText = "";
            currentFlavourTextBottom = "";
            currentText = "*" + player.item.name;
        } else if (uiButtons[3].isSelected == true && inUI) {
            currentFlavourText = "";
            currentFlavourTextBottom = "";
            currentText = "*Spare";
        }
    }
}


function actText() {
    fill(255);
    textSize(32);
    if (optionSelect == 0) {
        fill(255);
        currentText = "";
        currentTextThree = "";
        currentFlavourText = "*ATK: " + enemy.dmg + " DEF: 1";
    } else if (optionSelect == 1) {
        fill(255);
        currentText = "";
        currentTextThree = "";
        currentFlavourText = "*Froggit didn't understand what you said,";
        currentFlavourTextBottom = "but was flattered anyway.";
        enemy.canSpare = true;
    } else if (optionSelect == 2) {
        fill(255);
        currentText = "";
        currentTextThree = "";
        currentFlavourText = "*Froggit didn't understand what you said,";
        currentFlavourTextBottom = "but was scared anyway.";
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
        currentFlavourText = "";
        currentFlavourTextBottom = "";
        generateFlies();
    }, 2500)
}


function itemText() {

    currentText = "";
    currentFlavourText = "healed " + player.item.hpRestore + "HP.";
    currentTextTwo = "";
    currentTextThree = "";
    player.hp += player.item.hpRestore;
    hudDmg += 25;
    if (player.hp > 20) {
        currentFlavourText = "*HP maxed out.";
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
        currentFlavourText = "";
        currentFlavourTextBottom = "";
        generateFlies();
    }, 2500)
}


function mercyText() {
    if (enemy.canSpare) {
        fill(255);
        currentText = "";
        currentTextThree = "";
        currentFlavourText = "*You win! You got nothing because ";
        currentFlavourTextBottom = "it does not affect the game."
        gameOver = true;
        disableButtons = true;
    } else {
        disableButtons = true
        fill(255);
        currentText = "";
        currentTextThree = "";
        currentFlavourText = "*You can only spare when the name ";
        currentFlavourTextBottom = "is yellow.";
        setTimeout(function () {
            currentText = "";
            currentTextTwo = "";
            currentTextThree = "";
            inBattle = true;
            randomNum = Math.round(random(0, 1));
            currentFlavourText = "";
            currentFlavourTextBottom = "";
            generateFlies();
        }, 2500)
    }
    currentTextTwo = "";

}

function drawButtons() {
    if (!disableButtons) {
        for (let i = 0; i < uiButtons.length; i++) {
            image(uiButtons[i].img, canvasX / 16 * uiButtons[i].addPos, canvasY / 1.07, uiButtons[i].sizeX, uiButtons[i].sizeY);
            noStroke();
            if (uiButtons[i].isSelected) {
                uiButtons[i].img = uiButtons[i].imgSel;
                if (!inUI) {
                    image(soulImg, canvasX / 16 * uiButtons[i].addPos - 48, canvasY / 1.07, player.sizeX - 3, player.sizeY - 3);
                }
            }
            if (!uiButtons[i].isSelected) {
                uiButtons[i].img = uiButtons[i].imgUnsel;
            }
        }
    }

}