question2110 = new Phaser.Scene('Question2110');

question2110.preload = function () {
    this.load.path = './assets/';
    this.load.image('blueBeaker', 'question/blueBeaker.png');

    //jawaban bener dari sblmnya jadi soal
    this.load.image('219A', 'question/2.1.9A.png');

    this.load.image('2110A', 'question/2.1.10A.png');
    this.load.image('2110B', 'question/2.1.10A.png');
    this.load.image('2110C', 'question/2.1.10A.png');
    this.load.image('2110D', 'question/2.1.10A.png');
    this.load.image('2110E', 'question/2.1.10A.png');

    //bg jawaban
    this.load.image('opsi1', 'icons/opsi1.png');
    this.load.image('opsi2', 'icons/opsi2.png');
    this.load.image('opsi3', 'icons/opsi3.png');
    this.load.image('opsi4', 'icons/opsi4.png');
    this.load.image('opsi5', 'icons/opsi5.png');

    this.load.image('background', 'scenes/bg_question.png');

    this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
}

var opsiJawaban1;
var opsiJawaban2;
var opsiJawaban3;
var opsiJawaban4;
var opsiJawaban5;
var blueBeaker;
var labelPertanyaan;

var textPertanyaan;

var A;
var B;
var C;
var D;
var E;

var objectsArray;

var answerArray;
var playerAnswerArray;

var cekJawabanBtn;

question2110.create = function () {

    // console.log(game.canvas.width, game.canvas.height);
    //x 1879 y 1008

    //comment nanti, keperluan debugging doang. harusnya di initiate dari main menu.
    middleX = this.cameras.main.width / 2;
    middleY = this.cameras.main.height / 2;

    //background
    this.add.image(middleX, middleY, 'background').setScale(1.2, 0.95);

    //variable initialization
    //yg bener itu pilihan A
    answerArray = ['A'];
    playerAnswerArray = [];
    objectsArray = [];

    //beaker jawaban
    opsiJawaban1 = this.add.image(middleX - 30, middleY - 20, 'opsi1').setInteractive().setScale(0.22).setName('A');
    objectsArray.push(opsiJawaban1);

    opsiJawaban2 = this.add.image(middleX + 240, middleY - 160, 'opsi2').setInteractive().setScale(0.22).setName('B');
    objectsArray.push(opsiJawaban2);

    opsiJawaban3 = this.add.image(middleX + 540, middleY - 20, 'opsi3').setInteractive().setScale(0.22).setName('C');
    objectsArray.push(opsiJawaban3);

    opsiJawaban4 = this.add.image(middleX + 810, middleY - 160, 'opsi4').setInteractive().setScale(0.22).setName('D');
    objectsArray.push(opsiJawaban4);


    //blueBeaker
    blueBeaker = this.add.image(middleX + 240, middleY - 20, 'blueBeaker').setScale(0.4);
    labelPertanyaan = this.add.image(middleX + 240, middleY + 230, '219A').setScale(1.2);

    //just a visual display of the drop zone
    // const graphics = this.add.graphics();
    // graphics.lineStyle(2, 0xffff00);
    // graphics.strokeRect(answerZone.x - answerZone.input.hitArea.width / 2, answerZone.y - answerZone.input.hitArea.height / 2, answerZone.input.hitArea.width, answerZone.input.hitArea.height);

    //text pertanyaan
    textPertanyaan = this.add.text(middleX - 870, middleY - 454, "Tuangkan isi\nbotol yang benar\nke gelas kimia..", {font: "900 50px Helvetica", fill: "#ffffff"});

    var text = `
Nah.. sekarang cari komponen penyangga yang terdapat dalam campuran, sehingga membedakannya dengan campuran lainnya
`;

    //beaker-text
    A = this.add.image(middleX - 30, middleY + 170, '2110A').setScale(1.2);
    // this.input.setDraggable(A);
    objectsArray.push(A);

    B = this.add.image(middleX + 250, middleY + 30, '2110B').setScale(1.2);
    // this.input.setDraggable(B);
    objectsArray.push(B);

    C = this.add.image(middleX + 540, middleY + 170, '2110C').setScale(1.2);
    // this.input.setDraggable(C);
    objectsArray.push(C);

    D = this.add.image(middleX + 820, middleY + 30, '2110D').setScale(1.2);
    // this.input.setDraggable(D);
    objectsArray.push(D);

    this.input.on('pointerdown', () => {
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

        playerAnswerArray.push(gameObject.name);
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
        console.log(playerAnswerArray);
        console.log(checkAnswerDraggable(answerArray, playerAnswerArray));
        
        if (checkAnswerDraggable(answerArray, playerAnswerArray)) {
            //destory all objects
            destroyObject(objectsArray);

            let text = "Bagus sekali, pilihan Anda benar.";
            showAnnouncementCorrectAnswer2110(this, text);
        }
        else {
            //destory all objects
            destroyObject(objectsArray);

            let text = "Jawaban Anda salah, Anda punya 1x kesempatan untuk mencoba menjawab kembali.";
            let clueText = "Asam asetat adalah elektrolit lemah, sedangkan natrium asetat adalah elektrolit kuat";
            showAnnouncementWrongAnswer2110(this, text, clueText);
        }  

    }, middleX, middleY + 350);
    objectsArray.push(cekJawabanBtn);

    //alur game
    //hide all object
    // hideObject(objectsArray);

    //show pertanyaan
    // showPertanyaan2110(this, text);
}

question2110.update = function () {
    
}

function showPertanyaan2110(scene, text) {
    var descriptionBox = scene.add.rectangle(scene.cameras.main.width / 2, scene.cameras.main.height / 2, scene.cameras.main.width / 2, scene.cameras.main.height * 3 / 4, 0x000000, 0.7);
    var descBoxTopX = middleX - (descriptionBox.width / 2);
    var descBoxTopY = middleY - (descriptionBox.height / 2);

    let missionDesc = scene.add.rexBBCodeText(middleX-descBoxTopX+50, descBoxTopY+250, text, {
        fontSize: '30px',
        align: 'left',
        wrap: {
            mode: 'word',
            width: descriptionBox.width-100
        },
    });

    var nextBtn = createNextButton(scene, 'LANJUT', () => {
        missionDesc.destroy();
        nextBtn.destroy();
        descriptionBox.destroy();

        //munculin semua game object
        showObject(objectsArray);
    }, middleX, middleY + (descriptionBox.height / 2) - 50);
}

function showClue2110(scene, text) {
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
        startOver2110(scene);
    }, middleX, middleY + (descriptionBox.height / 2) - 50);
}

function showAnnouncementCorrectAnswer2110(scene, text) {
    var descriptionBox = scene.add.rectangle(scene.cameras.main.width / 2, scene.cameras.main.height / 2, scene.cameras.main.width / 2, scene.cameras.main.height * 3 / 4, 0x000000, 0.7);

    let announcement = scene.add.text(middleX, middleY, text)
        .setOrigin(0.5)
        .setFontSize('30px');

    var nextBtn = createNextButton(scene, 'LANJUT', () => {
        nextBtn.destroy();
        exitBtn.destroy();
        descriptionBox.destroy();
        announcement.destroy();

        //to question 10
        scene.scene.start('Question2110');

    }, middleX - 150, middleY + (descriptionBox.height/2) - 100);

    var exitBtn = createNextButton(scene, 'KELUAR', () => {
        scene.scene.start('MainMenu');

    }, middleX + 150, middleY + (descriptionBox.height/2) - 100);    
}

function showAnnouncementWrongAnswer2110(scene, text, clueText) {
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

        startOver2110(scene);

    }, middleX - 150, middleY + (descriptionBox.height/2) - 100);

    var clueBtn = createNextButton(scene, 'CLUE', () => {
        nextBtn.destroy();
        clueBtn.destroy();
        descriptionBox.destroy();
        missionDesc.destroy();

        showClue2110(scene, clueText);

    }, middleX + 150, middleY + (descriptionBox.height/2) - 100);
}

//buat ngereset game object ke posisi semula
//yang di hide masukin semua kesini
function startOver2110(scene) {
    //kosongin jawaban buat startover
    playerAnswerArray = [];

    opsiJawaban1 = scene.add.image(middleX - 30, middleY - 20, 'bottle').setInteractive().setScale(0.19).setName('A');
    scene.input.setDraggable(opsiJawaban1);

    opsiJawaban2 = scene.add.image(middleX + 240, middleY - 160, 'bottle').setInteractive().setScale(0.19).setName('B');
    scene.input.setDraggable(opsiJawaban2);

    opsiJawaban3 = scene.add.image(middleX + 540, middleY - 20, 'bottle').setInteractive().setScale(0.19).setName('C');
    scene.input.setDraggable(opsiJawaban3);

    opsiJawaban4 = scene.add.image(middleX + 810, middleY - 160, 'bottle').setInteractive().setScale(0.19).setName('D');
    scene.input.setDraggable(opsiJawaban4);

    A = scene.add.image(middleX - 30, middleY + 170, '2110A').setScale(1.2);

    B = scene.add.image(middleX + 250, middleY + 30, '2110B').setScale(1.2);

    C = scene.add.image(middleX + 540, middleY + 170, '2110C').setScale(1.2);

    D = scene.add.image(middleX + 820, middleY + 30, '2110D').setScale(1.2);

    //btn buat check jawaban kedua kali
    cekJawabanBtn = createNextButton(scene, 'CEK JAWABAN', () => {
        // console.log(playerAnswerArray);
        // console.log(checkAnswerDraggable(answerArray, playerAnswerArray));       
        
        if (checkAnswerDraggable(answerArray, playerAnswerArray)) {
            //destory all objects
            destroyObject(objectsArray);

            let text = "Bagus sekali, pilihan Anda benar.";
            showAnnouncementCorrectAnswer2110(scene, text);
        }
        else {
            //salah kedua kali? langsung tendang ke main menu
            scene.scene.start('MainMenu');
        }  

    }, middleX, middleY + 350);
}