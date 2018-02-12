class Enemy extends Moveable {
    constructor(options) {
        super(Object.assign(options, {
            sprite: 'snake',
            collision: false
        }));
    }
}