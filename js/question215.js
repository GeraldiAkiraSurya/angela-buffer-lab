question215 = new Phaser.Scene('Question215');

question215.preload = function () {
    this.load.path = './assets/';
    this.load.image('emptyBeaker', 'question/emptyBeaker.png');
    this.load.image('purpleBeaker', 'question/purpleBeaker.png');

    this.load.image('215A', 'question/2.1.5A.png');
    this.load.image('215B', 'question/2.1.5B.png');
    this.load.image('215C', 'question/2.1.5C.png');
    this.load.image('215D', 'question/2.1.5D.png');
    this.load.image('215E', 'question/2.1.5E.png');

    this.load.image('background', 'scenes/bg_question.png');

    this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
}

var beakerJawaban1;
var beakerJawaban2;
var beakerJawaban3;
var beakerJawaban4;
var beakerJawaban5;
var dropZoneEmptyBeakerBG;

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

question215.create = function () {

    // console.log(game.canvas.width, game.canvas.height);
    //x 1879 y 1008

    //comment nanti, keperluan debugging doang. harusnya di initiate dari main menu.
    middleX = this.cameras.main.width / 2;
    middleY = this.cameras.main.height / 2;

    //background
    this.add.image(middleX, middleY, 'background').setScale(1.2, 0.95);

    start("2.1", 5);

    //variable initialization
    //yg bener itu pilihan E
    answerArray = ['E'];
    playerAnswerArray = [];
    objectsArray = [];

    //beaker jawaban
    beakerJawaban1 = this.add.image(middleX + 230, middleY - 370, 'purpleBeaker').setInteractive().setScale(0.19).setName('A');
    this.input.setDraggable(beakerJawaban1);
    objectsArray.push(beakerJawaban1);

    beakerJawaban2 = this.add.image(middleX + 830, middleY - 370, 'purpleBeaker').setInteractive().setScale(0.19).setName('B');
    this.input.setDraggable(beakerJawaban2);
    objectsArray.push(beakerJawaban2);

    beakerJawaban3 = this.add.image(middleX + 530, middleY - 130, 'purpleBeaker').setInteractive().setScale(0.19).setName('C');
    this.input.setDraggable(beakerJawaban3);
    objectsArray.push(beakerJawaban3);

    beakerJawaban4 = this.add.image(middleX + 230, middleY + 110, 'purpleBeaker').setInteractive().setScale(0.19).setName('D');
    this.input.setDraggable(beakerJawaban4);
    objectsArray.push(beakerJawaban4);

    beakerJawaban5 = this.add.image(middleX + 830, middleY + 110, 'purpleBeaker').setInteractive().setScale(0.19).setName('E');
    this.input.setDraggable(beakerJawaban5);
    objectsArray.push(beakerJawaban5);


    //beaker drop zone
    dropZoneEmptyBeakerBG = this.add.image(middleX - 500, middleY - 10, 'emptyBeaker').setScale(0.4);

    const answerZone = this.add.zone(middleX - 500, middleY - 10, dropZoneEmptyBeakerBG.width * 0.4, dropZoneEmptyBeakerBG.height * 0.4).setRectangleDropZone(dropZoneEmptyBeakerBG.width * 0.4, dropZoneEmptyBeakerBG.height  * 0.4).setName('answer');

    //just a visual display of the drop zone
    // const graphics = this.add.graphics();
    // graphics.lineStyle(2, 0xffff00);
    // graphics.strokeRect(answerZone.x - answerZone.input.hitArea.width / 2, answerZone.y - answerZone.input.hitArea.height / 2, answerZone.input.hitArea.width, answerZone.input.hitArea.height);

    //text pertanyaan
    textPertanyaan = this.add.text(middleX - 870, middleY - 454, "Tuangkan isi\ngelas yang benar\nke gelas kosong", {font: "900 50px Helvetica", fill: "#ffffff"});

    var text = `
Pilihlah reaksi disosiasi yang terjadi

pada masing - masing larutan?`;

    //beaker-text
    A = this.add.image(middleX + 30, middleY - 300, '215A').setScale(1.2);
    // this.input.setDraggable(A);
    objectsArray.push(A);

    B = this.add.image(middleX + 630, middleY - 300, '215B').setScale(1.2);
    // this.input.setDraggable(B);
    objectsArray.push(B);

    C = this.add.image(middleX + 330, middleY - 60, '215C').setScale(1.2);
    // this.input.setDraggable(C);
    objectsArray.push(C);

    D = this.add.image(middleX + 30, middleY + 180, '215D').setScale(1.2);
    // this.input.setDraggable(D);
    objectsArray.push(D);

    E = this.add.image(middleX + 630, middleY + 180, '215E').setScale(1.2);
    // this.input.setDraggable(E);
    objectsArray.push(E);

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
            showAnnouncementCorrectAnswer215(this, text);
        }
        else {
            //destory all objects
            destroyObject(objectsArray);

            let text = "Jawaban Anda salah, Anda punya 1x kesempatan untuk mencoba menjawab kembali";
            let clueText = "Larutan asam asetat adalah elektrolit lemah";
            showAnnouncementWrongAnswer215(this, text, clueText);
        }  

    }, middleX, middleY + 350);
    objectsArray.push(cekJawabanBtn);

    //alur game
    //hide all object
    hideObject(objectsArray);

    //show pertanyaan
    showPertanyaan215(this, text);
}

question215.update = function () {
    
}

function showPertanyaan215(scene, text) {
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

function showClue215(scene, text) {
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
        startOver215(scene);
    }, middleX, middleY + (descriptionBox.height / 2) - 50);
}

function showAnnouncementCorrectAnswer215(scene, text) {
    var descriptionBox = scene.add.rectangle(scene.cameras.main.width / 2, scene.cameras.main.height / 2, scene.cameras.main.width / 2, scene.cameras.main.height * 3 / 4, 0x000000, 0.7);

    let announcement = scene.add.text(middleX, middleY, text)
        .setOrigin(0.5)
        .setFontSize('30px');

    var nextBtn = createNextButton(scene, 'LANJUT', () => {
        nextBtn.destroy();
        exitBtn.destroy();
        descriptionBox.destroy();
        announcement.destroy();

        done("2.1", 5);

        //to question 6
        scene.scene.start('Question216');

    }, middleX - 150, middleY + (descriptionBox.height/2) - 100);

    var exitBtn = createNextButton(scene, 'KELUAR', () => {
        scene.scene.start('MenuMisi2.1');

    }, middleX + 150, middleY + (descriptionBox.height/2) - 100);    
}

function showAnnouncementWrongAnswer215(scene, text, clueText) {
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

        startOver215(scene);

    }, middleX - 150, middleY + (descriptionBox.height/2) - 100);

    var clueBtn = createNextButton(scene, 'CLUE', () => {
        nextBtn.destroy();
        clueBtn.destroy();
        descriptionBox.destroy();
        missionDesc.destroy();

        showClue215(scene, clueText);

    }, middleX + 150, middleY + (descriptionBox.height/2) - 100);
}

//buat ngereset game object ke posisi semula
//yang di hide masukin semua kesini
function startOver215(scene) {
    //kosongin jawaban buat startover
    playerAnswerArray = [];

    beakerJawaban1 = scene.add.image(middleX + 230, middleY - 370, 'purpleBeaker').setInteractive().setScale(0.19).setName('A');
    scene.input.setDraggable(beakerJawaban1);

    beakerJawaban2 = scene.add.image(middleX + 830, middleY - 370, 'purpleBeaker').setInteractive().setScale(0.19).setName('B');
    scene.input.setDraggable(beakerJawaban2);

    beakerJawaban3 = scene.add.image(middleX + 530, middleY - 130, 'purpleBeaker').setInteractive().setScale(0.19).setName('C');
    scene.input.setDraggable(beakerJawaban3);

    beakerJawaban4 = scene.add.image(middleX + 230, middleY + 110, 'purpleBeaker').setInteractive().setScale(0.19).setName('D');
    scene.input.setDraggable(beakerJawaban4);

    beakerJawaban5 = scene.add.image(middleX + 830, middleY + 110, 'purpleBeaker').setInteractive().setScale(0.19).setName('E');
    scene.input.setDraggable(beakerJawaban5);

    A = scene.add.image(middleX + 30, middleY - 300, '215A').setScale(1.2);

    B = scene.add.image(middleX + 630, middleY - 300, '215B').setScale(1.2);

    C = scene.add.image(middleX + 330, middleY - 60, '215C').setScale(1.2);

    D = scene.add.image(middleX + 30, middleY + 180, '215D').setScale(1.2);

    E = scene.add.image(middleX + 630, middleY + 180, '215E').setScale(1.2);

    //btn buat check jawaban kedua kali
    cekJawabanBtn = createNextButton(scene, 'CEK JAWABAN', () => {
        // console.log(playerAnswerArray);
        // console.log(checkAnswerDraggable(answerArray, playerAnswerArray));       
        
        if (checkAnswerDraggable(answerArray, playerAnswerArray)) {
            //destory all objects
            destroyObject(objectsArray);

            let text = "Bagus sekali, pilihan Anda benar.";
            showAnnouncementCorrectAnswer215(scene, text);
        }
        else {
            //salah kedua kali? langsung tendang ke main menu
            scene.scene.start('MenuMisi2.1');
        }  

    }, middleX, middleY + 350);
}