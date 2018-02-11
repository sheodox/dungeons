const world = new World(),
    renderer = new Renderer(world),
    chrono = new Chrono(),
    controls = new Controls();
let player;

renderer.ready()
    .then(() => {
        chrono.register('frame', renderer.render.bind(renderer));
        player = new Player({
            x: Math.floor(renderer.cTiles / 2),
            y: Math.floor(renderer.dTiles / 2),
            world,
            controls
        })
    });
