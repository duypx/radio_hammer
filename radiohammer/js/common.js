var GAME_WIDTH = 1790;
var GAME_HEIGHT = 1080;
var FRAME_PER_SECOND = 20;
var SCALE_X = 1;
var SCALE_Y = 1;
var MARGIN_LEFT = 0;
var MARGIN_RIGHT = 0;
var SCALE_BUTTON = 1.1;
var hit = [0, 0, 0, 0, 0, 0];
        // score = hit[0]; perfect = hit[1]; great = hit[2]; good = hit[3]; bad = hit[4]; miss = hit[5];

// overite some enchant core function
enchant.Core.prototype._requestNextFrame = function(delay) {
    this.rId = null;
    this.rTimeout = null;
    
    if (!this.ready) {
        return;
    }
    if (this.fps >= 60 || delay <= 16) {
        this._calledTime = window.getTime();
        this.rId = window.requestAnimationFrame(this._callTick);
    } else {
        this.rTimeout = setTimeout(function() {
            var core = enchant.Core.instance;
            core._calledTime = window.getTime();
            core.rId = window.requestAnimationFrame(core._callTick);
        }, Math.max(0, delay));
    }
};

enchant.Core.prototype.resume = function() {
    if (this.ready) {
        return;
    }
    if (this.rId) {
        window.cancelAnimationFrame(this.rId);
    }
    if (this.rTimeout) {
        clearTimeout(this.rTimeout);
    }            
    this.currentTime = window.getTime();
    this.ready = true;
    this.running = true;
    this._requestNextFrame(0);
};

enchant.Core.prototype.replaceScene = function(scene) {
    var currentScene = this.popScene();
    while (currentScene.childNodes.length > 0) {
        currentScene.removeChild(currentScene.childNodes[0]);
    }
    return this.pushScene(scene);
};

enchant.Event.prototype._initPosition = function(pageX, pageY) {
    var core = enchant.Core.instance;
    this.x = this.localX = (pageX - core._pageX) / core.scale / SCALE_X;
    this.y = this.localY = (pageY - core._pageY) / core.scale / SCALE_Y;
};

function extendOptions(opt1, opt2) {
    var optTemp = {};
    for (var attrName in opt1) {
        optTemp[attrName] = opt1[attrName];
    }
    for (var attrName in opt2) {
        optTemp[attrName] = opt2[attrName];
    }
    return optTemp;
}