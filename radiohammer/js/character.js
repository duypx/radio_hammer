var MainCharacter = Class.create(Sprite, {
	initialize: function() {
		Sprite.apply(this, [231, 309]);
		this.image = Game.instance.assets['img/mainCharacter.png'];
		
		this.addEventListener(Event.ENTER_FRAME, this.updateMainCharacter);
	},
	updateMainCharacter: function() {

	}
});

var MinorCharacter = Class.create(Sprite, {
	initialize: function() {
		Sprite.apply(this, 	[152, 177]);
		this.image = Game.instance.assets['img/minorCharacter.png'];
		this.frame = 0;

		this.addEventListener(Event.ENTER_FRAME, this.updateMinorCharacter);
	},
	updateMinorCharacter: function() {
		this.frame = (this.age % 2);
	}
});

var Hammer = Class.create(Sprite, {
	initialize: function() {
		Sprite.apply(this, [252, 289]);
		this.image = Game.instance.assets['img/hammer.png'];
	}
});

function HPCharacter(hp, enemyGroup) {
	for (var i = 0; i < enemyGroup.childNodes.length; i++) {
		var enemy;
		enemy = enemyGroup.childNodes[i];
		if(enemy.x < 300) {
			if(hp.width > 0) {
				hp.width -= 30;
			}
		}
	}
}

function Action(object) {
	object.tl.rotateTo(-360, 5).rotateTo(360,0);
}