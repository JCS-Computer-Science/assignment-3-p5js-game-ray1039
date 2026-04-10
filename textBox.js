let fightUI = false;
let actUI = false;
let itemUI = false;
let mercyUI = false;

function boxText() {
    for (let i = 0; i < uiButtons.length; i++) {
        if (uiButtons[0].isSelected == true && inUI) {
            currentText = "*" + enemy.name;
        } else if (uiButtons[1].isSelected == true && inUI) {
            currentText = "*Check";
        } else if (uiButtons[2].isSelected == true && inUI) {
            currentText = "*" + player.candy.name;
        } else if (uiButtons[3].isSelected == true && inUI) {
            currentText = "*Spare";
        }
    }
}


function fightText() {

}

function actText() {
    fill(255);
    textSize(32);
    currentText = "ATK: " + enemy.dmg + " DEF: (I can't be bothered :P)";
    //console.log("debug log");
    setTimeout(function () {
        currentText = "";
        inBattle = true;
        //randomNum = Math.round(random(0, 1));
        randomNum = 0;
        generateFlies();
    }, 2500)
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
        rect(canvasX / 16 * uiButtons[i].addPos, canvasY / 1.07, uiButtons[i].sizeX, uiButtons[i].sizeY);
        textSize(40);
        fill(255, uiButtons[i].g, 0);
        noStroke();
        text(uiButtons[i].text, canvasX / 16 * uiButtons[i].addPos + uiButtons[i].textX, canvasY / 1.045);
    }

}