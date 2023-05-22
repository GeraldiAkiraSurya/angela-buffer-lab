

missionSelection = new Phaser.Scene('MissionSelection');


missionSelection.preload = function () {
    this.load.path = './assets/';
    this.load.image('menuBackground', 'scenes/science_lab.jpg');
}


missionSelection.create = function() {

    //--------------------------------------------------------------------------------
    let jsonMissionProses = missionMenu()
    //--------------------------------------------------------------------------------






    canvasWidth = game.canvas.width;
    canvasHeight = game.canvas.height;

    let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'menuBackground');
    let scaleX = this.cameras.main.width / image.width;
    let scaleY = this.cameras.main.height / image.height;
    let scale = Math.max(scaleX, scaleY);
    image.setScale(scale).setScrollFactor(0);

    let baseY = canvasHeight/2 - 100;
    let deltaX = 250;

    let title = this.add.text(canvasWidth/2, baseY - 100, 'Pilih Misi')
        .setOrigin(0.5)
        .setStyle({ 'fontSize': 60, 'fill': '#000000' })
        // .setStyle(`font-size: 60; color: #000000; font-weight: bold;`)
        .setStroke('#fff', 5)
    
    let btnMsn1 = new Button((canvasWidth/2) - (2*deltaX), baseY, 'MISI I', this, () => {this.scene.start('Misi1')}, jsonMissionProses["1"]);
    //temporary ke Question211
    let btnMsn2 = new Button((canvasWidth/2) - (1*deltaX), baseY, 'MISI II', this, () => {
        this.scene.start('Question211');
        energy = 100;
    }, true);
    let btnMsn2sub1 = new Button((canvasWidth/2) - (1*deltaX), baseY+100, 'SUB-MISI II.1', this, () => {this.scene.start('mission1')},jsonMissionProses["2.1"]);
    let btnMsn2sub2 = new Button((canvasWidth/2) - (1*deltaX), baseY+200, 'SUB-MISI II.2', this, () => {this.scene.start('mission1')},jsonMissionProses["2.2"]);
    let btnMsn3 = new Button(canvasWidth/2, baseY, 'MISI III', this, () => {this.scene.start('Misi3')},jsonMissionProses["3"]);
    let btnMsn4 = new Button((canvasWidth/2) + (1*deltaX), baseY, 'MISI IV', this, () => {this.scene.start('mission4')},jsonMissionProses["4"]);
    let btnMsn5 = new Button((canvasWidth/2) + (2*deltaX), baseY, 'MISI V', this, () => {this.scene.start('mission5')},jsonMissionProses["5"]);

    // console.log(Phaser.GameObjects.Text)
    // btnMsn1.setStroke('#000000', 100);
    // console.log(btnMsn1.stroke);
    // console.log(btnMsn1.strokeThickness);
}






class Button {
    constructor(x, y, label, scene, callback, active=false) {
        const button = scene.add.text(x, y, label)
            .setOrigin(0.5, 0.5)
            .setFontSize(30)
            // .setOrigin(10)
            .setPadding(12)
            
            

            if(active){ //untuk mengecek dia udah boleh atau belum
                button.setStyle({ backgroundColor: '#e6e6e6', fill: '#000000' })
                button.on('pointerdown', () => callback())
                button.on('pointerover', () => button.setStyle({ fill: '#0000ff' }))
                button.on('pointerout', () => button.setStyle({ fill: '#000000' }));
                button.setInteractive({ useHandCursor: true })
            }else {
                button.setStyle({ backgroundColor: '#666666', fill: '#000000' })
            }


        // console.log(button.style.stroke);
        // console.log(button.style.strokeThickness);
    }
}