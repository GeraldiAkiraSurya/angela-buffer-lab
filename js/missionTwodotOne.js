missionTwodotOne = new Phaser.Scene('MenuMisi2.1');

missionTwodotOne.preload = function () {
    this.load.path = './assets/';
    this.load.image('twoDotOneBG', 'scenes/dua_satu.png');
    this.load.image('twoDotOneTable', 'scenes/dua_satu_table.png');
}

var tableRow1;
var tableRow2;
var tableRow3;
var tableRow4;

missionTwodotOne.create = function() {

    //comment nanti, keperluan debugging doang. harusnya di initiate dari main menu.
    middleX = this.cameras.main.width / 2;
    middleY = this.cameras.main.height / 2;

    //background
    this.add.image(middleX, middleY, 'twoDotOneBG').setScale(1.18, 1.02);

    //table
    this.add.image(middleX + 250, middleY + 150, 'twoDotOneTable').setScale();
   
    // console.log(missionMenuDua("2.1")["1"]);
    // console.log(missionMenuDua("2.1")["2"]);
    // console.log(missionMenuDua("2.1")["3"]);
    // console.log(missionMenuDua("2.1")["4"]);

    //button 1
    let satu = new Button(middleX - 430, middleY + 160, ' 1 ', this, () => {this.scene.start('Question211')}, missionMenuDua("2.1")["1"]);

    let dua = new Button(middleX - 310, middleY + 250, ' 2 ', this, () => {this.scene.start('Question213');}, missionMenuDua("2.1")["2"]);
    
    let tiga = new Button(middleX - 430, middleY + 335, ' 3 ', this, () => {this.scene.start('Question215')}, missionMenuDua("2.1")["3"]);

    let empat = new Button(middleX - 310, middleY + 385, ' 4 ', this, () => {this.scene.start('Question217')}, missionMenuDua("2.1")["4"]);

    let back = new Button(middleX - 730, middleY - 400, ' BACK ', this, () => {this.scene.start('MissionSelection')}, true);

    tableRow1 = this.add.text(middleX + 190, middleY + 165, "4,97           4,97                 4,97", {font: "900 30px Helvetica", fill: "#00000"}).setVisible(false);
    tableRow2 = this.add.text(middleX + 190, middleY + 255, "1,90           1,90                 2,06", {font: "900 30px Helvetica", fill: "#00000"}).setVisible(false);
    tableRow3 = this.add.text(middleX + 190, middleY + 320, "2,99           2,90                 3,66", {font: "900 30px Helvetica", fill: "#00000"}).setVisible(false);
    tableRow4 = this.add.text(middleX + 190, middleY + 370, "8,39           6,86                 9,56", {font: "900 30px Helvetica", fill: "#00000"}).setVisible(false);

    if (missionMenuDua("2.1")["1"]) {
        tableRow1.setVisible(true);
    }

    if (missionMenuDua("2.1")["2"]) {
        tableRow2.setVisible(true);
    }

    if (missionMenuDua("2.1")["3"]) {
        tableRow3.setVisible(true);
    }

    if (missionMenuDua("2.1")["4"]) {
        tableRow4.setVisible(true);
    }

}