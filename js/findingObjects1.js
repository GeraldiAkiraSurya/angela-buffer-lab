//Finding Objects 1
findingObjects1 = new Phaser.Scene('FindingObjects1');

findingObjects1.preload = function () {
    this.load.path = './assets/';
    this.load.image('beaker', 'lab_eq/Beaker.png');
    this.load.image('spatula', 'lab_eq/Spatula.png');
    this.load.image('testTube', 'lab_eq/TestTube.png');
    this.load.image('testTubeRack', 'lab_eq/TestTubeRack.png');

    this.load.image('background', 'scenes/finding_objects1.png');

    this.load.image('dropZoneBG', 'icons/finding_object_dropzone_background.png');
    this.load.image('energyFlask', 'icons/energy_flask.png');
    this.load.image('magnifyingGlass', 'icons/MagnifyingGlass.png');
    this.load.image('giftBox', 'icons/gift_box.png');
    this.load.image('book', 'icons/book.png');

    this.load.image('backButton', 'buttons/Back Button.png');

    this.load.plugin('rexyoutubeplayerplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexyoutubeplayerplugin.min.js', true);
    this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
}

var beaker;
var spatula;
var testTube;
var testTubeRack;

var beakerIndicator;
var spatulaIndicator;
var testTubeIndicator;
var testTubeRackIndicator;

//drop zone destinasi
var dropZoneBeakerBG;
var dropZoneSpatulaBG;
var dropZoneTestTubeBG;
var dropZoneTestTubeRackBG;

//boolean: object found or not
var beakerFound;
var spatulaFound;
var testTubeFound;
var testTubeRackFound;
var energyFlask1Found;
var energyFlask2Found;

//buat ngecek objek" di disable ato engga
//kalo true: energi abis, ga bisa drag objek
var isGameOverRendered;
//abis energy
var outOfEnergy;
//lagi mencari energy
var lookingForEnergyFlask;

var energyFlaskIcon;
var energyText;

//reward when complete
var giftBox;
var book;

var energyFlask1;
var energyFlask2;

var findTimer;
//keperluan debugging
var timerText;
var correctAnswer;

var btnHint;

findingObjects1.create = function () {
    //x 1879 y 1008
    //halve value: 940, 504
    //comment nanti, keperluan debugging doang. harusnya di initiate dari main menu.
    middleX = this.cameras.main.width / 2;
    middleY = this.cameras.main.height / 2;

    //background
    this.add.image(middleX, middleY, 'background').setScale(0.98, 0.95);

    //energy debugger, disable pas udah siap dirangkai
    energy = 100;

    //variable initialization
    correctAnswer = false;
    isGameOverRendered = false;
    outOfEnergy = false;
    lookingForEnergyFlask = false;
    beakerFound = false;
    spatulaFound = false;
    testTubeFound = false;
    testTubeRackFound = false;
    energyFlask1Found = false;
    energyFlask2Found = false;

    //setAngle buat rotation in degree
    //setScale buat skala imagenya, belum tau hitboxnya keganti ato engga. kayanya ga keganti, atau hitboxnya lebih besar dari imagenya
    //setInteractive buat bisa interactable
    //load image to scene
    // beaker = this.add.image(650, 840, 'beaker').setInteractive().setScale(0.5);
    beaker = this.add.image(middleX - 290, middleY + 256, 'beaker').setInteractive().setScale(0.5).setVisible(false);
    //biar bisa di-drag
    this.input.setDraggable(beaker);    

    // spatula = this.add.image(1655, 165, 'spatula').setInteractive().setScale(0.2).setAngle(17);
    spatula = this.add.image(middleX + 725, middleY - 339, 'spatula').setInteractive().setScale(0.2).setAngle(17).setVisible(false);
    this.input.setDraggable(spatula);

    // testTube = this.add.image(500, 565, 'testTube').setInteractive().setScale(0.12).setAngle(-7);
    testTube = this.add.image(middleX - 440, middleY + 61, 'testTube').setInteractive().setScale(0.12).setAngle(-7).setVisible(false);
    this.input.setDraggable(testTube);

    // testTubeRack = this.add.image(1110, 100, 'testTubeRack').setInteractive().setScale(0.2).setAngle(7);
    testTubeRack = this.add.image(middleX + 170, middleY - 416, 'testTubeRack').setInteractive().setScale(0.2).setVisible(false);
    this.input.setDraggable(testTubeRack);

    //gift box & book
    giftBox = this.add.image(middleX, middleY + 50, 'giftBox').setVisible(false);
    book = this.add.image(middleX, middleY - 100, 'book').setInteractive().setScale(0.7).setVisible(false);

    //ketrigger kalo udah beres
    book.on('pointerup', function () {
        // console.log('clicked book!');
        //manggil methodnya disini dim

        findingObjects1.scene.start('MissionSelection');
    });

    energyFlaskIcon = this.add.image(50, 50, 'energyFlask').setScale(0.5);
    energyText = this.add.text(energyFlaskIcon.x - 15, energyFlaskIcon.y + 5, energy + '%', {font: "700 16px Helvetica", fill: "#000000"});

    //hint
    btnHint = this.add.image(middleX - 800, middleY - 455, 'magnifyingGlass').setInteractive().setScale(0.8);
    //disabled pas showObjective on, re-enabled by startFindingObject
    btnHint.input.enabled = false;

    btnHint.on('pointerup', function () {
        let objectsArray = [];
        if (!beakerFound) {
            objectsArray.push(beaker);
        }
        if (!spatulaFound) {
            objectsArray.push(spatula);
        }
        if (!testTubeFound) {
            objectsArray.push(testTube);
        }
        if (!testTubeRackFound) {
            objectsArray.push(testTubeRack);
        }
        // console.log(objectsArray);
        // console.log(Math.floor(Math.random() * 4));
        hintObject(objectsArray[Math.floor(Math.random() * objectsArray.length)]);    
        drainEnergy(20, energyText);
        btnHint.input.enabled = false;
    });

    //halve value
    //940 504

    //drop zone background size default 128x128
    dropZoneBeakerBG = this.add.image(middleX - 640, middleY - 439, 'dropZoneBG');
    dropZoneTestTubeBG = this.add.image(middleX - 490, middleY - 439, 'dropZoneBG');
    dropZoneSpatulaBG = this.add.image(middleX - 340, middleY - 439, 'dropZoneBG');
    dropZoneTestTubeRackBG = this.add.image(middleX - 190, middleY - 439, 'dropZoneBG');

    //drop zone. set name buat id. samain kaya nama texturenya
    //kenapa di set 128? biar sama dengan asset
    const beakerZone = this.add.zone(middleX - 640, middleY - 439, 128, 128).setRectangleDropZone(128, 128).setName('beaker');
    const testTubeZone = this.add.zone(middleX - 490, middleY - 439, 128, 128).setRectangleDropZone(128, 128).setName('testTube');
    const spatulaZone = this.add.zone(middleX - 340, middleY - 439, 128, 128).setRectangleDropZone(128, 128).setName('spatula');
    const testTubeRackZone = this.add.zone(middleX - 190, middleY - 439, 128, 128).setRectangleDropZone(128, 128).setName('testTubeRack');

    //text dalam dropZone
    this.add.text(middleX - 670, middleY - 464, "Gelas\nKimia", {font: "900 20px Helvetica", fill: "#000000"});
    this.add.text(middleX - 530, middleY - 464, "Tabung\nReaksi", {font: "900 20px Helvetica", fill: "#000000"});
    this.add.text(middleX - 380, middleY - 454, "Spatula", {font: "900 20px Helvetica", fill: "#000000"});
    this.add.text(middleX - 230, middleY - 464, "   Rak\nTabung", {font: "900 20px Helvetica", fill: "#000000"});

    //timer 15 detik per objek
    //keperluan debugging
    timerText = this.add.text(1640, 25);
    timerText.setStyle({
        fontSize: '900 20px',
        fontFamily: 'Helvetica',
        color: '#000000',
    });

    //delay dalam ms, jadi 15000 berarti 15 detik = 1x repeat
    //kalo 15 detik lewat, object ga bener, ngurangin energy 20
    findTimer = new Phaser.Time.TimerEvent({ delay: 15000, callback: () => {
        drainEnergy(20, energyText);
    }, callbackScope: this, loop: true });

    //start the timer
    // this.time.addEvent(findTimer);

    this.input.on('pointerdown', () => {
        //buat pause
        // findTimer.paused = !findTimer.paused;

        // this.time.addEvent(findTimer);
    });

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

    //cari energy flask kalo abis energy
    energyFlask1 = this.add.image(middleX + 685, middleY - 5, 'energyFlask').setInteractive().setScale(0.3).setName('energyFlask1').setVisible(false);
    energyFlask2 = this.add.image(middleX - 700, middleY - 229, 'energyFlask').setInteractive().setScale(0.4).setName('energyFlask2').setVisible(false);

    energyFlask1.on('pointerup', function () {
        energy = 20;
        energyFlask1Found = true;
        outOfEnergy = false;
        lookingForEnergyFlask = false;
        // isGameOverRendered = false;

        beaker.input.enabled = true;
        spatula.input.enabled = true;
        testTube.input.enabled = true;
        testTubeRack.input.enabled = true;

        // console.log('outOfEnergy: ' + outOfEnergy);
        // console.log('lookingForEnergyFlask: ' + lookingForEnergyFlask);
        // console.log('energyFlask1Found: ' + energyFlask1Found);

        energyFlask1.setVisible(false);
        energyText.setText(energy + '%');
        findTimer.paused = !findTimer.paused;
    });

    energyFlask2.on('pointerup', function () {
        energy = 20;
        energyFlask2Found = true;
        outOfEnergy = false;
        lookingForEnergyFlask = false;
        // isGameOverRendered = false;

        beaker.input.enabled = true;
        spatula.input.enabled = true;
        testTube.input.enabled = true;
        testTubeRack.input.enabled = true;

        // console.log('outOfEnergy: ' + outOfEnergy);
        // console.log('lookingForEnergyFlask: ' + lookingForEnergyFlask);
        // console.log('energyFlask2Found: ' + energyFlask2Found);

        energyFlask2.setVisible(false);
        energyText.setText(energy + '%');
        findTimer.paused = !findTimer.paused;
    });

    //alur game
    showObjective(this, beaker, spatula, testTube, testTubeRack, btnHint);
}

findingObjects1.update = function () {
    //out of energy
    //kalo energi abis, disable smua objek interactivenya, dropZone nya
    //yg enabled cmn energyFlask
    if (energy == 0) {
        // console.log("energimu telah habis!");

        beaker.input.enabled = false;
        spatula.input.enabled = false;
        testTube.input.enabled = false;
        testTubeRack.input.enabled = false;

        if (!lookingForEnergyFlask) {
            outOfEnergy = true;
        }

        if (energyFlask1Found && energyFlask2Found && !isGameOverRendered) {
            showGameOver(this);
        }
    }

    //completion
    if (beakerFound && spatulaFound && testTubeFound && testTubeRackFound) {
        // console.log('horeee beres');
        findTimer.paused = true;
        giftBox.setVisible(true);
        book.setVisible(true);
    }

    //keperluan debugging
    timerText.setText(`Event.progress: ${findTimer.getProgress().toString().substr(0, 4)}\nPaused?: ${findTimer.paused}`);

    //kalo jawabannya bener, timernnya direset
    if (correctAnswer) {
        this.time.addEvent(findTimer);
        correctAnswer = false;
    }

    //hides all flask yg blm ketemu setelah salah satu ketemu
    if (!lookingForEnergyFlask && !outOfEnergy) {
        if (!energyFlask1Found) {
            energyFlask1.setVisible(false);
        }
        if (!energyFlask2Found) {
            energyFlask2.setVisible(false);
        }
    }

    //energy abis dan mau nyari flask
    if (outOfEnergy && !lookingForEnergyFlask) {
        // console.log('triggered nyari energy flask');
        lookingForEnergyFlask = true;
        //reset timer by adding new timer
        this.time.addEvent(findTimer);
        findTimer.paused = !findTimer.paused;
        //then pause the goddamn timer
        
        //butuh confirmation buat nyari energy flask kalau masih ada energy flask yang belum ditemukan
        if (!energyFlask1Found || !energyFlask2Found) {
            showObjectiveOutOfEnergy(this);
        }
    }
}