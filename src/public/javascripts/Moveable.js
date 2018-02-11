const directionDeltas = {
    up: [0, -1],
    down: [0, 1],
    left: [-1, 0],
    right: [1, 0]
};

class Moveable {
    constructor (options) {
        this.world = options.world;
        this.x = options.x;
        this.y = options.y;
        this.sprite = options.sprite;
        this.collision = options.collision;

        this.world.spawnSprite(this);
    }
    tryMove(dir) {
        const [deltaX, deltaY] = directionDeltas[dir],
            newX = this.x + deltaX,
            newY = this.y + deltaY;

        if (this.world.canMoveTo(newX, newY)) {
            this.x = newX;
            this.y = newY;
            return directionDeltas[dir];
        }
        else {
            return [0, 0];
        }
    }
}