const typeMap = {
    frame: 'frameFns',
    time: 'timeFns'
};
class Chrono {
    constructor() {
        this.frameFns = [];
        this.timeFns = [];
        this.tick = 10;
        const callFns = (type) => {
            const fns = this[type];
            return function() {
                let fn;
                for (let i = 0; i < fns.length; i++) {
                    fn = fns[i];
                    if (fn) {
                        fn();
                    }
                }
            }
        };

        const callFrameFns = callFns('frameFns');
        const callTimeFns = callFns('timeFns');
        setInterval(callTimeFns, this.tick);
        function frame() {
            callFrameFns();
            requestAnimationFrame(frame)
        }
        frame();
    }
    register(type, fn) {
        const fns = this[typeMap[type]];
        const index = fns.length;
        fns.push(fn);
        return index;
    }
    unregister(type, index) {
        const fns = this[typeMap[type]];
        fns[index] = null;
    }
}