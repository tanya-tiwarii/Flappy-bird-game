;(function(){
	var game= new Phaser.Game(600,512);
	var playState={
		preload : function(){
			game.load.image('bird','C:\\Users\\Tanya Tiwari\\Downloads\\flappybird-master\\flappybird-master\\images\\bird.png');
			game.load.image('bg','C:\\Users\\Tanya Tiwari\\Downloads\\flappybird-master\\flappybird-master\\images\\gamebg.jpg');
			game.load.spritesheet('pipes','C:\\Users\\Tanya Tiwari\\Downloads\\flappybird-master\\flappybird-master\\images\\pipes.png',54,320);
		},
		create : function(){
			this.bg=game.add.tileSprite(0,0,600,512,'bg');
			this.bg.autoScroll(-150,0);
			this.bird=game.add.sprite(game.world.centerX,game.world.centerY,'bird');
			this.bird.anchor.setTo(0.5,0.5);
			this.bird.scale.setTo(0.5,0.5);
			game.physics.startSystem(Phaser.Physics.ARCADE);
			game.physics.arcade.enable(this.bird);
			this.bird.body.gravity.y=250;
			var space=game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			space.onDown.add(this.jump,this);
			this.makePipes();
		},
		update : function(){
			this.bird.angle+=2.5;
			if(!this.bird.inWorld){
				game.state.start("homeState");
			}
			this.game.physics.arcade.collide(this.bird,this.pipes,this.deathHandler,null,this);
		},
		jump:function(){
			this.bird.body.velocity.y=-150;
			game.add.tween(this.bird).to({angle:-40},100).start();
		},
		makePipes:function(){
			this.pipesGenerator=game.time.events.loop(Phaser.Timer.SECOND*1.25,this.makePipe,this);
			this.pipesGenerator.timer.start();
			this.pipes=game.add.group();
		},
		makePipe:function(){
			var pipeY=game.rnd.integerInRange(-100,100);
			var pipeX=game.width;
			var pipe2Position = pipeY + 430;
			var pipe1=game.add.sprite(pipeX,pipe2Position,"pipes",0);
			var pipe2=game.add.sprite(pipeX,pipeY,"pipes",1);
			game.physics.arcade.enable(pipe1);
			game.physics.arcade.enable(pipe2);
			this.pipes.add(pipe1);
			this.pipes.add(pipe2);

			this.pipes.setAll('body.velocity.x',-200);
		},
		deathHandler:function(){
			game.state.start("homeState");
		}

	};
	var homeState={
		preload : function(){
			game.load.image('bg','C:\\Users\\Tanya Tiwari\\Downloads\\flappybird-master\\flappybird-master\\images\\gamebg.jpg');
		},
		create : function(){
			this.bg=game.add.tileSprite(0,0,600,512,'bg');
			var playBtn=game.add.text(game.world.centerX,game.world.centerY,'Play',{fill:'#fff'});
			playBtn.anchor.setTo(0.5,0.5);
			playBtn.inputEnabled=true;
			playBtn.events.onInputDown.add(function(){
				game.state.add('playState',playState);
				game.state.start('playState');
			},this);
		},
		update : function(){
		},

	};
	game.state.add("homeState",homeState);
	game.state.start("homeState");
})();