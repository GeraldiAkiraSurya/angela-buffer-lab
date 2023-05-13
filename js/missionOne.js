missionOne = new Phaser.Scene('Misi1');

missionOne.preload = function () {
    this.load.path = './assets/';
    this.load.image('menuBackground', 'scenes/science_lab.jpg');
    this.load.image('missionBackground', 'scenes/lab_desk.jpg')
    this.load.image('textBoxBackground', 'scenes/textbox_background.png');

    //pluginsnya pindahin ke game?

    this.load.scenePlugin({
        key: 'rexuiplugin',
        url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
        sceneKey: 'rexUI'
    });
    this.load.plugin('rexyoutubeplayerplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexyoutubeplayerplugin.min.js', true);
    this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);

    this.load.image('nextPage', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png');
}

var btnStart;
var btnOptions;

var textBox;

const COLOR_PRIMARY = 0x2E4E34; //2E4E34  //0x4e342e
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

var content;

//notes
//speed muncul textnya belum nemu
//udah ketemu -Geraldi

//yg pertama bisa langsung enter
var arrayOfContent = [
    'Allison adalah seorang profesor yang ditugaskan di Laboratorium X untuk mencari obat dari penyakit yang tidak diketahui asal-usulnya.',
    `Untuk itu Prof. Allison bekerjasama dengan ilmuan kimia ${playerName} untuk melakukan penelitian untuk mengumpulkan ramuan obat yang sedang dicari.`,
    'Seluruh ramuan obat dapat dikumpulkan setelah ilmuan kimia menyelesaikan tantangan pada setiap misi.',
    `Prof. Allison: ${playerName}, Anda harus mengambil buku ramuan obat yang tertinggal di laboratorium pusat.`,
    `${playerName}: Siap meluncur prof...`,
    'Prof. Allison: Sebelum berangkat Anda harus menyelesaikan tantangan di laboratorium X, tiap tantangan yang dilewati akan menambah energi Anda untuk memperoleh buku ramuan obat...',
    `${playerName}: Penemuan ini akan menjadi gebrakan hebat di dunia penelitian...`,
    'Prof. Allison: Semoga berhasil!!!'
];
var lineCounter;

const GetValue = Phaser.Utils.Objects.GetValue;

missionOne.create = function () {
    // console.log(game.canvas.width, game.canvas.height);
    //x 1879 y 1008

    canvasWidth = game.canvas.width;
    canvasHeight = game.canvas.height;
    //git error

    let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'menuBackground');
    let scaleX = this.cameras.main.width / image.width;
    let scaleY = this.cameras.main.height / image.height;
    let scale = Math.max(scaleX, scaleY);
    image.setScale(scale).setScrollFactor(0);
    //background main menu
    // this.add.image(canvasWidth/2, canvasHeight/2, 'menuBackground').setScale(0.65, 0.52);

    //background text box
    // this.add.image(canvasWidth/2, canvasHeight/2 + 320, 'textBoxBackground').setScale(0.8, 0.6);

    //buttons

    // this.tweens.add({
    //     targets: [btnStart],
    //     duration: 1000,
    //     x: canvasWidth/2,
    //     scaleX: 2,
    //     scaleY: 2,
    //     ease: 'Bounce.easeIn'
    // });

    // createTextBox(this, canvasWidth/2, canvasHeight/2 + 320, {
    //     wrapWidth: 500,
    // })
    // .start(content, 50);

    //awal mula text
    content = arrayOfContent[0];
    //penghitung baris keberapa
    lineCounter = 1;
    // console.log(content);
    textBox = createTextBox(this, canvasWidth/2 - 600, canvasHeight/2 + 50, {
        wrapWidth: 900,
        fixedWidth: 900,
        fixedHeight: 250,
    })
    .start(content, 50); // yang integer tuh speed muncul speednya

    //input
    this.input.on('pointerdown', function () {
        //kalo lg typing, beresin dlu (munculin smua)
        console.log(Phaser.GameObjects.TextStyle);
        console.log(textBox.isTyping);

        if (textBox.isTyping) {
            textBox.stop(true);
            console.log('lagi ngetik: ' + textBox.isTyping);

            //ngatur panah next
            var nextIcon = textBox.getElement('action').setVisible(true);
            textBox.resetChildVisibleState(nextIcon);

        }
        //kalo ga lagi typing, gas ae masbro
        else {
            //ngatur panah next
            var nextIcon = textBox.getElement('action').setVisible(false);
            textBox.resetChildVisibleState(nextIcon);

            //cek page terakhir
            //kalo udah halaman terakhir dari current line, bakal next line
            //soalnya kalo panjang, bakal displit per berapa halaman tergantung maxLine
            if (textBox.isLastPage) {
                console.log('akhir page');
                console.log(lineCounter);
    
                //pergantian line
                if (lineCounter < arrayOfContent.length) {
                    content = arrayOfContent[lineCounter];
                    // console.log('next line: ' + content); 
                    lineCounter += 1;
        
                    textBox.start(content);
                }
    
                // return;

                // kalo udah dialog paling terakhir bakal hapus textbox nya
                if(lineCounter >= arrayOfContent.length) {
                    textBox.destroy();
                    startMission(this);
                }
            }
            else {
                console.log('bukan akhir page cuy');
                textBox.typeNextPage();
            }
        }
        

        // console.log('clicked!');
    }, this);
    // this.add.image(canvasWidth/2, canvasHeight/2, 'menuBackground').setScale(0.65, 0.52);

    exitBtn = this.add.text(50, 50, 'EXIT')
        .setOrigin(0)
        .setFontSize(30)
        // .setOrigin(10)
        .setPadding(12)
        .setStyle({ backgroundColor: '#000000', fill: '#ffffff' })
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => button.setStyle({ fill: '#0000ff' }))
        .on('pointerout', () => button.setStyle({ fill: '#ffffff' }))
        .on('pointerdown', () => this.scene.start('MainMenu'));
}

missionOne.update = function () {
    
}

function startMission(scene) {
    var middleX = scene.cameras.main.width / 2;
    var middleY = scene.cameras.main.height / 2;
    var image = scene.add.image(middleX, middleY, 'missionBackground');
    var scaleX = scene.cameras.main.width / image.width;
    var scaleY = scene.cameras.main.height / image.height;
    var scale = Math.max(scaleX, scaleY);
    image.setScale(scale).setScrollFactor(0);

    scene.children.bringToTop(exitBtn);

    var descriptionBox = scene.add.rectangle(scene.cameras.main.width / 2, scene.cameras.main.height / 2, scene.cameras.main.width / 2, scene.cameras.main.height * 3 / 4, 0x000000, 0.7);
    var descBoxTopX = middleX - (descriptionBox.width / 2);
    var descBoxTopY = middleY - (descriptionBox.height / 2);
    var title = scene.add.text(middleX, descBoxTopY + 50, "MISI I")
        .setOrigin(0.5)
        .setFontSize(40);

    var text = 
    `[b]SYARAT PENYELESAIAN KHUSUS:[/b] AMATILAH VIDEO DENGAN SEKSAMA DAN PILIHLAH JAWABAN YANG BENAR DARI PERTANYAAN YANG DIBERIKAN

[b]BATAS WAKTU:[/b] TIDAK ADA

[b]HADIAH:[/b] ENERGI DAN BUKU RAMUAN OBAT

[b]JIKA GAGAL:[/b] KEMBALI KE AWAL
    `;

    var missionDesc = scene.add.rexBBCodeText(middleX-descBoxTopX+50, descBoxTopY+100, text, {
        fontSize: '30px',
        align: 'left',
        wrap: {
            mode: 'word',
            width: 700
        },
    });

    var nextBtn = new AcceptBtn(middleX, middleY + (descriptionBox.height / 2) - 50, 'TERIMA', scene, () => {
        missionDesc.destroy();
        exitBtn.destroy();
        showYoutubeVideo(scene, middleX, middleY, 'qz1XzCmdHAg');
    });

    nextBtn.setNewCallback(() => {
        youtubePlayer.destroy();
        showYoutubeVideo(scene, middleX, middleY, 'EJZ8B7NOy2k');
    });

    /*
    var nextBtn = scene.add.text(middleX, middleY + (descriptionBox.height / 2) - 50, 'TERIMA')
        .setOrigin(0.5)
        .setFontSize(30)
        .setPadding(12)
        .setStyle({ backgroundColor: '#e6e6e6', fill: '#000000' })
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => button.setStyle({ fill: '#0000ff' }))
        .on('pointerout', () => button.setStyle({ fill: '#000000' }))
        .on('pointerdown', () => {
            missionDesc.destroy();
            exitBtn.destroy();
            showTutorialVideo(scene, middleX, middleY);
        });
    */

    // console.log(descriptionBox);
    // var missionDesc = scene.add.textbox()
    
}

function showYoutubeVideo(scene, middleX, middleY, videoId) {
    var youtubePlayer = scene.add.rexYoutubePlayer(middleX, middleY, 600, 450, {
        videoId: videoId,
        autoPlay: false
    })
}

function createTextBox (scene, x, y, config) {
    var wrapWidth = GetValue(config, 'wrapWidth', 0);
    var fixedWidth = GetValue(config, 'fixedWidth', 0);
    var fixedHeight = GetValue(config, 'fixedHeight', 0);
    var textBox = scene.rexUI.add.textBox({
            x: x,
            y: y,

            background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY)
                .setStrokeStyle(2, COLOR_LIGHT),

            icon: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_DARK),

            // text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
            text: getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight),

            action: scene.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false),

            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
                icon: 10,
                text: 10,
            }
        })
        .setOrigin(0)
        .layout();

    //kayanya gaperlu dicek dari funct  ion textboxtnya doang.
    //harus dicek nanti kalo ada pop up video, input downnya, ngaco ga WKWKWKKW
    //sementara diatur dari input left mouse click
    // textBox
    //     .setInteractive()
    //     .on('pointerdown', function () {
    //         var icon = this.getElement('action').setVisible(false);
    //         this.resetChildVisibleState(icon);
    //         if (this.isTyping) {
    //             this.stop(true);
    //         } else {
    //             this.typeNextPage();
    //         }
    //     }, textBox)
    //     .on('pageend', function () {
    //         if (this.isLastPage) {
    //             return;
    //         }

    //         var icon = this.getElement('action').setVisible(true);
    //         this.resetChildVisibleState(icon);
    //         icon.y -= 30;
    //         var tween = scene.tweens.add({
    //             targets: icon,
    //             y: '+=30', // '+=100'
    //             ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
    //             duration: 500,
    //             repeat: 0, // -1: infinity
    //             yoyo: false
    //         });
    //     }, textBox)
    //.on('type', function () {
    //})

    return textBox;
}

function createMissionScene(scene) {
    
}

function getBuiltInText (scene, wrapWidth, fixedWidth, fixedHeight) {
    return scene.add.text(0, 0, '', {
            fontSize: '20px',
            wordWrap: {
                width: wrapWidth
            },
            //max line dalam sekali textbox
            maxLines: 10
        })
        .setFixedSize(fixedWidth, fixedHeight);
}

function getBBcodeText (scene, wrapWidth, fixedWidth, fixedHeight) {
    return scene.rexUI.add.BBCodeText(0, 0, '', {
        fixedWidth: fixedWidth,
        fixedHeight: fixedHeight,

        fontSize: '20px',
        wrap: {
            mode: 'word',
            width: wrapWidth
        },
        //max line dalam sekali textbox
        maxLines: 10
    })
}

class AcceptBtn {
    constructor(x, y, label, scene, callback) {
        this.accBtn = scene.add.text(x, y, label)
            .setOrigin(0.5)
            .setFontSize('30px')
            .setPadding(12)
            .setStyle({ backgroundColor: '#e6e6e6', fill: '#000000' })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => button.setStyle({ fill: '#0000ff' }))
            .on('pointerout', () => button.setStyle({ fill: '#000000' }))
            .on('pointerdown', () => callback());
    }

    setNewCallback(callback) {
        this.accBtn.on('pointerdown', () => callback());
    }
}