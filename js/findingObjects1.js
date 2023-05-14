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

    this.load.image('backButton', 'buttons/Back Button.png');
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
var isGamePaused;
//abis energy
var outOfEnergy;
//lagi mencari energy
var lookingForEnergyFlask;

var energyFlaskIcon;
var energyText;

var energyFlask1;
var energyFlask2;

var findTimer;
var timerText;
var correctAnswer;

var btnHint;
var btnBack;

findingObjects1.create = function () {

    // console.log(game.canvas.width, game.canvas.height);
    //x 1879 y 1008
    //halve value: 940, 504
    canvasWidth = game.canvas.width;
    canvasHeight = game.canvas.height;

    //background
    this.add.image(canvasWidth/2, canvasHeight/2, 'background').setScale(0.98, 0.95);

    //energy debugger, disable pas udah siap dirangkai
    energy = 100;

    //variable initialization
    correctAnswer = false;
    // isGamePaused = false;
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
    beaker = this.add.image(940, 400, 'beaker').setInteractive().setScale(0.5);
    //biar bisa di-drag
    this.input.setDraggable(beaker);    

    spatula = this.add.image(1100, 770, 'spatula').setInteractive().setScale(0.4);
    this.input.setDraggable(spatula);

    testTube = this.add.image(440, 320, 'testTube').setInteractive().setScale(0.25).setAngle(-90);
    this.input.setDraggable(testTube);

    testTubeRack = this.add.image(1500, 550, 'testTubeRack').setInteractive().setScale(0.4);
    this.input.setDraggable(testTubeRack);

    energyFlaskIcon = this.add.image(50, 50, 'energyFlask').setScale(0.5);
    energyText = this.add.text(energyFlaskIcon.x - 15, energyFlaskIcon.y + 5, energy + '%', {font: "700 16px Helvetica", fill: "#000000"});

    //hint
    btnHint = this.add.image(canvasWidth/2 - 800, canvasHeight/2 - 455, 'magnifyingGlass').setInteractive().setScale(0.8);

    btnHint.on('pointerup', function () {
        let objectsArray = [];
        if (!beakerFound) {
            objectsArray.push('beaker');
        }
        if (!spatulaFound) {
            objectsArray.push('spatula');
        }
        if (!testTubeFound) {
            objectsArray.push('testTube');
        }
        if (!testTubeRackFound) {
            objectsArray.push('testTubeRack');
        }
        // console.log(objectsArray);
        // console.log(Math.floor(Math.random() * 4));
        hintObject(objectsArray[Math.floor(Math.random() * objectsArray.length)]);    
        drainEnergy();   
        btnHint.input.enabled = false;
    });

    //back button [temporary, kalo completion udah jadi hapus aja]
    // btnBack = this.add.image(canvasWidth/2 - 800, canvasHeight/2 + 455, 'backButton').setInteractive().setScale(0.35);

    // btnBack.on('pointerup', function () {
    //     findingObjects1.scene.start('MissionSelection');
    // });

    //halve value
    //940 504

    //temporary box(to be replaced with asset when we find one)
    //size default 128x128
    dropZoneBeakerBG = this.add.image(canvasWidth/2 - 640, canvasHeight/2 - 439, 'dropZoneBG');
    dropZoneTestTubeBG = this.add.image(canvasWidth/2 - 490, canvasHeight/2 - 439, 'dropZoneBG');
    dropZoneSpatulaBG = this.add.image(canvasWidth/2 - 340, canvasHeight/2 - 439, 'dropZoneBG');
    dropZoneTestTubeRackBG = this.add.image(canvasWidth/2 - 190, canvasHeight/2 - 439, 'dropZoneBG');

    //drop zone. set name buat id. samain kaya nama texturenya
    //kenapa di set 128? biar sama dengan asset
    const beakerZone = this.add.zone(canvasWidth/2 - 640, canvasHeight/2 - 439, 128, 128).setRectangleDropZone(128, 128).setName('beaker');
    const testTubeZone = this.add.zone(canvasWidth/2 - 490, canvasHeight/2 - 439, 128, 128).setRectangleDropZone(128, 128).setName('testTube');
    const spatulaZone = this.add.zone(canvasWidth/2 - 340, canvasHeight/2 - 439, 128, 128).setRectangleDropZone(128, 128).setName('spatula');
    const testTubeRackZone = this.add.zone(canvasWidth/2 - 190, canvasHeight/2 - 439, 128, 128).setRectangleDropZone(128, 128).setName('testTubeRack');

    //text dalam dropZone
    this.add.text(canvasWidth/2 - 670, canvasHeight/2 - 464, "Gelas\nKimia", {font: "900 20px Helvetica", fill: "#000000"});
    this.add.text(canvasWidth/2 - 530, canvasHeight/2 - 464, "Tabung\nReaksi", {font: "900 20px Helvetica", fill: "#000000"});
    this.add.text(canvasWidth/2 - 380, canvasHeight/2 - 454, "Spatula", {font: "900 20px Helvetica", fill: "#000000"});
    this.add.text(canvasWidth/2 - 230, canvasHeight/2 - 464, "   Rak\nTabung", {font: "900 20px Helvetica", fill: "#000000"});

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
    this.findTimer = new Phaser.Time.TimerEvent({ delay: 15000, callback: () => {
        drainEnergy();
    }, callbackScope: this, loop: true });

    //start the timer
    this.time.addEvent(this.findTimer);

    this.input.on('pointerdown', () => {
        //buat pause
        // this.findTimer.paused = !this.findTimer.paused;

        // this.time.addEvent(this.findTimer);
    });

    //on event dragging
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

        //selama gamenya ga kepause
        // if (!isGamePaused) {
            
        // }

        //kalo bener
        if (gameObject.texture.key == dropZone.name) {
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;

            foundObject(dropZone.name);

            //biar timernya direset
            correctAnswer = true;

            gameObject.input.enabled = false;
        }

        //kalo salah
        else {
            drainEnergy();

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
    energyFlask1 = this.add.image(canvasWidth/2 + 600, canvasHeight/2 - 300, 'energyFlask').setInteractive().setScale(0.7).setName('energyFlask1').setVisible(false);
    energyFlask2 = this.add.image(canvasWidth/2 + 700, canvasHeight/2 + 400, 'energyFlask').setInteractive().setScale(0.7).setName('energyFlask2').setVisible(false);

    energyFlask1.on('pointerup', function () {
        energy = 100;
        energyFlask1Found = true;
        outOfEnergy = false;
        lookingForEnergyFlask = false;
        // isGamePaused = false;

        beaker.input.enabled = true;
        spatula.input.enabled = true;
        testTube.input.enabled = true;
        testTubeRack.input.enabled = true;

        // console.log('outOfEnergy: ' + outOfEnergy);
        // console.log('lookingForEnergyFlask: ' + lookingForEnergyFlask);
        // console.log('energyFlask1Found: ' + energyFlask1Found);

        energyFlask1.setVisible(false);
        energyText.setText(energy + '%');
        findingObjects1.findTimer.paused = !findingObjects1.findTimer.paused;
    });

    energyFlask2.on('pointerup', function () {
        energy = 100;
        energyFlask2Found = true;
        outOfEnergy = false;
        lookingForEnergyFlask = false;
        // isGamePaused = false;

        beaker.input.enabled = true;
        spatula.input.enabled = true;
        testTube.input.enabled = true;
        testTubeRack.input.enabled = true;

        // console.log('outOfEnergy: ' + outOfEnergy);
        // console.log('lookingForEnergyFlask: ' + lookingForEnergyFlask);
        // console.log('energyFlask2Found: ' + energyFlask2Found);

        energyFlask2.setVisible(false);
        energyText.setText(energy + '%');
        findingObjects1.findTimer.paused = !findingObjects1.findTimer.paused;
    });

}

findingObjects1.update = function () {
    //out of energy
    //kalo energi abis, disable smua objek interactivenya, dropZone nya
    //yg enabled cmn energyFlask
    if (energy == 0) {
        // console.log("energimu telah habis!");
        // isGamePaused = true;

        beaker.input.enabled = false;
        spatula.input.enabled = false;
        testTube.input.enabled = false;
        testTubeRack.input.enabled = false;

        if (!lookingForEnergyFlask) {
            outOfEnergy = true;
        }
    }

    //completion
    if (beakerFound && spatulaFound && testTubeFound && testTubeRackFound) {
        console.log('horeee beres');
        this.findTimer.paused = true;
    }

    //keperluan debugging
    timerText.setText(`Event.progress: ${this.findTimer.getProgress().toString().substr(0, 4)}\nPaused?: ${this.findTimer.paused}`);

    //kalo jawabannya bener, timernnya direset
    if (correctAnswer) {
        this.time.addEvent(this.findTimer);
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
        console.log('triggered nyari energy flask');
        lookingForEnergyFlask = true;
        //reset timer by adding new timer
        this.time.addEvent(this.findTimer);
        this.findTimer.paused = !this.findTimer.paused;
        //then pause the goddamn timer
        
        //butuh confirmation buat nyari energy flask
        if (!energyFlask1Found) {
            energyFlask1.setVisible(true);
        }
        if (!energyFlask2Found) {
            energyFlask2.setVisible(true);
        }
    }


}

function drainEnergy () {
    energy -= 20;
    energyText.setText(energy + '%');
}

function foundObject (objectName) {
    switch (objectName) {
        case 'beaker':
            beakerFound = true;
            break;
        case 'spatula':
            spatulaFound = true;
            break;
        case 'testTube':
            testTubeFound = true;
            break;
        case 'testTubeRack':
            testTubeRackFound = true;
            break;
    }
}

function hintObject (objectName) {
    switch (objectName) {
        case 'beaker':
            beaker.setTint(0x08F26E);
            break;
        case 'spatula':
            spatula.setTint(0x08F26E);
            break;
        case 'testTube':
            testTube.setTint(0x08F26E);
            break;
        case 'testTubeRack':
            testTubeRack.setTint(0x08F26E);
            break;
    }
}