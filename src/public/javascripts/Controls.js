const codeTranslate = {
    87: 'w',
    65: 'a',
    83: 's',
    68: 'd'
};
//make codeTranslate work either way
Object.keys(codeTranslate)
    .forEach(code => {
        const disp = codeTranslate[code];
        codeTranslate[disp] = code;
    });

class Controls {
    constructor() {
        this.keyRegistry = {};
        window.addEventListener('keydown', e => this.handleKey(e));
    }
    listen(keyDisp, fn) {
        //if called with an object call this function again with each individual pair
        if (arguments.length === 1 && typeof keyDisp === 'object') {
            const disps = Object.keys(keyDisp);
            for (let i = 0; i < disps.length; i++ ) {
                this.listen(disps[i], keyDisp[disps[i]]);
            }
        }
        else {
            const code = codeTranslate[keyDisp];
            if (code) {
                this.keyRegistry[code] = fn;
            }
            else {
                console.error(`tried binding to ${keyDisp} keypresses but there is no matching key code in codeTranslate!`);
            }
        }
    }
    handleKey(e) {
        const handler = this.keyRegistry[e.which];
        if (handler) {
            handler();
        }
    }
}