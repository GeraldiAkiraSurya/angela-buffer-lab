missionOne = new Phaser.Scene('Misi1');

missionOne.preload = function () {
    this.load.path = './assets/';
    this.load.image('menuBackground', 'scenes/science_lab.jpg');
    this.load.image('textBoxBackground', 'scenes/textbox_background.png');
}

var btnStart;
var btnOptions;

missionOne.create = function () {
    // console.log(game.canvas.width, game.canvas.height);
    //x 1879 y 1008

    canvasWidth = game.canvas.width;
    canvasHeight = game.canvas.height;
    //git error

    //background main menu
    this.add.image(canvasWidth/2, canvasHeight/2, 'menuBackground').setScale(0.65, 0.52);

    //background text box
    this.add.image(canvasWidth/2, canvasHeight/2 + 320, 'textBoxBackground').setScale(0.8, 0.6);

    energy = 100;

    //buttons

    btnStart.on('pointerup', function () {        
        console.log(energy);
        missionOne.scene.start('FindingObjects1');
    });

    btnOptions.on('pointerup', function () {
        missionOne.scene.start('SelectChara');
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

missionOne.update = function () {
    
}