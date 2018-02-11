class Player extends Moveable {
    constructor (options) {
        super(Object.assign(options, {
            sprite: 'player',
            collision: false
        }));
        this.controls = options.controls;
        this.controls.listen({
            w: () => this.tryMove('up'),
            a: () => this.tryMove('left'),
            s: () => this.tryMove('down'),
            d: () => this.tryMove('right'),
        })
    }
    tryMove(dir) {
        const deltas = super.tryMove(dir);
        renderer.c += deltas[0];
        renderer.d += deltas[1];
    }
}