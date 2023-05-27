question2110 = new Phaser.Scene('Question2110');


question2110.preload = function () {
    this.load.path = './assets/';
    this.load.image('blueBeaker', 'question/blueBeaker.png');

    //jawaban bener dari sblmnya jadi soal
    this.load.image('219A', 'question/2.1.9A.png');

    this.load.image('2110A', 'question/2.1.10A.png');
    this.load.image('2110B', 'question/2.1.10B.png');
    this.load.image('2110C', 'question/2.1.10C.png');
    this.load.image('2110D', 'question/2.1.10D.png');
    this.load.image('2110E', 'question/2.1.10E.png');

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

question2110.create = function () {
    start("2.1",10)
    // console.log(game.canvas.width, game.canvas.height);
    //x 1879 y 1008

    //comment nanti, keperluan debugging doang. harusnya di initiate dari main menu.
    middleX = this.cameras.main.width / 2;
    middleY = this.cameras.main.height / 2;

    //background
    this.add.image(middleX, middleY, 'background').setScale(1.2, 0.95);

    //variable initialization
    //yg bener itu pilihan opsi1
    objectsArray = [];

    //beaker jawaban
    opsiJawaban1 = this.add.image(middleX - 130, middleY + 70, 'opsi1').setInteractive().setScale(0.22).setName('A');
    objectsArray.push(opsiJawaban1);

    opsiJawaban2 = this.add.image(middleX - 130, middleY - 200, 'opsi2').setInteractive().setScale(0.22).setName('B');
    objectsArray.push(opsiJawaban2);

    opsiJawaban3 = this.add.image(middleX + 250, middleY - 370, 'opsi3').setInteractive().setScale(0.22).setName('C');
    objectsArray.push(opsiJawaban3);

    opsiJawaban4 = this.add.image(middleX + 630, middleY - 200, 'opsi4').setInteractive().setScale(0.22).setName('D');
    objectsArray.push(opsiJawaban4);

    opsiJawaban5 = this.add.image(middleX + 630, middleY + 70, 'opsi5').setInteractive().setScale(0.22).setName('E');
    objectsArray.push(opsiJawaban5);


    //blueBeaker
    blueBeaker = this.add.image(middleX + 240, middleY - 20, 'blueBeaker').setScale(0.4);
    labelPertanyaan = this.add.image(middleX + 240, middleY + 230, '219A').setScale(1.2);
    objectsArray.push(labelPertanyaan);

    //text pertanyaan
    textPertanyaan = this.add.text(middleX - 870, middleY - 454, "Klik pada komponen\npenyangga yang tepat", {font: "900 50px Helvetica", fill: "#ffffff"});

    var text = `
Nah.. sekarang cari komponen penyangga yang terdapat dalam campuran, sehingga membedakannya dengan campuran lainnya
`;

    //beaker-text
    A = this.add.image(middleX - 130, middleY + 70, '2110A').setScale(1.2);
    objectsArray.push(A);

    B = this.add.image(middleX - 130, middleY - 200, '2110B').setScale(1.2);
    objectsArray.push(B);

    C = this.add.image(middleX + 250, middleY - 370, '2110C').setScale(1.2);
    objectsArray.push(C);

    D = this.add.image(middleX + 630, middleY - 200, '2110D').setScale(1.2);
    objectsArray.push(D);

    E = this.add.image(middleX + 630, middleY + 70, '2110E').setScale(1.2);
    objectsArray.push(E);

    this.input.on('pointerdown', () => {
    });

    //opsi bener, sisanya salah
    opsiJawaban1.on('pointerup', function () {
        destroyObject(objectsArray);

        let text = "Bagus sekali, pilihan Anda benar.";
        showAnnouncementCorrectAnswer2110(question2110, text);
    });

    opsiJawaban2.on('pointerup', function () {
        destroyObject(objectsArray);

        let text = "Jawaban Anda salah, Anda punya 1x kesempatan untuk mencoba menjawab kembali.";
        let clueText = "Komponen yang benar sesuai dengan reaksi disosiasi pada campuran dan tidak terdapat pada campuran yang lain";
        showAnnouncementWrongAnswer2110(question2110, text, clueText);
    });

    opsiJawaban3.on('pointerup', function () {
        destroyObject(objectsArray);

        let text = "Jawaban Anda salah, Anda punya 1x kesempatan untuk mencoba menjawab kembali.";
        let clueText = "Komponen yang benar sesuai dengan reaksi disosiasi pada campuran dan tidak terdapat pada campuran yang lain";
        showAnnouncementWrongAnswer2110(question2110, text, clueText);
    });

    opsiJawaban4.on('pointerup', function () {
        destroyObject(objectsArray);

        let text = "Jawaban Anda salah, Anda punya 1x kesempatan untuk mencoba menjawab kembali.";
        let clueText = "Komponen yang benar sesuai dengan reaksi disosiasi pada campuran dan tidak terdapat pada campuran yang lain";
        showAnnouncementWrongAnswer2110(question2110, text, clueText);
    });

    opsiJawaban5.on('pointerup', function () {
        destroyObject(objectsArray);

        let text = "Jawaban Anda salah, Anda punya 1x kesempatan untuk mencoba menjawab kembali.";
        let clueText = "Komponen yang benar sesuai dengan reaksi disosiasi pada campuran dan tidak terdapat pada campuran yang lain";
        showAnnouncementWrongAnswer2110(question2110, text, clueText);
    });

    //alur game
    //hide all object
    hideObject(objectsArray);

    //show pertanyaan
    showPertanyaan2110(this, text);
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
        scene.scene.start('Question2111');

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

    opsiJawaban1 = scene.add.image(middleX - 130, middleY + 70, 'opsi1').setInteractive().setScale(0.22).setName('A');

    opsiJawaban2 = scene.add.image(middleX - 130, middleY - 200, 'opsi2').setInteractive().setScale(0.22).setName('B');

    opsiJawaban3 = scene.add.image(middleX + 250, middleY - 370, 'opsi3').setInteractive().setScale(0.22).setName('C');

    opsiJawaban4 = scene.add.image(middleX + 630, middleY - 200, 'opsi4').setInteractive().setScale(0.22).setName('D');

    opsiJawaban5 = scene.add.image(middleX + 630, middleY + 70, 'opsi5').setInteractive().setScale(0.22).setName('E');

    //beaker-text
    A = scene.add.image(middleX - 130, middleY + 70, '2110A').setScale(1.2);

    B = scene.add.image(middleX - 130, middleY - 200, '2110B').setScale(1.2);

    C = scene.add.image(middleX + 250, middleY - 370, '2110C').setScale(1.2);

    D = scene.add.image(middleX + 630, middleY - 200, '2110D').setScale(1.2);

    E = scene.add.image(middleX + 630, middleY + 70, '2110E').setScale(1.2);

    //btn buat check jawaban kedua kali
    opsiJawaban1.on('pointerup', function () {
        destroyObject(objectsArray);
        done("2.1",10)

        let text = "Bagus sekali, pilihan Anda benar.";
        showAnnouncementCorrectAnswer2110(question2110, text);
    });

    opsiJawaban2.on('pointerup', function () {
        //salah kedua kali? langsung tendang ke main menu
        scene.scene.start('MainMenu');
    });

    opsiJawaban3.on('pointerup', function () {
        //salah kedua kali? langsung tendang ke main menu
        scene.scene.start('MainMenu');
    });

    opsiJawaban4.on('pointerup', function () {
        //salah kedua kali? langsung tendang ke main menu
        scene.scene.start('MainMenu');
    });

    opsiJawaban5.on('pointerup', function () {
        //salah kedua kali? langsung tendang ke main menu
        scene.scene.start('MainMenu');
    });
}