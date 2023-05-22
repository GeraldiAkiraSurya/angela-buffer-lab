question212 = new Phaser.Scene('Question212');

question212.preload = function () {
    this.load.path = './assets/';
    this.load.image('greenBeaker', 'question/greenBeaker.png');
    this.load.image('CH3COONeg', 'question/CH3COONeg.png');
    this.load.image('CH3COOH', 'question/CH3COOH.png');
    this.load.image('CH3COONa', 'question/CH3COONa.png');
    this.load.image('HPos', 'question/HPos.png');
    this.load.image('H2', 'question/H2.png');
    this.load.image('H2O', 'question/H2O.png');
    this.load.image('Na', 'question/Na.png');
    this.load.image('NaPos', 'question/NaPos.png');
    this.load.image('O2', 'question/O2.png');
    this.load.image('OHNeg', 'question/OHNeg.png');

    this.load.image('background', 'scenes/bg_question.png');

    this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
}

var beakerJawaban;
var dropZoneGreenBeakerBG;

var textPertanyaan;

var CH3COONeg;
var CH3COOH;
var CH3COONa;
var HPos;
var H2;
var H2O;
var Na;
var NaPos;
var O2;
var OHNeg;

var objectsArray;

var answerArray;
var playerAnswerArray;

var cekJawabanBtn;

question212.create = function () {

    // console.log(game.canvas.width, game.canvas.height);
    //x 1879 y 1008

    //comment nanti, keperluan debugging doang. harusnya di initiate dari main menu.
    middleX = this.cameras.main.width / 2;
    middleY = this.cameras.main.height / 2;

    //background
    this.add.image(middleX, middleY, 'background').setScale(1.2, 0.95);

    //variable initialization
    //yg bener itu H+, OH-, CH3COOH, CH3COO-, Na+, H2O
    answerArray = ['CH3COONeg', 'CH3COOH', 'HPos', 'H2O', 'NaPos', 'OHNeg'];
    playerAnswerArray = [];
    objectsArray = [];

    //nanti jawaban ect diset false
    //beaker jawaban
    beakerJawaban = this.add.image(middleX + 530, middleY - 100, 'greenBeaker').setScale(0.9);

    //beaker holder spesi
    dropZoneGreenBeakerBG = this.add.image(middleX - 0, middleY - 100, 'greenBeaker').setScale(0.9);

    const answerZone = this.add.zone(middleX - 0, middleY - 100, dropZoneGreenBeakerBG.width, dropZoneGreenBeakerBG.height).setRectangleDropZone(dropZoneGreenBeakerBG.width - 50, dropZoneGreenBeakerBG.height - 60).setName('answer');

    //just a visual display of the drop zone
    // const graphics = this.add.graphics();
    // graphics.lineStyle(2, 0xffff00);
    // graphics.strokeRect(answerZone.x - answerZone.input.hitArea.width / 2, answerZone.y - answerZone.input.hitArea.height / 2, answerZone.input.hitArea.width, answerZone.input.hitArea.height);

    //text pertanyaan
    textPertanyaan = this.add.text(middleX - 870, middleY - 304, "Pindahkan spesi\nyang ada dalam sistem\nke dalam gelas\nkimia kosong", {font: "900 50px Helvetica", fill: "#ffffff"});

    var text = `
Spesi apa saja yang ada dalam larutan?

Ayo kumpulkan!`;

    //spesi-spesi
    //jawaban bener
    CH3COONeg = this.add.image(middleX + 550, middleY + 25, 'CH3COONeg').setInteractive().setScale(0.7);
    this.input.setDraggable(CH3COONeg);
    objectsArray.push(CH3COONeg);

    //jawaban bener
    CH3COOH = this.add.image(middleX + 470, middleY + 100, 'CH3COOH').setInteractive().setScale(0.7);
    this.input.setDraggable(CH3COOH);
    objectsArray.push(CH3COOH);


    CH3COONa = this.add.image(middleX + 550, middleY - 100, 'CH3COONa').setInteractive().setScale(0.7);
    this.input.setDraggable(CH3COONa);
    objectsArray.push(CH3COONa);


    //jawaban bener
    HPos = this.add.image(middleX + 550, middleY - 35, 'HPos').setInteractive().setScale(0.7);
    this.input.setDraggable(HPos);
    objectsArray.push(HPos);


    H2 = this.add.image(middleX + 650, middleY - 50, 'H2').setInteractive().setScale(0.7);
    this.input.setDraggable(H2);
    objectsArray.push(H2);


    //jawaban bener
    H2O = this.add.image(middleX + 590, middleY + 85, 'H2O').setInteractive().setScale(0.7);
    this.input.setDraggable(H2O);
    objectsArray.push(H2O);


    Na = this.add.image(middleX + 430, middleY -70, 'Na').setInteractive().setScale(0.7);
    this.input.setDraggable(Na);
    objectsArray.push(Na);


    //jawaban bener
    NaPos = this.add.image(middleX + 430, middleY - 0, 'NaPos').setInteractive().setScale(0.7);
    this.input.setDraggable(NaPos);
    objectsArray.push(NaPos);


    O2 = this.add.image(middleX + 670, middleY + 85, 'O2').setInteractive().setScale(0.7);
    this.input.setDraggable(O2);
    objectsArray.push(O2);


    //jawaban bener
    OHNeg = this.add.image(middleX + 670, middleY + 20, 'OHNeg').setInteractive().setScale(0.7);
    this.input.setDraggable(OHNeg);
    objectsArray.push(OHNeg);

    this.input.on('pointerdown', () => {
        //kalau udah ketemu smua ceknya pake inputnya false smua

        // console.log(CH3COONeg.texture.key + ' input enabled? ' + CH3COONeg.input.enabled);
        // console.log(CH3COOH.texture.key + ' input enabled? ' + CH3COOH.input.enabled);
        // console.log(HPos.texture.key + ' input enabled? ' + HPos.input.enabled);
        // console.log(H2O.texture.key + ' input enabled? ' + H2O.input.enabled);
        // console.log(NaPos.texture.key + ' input enabled? ' + NaPos.input.enabled);
        // console.log(OHNeg.texture.key + ' input enabled? ' + OHNeg.input.enabled);
    });

    //mulai event dragging
    this.input.on('dragstart', function (pointer, gameObject) {
        this.children.bringToTop(gameObject);
        // console.log(gameObject.name);
        // console.log(gameObject.texture.key);        
    }, this);

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    });

    this.input.on('drop', function (pointer, gameObject, dropZone) {
        // console.log(dropZone.name);

        gameObject.x = gameObject.x;
        gameObject.y = gameObject.y;
        gameObject.input.enabled = false;

        playerAnswerArray.push(gameObject.texture.key);
    });

    this.input.on('dragend', function (pointer, gameObject, dropped) {
        if (!dropped) {
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
        }
    });
    //beres event dragging

    //btn buat check jawaban
    cekJawabanBtn = createNextButton(this, 'CEK JAWABAN', () => {
        // console.log(playerAnswerArray);
        // console.log(checkAnswerDraggable(answerArray, playerAnswerArray));
        
        if (checkAnswerDraggable(answerArray, playerAnswerArray)) {
            //destory all objects
            destroyObject(objectsArray);

            let text = "Bagus sekali, pilihan Anda benar.";
            showAnnouncementCorrectAnswer212(this, text);
        }
        else {
            //destory all objects
            destroyObject(objectsArray);

            let text = "Jawaban Anda salah, Anda punya 1x kesempatan untuk mencoba menjawab kembali.";
            let clueText = "Spesi sesuai dengan reaksi disosiasi yang terjadi, dan pertimbangkan juga bahwa dalam larutan terdapat air";
            showAnnouncementWrongAnswer212(this, text, clueText);
        }  

    }, middleX, middleY + 350);
    objectsArray.push(cekJawabanBtn);

    //alur game
    //hide all object
    hideObject(objectsArray);

    //show pertanyaan
    showPertanyaan212(this, text);
}

question212.update = function () {
    
}

function showPertanyaan212(scene, text) {
    var descriptionBox = scene.add.rectangle(scene.cameras.main.width / 2, scene.cameras.main.height / 2, scene.cameras.main.width / 2, scene.cameras.main.height * 3 / 4, 0x000000, 0.7);

    let missionDesc = scene.add.text(middleX, middleY, text)
        .setOrigin(0.5)
        .setFontSize('30px');

    var nextBtn = createNextButton(scene, 'LANJUT', () => {
        missionDesc.destroy();
        nextBtn.destroy();
        descriptionBox.destroy();

        //munculin semua game object
        showObject(objectsArray);
    }, middleX, middleY + (descriptionBox.height / 2) - 50);
}

function showClue212(scene, text) {
    var descriptionBox = scene.add.rectangle(scene.cameras.main.width / 2, scene.cameras.main.height / 2, scene.cameras.main.width / 2, scene.cameras.main.height * 3 / 4, 0x000000, 0.7);
    var descBoxTopX = middleX - (descriptionBox.width / 2);
    var descBoxTopY = middleY - (descriptionBox.height / 2);

    var clue = scene.add.rexBBCodeText(middleX-descBoxTopX+50, descBoxTopY+250, text, {
        fontSize: '30px',
        align: 'left',
        wrap: {
            mode: 'word',
            width: descriptionBox.width-100
        },
    });

    var nextBtn = createNextButton(scene, 'LANJUT', () => {
        clue.destroy();
        nextBtn.destroy();
        descriptionBox.destroy();

        //reset game objects location
        startOver212(scene);
    }, middleX, middleY + (descriptionBox.height / 2) - 50);
}

function showAnnouncementCorrectAnswer212(scene, text) {
    var descriptionBox = scene.add.rectangle(scene.cameras.main.width / 2, scene.cameras.main.height / 2, scene.cameras.main.width / 2, scene.cameras.main.height * 3 / 4, 0x000000, 0.7);

    let announcement = scene.add.text(middleX, middleY, text)
        .setOrigin(0.5)
        .setFontSize('30px');

    var nextBtn = createNextButton(scene, 'LANJUT', () => {
        nextBtn.destroy();
        exitBtn.destroy();
        descriptionBox.destroy();
        announcement.destroy();

        //to question 3
        scene.scene.start('Question214');

    }, middleX - 150, middleY + (descriptionBox.height/2) - 100);

    var exitBtn = createNextButton(scene, 'KELUAR', () => {
        scene.scene.start('MainMenu');

    }, middleX + 150, middleY + (descriptionBox.height/2) - 100);    
}

function showAnnouncementWrongAnswer212(scene, text, clueText) {
    var descriptionBox = scene.add.rectangle(scene.cameras.main.width / 2, scene.cameras.main.height / 2, scene.cameras.main.width / 2, scene.cameras.main.height * 3 / 4, 0x000000, 0.7);
    var descBoxTopX = middleX - (descriptionBox.width / 2);
    var descBoxTopY = middleY - (descriptionBox.height / 2);

    var missionDesc = scene.add.rexBBCodeText(middleX-descBoxTopX+50, descBoxTopY+250, text, {
        fontSize: '30px',
        align: 'left',
        wrap: {
            mode: 'word',
            width: descriptionBox.width-100
        },
    });

    //maybe harus ngosongin array objectsArray di question212 pas game over.
    //ga perlu
    // console.log(objectsArray);

    var nextBtn = createNextButton(scene, 'COBA LAGI', () => {
        nextBtn.destroy();
        clueBtn.destroy();
        descriptionBox.destroy();
        missionDesc.destroy();

        startOver212(scene);

    }, middleX - 150, middleY + (descriptionBox.height/2) - 100);

    var clueBtn = createNextButton(scene, 'CLUE', () => {
        nextBtn.destroy();
        clueBtn.destroy();
        descriptionBox.destroy();
        missionDesc.destroy();

        showClue212(scene, clueText);

    }, middleX + 150, middleY + (descriptionBox.height/2) - 100);
}

//buat ngereset game object ke posisi semula
//perlu di push lagi ke array ga ya?
//ga usah
function startOver212(scene) {
    //kosongin jawaban buat startover
    playerAnswerArray = [];

    CH3COONeg = scene.add.image(middleX + 550, middleY + 25, 'CH3COONeg').setInteractive().setScale(0.7);
    scene.input.setDraggable(CH3COONeg);

    CH3COOH = scene.add.image(middleX + 470, middleY + 100, 'CH3COOH').setInteractive().setScale(0.7);
    scene.input.setDraggable(CH3COOH);

    CH3COONa = scene.add.image(middleX + 550, middleY - 100, 'CH3COONa').setInteractive().setScale(0.7);
    scene.input.setDraggable(CH3COONa);

    HPos = scene.add.image(middleX + 550, middleY - 35, 'HPos').setInteractive().setScale(0.7);
    scene.input.setDraggable(HPos);

    H2 = scene.add.image(middleX + 650, middleY - 50, 'H2').setInteractive().setScale(0.7);
    scene.input.setDraggable(H2);

    H2O = scene.add.image(middleX + 590, middleY + 85, 'H2O').setInteractive().setScale(0.7);
    scene.input.setDraggable(H2O);

    Na = scene.add.image(middleX + 430, middleY -70, 'Na').setInteractive().setScale(0.7);
    scene.input.setDraggable(Na);

    NaPos = scene.add.image(middleX + 430, middleY - 0, 'NaPos').setInteractive().setScale(0.7);
    scene.input.setDraggable(NaPos);

    O2 = scene.add.image(middleX + 670, middleY + 85, 'O2').setInteractive().setScale(0.7);
    scene.input.setDraggable(O2);

    OHNeg = scene.add.image(middleX + 670, middleY + 20, 'OHNeg').setInteractive().setScale(0.7);
    scene.input.setDraggable(OHNeg);

    //btn buat check jawaban kedua kali
    cekJawabanBtn = createNextButton(scene, 'CEK JAWABAN', () => {
        // console.log(playerAnswerArray);
        // console.log(checkAnswerDraggable(answerArray, playerAnswerArray));       
        
        if (checkAnswerDraggable(answerArray, playerAnswerArray)) {
            //destory all objects
            destroyObject(objectsArray);

            let text = "Bagus sekali, pilihan Anda benar.";
            showAnnouncementCorrectAnswer212(scene, text);
        }
        else {
            //salah kedua kali? langsung tendang ke main menu
            scene.scene.start('MainMenu');
        }  

    }, middleX, middleY + 350);
}