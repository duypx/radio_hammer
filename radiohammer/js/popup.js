var ScorePopup = Class.create(Group, {
	initialize: function(hit) {
		Group.apply(this);
		var game = Game.instance;
		var that = this;
		var score, perfect, great, good, bad, miss;
		score = hit[0];
		perfect = hit[1];
		great = hit[2];
		good = hit[3];
		bad = hit[4];
		miss = hit[5];

		var background = new Sprite(GAME_WIDTH, GAME_HEIGHT);
		backgroundColor = 'rgba(0, 0, 0, 0.5)';
		this.addChild(background);

		var popupPanel = new Group();

		var popupBG = new Sprite(400, 400);
		popupBG.backgroundColor = "black";
		popupPanel.addChild(popupBG);

		var label = new Label();
		label.color = 'white';
		label.font = '36px strong';
		label.text = 'Score: ' + score +
					'<br>Perfect: ' + perfect + 
					'<br>Great: ' + great + 
					'<br>Good: ' + good + 
					'<br>Bad: ' + bad + 
					'<br>Miss: ' + miss
		popupPanel.addChild(label); 

		var restartBtn = new Sprite(50, 50);
		restartBtn.image = game.assets['img/restart.png'];
		restartBtn.moveTo(300, 300);
		popupPanel.addChild(restartBtn);

		restartBtn.addEventListener(Event.TOUCH_END, function() {
			that.closePopup();
			game.replaceScene(new STAGE1_EPISODE1);
		});

		popupPanel.x = (GAME_WIDTH - popupBG.width) / 2;
        popupPanel.y = (GAME_HEIGHT - popupBG.height) / 2;
        this.addChild(popupPanel);
	},
	
	closePopup: function() {
		this.parentNode.removeChild(this);
	}
});