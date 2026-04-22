class Player {
    constructor(x, y, sizeX, sizeY, velX, velY, hp, def, atk, item) {
        this.x = x;
        this.y = y;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.velX = velX;
        this.velY = velY;
        this.hp = hp;
        this.def = def;
        this.atk = atk
        this.item = item
    }

    colisionCheckBorder() {
        if (this.x >= canvasX / 2 + battleBox.sizeX / 2 - this.sizeX / 2) {
            this.x = canvasX / 2 + battleBox.sizeX / 2 - this.sizeX / 2;
        }
        if (this.x <= canvasX / 2 - battleBox.sizeX / 2 + this.sizeX / 2) {
            this.x = canvasX / 2 - battleBox.sizeX / 2 + this.sizeX / 2;
        }
        if (this.y >= battleBox.posY + battleBox.sizeY / 2 - this.sizeY / 2) {
            this.y = battleBox.posY + battleBox.sizeY / 2 - this.sizeY / 2;
        }
        if (this.y <= battleBox.posY - battleBox.sizeY / 2 + this.sizeY / 2) {
            this.y = battleBox.posY - battleBox.sizeY / 2 + this.sizeY / 2;
        }
    }

    movement() {
        if (inBattle) {
            if (keyIsDown(RIGHT_ARROW)) {
                this.x += this.velX;
            }

            if (keyIsDown(LEFT_ARROW)) {
                this.x -= this.velX;
            }

            if (keyIsDown(UP_ARROW)) {
                this.y -= this.velY;
            }

            if (keyIsDown(DOWN_ARROW)) {
                this.y += this.velY;
            }
        }
    }
}