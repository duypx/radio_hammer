/**
 * Class for play background music or play sound effect
 * @type @exp;Class@call;create
 */
var RHSound = Class.create({
    
    bgmName: null,
    bgmBuffer: false,
    bgmPlayed: false,
    isBgmWaiting: false,
    bgmRepeat: true,
    enableSound: true,
    paused: false,
    
    initialize: function() {
        RHSound.instance = this;
        var enableSoundLocalStorage = localStorage.getItem('ENABLE_SOUND');
        if (enableSoundLocalStorage === null) {
            localStorage.setItem('ENABLE_SOUND', this.enableSound);
        } else {
            this.enableSound = JSON.parse(enableSoundLocalStorage);
        }
        
        Game.instance.addEventListener(Event.ENTER_FRAME, function(){
            RHSound.instance.update();
        });
    },
    update: function() {
        if (!this.enableSound || !this.bgmRepeat || (this.bgmName === null)) {
            return;
        }
        
        if (this.bgmPlayed && this.bgmBuffer.currentTime >= this.bgmBuffer.duration) {
            this.bgmBuffer.play();
        }
    },
    isEnableSound: function() {
        return this.enableSound;
    },
    switchEnableSound: function() {
        this.enableSound = !this.enableSound;
        
        if (this.enableSound) {
            if (this.bgmName && !this.isBgmWaiting) {
                this.bgmBuffer.play();
                this.bgmPlayed = true;
            }
        } else {
            this.stopBackground();
        }
        
        localStorage.setItem('ENABLE_SOUND', JSON.stringify(this.enableSound));
    },
    playBackground: function(music, repeat) {
        if (music !== this.bgmName) {
            this.stopBackground();
            this.bgmName = music || null;
            if(this.bgmName !== null){
                this._loadBgmBuffer();
            } else {
                this.bgmBuffer = null;
            }
        }
        
        this.bgmRepeat = (typeof repeat === 'undefined') || repeat;
    },
    replayBackground: function(){
        if(this.enableSound){
            this.bgmBuffer.play();
            this.bgmPlayed = true;
        }
    },
    
    _loadBgmBuffer: function() {
        this.bgmBuffer = null;
        
        if(typeof Game.instance.assets[this.bgmName] !== 'undefined'){
            this.bgmBuffer = Game.instance.assets[this.bgmName];
            delete Game.instance.assets[this.bgmName];
            
            this.isBgmWaiting = false;
            if (this.enableSound && !this.paused) {
                this.bgmBuffer.play();
                this.bgmPlayed = true;
            }
        } else {
            this.isBgmWaiting = true;
            this.bgmBuffer = enchant.Sound.load(this.bgmName, 'audio/mp3', function() {
                if (this === RHSound.sharedSound().bgmBuffer) {
                    RHSound.sharedSound().isBgmWaiting = false;
                    if (RHSound.sharedSound().enableSound && !RHSound.sharedSound().paused) {
                        RHSound.sharedSound().bgmBuffer.play();                            
                        RHSound.sharedSound().bgmPlayed = true;
                    }
                }
            });
        }
    },
    preloadForDomAudio: function(music){
        this.stopBackground();
        
        this.bgmName = music;
        this.bgmBuffer = null;
        this.bgmBuffer = enchant.Sound.load(this.bgmName, 'audio/mp3', function() {
            if (this === RHSound.sharedSound().bgmBuffer) {
                RHSound.sharedSound().bgmBuffer.stop();
            }
        });
    },
    stopBackground: function() {
        if (this.bgmName === null || this.isBgmWaiting) {
            return;
        }
        
        if (this.bgmPlayed) {
            this.bgmPlayed = false;
            this.bgmBuffer.stop();
        }
    },
    playEffect: function(music) {
        if (this.enableSound) {
            Game.instance.assets[music].play();
        }
    },
    /**
     * pause music.
     * If background can pause, pause it. 
     * 
     * @returns {undefined}
     */
    pause: function() {
        if (this.paused) {
            return;
        }
        this.paused = true;
        
        if (!this.enableSound) {
            return;
        }
        
        if (this.bgmName && this.bgmPlayed) {
            this.bgmBuffer.pause();
        }
    },
    /**
     * resume music, after one paused.
     * 
     * continue play backround if background was not finished
     * 
     * @returns {undefined}
     */
    resume: function() {
        if (!this.paused) {
            return;
        }
        this.paused = false;
        
        if (!this.enableSound) {
            return;
        }        
        if (this.bgmName !== null) {
            if(this.bgmRepeat || isNaN(this.bgmBuffer.currentTime) || (this.bgmBuffer.currentTime < this.bgmBuffer.duration)){
                this.bgmBuffer.play();
                this.bgmPlayed = true;
            }
        }
    }
});

RHSound.instance = false;
RHSound.sharedSound = function() {
    return RHSound.instance ? RHSound.instance : new RHSound();
};