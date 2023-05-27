question218 = new Phaser.Scene('Question218');

question218.preload = function () {
    this.load.path = './assets/';
    this.load.image('greenBeaker', 'question/greenBeaker.png');

    this.load.image('HPos', 'question/HPos.png');
    this.load.image('COONaPos', 'question/COONaPos.png');
    this.load.image('H2O', 'question/H2O.png');
    this.load.image('CH3COONa', 'question/CH3COONa.png');
    this.load.image('NaPos', 'question/NaPos.png');
    this.load.image('OHNeg', 'question/OHNeg.png');
    this.load.image('CH3COO', 'question/CH3COO.png');
    this.load.image('CH3', 'question/CH3.png');
    this.load.image('Na', 'question/Na.png');

    this.load.image('background', 'scenes/bg_question.png');

    this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
}

var beakerJawaban;
var dropZoneGreenBeakerBG;

var textPertanyaan;

var HPos;
var OHNeg;
var CH3COO;
var NaPos;
var H2O;
var CH3;
var CH3COONa;
var Na;
var COONaPos;

var objectsArray;

var answerArray;
var playerAnswerArray;

var cekJawabanBtn;

question218.create = function () {
    start("2.1",8)
    // console.log(game.canvas.width, game.canvas.height);
    //x 1879 y 1008

    //comment nanti, keperluan debugging doang. harusnya di initiate dari main menu.
    middleX = this.cameras.main.width / 2;
    middleY = this.cameras.main.height / 2;

    //background
    this.add.image(middleX, middleY, 'background').setScale(1.2, 0.95);

    //variable initialization
    //yg bener itu H+, OH-, NaPos, CH3COO, H2O
    answerArray = ['HPos', 'H2O', 'NaPos', 'OHNeg', 'CH3COO'];
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
    HPos = this.add.image(middleX + 550, middleY - 35, 'HPos').setInteractive().setScale(0.7);
    this.input.setDraggable(HPos);
    objectsArray.push(HPos);


    COONaPos = this.add.image(middleX + 650, middleY - 50, 'COONaPos').setInteractive().setScale(0.7);
    this.input.setDraggable(COONaPos);
    objectsArray.push(COONaPos);


    //jawaban bener
    H2O = this.add.image(middleX + 570, middleY + 85, 'H2O').setInteractive().setScale(0.7);
    this.input.setDraggable(H2O);
    objectsArray.push(H2O);


    CH3COONa = this.add.image(middleX + 430, middleY -70, 'CH3COONa').setInteractive().setScale(0.7);
    this.input.setDraggable(CH3COONa);
    objectsArray.push(CH3COONa);


    //jawaban bener
    NaPos = this.add.image(middleX + 430, middleY - 0, 'NaPos').setInteractive().setScale(0.7);
    this.input.setDraggable(NaPos);
    objectsArray.push(NaPos);


    //jawaban bener
    OHNeg = this.add.image(middleX + 670, middleY + 20, 'OHNeg').setInteractive().setScale(0.7);
    this.input.setDraggable(OHNeg);
    objectsArray.push(OHNeg);

    //jawaban benar
    CH3COO = this.add.image(middleX + 550, middleY + 20, 'CH3COO').setInteractive().setScale(0.7);
    this.input.setDraggable(CH3COO);
    objectsArray.push(CH3COO);

    CH3 = this.add.image(middleX + 470, middleY + 100, 'CH3').setInteractive().setScale(0.7);
    this.input.setDraggable(CH3);
    objectsArray.push(CH3);

    Na = this.add.image(middleX + 670, middleY + 100, 'Na').setInteractive().setScale(0.7);
    this.input.setDraggable(Na);
    objectsArray.push(Na);

    this.input.on('pointerdown', () => {
        //kalau udah ketemu smua ceknya pake inputnya false smua
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

            let text = "Kamu keren... Semangat terus!!!\nLanjutkan!!";
            showAnnouncementCorrectAnswer218(this, text);
        }
        else {
            //destory all objects
            destroyObject(objectsArray);

            let text = "Jawaban Anda salah, Anda punya 1x kesempatan untuk mencoba menjawab kembali.";
            let clueText = "Spesi sesuai dengan reaksi disosiasi yang terjadi, dan pertimbangkan juga bahwa dalam larutan terdapat air";
            showAnnouncementWrongAnswer218(this, text, clueText);
        }  

    }, middleX, middleY + 350);
    objectsArray.push(cekJawabanBtn);

    //alur game
    //hide all object
    hideObject(objectsArray);

    //show pertanyaan
    showPertanyaan218(this, text);
}

question218.update = function () {
    
}

function showPertanyaan218(scene, text) {
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

function showClue218(scene, text) {
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
        startOver218(scene);
    }, middleX, middleY + (descriptionBox.height / 2) - 50);
}

function showAnnouncementCorrectAnswer218(scene, text) {
    var descriptionBox = scene.add.rectangle(scene.cameras.main.width / 2, scene.cameras.main.height / 2, scene.cameras.main.width / 2, scene.cameras.main.height * 3 / 4, 0x000000, 0.7);

    let announcement = scene.add.text(middleX, middleY, text)
        .setOrigin(0.5)
        .setFontSize('30px');

    var nextBtn = createNextButton(scene, 'LANJUT', () => {
        nextBtn.destroy();
        exitBtn.destroy();
        descriptionBox.destroy();
        announcement.destroy();

        //to tabulasi screen
        scene.scene.start('Question219');

    }, middleX - 150, middleY + (descriptionBox.height/2) - 100);

    var exitBtn = createNextButton(scene, 'KELUAR', () => {
        scene.scene.start('MainMenu')

    }, middleX + 150, middleY + (descriptionBox.height/2) - 100);    
}

function showAnnouncementWrongAnswer218(scene, text, clueText) {
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

        startOver218(scene);

    }, middleX - 150, middleY + (descriptionBox.height/2) - 100);

    var clueBtn = createNextButton(scene, 'CLUE', () => {
        nextBtn.destroy();
        clueBtn.destroy();
        descriptionBox.destroy();
        missionDesc.destroy();

        showClue218(scene, clueText);

    }, middleX + 150, middleY + (descriptionBox.height/2) - 100);
}

//buat ngereset game object ke posisi semula
//perlu di push lagi ke array ga ya?
//ga usah
function startOver218(scene) {
    //kosongin jawaban buat startover
    playerAnswerArray = [];

    //jawaban bener
    HPos = scene.add.image(middleX + 550, middleY - 35, 'HPos').setInteractive().setScale(0.7);
    scene.input.setDraggable(HPos);

    COONaPos = scene.add.image(middleX + 650, middleY - 50, 'COONaPos').setInteractive().setScale(0.7);
    scene.input.setDraggable(COONaPos);

    //jawaban bener
    H2O = scene.add.image(middleX + 570, middleY + 85, 'H2O').setInteractive().setScale(0.7);
    scene.input.setDraggable(H2O);

    CH3COONa = scene.add.image(middleX + 430, middleY -70, 'CH3COONa').setInteractive().setScale(0.7);
    scene.input.setDraggable(CH3COONa);

    //jawaban bener
    NaPos = scene.add.image(middleX + 430, middleY - 0, 'NaPos').setInteractive().setScale(0.7);
    scene.input.setDraggable(NaPos);

    //jawaban bener
    OHNeg = scene.add.image(middleX + 670, middleY + 20, 'OHNeg').setInteractive().setScale(0.7);
    scene.input.setDraggable(OHNeg);

    //jawaban benar
    CH3COO = scene.add.image(middleX + 550, middleY + 20, 'CH3COO').setInteractive().setScale(0.7);
    scene.input.setDraggable(CH3COO);

    CH3 = scene.add.image(middleX + 470, middleY + 100, 'CH3').setInteractive().setScale(0.7);
    scene.input.setDraggable(CH3);

    Na = scene.add.image(middleX + 670, middleY + 100, 'Na').setInteractive().setScale(0.7);
    scene.input.setDraggable(Na);

    //btn buat check jawaban kedua kali
    cekJawabanBtn = createNextButton(scene, 'CEK JAWABAN', () => {
        // console.log(playerAnswerArray);
        // console.log(checkAnswerDraggable(answerArray, playerAnswerArray));       
        
        if (checkAnswerDraggable(answerArray, playerAnswerArray)) {
            //destory all objects
            destroyObject(objectsArray)
            done("2.1",8)

            let text = "Bagus sekali, pilihan Anda benar.";
            showAnnouncementCorrectAnswer218(scene, text);
        }
        else {
            //salah kedua kali? langsung tendang ke main menu
            scene.scene.start('MainMenu');
        }  

    }, middleX, middleY + 350);
}