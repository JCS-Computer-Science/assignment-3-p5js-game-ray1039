class Attack {
    constructor(posX, posY, velX, velY) {
        this.posX = posX;
        this.posY = posY;
        this.velX = velX;
        this.velY = velY;
    }

    collision(player) {
        if (player.posX >= this.posX - 11 & player.posX <= this.posX + 11 && player.posY >= this.posY - 11 && player.posY <= this.posY + 11 && invuln == false) {
            player.hp -= 3;
            console.log("Hit!");
            invuln = true
            setTimeout(() => {
                invuln = false;
            }, 1000);
        }
    }
}