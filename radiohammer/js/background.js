BG1 = Class.create(Group, {
	initialize: function() {
		Group.apply(this);
		var game = Game.instance;
		var that = this;

		//Background
		var bg = new Sprite(GAME_WIDTH, GAME_HEIGHT);
		bg.backgroundColor = "#66CCFF";

		var city = new Sprite(GAME_WIDTH, GAME_HEIGHT);
		city.image = game.assets['img/bg.png'];

		//Animation
		var animationGroup = new Group();
		this.animationGroup = animationGroup;

		cloud1 = new Cloud(525, 386, 'img/cloud1.png');
        animationGroup.addChild(cloud1);
        cloud2 = new Cloud(384, 201, 'img/cloud2.png');
        animationGroup.addChild(cloud2);

        this.addChild(bg);
		this.addChild(animationGroup);
		this.addChild(city);
	}
});

BG2 = Class.create(Group, {
	initialize: function() {
		Group.apply(this);
		var game = Game.instance;
		var that = this;

		//Background
		var bg = new Sprite(GAME_WIDTH, GAME_HEIGHT);
		bg.backgroundColor = "gray";
		this.addChild(bg);
	}
});

function NextBackground(bgGroup) {
	for(var i = 0; i < bgGroup.childNodes.length; i++) {
		bgGroup.childNodes[i].x -= 10;
	}
}