question2214 = new Phaser.Scene('Question2214');

question2214.preload = function () {
    this.load.path = './assets/';
    this.load.image('emptyBeaker', 'question/emptyBeaker.png');
    this.load.image('blueBeaker2', 'question/blueBeaker2.png');

    this.load.image('2214A', 'question/2.2.14A.png');
    this.load.image('2214B', 'question/2.2.14B.png');
    this.load.image('2214C', 'question/2.2.14C.png');
    this.load.image('2214D', 'question/2.2.14D.png');

    this.load.image('background', 'scenes/bg_question.png');

    this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
}

var beakerJawaban1;
var beakerJawaban2;
var beakerJawaban3;
var beakerJawaban5;
var dropZoneEmptyBeakerBG;

var textPertanyaan;

var A;
var B;
var C;
var D;

var objectsArray;

var answerArray;
var playerAnswerArray;

var cekJawabanBtn;

question2214.create = function () {
    start("2.2",14)

    // console.log(game.canvas.width, game.canvas.height);
    //x 1879 y 1008

    //comment nanti, keperluan debugging doang. harusnya di initiate dari main menu.
    middleX = this.cameras.main.width / 2;
    middleY = this.cameras.main.height / 2;

    //background
    this.add.image(middleX, middleY, 'background').setScale(1.2, 0.95);

    //variable initialization
    //yg bener itu pilihan A, B
    answerArray = ['A', 'B'];
    playerAnswerArray = [];
    objectsArray = [];

    //beaker jawaban
    beakerJawaban1 = this.add.image(middleX + 230, middleY - 370, 'blueBeaker2').setInteractive().setScale(0.19).setName('A');
    this.input.setDraggable(beakerJawaban1);
    objectsArray.push(beakerJawaban1);

    beakerJawaban2 = this.add.image(middleX + 730, middleY - 370, 'blueBeaker2').setInteractive().setScale(0.19).setName('B');
    this.input.setDraggable(beakerJawaban2);
    objectsArray.push(beakerJawaban2);

    beakerJawaban3 = this.add.image(middleX + 230, middleY + 20, 'blueBeaker2').setInteractive().setScale(0.19).setName('C');
    this.input.setDraggable(beakerJawaban3);
    objectsArray.push(beakerJawaban3);

    beakerJawaban4 = this.add.image(middleX + 730, middleY + 20, 'blueBeaker2').setInteractive().setScale(0.19).setName('D');
    this.input.setDraggable(beakerJawaban4);
    objectsArray.push(beakerJawaban4);


    //meja kosong drop zone
    const answerZone = this.add.zone(middleX - (middleX / 2), middleY, middleX, middleY * 2).setRectangleDropZone(middleX, middleY * 2).setName('answer');

    //just a visual display of the drop zone
    // const graphics = this.add.graphics();
    // graphics.lineStyle(2, 0xffff00);
    // graphics.strokeRect(answerZone.x - answerZone.input.hitArea.width / 2, answerZone.y - answerZone.input.hitArea.height / 2, answerZone.input.hitArea.width, answerZone.input.hitArea.height);

    //text pertanyaan
    textPertanyaan = this.add.text(middleX - 870, middleY - 454, "Pindahkan gelas kimia yang berisi\njawaban benar ke meja kosong", {font: "900 40px Helvetica", fill: "#ffffff"});

    var text = `
Lalu apa saja yang menyebabkan larutan 

penyangga dapat mempertahankan pHnya?
`;

    //beaker-text
    A = this.add.image(middleX + 230, middleY - 230, '2214A').setScale(1.2);
    // this.input.setDraggable(A);
    objectsArray.push(A);

    B = this.add.image(middleX + 730, middleY - 230, '2214B').setScale(1.2);
    // this.input.setDraggable(B);
    objectsArray.push(B);

    C = this.add.image(middleX + 230, middleY + 180, '2214C').setScale(1.2);
    // this.input.setDraggable(C);
    objectsArray.push(C);

    D = this.add.image(middleX + 730, middleY + 180, '2214D').setScale(1.2);
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
            done("2.2",14)

            let text = "Bagus sekali, pilihan Anda benar.";
            showAnnouncementCorrectAnswer2214(this, text);
        }
        else {
            //langsung ngulang
            this.scene.start('Question2213');
        }  

    }, middleX, middleY + 350);
    objectsArray.push(cekJawabanBtn);

    //alur game
    //hide all object
    hideObject(objectsArray);

    //show pertanyaan
    showPertanyaan2214(this, text);
}

question2214.update = function () {
    
}

function showPertanyaan2214(scene, text) {
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

function showAnnouncementCorrectAnswer2214(scene, text) {
    var descriptionBox = scene.add.rectangle(scene.cameras.main.width / 2, scene.cameras.main.height / 2, scene.cameras.main.width / 2, scene.cameras.main.height * 3 / 4, 0x000000, 0.7);

    let announcement = scene.add.text(middleX, middleY, text)
        .setOrigin(0.5)
        .setFontSize('30px');

    var nextBtn = createNextButton(scene, 'LANJUT', () => {
        nextBtn.destroy();
        exitBtn.destroy();
        descriptionBox.destroy();
        announcement.destroy();

        //to missionSelection
        scene.scene.start('MissionSelection');

        //2.2 FINISHED
        //Panggil Method Time Finish di sini Dim
        

    }, middleX - 150, middleY + (descriptionBox.height/2) - 100);

    var exitBtn = createNextButton(scene, 'KELUAR', () => {
        scene.scene.start('Question2110');

    }, middleX + 150, middleY + (descriptionBox.height/2) - 100);    
}