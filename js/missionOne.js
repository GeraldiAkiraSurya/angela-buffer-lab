missionOne = new Phaser.Scene('Misi1');

missionOne.preload = function () {
    this.load.path = './assets/';
    this.load.image('menuBackground', 'scenes/science_lab.jpg');
    this.load.image('textBoxBackground', 'scenes/textbox_background.png');

    //pluginsnya pindahin ke game?

    this.load.scenePlugin({
        key: 'rexuiplugin',
        url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
        sceneKey: 'rexUI'
    });

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

//yg pertama bisa langsung enter
var arrayOfContent = [`Hai selamat datang di Buffer Laboratory!!! 1
Hai selamat datang di Buffer Laboratory!!! 2
Hai selamat datang di Buffer Laboratory!!! 3
Hai selamat datang di Buffer Laboratory!!! 4
Hai selamat datang di Buffer Laboratory!!! 5
Hai selamat datang di Buffer Laboratory!!! 6
Hai selamat datang di Buffer Laboratory!!! 7
Hai selamat datang di Buffer Laboratory!!! 8
Hai selamat datang di Buffer Laboratory!!! 9
Hai selamat datang di Buffer Laboratory!!! 10
Hai selamat datang di Buffer Laboratory!!! 11
Hai selamat datang di Buffer Laboratory!!! 12
Hai selamat datang di Buffer Laboratory!!! 13
Hai selamat datang di Buffer Laboratory!!! 14
Hai selamat datang di Buffer Laboratory!!! 15
`,
//kalo kepanjangan, ngilang dong lmao
'test kalimat 2 cuy panjaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaang',
'test kalimat 3 cuy panjaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaang',
'test kalimat 4 cuy panjaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaang'];
var lineCounter;

const GetValue = Phaser.Utils.Objects.GetValue;

missionOne.create = function () {
    // console.log(game.canvas.width, game.canvas.height);
    //x 1879 y 1008

    canvasWidth = game.canvas.width;
    canvasHeight = game.canvas.height;
    //git error

    //background main menu
    this.add.image(canvasWidth/2, canvasHeight/2, 'menuBackground').setScale(0.65, 0.52);

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
    .start(content, 150);

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
            }
            else {
                console.log('bukan akhir page cuy');
                textBox.typeNextPage();
            }
        }
        

        // console.log('clicked!');
    }, this);
}

missionOne.update = function () {
    
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