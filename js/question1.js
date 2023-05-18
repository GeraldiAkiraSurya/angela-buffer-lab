question1 = new Phaser.Scene('Question1');

question1.preload = function () {
    this.load.path = './assets/';
    this.load.image('greenBeaker', 'question/greenBeaker.png');

    this.load.image('background', 'scenes/question1BG.png');

    this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
}

// var dropZoneGreenBeaker;
var dropZoneGreenBeakerBG;

var textPertanyaan;

var correctCombination;
var combinationArray;

question1.create = function () {

    // console.log(game.canvas.width, game.canvas.height);
    //x 1879 y 1008

    //comment nanti, keperluan debugging doang. harusnya di initiate dari main menu.
    middleX = this.cameras.main.width / 2;
    middleY = this.cameras.main.height / 2;

    //background
    this.add.image(middleX, middleY, 'background').setScale(1.17, 0.95);

    //nanti jawaban ect diset false
    //beaker jawaban
    dropZoneGreenBeakerBG = this.add.image(middleX + 530, middleY - 100, 'greenBeaker').setScale(0.9);
    //beaker jawaban, ga dikasih variable kayanya ga perlu
    this.add.image(middleX - 0, middleY - 100, 'greenBeaker').setScale(0.9);

    textPertanyaan = this.add.text(middleX - 870, middleY - 304, "Pindahkan spesi\nyang ada dalam sistem\nke dalam gelas\nkimia kosong", {font: "900 50px Helvetica", fill: "#ffffff"});

    var title = '';
    var text = `
Spesi apa saja yang ada dalam larutan?

Ayo kumpulkan!`;

    //pertama show pop up dulu
    // showPopUp(this, text, title)

    //percobaan button buat jawaban
    //createNextBtn dari missionOne
    // var CH3COOH = createNextBtn(this, middleX + 600, middleY + 50, 'CH3COOH', () => {

    // });

    var CH3COOH = this.add.text(middleX + 550, middleY + 50, "CH3COOH", {font: "25px Helvetica", fill: "#000000"}).setInteractive();


    //mulai event dragging
    this.input.on('dragstart', function (pointer, gameObject) {
        this.children.bringToTop(gameObject);
        // console.log(gameObject.texture.key);
    }, this);

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    });

    this.input.on('drop', function (pointer, gameObject, dropZone) {
        // console.log(dropZone.name);

        //kalo bener
        if (gameObject.texture.key == dropZone.name) {
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;

            //troublenya multiple file jadi ngaco
            //findingObject2.js bermasalah
            //foundObjectnya ngaco
            switch (dropZone.name) {
                case 'beaker':
                    //tandain objeknya ketemu
                    beakerFound = foundObject(dropZone.name);
                    beaker.setVisible(false);
                    dropZoneBeakerBG.setTint(0x08F26E);
                    //destroy the zone biar yg lain ga dicoba di drag lagi kesini
                    beakerZone.destroy();
                    // console.log(beakerFound);
                    break;
                case 'spatula':
                    spatulaFound = foundObject(dropZone.name);
                    spatula.setVisible(false);
                    dropZoneSpatulaBG.setTint(0x08F26E);

                    spatulaZone.destroy();
                    // console.log(spatulaFound);
                    break;
                case 'testTube':
                    testTubeFound = foundObject(dropZone.name);
                    testTube.setVisible(false);
                    dropZoneTestTubeBG.setTint(0x08F26E);

                    testTubeZone.destroy();
                    // console.log(testTubeFound);
                    break;
                case 'testTubeRack':
                    testTubeRackFound = foundObject(dropZone.name);
                    testTubeRack.setVisible(false);
                    dropZoneTestTubeRackBG.setTint(0x08F26E);

                    testTubeRackZone.destroy();
                    // console.log(testTubeRackFound);
                    break;
            }

            //biar timernya direset
            correctAnswer = true;

            gameObject.input.enabled = false;
        }

        //kalo salah
        else {
            drainEnergy(20, energyText);

            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
            // alert("salah cuy!!!");            
        }
    });

    this.input.on('dragend', function (pointer, gameObject, dropped) {
        if (!dropped) {
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
        }
    });
    //beres event dragging

    correctCombination = false;
    combinationArray = [];


}

question1.update = function () {
    if (correctCombination==true) {
        alert("You picked the correct combination!");
    }

    if (combinationArray.length == 3) {
        if (combinationArray[0] == "phMeter" && combinationArray[1] == "ballPipet" && combinationArray[2] == "beaker") {
            correctCombination = true;
        }
        else {
            alert("You picked the wrong combination!");
            combinationArray = [];
            console.log(combinationArray);
        }
    }
}

//otw pindahin ke global
function showPopUp(scene, text, title) {
    var descriptionBox = scene.add.rectangle(scene.cameras.main.width / 2, scene.cameras.main.height / 2, scene.cameras.main.width / 2, scene.cameras.main.height * 3 / 4, 0x000000, 0.7);
    var descBoxTopX = middleX - (descriptionBox.width / 2);
    var descBoxTopY = middleY - (descriptionBox.height / 2);
    var titleCard = scene.add.text(middleX, descBoxTopY + 100, title)
        .setOrigin(0.5)
        .setFontSize(40);

    

    var missionDesc = scene.add.rexBBCodeText(middleX-descBoxTopX+50, descBoxTopY+250, text, {
        fontSize: '30px',
        align: 'left',
        wrap: {
            mode: 'word',
            width: descriptionBox.width-100
        },
    });

    var nextBtn = createNextBtn(scene, middleX, middleY + (descriptionBox.height / 2) - 50, 'LANJUT', () => {
        titleCard.destroy();
        missionDesc.destroy();
        nextBtn.destroy();
        descriptionBox.destroy();

        //manggil method nunjukkin beaker and ect
    });
}

function startFindingObject(scene, object1, object2, object3, object4, btnHint) {
    scene.time.addEvent(findTimer);
    object1.setVisible(true);
    object2.setVisible(true);
    object3.setVisible(true);
    object4.setVisible(true);
    btnHint.input.enabled = true;
}