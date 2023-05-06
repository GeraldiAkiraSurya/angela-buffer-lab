selectChara = new Phaser.Scene('SelectChara');

selectChara.preload = function () {
    this.load.path = './assets/';
    this.load.image('menuBackground', 'scenes/science_lab.jpg');
    this.load.image('backButton', 'buttons/Back Button.png');
    this.load.image('professor', 'characters/professor.png');
}

var btnBack;
var male;
var female;

selectChara.create = function () {
    // console.log(game.canvas.width, game.canvas.height);
    //x 1879 y 1008

    //background main menu
    this.add.image(canvasWidth/2, canvasHeight/2, 'menuBackground').setScale(0.65, 0.52);

    //buttons
    btnBack = this.add.image(canvasWidth/2, canvasHeight/2 + 300, 'backButton').setInteractive().setScale(0.5);

    //characters
    male = this.add.image(canvasWidth/2 - 200, canvasHeight/2 - 150, 'professor').setInteractive().setScale(0.7);
    female = this.add.image(canvasWidth/2 + 200, canvasHeight/2 - 150, 'professor').setInteractive().setScale(0.7).setFlipX(true);

    btnBack.on('pointerup', function () {
        selectChara.scene.start('MainMenu');
    });

    male.on('pointerup', function () {
        chara = 'male';
        selectChara.scene.start('MainMenu');
    });

    female.on('pointerup', function () {
        chara = 'female';
        selectChara.scene.start('MainMenu');
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

selectChara.update = function () {
    
}