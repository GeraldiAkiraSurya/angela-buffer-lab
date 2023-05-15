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

// var btnStart;
// var btnOptions;

var textBox;

const COLOR_PRIMARY = 0x2E4E34; //2E4E34  //0x4e342e
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

var content;

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

var middleX;
var middleY;

missionOne.create = function () {
    var mode = 'misi'; // kalo diisi 'misi' bakal skip dialog
    // console.log(game.canvas.width, game.canvas.height);
    //x 1879 y 1008

    canvasWidth = game.canvas.width;
    canvasHeight = game.canvas.height;
    middleX = this.cameras.main.width / 2;
    middleY = this.cameras.main.height / 2;

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

    // var exitBtn = this.add.text(50, 50, 'EXIT')
    //     .setOrigin(0)
    //     .setFontSize(30)
    //     // .setOrigin(10)
    //     .setPadding(12)
    //     .setStyle({ backgroundColor: '#000000', fill: '#ffffff' })
    //     .setInteractive({ useHandCursor: true })
    //     .on('pointerover', () => exitBtn.setStyle({ fill: '#0000ff' }))
    //     .on('pointerout', () => exitBtn.setStyle({ fill: '#ffffff' }))
    //     .on('pointerdown', () => this.scene.start('MainMenu'));

    var exitBtn = createExitBtn(this, 50, 50);

    var isDialogScene = true;
    //input
    
    this.input.on('pointerdown', () => {

        

        if (isDialogScene) {
            //kalo lg typing, beresin dlu (munculin smua)
            // console.log(Phaser.GameObjects.TextStyle);
            // console.log(textBox.isTyping);

            if (textBox.isTyping) {
                textBox.stop(true);
                console.log('lagi ngetik: ' + textBox.isTyping);

                //ngatur panah next
                var nextIcon = textBox.getElement('action').setVisible(true);
                textBox.resetChildVisibleState(nextIcon);

            }
            //kalo ga lagi typing, gas ae masbro
            else {
                if (mode == 'misi') {
                    isDialogScene = false;
                    textBox.destroy();
                    image.destroy();
                    startMission(this, exitBtn);
                }

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
                        isDialogScene = false;
                        textBox.destroy();
                        image.destroy();
                        // askStartMission(this);
                        startMission(this, exitBtn);
                    }
                }
                else {
                    console.log('bukan akhir page cuy');
                    textBox.typeNextPage();
                }
            }
        }
        // console.log('clicked!');
    }, this);
    // this.add.image(canvasWidth/2, canvasHeight/2, 'menuBackground').setScale(0.65, 0.52);

}

missionOne.update = function () {
    
}

function startMission(scene, exitBtn) {
    // var middleX = scene.cameras.main.width / 2;
    // var middleY = scene.cameras.main.height / 2;
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

[b]JIKA GAGAL:[/b] KEMBALI KE AWAL`;

    // var missionDesc = scene.add.rexBBCodeText(middleX-descBoxTopX+50, descBoxTopY+100, text, {
    //     fontSize: '30px',
    //     align: 'left',
    //     wrap: {
    //         mode: 'word',
    //         width: 700
    //     },
    // });

    var missionDesc = scene.add.rexBBCodeText(middleX-descBoxTopX+50, descBoxTopY+100, text, {
        fontSize: '30px',
        align: 'left',
        wrap: {
            mode: 'word',
            width: descriptionBox.width-100
        },
    });

    var youtubeId = {
        intro: 'qz1XzCmdHAg',
        problem: 'EJZ8B7NOy2k'
    }

    var youtubePlayer;
    // var sequence = 0;
    var state = {sequence: 0, questionNumber: 1, choices: [], selections: []};
    // var {choices, selections} = createChoices(scene, questionNumber, descriptionBox);
    // var state = createChoices(scene, questionNumber, descriptionBox);
    // var state = createChoices(scene, state, descriptionBox);

    var nextBtn = createNextBtn(scene, middleX, middleY + (descriptionBox.height / 2) - 50, 'TERIMA', () => {

        console.log("Sequence:" + state.sequence);
        console.log(state.questionNumber);
        console.log(state.choices);
        console.log(state.selections);

        switch (state.sequence) {
            case 0:
                missionDesc.setVisible(false);
                youtubePlayer = showYoutubeVideo(scene, middleX, middleY, youtubeId['intro']); //munculin video alat dan bahan
                nextBtn.setText('LANJUT');
                break;
            case 1:
                // youtubePlayer.load(youtubeId['problem'], false);
                youtubePlayer.destroy();
                youtubePlayer = showYoutubeVideo(scene, middleX, middleY, youtubeId['problem']);
                break;
            case 2:
                youtubePlayer.destroy();
                //text = getProblemText(0);
                text = 'Berdasarkan tayangan video tersebut, coba bandingkan perubahan pH pada sistem 1 sampai 4 sebelum dan sesudah ditambah sedikit asam maupun basa. Manakah pernyataan yang benar?';
                missionDesc.setText(text);
                missionDesc.setVisible(true);
                break;
            case 3:
                missionDesc.setVisible(false);
                nextBtn.setText('KONFIRMASI');
                // console.log(state.selections);
                // selections = showChoices(choices);
                createChoices(scene, state, descriptionBox);
                // showChoices(state.choices);
                // console.log(selections);
                break;
            case 4:
                var isAnswer = checkAnswer(state);
                if (isAnswer == true) {
                    showRightScreen(scene, state, nextBtn);
                }
                break;
        }

        if (state.sequence != 4) {
            state.sequence += 1;
        }
    });
    
}

function showYoutubeVideo(scene, middleX, middleY, videoId) {
    return scene.add.rexYoutubePlayer(middleX, middleY, 600, 450, {
        videoId: videoId,
        autoPlay: false
    });
}

function createChoices(scene, state, descriptionBox) {
    // var middleX = scene.cameras.main.width / 2;
    // var middleY = scene.cameras.main.height / 2;
    var descBoxTopX = middleX - (descriptionBox.width / 2);
    var descBoxTopY = middleY - (descriptionBox.height / 2);

    if (state.questionNumber == 1) {
        var choicesText = [
            "pH pada semua system/ campuran berubah drastis",
            "pH pada Campuran 15 mL CH3COOH 0,1 M + 15 mL CH3COONa 15 M tidak berubah secara signifikan",
            "pH pada campuran 15 mL HCl 0,1 M + 15 mL NaCl 0,1 M tidak berubah secara signifikan",
            "pH pada larutan asam asetat 0,1 M berubah drastis",
            "pH pada larutan natrium asetat 0,1 M berubah drastis"
        ];
        // buat nyimpen si tombol pilihan jawaban
        state.choices = [];
        // buat nyimpen tombol jawaban mana aja yg dipilih, contoh isinya nanti kayak [1,1,0,0,0]
        state.selections = new Array(choicesText.length).fill(0); 

        var deltaY = 80; // jarak antar masing-masing tombol jawaban
        
        for (let i = 0; i < choicesText.length; i++) {
            // var choice = createChoiceBtn(scene, middleX, descBoxTopY+150+(deltaY*i), choicesText[i]);
            var choice = createChoiceBtn(scene, middleX, descBoxTopY+150+(deltaY*i), choicesText[i], descriptionBox);
            state.choices.push(choice);
            // choice.setVisible(false);
            state.choices[i].on('pointerdown', () => {
                if (state.selections[i] == 0) {
                    state.choices[i].setStyle({ backgroundColor: "#FFBF00" });
                    state.selections[i] = 1;
                } else if (state.selections[i] == 1) {
                    state.choices[i].setStyle({ backgroundColor: "#e6e6e6" });
                    state.selections[i] = 0;
                }
                console.log("You clicked choice " + i);
                // console.log(selections);
            });
            // var selections.append(0);
        }

        // Object.assign(state, {choices: choices, selections: selections});
        return state;
    }
}

function showChoices(choices) {
    for (let i = 0; i < choices.length; i++) {
        choices[i].setVisible(true);
    }
}

/*
function showQuestion(scene, questionNumber, descriptionBox) {
    var middleX = scene.cameras.main.width / 2;
    var middleY = scene.cameras.main.height / 2;
    var descBoxTopX = middleX - (descriptionBox.width / 2);
    var descBoxTopY = middleY - (descriptionBox.height / 2);

    if (questionNumber == 0) {
        var choicesText = [
            "pH pada semua system/ campuran berubah drastis",
            "pH pada Campuran 15 mL CH3COOH 0,1 M + 15 mL CH3COONa 15 M tidak berubah secara signifikan",
            "pH pada campuran 15 mL HCl 0,1 M + 15 mL NaCl 0,1 M tidak berubah secara signifikan",
            "pH pada larutan asam asetat 0,1 M berubah drastis",
            "pH pada larutan natrium asetat 0,1 M berubah drastis"
        ];
        var choices = [];
        var selections = new Array(choicesText.length).fill(0); // pilihan jawaban yang dipilih misal [0,1,1,0,1]

        console.log(selections);

        var deltaY = 80;
        // var choice1 = createChoiceBtn(scene, middleX, middleY-(deltaY*2), 'pH pada semua system/ campuran berubah drastis');
        // var choice2 = createChoiceBtn(scene, middleX, middleY-(deltaY*1), 'pH pada Campuran 15 mL CH3COOH 0,1 M + 15 mL CH3COONa 15 M tidak berubah secara signifikan');
        // var choice3 = createChoiceBtn(scene, middleX, middleY, 'pH pada campuran 15 mL HCl 0,1 M + 15 mL NaCl 0,1 M tidak berubah secara signifikan');
        // var choice4 = createChoiceBtn(scene, middleX, middleY+(deltaY*1), 'pH pada larutan asam asetat 0,1 M berubah drastis');
        // var choice5 = createChoiceBtn(scene, middleX, middleY+(deltaY*2), 'pH pada larutan natrium asetat 0,1 M berubah drastis');
        
        for (let i = 0; i < choicesText.length; i++) {
            // var choice = createChoiceBtn(scene, middleX, descBoxTopY+150+(deltaY*i), choicesText[i]);
            var choice = createChoiceBtn(scene, middleX, descBoxTopY+150+(deltaY*i), choicesText[i], descriptionBox);
            choices.push(choice);
            choices[i].on('pointerdown', () => {
                if (selections[i] == 0) {
                    choices[i].setStyle({ backgroundColor: "#FFBF00" });
                    selections[i] = 1;
                } else if (selections[i] == 1) {
                    choices[i].setStyle({ backgroundColor: "#e6e6e6" });
                    selections[i] = 0;
                }
                console.log("You clicked choice " + i);
                console.log(selections);
            });
            // var selections.append(0);
        }

        return selections;
    }
}
*/

function checkAnswer(state) {
    console.log("Final Answer: ");
    console.log(state.selections);

    var correctAnswer = [];
    if (state.questionNumber == 1) {
        correctAnswer = [0,1,0,1,1];
        return arraysEqual(state.selections, correctAnswer);
        // console.log(arraysEqual(state.selections,correctAnswer));
        // if (arraysEqual(state.selections, correctAnswer)) {

        // }
    }
}

function showRightScreen(scene, state, nextBtn) {
    for (let i = 0; i < state.choices.length; i++) {
        state.choices[i].setVisible(false);
    }

    nextBtn.x = middleX - 150;
    nextBtn.y = middleY + 100;
    nextBtn.setText('LANJUT');

    var exitBtn = createNextBtn(scene, middleX+150, middleY+100, 'TIDAK', () => {scene.scene.start('MissionSelection')});
    var text = scene.add.text(middleX, middleY - 100, 'Bagus sekali, pilihan Anda benar.')
        .setOrigin(0.5)
        .setFontSize('30px');
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
            width: wrapWidth-100
        },
        //max line dalam sekali textbox
        maxLines: 10
    })
}

function createExitBtn(scene, x, y) {
    var button = scene.add.text(x, y, 'EXIT')
        .setOrigin(0)
        .setFontSize(30)
        // .setOrigin(10)
        .setPadding(12)
        .setStyle({ backgroundColor: '#000000', color: '#ffffff' })
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => button.setStyle({ color: '#0000ff' }))
        .on('pointerout', () => button.setStyle({ color: '#ffffff' }))
        .on('pointerdown', () => scene.scene.start('MainMenu'));

    return button;
}

function createNextBtn(scene, x, y, label, callback) {
    var button = scene.add.text(x, y, label)
        .setOrigin(0.5)
        .setFontSize('30px')
        .setPadding(12)
        .setStyle({ backgroundColor: '#e6e6e6', color: '#000000' })
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => button.setStyle({ color: '#0000ff' }))
        .on('pointerout', () => button.setStyle({ color: '#000000' }))
        .on('pointerdown', () => callback());

    return button
}

function createChoiceBtn(scene, x, y, label, container) {
    var button = scene.add.rexBBCodeText({
        x: x,
        y: y,
        text: label,
        style: {
            fontSize: '25px',
            backgroundColor: '#e6e6e6',
            color: '#000000',
            backgroundCornerRadius: 20,
            halign: 'center',
            valign: 'center',
            padding: {
                left: 15,
                right: 15,
                top: 12,
                bottom: 12,
            },
            wrap: {
                mode: 'word',
                width: container.width - 50
            }
        } 
    })
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerover', () => {button.setStyle({ color: '#0000ff' })})
    .on('pointerout', () => button.setStyle({ color: '#000000' }));

    return button;
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
}
