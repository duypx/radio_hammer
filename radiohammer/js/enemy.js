var Enemy = Class.create(Sprite, {
	initialize: function(width, height, img) {
        Sprite.apply(this,[width, height]);
        this.image = Game.instance.assets[img];
        this.x = GAME_WIDTH - this.width;
		this.y = GAME_HEIGHT - 170 - this.height;
        this.frame = 0;     

        this.addEventListener(Event.ENTER_FRAME, this.updateEnemy);
    },

    updateEnemy: function(evt) {
    	if(this.x >= 300) {
        	this.x  -= 15;   	
            this.frame = (this.age % 3 + 2);
        }
        else {
        	this.parentNode.removeChild(this);
        }            
    }
});

function CreateEnemy(enemyGroup, a) {
	var enemy;
	
	switch(a) {
		case 1: 
		enemy = new Enemy(320, 320, 'img/enemy1.png');
		enemyGroup.addChild(enemy);
		break;
		case 2:
		enemy = new Enemy(240, 240, 'img/enemy2.png');
		enemyGroup.addChild(enemy);
		break;
		default:
		break;
	}
}

function RemoveEnemy(enemyGroup) {
	for(var i = 0; i < enemyGroup.childNodes.length; i++) {
		enemyGroup.removeChild(enemyGroup.childNodes[i]);
	}
}

function KillEnemy(enemy, tieudiem, hp, effectGroup, bonus, hit) {
	if(!enemy) {
		effect = new Effect('img/miss.jpg');
		effectGroup.addChild(effect);
		setTimeout(function() {
			effect.parentNode.removeChild(effect);
		}, 200);
		// miss += 1;
		hit[5]++;
		hp.width -= 30;
	}
	else {
		if(enemy.width == 320) {
			bonus = 1;
		}
		else {
			bonus = 2;
		}

		if(enemy.x >= 450 && enemy.x <= 530) {
			effect = new Effect('img/perfect.jpg');
			effectGroup.addChild(effect);
			setTimeout(function() {
				effect.parentNode.removeChild(effect);
			}, 200);
			// perfect += 1;
			hit[1]++;
			bonus *= 10;
		}
		if(enemy.x >= 410 && enemy.x < 450 || enemy.x >530 && enemy.x <= 570) {
			effect = new Effect('img/great.gif');
			effectGroup.addChild(effect);
			setTimeout(function() {
				effect.parentNode.removeChild(effect);
			}, 200);
			// great += 1;
			hit[2]++;
			bonus *= 3;
		}
		if(enemy.x >= 370 && enemy.x < 410 || enemy.x >570 && enemy.x <= 610) {
			effect = new Effect('img/good.jpg');
			effectGroup.addChild(effect);
			setTimeout(function() {
				effect.parentNode.removeChild(effect);
			}, 200);
			// good += 1;
			hit[3]++;
			bonus *= 2;
		}
		if(enemy.x >= 330 && enemy.x < 370 || enemy.x >610 && enemy.x <= 650) {
			effect = new Effect('img/bad.jpg');
			effectGroup.addChild(effect);
			setTimeout(function() {
				effect.parentNode.removeChild(effect);
			}, 200);
			// bad += 1;
			hit[4]++;
		}
		if(enemy.x < 330 || enemy.x > 650) {
			effect = new Effect('img/miss.jpg');
			effectGroup.addChild(effect);
			setTimeout(function() {
				effect.parentNode.removeChild(effect);
			}, 200);
			// miss += 1;
			hit[5]++;
			hp.width -= 30;
		}

		if(enemy.x >= 330 && enemy.x <= 650) {
			enemy.tl.moveTo(800, -500, 10, enchant.Easing.SIN_EASEOUT)
			.then(function() {
				enemy.parentNode.removeChild(enemy);
			});
			hit[0] = hit[0] + bonus;
		}
	}
	return hit;
}