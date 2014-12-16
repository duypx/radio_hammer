var bit = [0, 1, 0, 0, 1, 1, 0, 2, 1, 2,
					0, 2, 2, 1, 0, 0, 1, 1, 2, 2,
					1, 0, 0, 0, 2, 1, 1, 0, 0, 0,
					0, 2, 1, 2, 1, 0, 0, 1, 2, 0];
// var i = 0;

STAGE1_EPISODE1 = Class.create(Scene, {
	initialize: function() {
		var game, bg, city, mainCharacter, enemyGroup, minorCharacter, hammer, animationGroup, cloud1, cloud2, tam;
		var that = this;

		Scene.apply(this);
		game = Game.instance;


		//Background
		bg = new Sprite(GAME_WIDTH, GAME_HEIGHT);
		bg.backgroundColor = "#66CCFF";

		city = new Sprite(GAME_WIDTH, GAME_HEIGHT);
		city.image = game.assets['img/bg.png'];

		//HP and MP
		var hpbg = new Sprite(300, 30);
		hpbg.backgroundColor = "white";
		hpbg.moveTo(50, 50);
		var hp = new Sprite(300, 30);
		hp.backgroundColor = "red";
		hp.moveTo(50, 50);
		this.hp = hp;

		var mpbg = new Sprite(150, 30);
		mpbg.backgroundColor = "white";
		mpbg.moveTo(50,90);
		var mp = new Sprite(120,30);
		mp.backgroundColor = "blue";
		mp.moveTo(50,90);

		//Score
		var scoreLabel = new Label();
		scoreLabel.moveTo(GAME_WIDTH / 2 - 50, 10);
		scoreLabel.color = 'black';
		scoreLabel.font = '36px strong';
		scoreLabel.text = 'SCORE<br>0';
		scoreLabel.textAlign = 'center';

		this.scoreLabel = scoreLabel;

		//Main Character
		mainCharacter = new MainCharacter();
		mainCharacter.moveTo(200, 550);

		//Hammer
		hammer = new Hammer();
		hammer.moveTo(mainCharacter.x-12, mainCharacter.y-70);
		this.hammer = hammer;

		//Minor Character
		minorCharacter = new MinorCharacter();
		minorCharacter.moveTo(400, 830);

		//
		tam = new Sprite(100, 100);
		tam.moveTo(550,700);
		tam.backgroundColor = "red";
		this.tam = tam;

		//Enemy
		enemyGroup = new Group();
		this.enemyGroup = enemyGroup;

		//Animation
		animationGroup = new Group();
		this.animationGroup = animationGroup;

		cloud1 = new Cloud(525, 386, 'img/cloud1.png');
        animationGroup.addChild(cloud1);
        cloud2 = new Cloud(384, 201, 'img/cloud2.png');
        animationGroup.addChild(cloud2);

        //Button Pause/Resume
        var pauseBtn = new Sprite(50, 50);
        // pauseBtn.backgroundColor = "gray";
        pauseBtn.image = game.assets['img/pause.png'];
        pauseBtn.moveTo(1600, 0);
        var flag = false;
        pauseBtn.addEventListener(Event.TOUCH_END, function() {
        	if(!flag) {
        		pause();
        		pauseBtn.image = game.assets['img/play.png'];
        		flag = true;
        	}
        	else {
        		resume();
        		pauseBtn.image = game.assets['img/pause.png'];
        		flag = false;
        	}
        });

        //Button restart
        var restartBtn = new Sprite(50, 50);
        // restartBtn.backgroundColor = "black";
        restartBtn.image = game.assets['img/restart.png'];
        restartBtn.moveTo(1660, 0);
        restartBtn.addEventListener(Event.TOUCH_END, function() {
        	resume();
        	game.replaceScene(new STAGE1_EPISODE1());
        });

        var effectGroup = new Group();
        this.effectGroup = effectGroup;

		//Add childnodes
		this.addChild(bg);
		this.addChild(animationGroup);
		this.addChild(city);
		this.addChild(hpbg);
		this.addChild(hp);
		this.addChild(mpbg);
		this.addChild(mp);
		this.addChild(scoreLabel);
		this.addChild(hammer);
		this.addChild(mainCharacter);
		this.addChild(effectGroup);
		this.addChild(enemyGroup);
		this.addChild(minorCharacter);
		this.addChild(tam);
		this.addChild(restartBtn);
		this.addChild(pauseBtn);

		this.generateEnemyTimer = 0;
		this.i = 0;
		this.bonus = 0;
		this.score = 0;
		this.perfect = 0;//*10
		this.great = 0;//*5
		this.good = 0;//*3
		this.bad = 0;//*1
		this.miss = 0;


		this.addEventListener(Event.ENTER_FRAME, this.update);
		city.addEventListener(Event.TOUCH_START, function() {
			that.handleTouchEvent();
		});
		enemyGroup.addEventListener(Event.TOUCH_START, function() {
			that.handleTouchEvent();
		});
		mainCharacter.addEventListener(Event.TOUCH_START, function() {
			that.handleTouchEvent();
		});
		minorCharacter.addEventListener(Event.TOUCH_START, function() {
			that.handleTouchEvent();
		});
		hammer.addEventListener(Event.TOUCH_START, function() {
			that.handleTouchEvent();
		});
	},

	handleTouchEvent: function(evt) {
		if(this.hp.width > 0) {
			// var game;
			// game = Game.instance;
			this.hammer.tl.rotateTo(-360, 5).rotateTo(360,0);
			var enemy, effect;
			enemy = this.enemyGroup.childNodes[0];
			if(!enemy) {
				effect = new Effect('img/miss.jpg');
					this.effectGroup.addChild(effect);
					setTimeout(function() {
						effect.parentNode.removeChild(effect);
					}, 200);
				this.miss += 1;
				this.hp.width -= 30;
			}
			else {
				if(enemy.width == 320) {
					this.bonus = 1;
				}
				else {
					this.bonus = 2;
				}

				if(enemy.x >= 450 && enemy.x <= 530) {
					effect = new Effect('img/perfect.jpg');
					this.effectGroup.addChild(effect);
					setTimeout(function() {
						effect.parentNode.removeChild(effect);
					}, 200);
					this.perfect += 1;
					this.bonus *= 10;
				}
				if(enemy.x >= 410 && enemy.x < 450 || enemy.x >530 && enemy.x <= 570) {
					effect = new Effect('img/great.gif');
					this.effectGroup.addChild(effect);
					setTimeout(function() {
						effect.parentNode.removeChild(effect);
					}, 200);
					this.great += 1;
					this.bonus *= 3;
				}
				if(enemy.x >= 370 && enemy.x < 410 || enemy.x >570 && enemy.x <= 610) {
					effect = new Effect('img/good.jpg');
					this.effectGroup.addChild(effect);
					setTimeout(function() {
						effect.parentNode.removeChild(effect);
					}, 200);
					this.good += 1;
				}
				if(enemy.x >= 330 && enemy.x < 370 || enemy.x >610 && enemy.x <= 650) {
					effect = new Effect('img/bad.jpg');
					this.effectGroup.addChild(effect);
					setTimeout(function() {
						effect.parentNode.removeChild(effect);
					}, 200);
					this.bad += 1;
				}

				if(enemy.x >= 330 && enemy.x <= 650) {
					enemy.tl.moveTo(800, -500, 10, enchant.Easing.SIN_EASEOUT)
					.then(function() {
					// this.enemyGroup.removeChild(enemy);
						enemy.parentNode.removeChild(enemy);
					});
						
					this.setScore(this.score + this.bonus);
				}
				else {
					effect = new Effect('img/miss.jpg');
					this.effectGroup.addChild(effect);
					setTimeout(function() {
						effect.parentNode.removeChild(effect);
					}, 200);
					this.miss += 1;
					this.hp.width -= 30;
				}
			}
		}
	},

	update: function(evt) {
		if(this.hp.width <= 0) {
			// var game;
			// game = Game.instance;
			this.removeChild(this.enemyGroup);
			// console.log("perfect: " + this.perfect);
			// console.log("Great: " + this.great);
			// console.log("Good: " + this.good);
			// console.log("Bad: " + this.bad);
			// console.log("Miss: " + this.miss);
			// game.replaceScene(new ScorePopup(this.score, this.perfect, this.great, this.good, this.bad, this.miss));
			var scorePopup = new ScorePopup(this.score, this.perfect, this.great, this.good, this.bad, this.miss);
			this.addChild(scorePopup);
			this.hp.width = 300;
			// break;
		}
		
		if(this.generateEnemyTimer >= 1) {
			var enemy;
			var a = bit[this.i];
			this.generateEnemyTimer -= 1;
			switch(a){
				case 1: 
				enemy = new Enemy(320, 320, 'img/enemy1.png');
				this.enemyGroup.addChild(enemy);
				break;
				case 2:
				enemy = new Enemy(240, 240, 'img/enemy2.png');
				this.enemyGroup.addChild(enemy);
				break;
				default:
				break;
			}

			if(this.i < bit.length - 1) {
				this.i++;
			}
			else {
				this.i = 0;
			}
		}
		this.generateEnemyTimer += 0.05;

		for(var i = 0; i < this.enemyGroup.childNodes.length; i++) {
			var enemy;
			enemy = this.enemyGroup.childNodes[i];
			if(enemy.x < 300) {
				if(this.hp.width > 0) {
					effect = new Effect('img/miss.jpg');
					this.effectGroup.addChild(effect);
					setTimeout(function() {
						effect.parentNode.removeChild(effect);
					}, 200);
					this.miss += 1;
					this.hp.width -= 30;
				}
			}
		}
	},

	setScore: function(value) {
		this.score = value;
		this.scoreLabel.text = 'SCORE<br>' + this.score;
	}
});
