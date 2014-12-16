Cloud = Class.create(Sprite, {
	initialize: function(width, height, img) {
		Sprite.apply(this, [width, height]);
		this.image = Game.instance.assets[img];
		this.moveTo(Math.random() * GAME_WIDTH, Math.random() * 50);
		this.addEventListener(Event.ENTER_FRAME, this.updateCloud);

	},

	updateCloud: function(evt) {
		var game;
		var xSpeed = 1;
		game = Game.instance;
		this.x += xSpeed;
		if(this.x > game.width) {
			this.moveTo(- Math.random() * GAME_WIDTH, Math.random()*50);
		}
	}
});

Effect = Class.create(Sprite, {
	initialize: function(img) {
		Sprite.apply(this, [200, 100]);
		this.image = Game.instance.assets[img];
		this.moveTo(400, 400);
		this.addEventListener(Event.ENTER_FRAME, this.updateEffect)
	},

	updateEffect: function(evt) {

	}
});