enchant();

enchant.ENV.USE_TOUCH_TO_START_SCENE = false;
enchant.ENV.SOUND_ENABLED_ON_MOBILE_SAFARI = true;

function setScale(enchantScale) {
    SCALE_X = window.innerWidth / (GAME_WIDTH * enchantScale);
    SCALE_Y = window.innerHeight / (GAME_HEIGHT * enchantScale);
    
    document.body.style.Transform = 'scale(' + SCALE_X + ', ' + SCALE_Y + ')';
    document.body.style.WebkitTransform = 'scale(' + SCALE_X + ', ' + SCALE_Y + ')';
    
    window.scrollTo(0, 0);
}

function resetScale() {
    document.body.style.Transform = 'scale(1,1)';
    document.body.style.WebkitTransform = 'scale(1,1)';
    
    window.scrollTo(0, 0);
}

function reScale(){
    // on android chrome, window.innerWidth and window.innerHeight not correct. So cheat by setTimeout.
    setTimeout(function() {
        if (window.innerWidth >= window.innerHeight) {
            var game = Game.instance;
            setScale(game.scale);            
            resume();
        } else {
            resetScale();
            pause();
        }
    }, 500); 
}

var paused = false;

function pause() {
	if (paused) {
		return;
	}
	paused = true;
    Game.instance.pause();
    RHSound.sharedSound().pause();
}

function resume() {
	if (!paused) {
		return;
	}
	paused = false;
	Game.instance.resume();
	RHSound.sharedSound().resume();	    
}

function checkFullScreen() {
    // for ios
    if (window.navigator.standalone){
        return true;
    }

    // for firefox, chrome, internet explorer
    if(document.mozFullScreen || document.webkitIsFullScreen || document.msFullscreenElement){
        return true;
    }

    if(document.fullScreenElement && document.fullScreenElement !== null){
        return true;
    }

    return false;
}

window.onload = function() {
	var game = new Game(GAME_WIDTH, GAME_HEIGHT);
	// on ipad, after clear cache, the scale Y is error on the firstime load. So cheat by setTimeout.
	setTimeout(function() {
		if(window.innerWidth >= window.innerHeight) {
			var game = Game.instance;
			setScale(game.scale);
		}
	}, 100);

	window.addEventListener("orientationchange", function() {
		reScale();
	});

	window.onresize = function() {
		// setScale(Math.min(window.innerWidth / game.width, window.innerHeight / game.height));
		reScale();
	}

	// Enable full screen mode.
	window.addEventListener("touchstart", function() {
		if(checkFullScreen()) {
			return;
		}

		var el = document.documentElement;
		var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
		if(typeof rfs !== "undefined" && rfs) {
			rfs.call(el);
		}
		else if(typeof window.ActiveXObject != "undefined") {
			var wscript = new ActiveXObject("WScript.Shell");
			if(wscript !== null) {
				wscript.SendKeys("{F11}");
			}
		}

		// re-scale after go into fullscreen 0.5s.
		reScale();
	});

	document.addEventListener("visibilitychange", function() {
		if(!document.hidden) {
			reScale();
		}
		else {
			pause();
		}
	}, false);

	game.preload([
		//image
		'img/mainCharacter.png',
		'img/enemy1.png',
		'img/enemy2.png',
		'img/minorCharacter.png',
		'img/bg.png',
		'img/hammer.png',
		'img/cloud1.png',
		'img/cloud2.png',
		'img/restart.png',
		'img/play.png',
		'img/pause.png',
		'img/perfect.jpg',
		'img/great.gif',
		'img/good.jpg',
		'img/bad.jpg',
		'img/miss.jpg'
		//sound
	]);

	game.fps = FRAME_PER_SECOND;
	game.onload = function() {
		var stage1_EPISODE1 = new STAGE1_EPISODE1();
		game.pushScene(stage1_EPISODE1);

		if(window.innerWidth < window.innerHeight) {
			pause();
		}
	};
	game.start();
}