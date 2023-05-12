//Finding Objects 1
findingObjects1 = new Phaser.Scene('FindingObjects1');

findingObjects1.preload = function () {
    this.load.path = './assets/';
    this.load.image('ballPipet', 'lab_eq/BallPipet.png');
    this.load.image('beaker', 'lab_eq/Beaker.png');
    this.load.image('burner', 'lab_eq/Burner.png');
    this.load.image('dripBoard', 'lab_eq/DripBoard.png');
    this.load.image('dropper', 'lab_eq/Dropper.png');
    this.load.image('funnel', 'lab_eq/Funnel.png');
    this.load.image('measuringCylinder', 'lab_eq/MeasuringCylinder.png');
    this.load.image('phMeter', 'lab_eq/pHMeter.png');
    this.load.image('spatula', 'lab_eq/Spatula.png');
    this.load.image('sprayBottle', 'lab_eq/SprayBottle.png');
    this.load.image('stirringRod', 'lab_eq/StirringRod.png');
    this.load.image('testTube', 'lab_eq/TestTube.png');
    this.load.image('testTubeRack', 'lab_eq/TestTubeRack.png');
    this.load.image('thermometer', 'lab_eq/Thermometer.png');
    this.load.image('volumetricFlask', 'lab_eq/VolumetricFlask.png');
    this.load.image('watchGlass', 'lab_eq/WatchGlass.png');


    this.load.image('dropZoneBG', 'icons/finding_object_dropzone_background.png');
    this.load.image('energyFlask', 'icons/energy_flask.png');
    this.load.image('magnifyingGlass', 'icons/MagnifyingGlass.png');
}

var ballPipet;
var beaker;
var burner;
var dripBoard;
var dropper;
var funnel;
var measuringCylinder;
var phMeter;
var spatula;
var sprayBottle;
var stirringRod;
var testTube;
var testTubeRack;
var thermometer;
var volumetricFlask;
var watchGlass;

var ballPipetIndicator;
var beakerIndicator;
var burnerIndicator;
var dripBoardIndicator;
var dropperIndicator;
var funnelIndicator;
var measuringCylinderIndicator;
var phMeterIndicator;
var spatulaIndicator;
var sprayBottleIndicator;
var stirringRodIndicator;
var testTubeIndicator;
var testTubeRackIndicator;
var thermometerIndicator;
var volumetricFlaskIndicator;
var watchGlassIndicator;

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

var energyFlask;
var energyText;

var findTimer;
var timerText;
var correctAnswer;

var btnHint;

findingObjects1.create = function () {

    // console.log(game.canvas.width, game.canvas.height);
    //x 1879 y 1008
    //halve value: 940, 500
    canvasWidth = game.canvas.width;
    canvasHeight = game.canvas.height;

    //energy debugger, disable pas udah siap dirangkai
    energy = 100;

    //variable initialization
    correctAnswer = false;
    beakerFound = false;
    spatulaFound = false;
    testTubeFound = false;
    testTubeRackFound = false;

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

    // energyFlask = this.add.image(canvasWidth/2 - 500, canvasHeight/2 - 250, 'energyFlask');
    energyFlask = this.add.image(50, 50, 'energyFlask').setScale(0.5);
    energyText = this.add.text(energyFlask.x - 15, energyFlask.y + 5, energy + '%', {font: "700 16px Helvetica", fill: "#000000"});

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

    //temporary box(to be replaced with asset when we find one)
    // rectangleBeaker = this.add.rectangle(300, 750, 100, 100, 0x00f000, .5);
    // rectangleSpatula = this.add.rectangle(450, 750, 100, 100, 0x00f000, .5);
    // rectangleTestTube = this.add.rectangle(600, 750, 100, 100, 0x00f000, .5);
    // rectangleTestTubeRack = this.add.rectangle(750, 750, 100, 100, 0x00f000, .5);

    //size default 128x128
    dropZoneBeakerBG = this.add.image(300, 750, 'dropZoneBG');
    dropZoneSpatulaBG = this.add.image(450, 750, 'dropZoneBG');
    dropZoneTestTubeBG = this.add.image(600, 750, 'dropZoneBG');
    dropZoneTestTubeRackBG = this.add.image(750, 750, 'dropZoneBG');

    //drop zone. set name buat id. samain kaya nama texturenya
    //kenapa di set 128? biar sama dengan asset
    const beakerZone = this.add.zone(300, 750, 100, 100).setRectangleDropZone(128, 128).setName('beaker');
    const spatulaZone = this.add.zone(450, 750, 100, 100).setRectangleDropZone(128, 128).setName('spatula');
    const testTubeZone = this.add.zone(600, 750, 100, 100).setRectangleDropZone(128, 128).setName('testTube');
    const testTubeRackZone = this.add.zone(750, 750, 100, 100).setRectangleDropZone(128, 128).setName('testTubeRack');

    //text
    this.add.text(265, 735, "Beaker", {font: "20px Helvetica", fill: "#000000"});
    this.add.text(415, 735, "Spatula", {font: "20px Helvetica", fill: "#000000"});
    this.add.text(555, 735, "Test Tube", {font: "20px Helvetica", fill: "#000000"});
    this.add.text(710, 730, "Test Tube\n    Rack", {font: "20px Helvetica", fill: "#000000"});

    //coba-coba timer
    timerText = this.add.text(1650, 25);
    timerText.setStyle({
        fontSize: '20px',
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

}

findingObjects1.update = function () {
    //u ded
    if (energy == 0) {
        console.log("energimu telah habis!");
    }

    //completion
    // if (beakerFound && spatulaFound && testTubeFound && testTubeRackFound) {
    //     console.log('horeee beres');
    // }

    //keperluan debugging
    timerText.setText(`Event.progress: ${this.findTimer.getProgress().toString().substr(0, 4)}\nPaused?: ${this.findTimer.paused}`);

    //kalo jawabannya bener, timernnya direset
    if (correctAnswer) {
        this.time.addEvent(this.findTimer);
        correctAnswer = false;
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