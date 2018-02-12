const renderDebug = {
    coords: false
};

class Renderer {
    constructor(world) {
        this.world = world;
        this.canvas = document.querySelector('#c');
        this.ctx = this.canvas.getContext('2d');
        this.tileSize = 100;

        function tile(name) {
            return `/images/tiles/${name}.png`
        }
        function sprite(name) {
            return `/images/sprites/${name}.png`
        }
        function ui(name) {
            return `/images/ui/${name}.png`
        }
        this.tileSet = {};
        this.loads = [];
        this.load('ground', tile('ground'));
        this.load('blood', tile('blood'));
        this.load('wall', tile('wall'));
        this.load('player', sprite('player'));
        this.load('snake', sprite('snake'));
        this.load('lose-sign', ui('lose-sign'));
        this.load('win-sign', ui('win-sign'));
        this.c = 0;
        this.d = 0;
        const computeSizes = () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.cTiles = Math.ceil(window.innerWidth / this.tileSize);
            this.dTiles = Math.ceil(window.innerHeight / this.tileSize);
        };
        computeSizes();
        window.addEventListener('resize', computeSizes);
    }
    ready() {
        return Promise.all(this.loads);
    }
    load(name, src) {
        this.loads.push(new Promise((resolve, reject) => {
            const img = new Image(),
                sz = this.tileSize + 'px';
            img.style.width = sz;
            img.style.height = sz;
            img.addEventListener('load', () => {
                this.tileSet[name] = img;
                resolve();
            });
            img.src = src;
        }))
    }
    showSign(name) {
        this.sign = name;
    }
    render() {
        //tiles
        const t = this.world.tiles;
        for (let i = 0; i < this.cTiles; i++ ) {
            for (let j = 0; j < this.dTiles; j++) {
                const tileX = this.c + i,
                    tileY = this.d + j;
                this.ctx.drawImage(
                    this.tileSet[(
                        tileX < 0 || tileY < 0 || tileX >= this.world.iMax || tileY >= this.world.jMax ?
                            'wall' : t[tileX][tileY]
                    )],
                    i * this.tileSize,
                    j * this.tileSize,
                    this.tileSize,
                    this.tileSize
                );
                if (renderDebug.coords) {
                    this.ctx.font = '12pt sans-serif';
                    this.ctx.fillText(`i: ${i}, j: ${j}`, i * this.tileSize, j * this.tileSize + 20);
                    this.ctx.fillText(`ci:${this.c + i}, dj:${this.d + j}`, i * this.tileSize, j * this.tileSize + 40);
                }
            }
        }

        //sprites
        const sprites = this.world.sprites;
        let sprite;
        for (let i = 0; i < sprites.length; i++) {
            sprite = sprites[i];
            this.ctx.drawImage(
                this.tileSet[sprite.sprite],
                (sprite.x - this.c) * this.tileSize,
                (sprite.y - this.d)* this.tileSize,
                this.tileSize,
                this.tileSize
            )
        }

        //ui
        if (this.sign) {
            this.ctx.drawImage(
                this.tileSet[this.sign],
                0,0
            )
        }
    }
}