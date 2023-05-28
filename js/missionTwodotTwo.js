missionTwodotTwo = new Phaser.Scene('MenuMisi2.2');

missionTwodotTwo.preload = function () {
    this.load.path = './assets/';
    this.load.image('twoDotTwoBG', 'scenes/dua_dua.png');
    this.load.image('twoDotTwoTable', 'scenes/dua_dua_table.png');
}

var tableRow1dot2;
var tableRow2dot2;
var tableRow3dot2;
var tableRow4dot2;

missionTwodotTwo.create = function() {

    //comment nanti, keperluan debugging doang. harusnya di initiate dari main menu.
    middleX = this.cameras.main.width / 2;
    middleY = this.cameras.main.height / 2;

    //background
    this.add.image(middleX, middleY, 'twoDotTwoBG').setScale(1.18, 1.02);

    //table
    this.add.image(middleX + 250, middleY + 150, 'twoDotTwoTable').setScale();

    // console.log(missionMenuDua("2.2")["1"]);
    // console.log(missionMenuDua("2.2")["2"]);
    // console.log(missionMenuDua("2.2")["3"]);
    // console.log(missionMenuDua("2.2")["4"]);

    //button 1
    let satu = new Button(middleX - 550, middleY + 150, ' 1 ', this, () => {this.scene.start('Question221')}, missionMenuDua("2.2")["1"]);

    let dua = new Button(middleX - 430, middleY + 240, ' 2 ', this, () => {this.scene.start('Question223');}, missionMenuDua("2.2")["2"]);
    
    let tiga = new Button(middleX - 550, middleY + 355, ' 3 ', this, () => {this.scene.start('Question225')}, missionMenuDua("2.2")["3"]);

    let empat = new Button(middleX - 430, middleY + 385, ' 4 ', this, () => {this.scene.start('Question227')}, missionMenuDua("2.2")["4"]);

    let back = new Button(middleX - 730, middleY - 400, ' BACK ', this, () => {this.scene.start('MissionSelection')}, true);

    tableRow1dot2 = this.add.text(middleX + 95, middleY + 135, "9,62                  9,62                                  9,62", {font: "900 26px Helvetica", fill: "#00000"}).setVisible(false);
    tableRow2dot2 = this.add.text(middleX + 80, middleY + 235, "10,82                 10,01                                11,26", {font: "900 26px Helvetica", fill: "#00000"}).setVisible(false);
    tableRow3dot2 = this.add.text(middleX + 95, middleY + 315, "9,90                  9,74                                 10,55", {font: "900 26px Helvetica", fill: "#00000"}).setVisible(false);
    tableRow4dot2 = this.add.text(middleX + 95, middleY + 365, "6,30                  3,74                                  7,40", {font: "900 26px Helvetica", fill: "#00000"}).setVisible(false);

    if (missionMenuDua("2.2")["1"]) {
        tableRow1dot2.setVisible(true);
    }

    if (missionMenuDua("2.2")["2"]) {
        tableRow2dot2.setVisible(true);
    }

    if (missionMenuDua("2.2")["3"]) {
        tableRow3dot2.setVisible(true);
    }

    if (missionMenuDua("2.2")["4"]) {
        tableRow4dot2.setVisible(true);
    }

}