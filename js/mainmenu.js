mainMenu = new Phaser.Scene('MainMenu');

mainMenu.preload = function () {
    this.load.path = './assets/';
    this.load.image('menuBackground', 'scenes/science_lab.jpg');
    this.load.image('startButton', 'buttons/Start Button.png');
    this.load.image('optionsButton', 'buttons/Options Button.png');
}

var btnStart;
var btnOptions;

mainMenu.create = function () {
    // console.log(game.canvas.width, game.canvas.height);
    //x 1879 y 1008

    canvasWidth = game.canvas.width;
    canvasHeight = game.canvas.height;
    //git error

    //background main menu
    this.add.image(canvasWidth/2, canvasHeight/2, 'menuBackground').setScale(0.65, 0.52);

    energy = 100;

    //buttons
    btnStart = this.add.image(canvasWidth/2, canvasHeight/2, 'startButton').setInteractive().setScale(0.5);
    btnOptions = this.add.image(canvasWidth/2, canvasHeight/2 + 125, 'optionsButton').setInteractive().setScale(0.5);

    btnStart.on('pointerup', function () {        
        console.log(energy);
        mainMenu.scene.start('FindingObjects1');
    });

    btnOptions.on('pointerup', function () {
        mainMenu.scene.start('SelectChara');
    });

    // this.tweens.add({
    //     targets: [btnStart],
    //     duration: 1000,
    //     x: canvasWidth/2,
    //     scaleX: 2,
    //     scaleY: 2,
    //     ease: 'Bounce.easeIn'
    // });
}

mainMenu.update = function () {
    
}