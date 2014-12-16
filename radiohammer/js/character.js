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

		this.addEventListener(Event.ENTER_FRAME, this.updateMinorCharacter);
	},
	updateMinorCharacter: function() {

	}
});

var Hammer = Class.create(Sprite, {
	initialize: function() {
		Sprite.apply(this, [252, 289]);
		this.image = Game.instance.assets['img/hammer.png'];
	}
});

var Enemy = Class.create(Sprite, {
	initialize: function(width, height, img) {
        Sprite.apply(this,[width, height]);
        this.image = Game.instance.assets[img];
        // this.backgroundColor = "red"
        this.x = GAME_WIDTH - this.width;
		this.y = GAME_HEIGHT - 170 - this.height;
        this.frame = 0;     

        this.addEventListener(Event.ENTER_FRAME, this.updateEnemy);
    },

    updateEnemy: function (evt) {
    	if(this.x >= 300) {
        	this.x  -= 15;   	
            this.frame = (this.age % 3 + 2);
        }
        else 
        	this.parentNode.removeChild(this);
            
    }
});