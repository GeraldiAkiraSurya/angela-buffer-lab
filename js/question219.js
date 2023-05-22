question219 = new Phaser.Scene('Question219');

question219.preload = function () {
    this.load.path = './assets/';
    this.load.image('beaker', 'question/beaker.gif');
    this.load.image('purpleBeaker', 'question/bottle.png');

    this.load.image('219A', 'question/2.1.1A.png');
    this.load.image('219B', 'question/2.1.1B.png');
    this.load.image('219C', 'question/2.1.1C.png');
    this.load.image('219D', 'question/2.1.1D.png');
    this.load.image('219E', 'question/2.1.1E.png');

    this.load.image('background', 'scenes/bg_question.png');

    this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
}

var botolJawaban1;
var botolJawaban2;
var botolJawaban3;
var botolJawaban4;
var dropZoneBeakerBG;

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

question219.create = function () {

    // console.log(game.canvas.width, game.canvas.height);
    //x 1879 y 1008

    //comment nanti, keperluan debugging doang. harusnya di initiate dari main menu.
    middleX = this.cameras.main.width / 2;
    middleY = this.cameras.main.height / 2;

    //background
    this.add.image(middleX, middleY, 'background').setScale(1.2, 0.95);

    //variable initialization
    //yg bener itu pilihan E
    answerArray = ['E'];
    playerAnswerArray = [];
    objectsArray = [];

    //beaker jawaban
    botolJawaban1 = this.add.image(middleX - 30, middleY - 20, 'purpleBeaker').setInteractive().setScale(0.25).setName('A');
    this.input.setDraggable(botolJawaban1);
    objectsArray.push(botolJawaban1);

    botolJawaban2 = this.add.image(middleX + 240, middleY - 160, 'purpleBeaker').setInteractive().setScale(0.25).setName('B');
    this.input.setDraggable(botolJawaban2);
    objectsArray.push(botolJawaban2);

    botolJawaban3 = this.add.image(middleX + 540, middleY - 20, 'purpleBeaker').setInteractive().setScale(0.25).setName('C');
    this.input.setDraggable(botolJawaban3);
    objectsArray.push(botolJawaban3);

    botolJawaban4 = this.add.image(middleX + 810, middleY - 160, 'purpleBeaker').setInteractive().setScale(0.25).setName('D');
    this.input.setDraggable(botolJawaban4);
    objectsArray.push(botolJawaban4);


    //beaker drop zone
    dropZoneBeakerBG = this.add.image(middleX - 540, middleY - 20, 'beaker').setScale(1.1);

    const answerZone = this.add.zone(middleX - 540, middleY - 20, dropZoneBeakerBG.width * 1.1, dropZoneBeakerBG.height * 1.1).setRectangleDropZone(dropZoneBeakerBG.width * 1.1, dropZoneBeakerBG.height  * 1.1).setName('answer');

    //just a visual display of the drop zone
    // const graphics = this.add.graphics();
    // graphics.lineStyle(2, 0xffff00);
    // graphics.strokeRect(answerZone.x - answerZone.input.hitArea.width / 2, answerZone.y - answerZone.input.hitArea.height / 2, answerZone.input.hitArea.width, answerZone.input.hitArea.height);

    //text pertanyaan
    textPertanyaan = this.add.text(middleX - 870, middleY - 454, "Tuangkan isi\nbotol yang benar\nke gelas kimia..", {font: "900 50px Helvetica", fill: "#ffffff"});

    var text = `
Nah..berdasarkan perubahan pH pada campuran / sistem dalam tabel, manakah yang termasuk larutan penyangga?
`;

    //beaker-text
    A = this.add.image(middleX + 30, middleY - 300, '219A').setScale(1.2);
    // this.input.setDraggable(A);
    objectsArray.push(A);

    B = this.add.image(middleX + 630, middleY - 300, '219B').setScale(1.2);
    // this.input.setDraggable(B);
    objectsArray.push(B);

    C = this.add.image(middleX + 330, middleY - 60, '219C').setScale(1.2);
    // this.input.setDraggable(C);
    objectsArray.push(C);

    D = this.add.image(middleX + 30, middleY + 180, '219D').setScale(1.2);
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
            showAnnouncementCorrectAnswer219(this, text);
        }
        else {
            //destory all objects
            destroyObject(objectsArray);

            let text = "Jawaban Anda salah, Anda punya 1x kesempatan untuk mencoba menjawab kembali.";
            let clueText = "Asam asetat adalah elektrolit lemah, sedangkan natrium asetat adalah elektrolit kuat";
            showAnnouncementWrongAnswer219(this, text, clueText);
        }  

    }, middleX, middleY + 350);
    objectsArray.push(cekJawabanBtn);

    //alur game
    //hide all object
    // hideObject(objectsArray);

    //show pertanyaan
    // showPertanyaan219(this, text);
}

question219.update = function () {
    
}

function showPertanyaan219(scene, text) {
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

function showClue219(scene, text) {
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
        startOver219(scene);
    }, middleX, middleY + (descriptionBox.height / 2) - 50);
}

function showAnnouncementCorrectAnswer219(scene, text) {
    var descriptionBox = scene.add.rectangle(scene.cameras.main.width / 2, scene.cameras.main.height / 2, scene.cameras.main.width / 2, scene.cameras.main.height * 3 / 4, 0x000000, 0.7);

    let announcement = scene.add.text(middleX, middleY, text)
        .setOrigin(0.5)
        .setFontSize('30px');

    var nextBtn = createNextButton(scene, 'LANJUT', () => {
        nextBtn.destroy();
        exitBtn.destroy();
        descriptionBox.destroy();
        announcement.destroy();

        //to question 2
        scene.scene.start('Question212');

    }, middleX - 150, middleY + (descriptionBox.height/2) - 100);

    var exitBtn = createNextButton(scene, 'KELUAR', () => {
        scene.scene.start('MainMenu');

    }, middleX + 150, middleY + (descriptionBox.height/2) - 100);    
}

function showAnnouncementWrongAnswer219(scene, text, clueText) {
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

        startOver219(scene);

    }, middleX - 150, middleY + (descriptionBox.height/2) - 100);

    var clueBtn = createNextButton(scene, 'CLUE', () => {
        nextBtn.destroy();
        clueBtn.destroy();
        descriptionBox.destroy();
        missionDesc.destroy();

        showClue219(scene, clueText);

    }, middleX + 150, middleY + (descriptionBox.height/2) - 100);
}

//buat ngereset game object ke posisi semula
//yang di hide masukin semua kesini
function startOver219(scene) {
    //kosongin jawaban buat startover
    playerAnswerArray = [];

    botolJawaban1 = scene.add.image(middleX + 230, middleY - 370, 'purpleBeaker').setInteractive().setScale(0.19).setName('A');
    scene.input.setDraggable(botolJawaban1);

    botolJawaban2 = scene.add.image(middleX + 830, middleY - 370, 'purpleBeaker').setInteractive().setScale(0.19).setName('B');
    scene.input.setDraggable(botolJawaban2);

    botolJawaban3 = scene.add.image(middleX + 530, middleY - 130, 'purpleBeaker').setInteractive().setScale(0.19).setName('C');
    scene.input.setDraggable(botolJawaban3);

    botolJawaban4 = scene.add.image(middleX + 230, middleY + 110, 'purpleBeaker').setInteractive().setScale(0.19).setName('D');
    scene.input.setDraggable(botolJawaban4);

    A = scene.add.image(middleX + 30, middleY - 300, '219A').setScale(1.2);

    B = scene.add.image(middleX + 630, middleY - 300, '219B').setScale(1.2);

    C = scene.add.image(middleX + 330, middleY - 60, '219C').setScale(1.2);

    D = scene.add.image(middleX + 30, middleY + 180, '219D').setScale(1.2);

    //btn buat check jawaban kedua kali
    cekJawabanBtn = createNextButton(scene, 'CEK JAWABAN', () => {
        // console.log(playerAnswerArray);
        // console.log(checkAnswerDraggable(answerArray, playerAnswerArray));       
        
        if (checkAnswerDraggable(answerArray, playerAnswerArray)) {
            //destory all objects
            destroyObject(objectsArray);

            let text = "Bagus sekali, pilihan Anda benar.";
            showAnnouncementCorrectAnswer219(scene, text);
        }
        else {
            //salah kedua kali? langsung tendang ke main menu
            scene.scene.start('MainMenu');
        }  

    }, middleX, middleY + 350);
}