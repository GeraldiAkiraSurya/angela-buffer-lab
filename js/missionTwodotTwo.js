missionTwodotTwo = new Phaser.Scene('MenuMisi2.2');

missionTwodotTwo.preload = function () {
    this.load.path = './assets/';
    this.load.image('twoDotOneBG', 'scenes/dua_dua.png');
    this.load.image('twoDotOneTable', 'scenes/dua_dua_table.png');
}

missionTwodotTwo.create = function() {

    //comment nanti, keperluan debugging doang. harusnya di initiate dari main menu.
    middleX = this.cameras.main.width / 2;
    middleY = this.cameras.main.height / 2;

    //background
    this.add.image(middleX, middleY, 'twoDotOneBG').setScale(1.18, 1.02);

    //table
    this.add.image(middleX + 250, middleY + 150, 'twoDotOneTable').setScale();

    //button 1
    //true ganti sm jsonMissionProses["2.2.1"]?
    let satu = new Button(middleX - 550, middleY + 150, ' 1 ', this, () => {this.scene.start('Question221')}, true);

    let dua = new Button(middleX - 430, middleY + 240, ' 2 ', this, () => {this.scene.start('Question223');}, true);
    
    let tiga = new Button(middleX - 550, middleY + 355, ' 3 ', this, () => {this.scene.start('Question225')},true);

    let empat = new Button(middleX - 430, middleY + 385, ' 4 ', this, () => {this.scene.start('Question227')},true);

}