selectChara = new Phaser.Scene('SelectChara');

selectChara.preload = function () {
    this.load.path = './assets/';
    this.load.image('menuBackground', 'scenes/science_lab.jpg');
    this.load.image('backButton', 'buttons/Back Button.png');

    this.load.image('professor', 'characters/professor.png');
    //female
    this.load.image('sora', 'characters/female.png');
    //males
    this.load.image('shin', 'characters/male.png');
}

var btnBack;
//male
var shin;
//female
var sora;

selectChara.create = function () {
    // console.log(game.canvas.width, game.canvas.height);
    //x 1879 y 1008

    //background main menu
    this.add.image(canvasWidth/2, canvasHeight/2, 'menuBackground').setScale(0.65, 0.52);

    //buttons
    btnBack = this.add.image(canvasWidth/2, canvasHeight/2 + 300, 'backButton').setInteractive().setScale(0.5);

    //characters
    shin = this.add.image(canvasWidth/2 - 200, canvasHeight/2 - 150, 'shin').setInteractive().setScale(0.56);
    sora = this.add.image(canvasWidth/2 + 200, canvasHeight/2 - 150, 'sora').setInteractive().setScale(0.56).setFlipX(true);

    btnBack.on('pointerup', function () {
        selectChara.scene.start('MainMenu');
    });

    shin.on('pointerup', function () {
        character = 'male';
        selectChara.scene.start('MainMenu');
    });

    sora.on('pointerup', function () {
        character = 'female';
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