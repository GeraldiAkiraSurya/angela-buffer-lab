pengantar = new Phaser.Scene('Pengantar');

pengantar.preload = function () {
    this.load.path = './assets/';
    this.load.image('menuBackground', 'scenes/science_lab.jpg');
    this.load.image('nextButton', 'buttons/Continue Button.png');

    this.load.image('infografis', 'lab_eq/Infografis Larutan Penyangga dalam Kehidupan.png');
}

var btnNext;

pengantar.create = function () {
    // console.log(game.canvas.width, game.canvas.height);
    //x 1879 y 1008

    middleX = this.cameras.main.width / 2;
    middleY = this.cameras.main.height / 2;

    //background main menu
    this.add.image(middleX, middleY, 'menuBackground').setScale(0.65, 0.52);

    //infografis
    this.add.image(middleX, middleY + 70, 'infografis').setScale(0.6);

    //buttons
    btnNext = this.add.image(middleX + 700, middleY + 400, 'nextButton').setInteractive().setScale(0.5);

    btnNext.on('pointerup', function () {
        pengantar.scene.start('MissionSelection');
    });
}

pengantar.update = function () {
    
}