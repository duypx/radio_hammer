var bit = [0, 1, 0, 0, 1, 1, 0, 2, 1, 2,
			0, 2, 2, 1, 0, 0, 1, 1, 2, 2,
			1, 0, 0, 0, 2, 1, 1, 0, 0, 0,
			0, 2, 1, 2, 1, 0, 0, 1, 2, 0];

STAGE1_EPISODE1 = Class.create(Scene, {
	initialize: function() {
		var game;
		var backgroundGroup, enemyGroup, effectGroup;
		var mainCharacter, minorCharacter, hammer, tam;
		var that = this;
        var flag = false;

		Scene.apply(this);
		game = Game.instance;

		//Create Background Group
		backgroundGroup = new Group();
		this.backgroundGroup = backgroundGroup;

		var bg1 = new BG1();
		// this.bg1 = bg1;
		var bg2 = new BG2();
		// this.bg2 = bg2;
		bg2.moveTo(GAME_WIDTH, 0);
		var bg3 = new BG1();
		// this.bg3 = bg3;
		bg3.moveTo(2 * GAME_WIDTH, 0);

		backgroundGroup.addChild(bg1);
		backgroundGroup.addChild(bg3);
		backgroundGroup.addChild(bg2);

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
		this.mp = mp;

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

		//Tieu diem
		tam = new Sprite(100, 100);
		tam.moveTo(550,700);
		tam.backgroundColor = "red";
		this.tam = tam;

		//Create Enemy Group
		enemyGroup = new Group();
		this.enemyGroup = enemyGroup;

		//Create Effect Group
        var effectGroup = new Group();
        this.effectGroup = effectGroup;

        //Sound
        var bgm = game.assets['sound/music1.mp3'];
        this.bgm = bgm;
        this.bgm.play();

        //Button Pause/Resume
        var pauseBtn = new Sprite(50, 50);
        pauseBtn.image = game.assets['img/pause.png'];
        pauseBtn.moveTo(1600, 0);
        this.pauseBtn = pauseBtn;
		pauseBtn.addEventListener(Event.TOUCH_END, function() {
			that.handleTouchPauseBtn(pauseBtn);
			if(paused) {
				that.bgm.pause();
			}
			else {
				that.bgm.play();
			}
		});

        //Button restart
        var restartBtn = new Sprite(50, 50);
        restartBtn.image = game.assets['img/restart.png'];
        restartBtn.moveTo(1660, 0);
        this.restartBtn = restartBtn;
        restartBtn.addEventListener(Event.TOUCH_END, function() {
        	that.bgm.stop();
        	resume();
        	game.replaceScene(new STAGE1_EPISODE1());
        });

		//Add childnodes
		this.addChild(backgroundGroup);
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
		this.hit = hit;
		this.score = 0;
		this.perfect = 0;//*10
		this.great = 0;//*5
		this.good = 0;//*3
		this.bad = 0;//*1
		this.miss = 0;
		this.nextMusic = 1;
		this.count = 0;

		this.addEventListener(Event.ENTER_FRAME, this.update);

		this.backgroundGroup.addEventListener(Event.TOUCH_START, function() {
			if(!that.flag) {
				that.flag = true;
				that.handleTouchEvent();
				setTimeout(function() {
					that.flag = false;
				}, 200);
			}
		});
		
		enemyGroup.addEventListener(Event.TOUCH_START, function() {
			if(!that.flag) {
				that.flag = true;
				that.handleTouchEvent();
				setTimeout(function() {
					that.flag = false;
				}, 200);
			}
		});

		mainCharacter.addEventListener(Event.TOUCH_START, function() {
			if(!that.flag) {
				that.flag = true;
				that.handleTouchEvent();
				setTimeout(function() {
					that.flag = false;
				}, 200);
			}
		});

		minorCharacter.addEventListener(Event.TOUCH_START, function() {
			if(!that.flag) {
				that.flag = true;
				that.handleTouchEvent();
				setTimeout(function() {
					that.flag = false;
				}, 200);
			}
		});

		hammer.addEventListener(Event.TOUCH_START, function() {
			if(!that.flag) {
				that.flag = true;
				that.handleTouchEvent();
				setTimeout(function() {
					that.flag = false;
				}, 200);
			}
		});
	},

	handleTouchEvent: function(evt) {
		if(this.hp.width > 0) {
			Action(this.hammer);
			var enemy;
			enemy = this.enemyGroup.childNodes[0];

			this.hit = KillEnemy(enemy, this.tam, this.hp, this.effectGroup, this.bonus, this.hit);

			this.score = this.hit[0];
			this.perfect = this.hit[1];
			this.great = this.hit[2];
			this.good = this.hit[3];
			this.bad = this.hit[4];
			this.miss = this.hit[5];
			this.setScore(this.score);
		}
	},

	handleTouchPauseBtn: function(btn) {
		var game = Game.instance;
		if(!paused) {
			pause();
		}
		else {
			resume();
		}
		btn.image = paused ? game.assets['img/play.png'] : game.assets['img/pause.png'];
	},

	update: function(evt) {
		//Game over
		if(this.hp.width <= 0) {
			this.bgm.stop();	
			this.removeChild(this.enemyGroup);
			var scorePopup = new ScorePopup(this.hit);
			this.addChild(scorePopup);
			this.hp.width = 300;
		}

		//next bgm
		if(this.bgm.currentTime >= this.bgm.duration ) {
			this.pauseBtn.visible = false;
			this.restartBtn.visible = false;
				this.flag = true;
			if(this.nextMusic < 3) {
				RemoveEnemy(this.enemyGroup);
				NextBackground(this.backgroundGroup);
				this.count += 10;
				if(this.count >= GAME_WIDTH) {
					this.flag = false;
					this.count = 0;
					this.nextMusic++;
					this.bgm = Game.instance.assets['sound/music'+this.nextMusic+'.mp3'];
					this.bgm.play();
					this.pauseBtn.visible = true;
					this.restartBtn.visible = true;
					Game.instance.fps +=10;
				}
			}
			else {
				Game.instance.fps +=10;
				this.removeChild(this.enemyGroup);
				var scorePopup = new ScorePopup(this.hit);
				this.addChild(scorePopup);
				this.hp.width = 300;
			}
		}
		else {
			//Enemy xuat hien
			if(this.generateEnemyTimer >= 1) {
				this.generateEnemyTimer -= 1;
				var a = bit[this.i];
				CreateEnemy(this.enemyGroup, a);
				if(this.i < bit.length - 1) {
					this.i++;
				}
				else {
					this.i = 0;
				}
			}

			this.generateEnemyTimer += 0.05;
			HPCharacter(this.hp, this.enemyGroup);
		}
	},

	setScore: function(value) {
		this.score = value;
		this.scoreLabel.text = 'SCORE<br>' + this.score;
	}
});