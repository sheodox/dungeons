function randomBoolean() {
    return !!Math.round(Math.random());
}

/**
 * random delta coordinates from enemy to player
 * @param x - enemy x
 * @param y - enemy y
 * @param c - player x
 * @param d - player y
 */
function deltaToCoords(x, y, c, d) {
    const deltaX = c - x,
        deltaY = d - y,
        dir = randomBoolean();
    function getSign(num) {
        return num === 0 ? 0 : num / Math.abs(num);
    }
    //give coordinates in the direction of the player, divide by absolute value so we turn it into a 1 or -1
    return [
        dir ? getSign(deltaX) : 0,
        !dir ? getSign(deltaY) : 0
    ]
}

class Game {
    constructor(player, enemies) {
        this.player = player;
        this.enemies = enemies;
    }
    killEnemy(enemy) {
        console.log(`enemy killed at (${enemy.x}, ${enemy.y})`);
        world.tiles[enemy.x][enemy.y] = 'blood';
        this.enemies.splice(this.enemies.indexOf(enemy), 1);
        world.despawnSprite(enemy);
    }
    playerMoved() {
        //shouldn't ever be more than one sprite because they enemies can only move to the same spot if it's the player's tile
        const initiallyUnderPlayer = world.getSpriteAtLocation(this.player.x, this.player.y);
        if (initiallyUnderPlayer.length === 2) { //player + enemy = 2
            //enemies spawn before player, enemy is always going to be first
            this.killEnemy(initiallyUnderPlayer[0])
        }
        const onPlayerEnemies = [];
        this.enemies.forEach(enemy => {
            const [deltaX, deltaY] = deltaToCoords(enemy.x, enemy.y, this.player.x, this.player.y);

            const existingSprite = world.getSpriteAtLocation(enemy.x + deltaX, enemy.y + deltaY),
                movingToPlayer = existingSprite.includes(this.player);

            if (!existingSprite.length || movingToPlayer) {
                enemy.x += deltaX;
                enemy.y += deltaY;
                if (movingToPlayer) {
                    onPlayerEnemies.push(enemy);
                }
            }
        });

        if (onPlayerEnemies.length > 1) {
            console.log('died');
            renderer.showSign('lose-sign');
            controls.enabled = false;
        }
        //enemy killed
        else if (onPlayerEnemies.length === 1) {
            this.killEnemy(onPlayerEnemies[0]);
        }

        if (!this.enemies.length) {
            renderer.showSign('win-sign');
            controls.enabled = false;
        }
    }
}