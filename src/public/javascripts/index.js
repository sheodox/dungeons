const world = new World(),
    renderer = new Renderer(world),
    chrono = new Chrono(),
    controls = new Controls();
let player, game;

function randomCoords() {
    return {
        x: Math.round(Math.random() * world.iMax),
        y: Math.round(Math.random() * world.jMax)
    };
}

renderer.ready()
    .then(() => {
        chrono.register('frame', renderer.render.bind(renderer));
        const enemies = [];
        for (let i = 0; i < 20; i++ ) {
            enemies.push(new Enemy(Object.assign(randomCoords(), {
                    world
                })
            ));
        }
        player = new Player({
            x: Math.floor(renderer.cTiles / 2),
            y: Math.floor(renderer.dTiles / 2),
            world,
            controls
        });
        game = new Game(player, enemies);
    });
