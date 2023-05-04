mainMenu = new Phaser.Scene('MainMenu');

mainMenu.preload = function () {
    this.load.path = './assets/buttons/';
    this.load.image('startButton', 'ButtonStart.png');
}

var btnStart;

mainMenu.create = function () {
    // console.log(game.canvas.width, game.canvas.height);
    btnStart = this.add.image(game.canvas.width/2, game.canvas.height/2, 'startButton').setInteractive();
    btnStart.on('pointerup', function () {
        mainMenu.scene.start('FindingObjects1');
    });

    this.tweens.add({
        targets: [btnStart],
        duration: 1000,
        x: game.canvas.width/2,
        scaleX: 2,
        scaleY: 2,
        ease: 'Bounce.easeIn'
    });
}

mainMenu.update = function () {
    
}