let fightUI = false;
let actUI = false;
let itemUI = false;
let mercyUI = false;
let optionSelect = 0;

function boxText() {
    for (let i = 0; i < uiButtons.length; i++) {
        if (uiButtons[0].isSelected == true && inUI) {
            currentText = "*" + enemy.name;
        } else if (uiButtons[1].isSelected == true && inUI) {
            optionSelect = 0;
            let arr = [
                currentText = "*Check",
                currentTextTwo = "*flirt",
                currentTextThree = "*Threaten"
            ]
        } else if (uiButtons[2].isSelected == true && inUI) {
            currentText = "*" + player.item.name;
        } else if (uiButtons[3].isSelected == true && inUI) {
            currentText = "*Spare";
        }
    }
}


function fightText() {
    let x = 68;
    fill(255);
    rect(x, battleBox.posY, 20, battleBox.sizeY - 20)
    currentText = "";
    setTimeout(() => {
        console.log(x);
        x += 3;
    }, 2500);
    setTimeout(function () {
        currentText = "";
        currentTextTwo = "";
        currentTextThree = "";
        inBattle = true;
        randomNum = Math.round(random(0, 1));
        generateFlies();
    }, 2500)
}

function actText() {
    fill(255);
    textSize(32);
    currentText = "ATK: " + enemy.dmg + " DEF: (I can't be bothered :P)";
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
    player.hp += player.item.hpRestore;
    hudDmg += 25;
    if (player.hp > 20) {
        currentText = "HP maxed out.";
        player.hp = 20;
        if (hudDmg > 50) {
            hudDmg = 50;
        }
    }

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
        currentText = "You win!"
    } else {
        currentText = "This enemy cannot be spared (yet)"
    }
    setTimeout(function () {
        currentText = "";
        currentTextTwo = "";
        currentTextThree = "";
        inBattle = true;
        randomNum = Math.round(random(0, 1));
        generateFlies();
    }, 2500)
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
        rect(canvasX / 16 * uiButtons[i].addPos, canvasY / 1.07, uiButtons[i].sizeX, uiButtons[i].sizeY);
        textSize(40);
        fill(255, uiButtons[i].g, 0);
        noStroke();
        text(uiButtons[i].text, canvasX / 16 * uiButtons[i].addPos + uiButtons[i].textX, canvasY / 1.045);
    }

}