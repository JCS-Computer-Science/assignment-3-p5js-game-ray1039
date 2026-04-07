let randomNum;
let flies = [
    fly1 = {
        targetX: null,
        targetY: null,
        posX: null,
        posY: null,
        velX: 2,
        velY: 2
    }
];


function pickFight() {
    if (inBattle) {
        randomNum = Math.round(random(0, 1));
        console.log(randomNum);
        console.log(flies);
    }
}

function targetFlies() {
    if (randomNum == 0) {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                flies[i].targetX = player.posX
                flies[i].targetY = player.posY
                console.log(flies);
            }, 1000);
        }

    }
}

function flyParade() {
    if (randomNum == 1) {

    }
}