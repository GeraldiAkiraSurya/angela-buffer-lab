missionSelection = new Phaser.Scene('missionSelection');

selectChara.preload = function () {
    this.load.path = './assets/';
    this.load.image('menuBackground', 'scenes/science_lab.jpg');
}

missionSelection.create = function() {
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
    
    let btnMsn1 = new Button((canvasWidth/2) - (2*deltaX), baseY, 'MISI I', this, () => {this.scene.start('mission1')});
    let btnMsn2 = new Button((canvasWidth/2) - (1*deltaX), baseY, 'MISI II', this, () => {this.scene.start('mission2')});
    let btnMsn2sub1 = new Button((canvasWidth/2) - (1*deltaX), baseY+100, 'SUB-MISI II.1', this, () => {this.scene.start('mission1')});
    let btnMsn2sub2 = new Button((canvasWidth/2) - (1*deltaX), baseY+200, 'SUB-MISI II.2', this, () => {this.scene.start('mission1')});
    let btnMsn3 = new Button(canvasWidth/2, baseY, 'MISI 3', this, () => {this.scene.start('mission3')});
    let btnMsn4 = new Button((canvasWidth/2) + (1*deltaX), baseY, 'MISI 4', this, () => {this.scene.start('mission4')});
    let btnMsn5 = new Button((canvasWidth/2) + (2*deltaX), baseY, 'MISI 5', this, () => {this.scene.start('mission5')});

    console.log(title.style.stroke);
    // console.log(Phaser.GameObjects.Text)
    // btnMsn1.setStroke('#000000', 100);
    // console.log(btnMsn1.stroke);
    // console.log(btnMsn1.strokeThickness);
}

class Button {
    constructor(x, y, label, scene, callback,active=false) {
        const button = scene.add.text(x, y, label)
            .setOrigin(1)
            .setFontSize(30)
            // .setOrigin(10)
            .setPadding(12)
            .setStyle({ backgroundColor: '#e6e6e6', fill: '#000000' })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => button.setStyle({ fill: '#0000ff' }))
            .on('pointerout', () => button.setStyle({ fill: '#000000' }));

            if(active){ //untuk mengecek dia udah boleh atau belum
                button.setStyle({ backgroundColor: '#e6e6e6', fill: '#000000' })
                button.on('pointerdown', () => callback())
            }else {
                button.setStyle({ backgroundColor: '#666666', fill: '#000000' })
            }


        // console.log(button.style.stroke);
        // console.log(button.style.strokeThickness);
    }
}