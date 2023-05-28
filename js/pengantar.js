pengantar = new Phaser.Scene('Pengantar');

pengantar.preload = function () {
    this.load.path = './assets/';
    this.load.image('menuBackground', 'scenes/science_lab.jpg');
    this.load.image('nextButton', 'buttons/Continue Button.png');

    this.load.image('infografis1', 'lab_eq/Infografis Larutan Penyangga dalam Kehidupan1.jpg');
    this.load.image('infografis2', 'lab_eq/Infografis Larutan Penyangga dalam Kehidupan2.jpg');
    this.load.image('infografis3', 'lab_eq/Infografis Larutan Penyangga dalam Kehidupan3.jpg');
}

var infografis1;
var infografis2;
var infografis3;

var infografisState;

var btnNext;

pengantar.create = function () {
    // console.log(game.canvas.width, game.canvas.height);
    //x 1879 y 1008

    middleX = this.cameras.main.width / 2;
    middleY = this.cameras.main.height / 2;

    //background main menu
    this.add.image(middleX, middleY, 'menuBackground').setScale(0.65, 0.52);

    //infografis
    infografis1 = this.add.image(middleX, middleY - 120, 'infografis1').setScale(1.4);
    infografis2 = this.add.image(middleX, middleY - 120, 'infografis2').setScale(1.6).setVisible(false);
    infografis3 = this.add.image(middleX, middleY - 120, 'infografis3').setScale(1.6).setVisible(false);

    infografisState = 0;

    //buttons
    btnNext = this.add.image(middleX, middleY + 330, 'nextButton').setInteractive().setScale(0.5);

    btnNext.on('pointerup', function () {
        if (infografisState == 0) {
            console.log('maju gambar 2');
            infografis1.setVisible(false);
            infografis2.setVisible(true);
            infografisState++;
        }

        else if (infografisState == 1) {
            console.log('maju gambar 3');
            infografis2.setVisible(false);
            infografis3.setVisible(true);
            infografisState++;
        }

        else if (infografisState == 2) {
            console.log('started scene MissionSelection');
            pengantar.scene.start('MissionSelection');
        }

        // console.log(infografis1.visible);
    });
}

pengantar.update = function () {
    
}