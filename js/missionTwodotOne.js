missionTwodotOne = new Phaser.Scene('MenuMisi2.1');

missionTwodotOne.preload = function () {
    this.load.path = './assets/';
    this.load.image('twoDotOneBG', 'scenes/dua_satu.png');
    this.load.image('twoDotOneTable', 'scenes/dua_satu_table.png');
}

missionTwodotOne.create = function() {

    //comment nanti, keperluan debugging doang. harusnya di initiate dari main menu.
    middleX = this.cameras.main.width / 2;
    middleY = this.cameras.main.height / 2;

    //background
    this.add.image(middleX, middleY, 'twoDotOneBG').setScale(1.18, 1.02);

    //table
    this.add.image(middleX + 250, middleY + 150, 'twoDotOneTable').setScale();

    //button 1
    //true ganti sm jsonMissionProses["2.1.1"]?
    let satu = new Button(middleX - 430, middleY + 160, ' 1 ', this, () => {this.scene.start('Question211')}, true);

    let dua = new Button(middleX - 310, middleY + 250, ' 2 ', this, () => {this.scene.start('Question213');}, true);
    
    let tiga = new Button(middleX - 430, middleY + 335, ' 3 ', this, () => {this.scene.start('Question215')},true);

    let empat = new Button(middleX - 310, middleY + 385, ' 4 ', this, () => {this.scene.start('Question217')},true);

}