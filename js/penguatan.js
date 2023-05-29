penguatan = new Phaser.Scene('Penguatan');

penguatan.preload = function () {
    this.load.path = './assets/';
    this.load.image('menuBackground', 'scenes/science_lab.jpg');
    this.load.image('nextButton', 'buttons/Continue Button.png');

    this.load.image('penguatanKonsep1', 'penguatan/PenguatanKonsep1.png');
    this.load.image('penguatanKonsep2', 'penguatan/PenguatanKonsep2.png');
    this.load.image('penguatanKonsep3', 'penguatan/PenguatanKonsep3.png');
    this.load.image('penguatanKonsep4', 'penguatan/PenguatanKonsep4.png');
    this.load.image('penguatanKonsep5', 'penguatan/PenguatanKonsep5.png');
    this.load.image('penguatanKonsep6', 'penguatan/PenguatanKonsep6.png');
    this.load.image('penguatanKonsep7', 'penguatan/PenguatanKonsep7.png');

    this.load.image('opening1', 'penguatan/Opening1.png');
    this.load.image('opening2', 'penguatan/Opening2.png');

    this.load.image('closing1', 'penguatan/Closing1.png');
    this.load.image('closing2', 'penguatan/Closing2.png');
}

var penguatanKonsep1;
var penguatanKonsep2;
var penguatanKonsep3;
var penguatanKonsep4;
var penguatanKonsep5;
var penguatanKonsep6;
var penguatanKonsep7;

var opening1;
var closing1;

var penguatanState;

var btnNext;
var btnTerima;
var btnTutup;

penguatan.create = function () {
    // console.log(game.canvas.width, game.canvas.height);
    //x 1879 y 1008

    middleX = this.cameras.main.width / 2;
    middleY = this.cameras.main.height / 2;

    //background main menu
    this.add.image(middleX, middleY, 'menuBackground').setScale(0.65, 0.52);

    //penguatan konsep
    penguatanKonsep1 = this.add.image(middleX, middleY - 120, 'penguatanKonsep1').setScale(0.75).setVisible(false);
    penguatanKonsep2 = this.add.image(middleX, middleY - 120, 'penguatanKonsep2').setScale(0.75).setVisible(false);
    penguatanKonsep3 = this.add.image(middleX, middleY - 120, 'penguatanKonsep3').setScale(0.75).setVisible(false);
    penguatanKonsep4 = this.add.image(middleX, middleY - 120, 'penguatanKonsep4').setScale(0.75).setVisible(false);
    penguatanKonsep5 = this.add.image(middleX, middleY - 120, 'penguatanKonsep5').setScale(0.75).setVisible(false);
    penguatanKonsep6 = this.add.image(middleX, middleY - 120, 'penguatanKonsep6').setScale(0.75).setVisible(false);
    penguatanKonsep7 = this.add.image(middleX, middleY - 120, 'penguatanKonsep7').setScale(0.75).setVisible(false);

    //welcome-screen start
    opening1 = this.add.image(middleX, middleY - 120, 'opening1').setScale();
    btnTerima = this.add.image(middleX, middleY + 120, 'opening2').setInteractive().setScale();

    btnTerima.on('pointerup', function () {
        console.log('maju gambar 1');

        penguatanKonsep1.setVisible(true);
        btnNext.setVisible(true);

        opening1.destroy();        
        btnTerima.destroy();
    });
    //welcome-screen end

    //ending-screen start
    closing1 = this.add.image(middleX, middleY - 120, 'closing1').setScale().setVisible(false);
    btnTutup = this.add.image(middleX, middleY + 120, 'closing2').setInteractive().setScale().setVisible(false);

    btnTutup.on('pointerup', function () {
        console.log('started scene MainMenu');
        penguatan.scene.start('MainMenu');

        closing1.destroy();        
        btnTutup.destroy();
    });
    //ending-screen end

    penguatanState = 0;

    //button continue
    btnNext = this.add.image(middleX, middleY + 330, 'nextButton').setInteractive().setScale(0.5).setVisible(false);

    btnNext.on('pointerup', function () {
        if (penguatanState == 0) {
            console.log('maju gambar 2');
            penguatanKonsep1.destroy();
            penguatanKonsep2.setVisible(true);
            penguatanState++;
        }

        else if (penguatanState == 1) {
            console.log('maju gambar 3');
            penguatanKonsep2.destroy();
            penguatanKonsep3.setVisible(true);
            penguatanState++;
        }

        else if (penguatanState == 2) {
            console.log('maju gambar 4');
            penguatanKonsep3.destroy();
            penguatanKonsep4.setVisible(true);
            penguatanState++;
        }

        else if (penguatanState == 3) {
            console.log('maju gambar 5');
            penguatanKonsep4.destroy();
            penguatanKonsep5.setVisible(true);
            penguatanState++;
        }

        else if (penguatanState == 4) {
            console.log('maju gambar 6');
            penguatanKonsep5.destroy();
            penguatanKonsep6.setVisible(true);
            penguatanState++;
        }

        else if (penguatanState == 5) {
            console.log('maju gambar 7');
            penguatanKonsep6.destroy();
            penguatanKonsep7.setVisible(true);
            penguatanState++;
        }

        else if (penguatanState == 6) {
            closing1.setVisible(true);
            btnTutup.setVisible(true);

            penguatanKonsep7.destroy();
            btnNext.destroy();
        }
        // console.log(penguatanKonsep1.visible);
    });    
}

penguatan.update = function () {
    
}