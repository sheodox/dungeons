class World {
    constructor() {
        this.tiles = [];
        this.sprites = [];
        this.iMax = 30;
        this.jMax = this.iMax;

        for (let i = 0; i < this.iMax; i++ ) {
            const row = [];
            for (let j = 0; j < this.jMax; j++ ) {
                row.push('ground');
            }
            this.tiles.push(row);
        }
    }
    canMoveTo(x, y) {
        //a sprite with collision can move to a tile if:
        // 1. the location is within bounds
        // 2. the sprite has no collision
        // 3. the sprite has collision but isn't at this location
        return (x >= 0 && y >= 0 && y < this.jMax && x < this.iMax) &&
            (!this.sprites.some(moveable => {
                return moveable.collision || (moveable.x === x && moveable.y === y)
            }));
    }
    spawnSprite(moveable) {
        this.sprites.push(moveable);
    }
    despawnSprite(moveable) {
        const i = this.sprites.indexOf(moveable);
    }
}
