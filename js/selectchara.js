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

    middleX = this.cameras.main.width / 2;
    middleY = this.cameras.main.height / 2;

    //background main menu
    this.add.image(middleX, middleY, 'menuBackground').setScale(0.65, 0.52);

    //buttons
    btnBack = this.add.image(middleX, middleY + 300, 'backButton').setInteractive().setScale(0.5);

    //characters
    shin = this.add.image(middleX - 200, middleY - 150, 'shin').setInteractive().setScale(0.56);
    sora = this.add.image(middleX + 200, middleY - 150, 'sora').setInteractive().setScale(0.56).setFlipX(true);

    btnBack.on('pointerup', function () {
        selectChara.scene.start('MainMenu');
    });

    shin.on('pointerup', function () {
        //update gender ke male
        console.log('male');
        updateGender(0);
        
        selectChara.scene.start('MainMenu');
    });

    sora.on('pointerup', function () {
        //update gender ke female
        console.log('female');
        updateGender(1);
        
        selectChara.scene.start('MainMenu');
    });
}

selectChara.update = function () {
    
}