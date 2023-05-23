

missionTwodotOne = new Phaser.Scene('menumisi2.1');


missionTwodotOne.preload = function () {
    this.load.path = './assets/';
    this.load.image('menuBackground', 'scenes/dua_satu.png');
}

missionTwodotOne.create = function() {
    
   // createMissionBackgroundObjects (this, 'menuBackground');

    let canvasWidth = game.canvas.width;
    let canvasHeight = game.canvas.height;

    let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'menuBackground');
    let scaleX = this.cameras.main.width / image.width;
    let scaleY = this.cameras.main.height / image.height;
    let scale = Math.max(scaleX, scaleY);
    image.setScale(scale).setScrollFactor(0);

    let baseY = canvasHeight/2 - 100;
    let deltaX = 250;

    let title1 = this.add.text(canvasWidth/2, baseY - 100, 'Pilih Misi')
        .setOrigin(0.5)
        .setStyle({ 'fontSize': 60, 'fill': '#000000' })
        // .setStyle(`font-size: 60; color: #000000; font-weight: bold;`)
        .setStroke('#fff', 5)
    
    let satu = new Button((canvasWidth/2) - (2*deltaX), baseY, '1', this, () => {this.scene.start('Misi1')}, true);
    //temporary ke Question211
    //harusnya ke Objective Misi 2
    let dua = new Button((canvasWidth/2) - (1*deltaX), baseY, '2', this, () => {
        this.scene.start('Question211');
        energy = 100;
    }, true);
    //temporary langsung ke pertanyaannya
    let tiga = new Button((canvasWidth/2) - (1*deltaX), baseY+100, '3', this, () => {this.scene.start('Question211')},true);
    //seharusnya ke tabel tabulasi
    // let btnMsn2sub1 = new Button((canvasWidth/2) - (1*deltaX), baseY+100, 'SUB-MISI II.1', this, () => {this.scene.start('mission1')},jsonMissionProses["2.1"]);
    let empat = new Button((canvasWidth/2) - (1*deltaX), baseY+200, '4', this, () => {this.scene.start('mission1')},false);
    // console.log(Phaser.GameObjects.Text)
    // btnMsn1.setStroke('#000000', 100);
    // console.log(btnMsn1.stroke);
    // console.log(btnMsn1.strokeThickness);
}


