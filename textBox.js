let fightUI = false;
let actUI = false;
let itemUI = false;
let mercyUI = false;

function boxText() {
    for (let i = 0; i < uiButtons.length; i++) {
        if (uiButtons[0].isSelected == true && inUI) {
            fill(255, 215, 0);
            textSize(32);
            currentText = enemy.name;
            if (keyIsDown(90) && uiButtons[0].isSelected && inUI) {
                fightUI = true;
            }
        } else if (uiButtons[1].isSelected == true && inUI) {
            fill(255, 215, 0);
            textSize(32);
            currentText = "Check";
            if (keyIsDown(90) && uiButtons[1].isSelected && inUI) {
                actUI = true;
            }
        } else if (uiButtons[2].isSelected == true && inUI) {
            fill(255, 215, 0);
            textSize(32);
            currentText = player.candy.name;
            if (keyIsDown(90) && uiButtons[2].isSelected && inUI) {
                itemUI = true;
            }
        } else if (uiButtons[3].isSelected == true && inUI) {
            fill(255, 215, 0);
            textSize(32);
            currentText = "Spare";
            if (keyIsDown(90) && uiButtons[3].isSelected && inUI) {
                mercyUI = true;
            }
        }
    }
}


function fightText() {

}

function actText() {
    fill(255);
    currentText = "ATK: " + enemy.dmg + " DEF: (I can't be bothered :P)";
}

function itemText() {

}

function mercyText() {

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
            fightUI = false;
            actUI = false;
            itemUI = false;
            fightUI = false;
            currentText = "";
        }
    }

}