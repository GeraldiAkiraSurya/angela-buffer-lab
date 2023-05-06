//Finding Objects 1
findingObjects1 = new Phaser.Scene('FindingObjects1');

findingObjects1.preload = function () {
    this.load.path = './assets/lab_eq/';
    this.load.image('ballPipet', 'BallPipet.png');
    this.load.image('beaker', 'Beaker.png');
    this.load.image('burner', 'Burner.png');
    this.load.image('dripBoard', 'DripBoard.png');
    this.load.image('dropper', 'Dropper.png');
    this.load.image('funnel', 'Funnel.png');
    this.load.image('measuringCylinder', 'MeasuringCylinder.png');
    this.load.image('phMeter', 'pHMeter.png');
    this.load.image('spatula', 'Spatula.png');
    this.load.image('sprayBottle', 'SprayBottle.png');
    this.load.image('stirringRod', 'StirringRod.png');
    this.load.image('testTube', 'TestTube.png');
    this.load.image('testTubeRack', 'TestTubeRack.png');
    this.load.image('thermometer', 'Thermometer.png');
    this.load.image('volumetricFlask', 'VolumetricFlask.png');
    this.load.image('watchGlass', 'WatchGlass.png');
}

var btnStart;
var btnDifficulty;
var btnHowToPlay;
var titleCard;

var objects;

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
var dropZoneBeaker;
var dropZoneSpatula;
var dropZoneTestTube;
var dropZoneTestTubeRack;

findingObjects1.create = function () {

    // console.log(game.canvas.width, game.canvas.height);
    //x 1879 y 1008

    //objek yang akan disembunyikan

    //setAngle buat rotation in degree
    //setScale buat skala imagenya, belum tau hitboxnya keganti ato engga. kayanya ga keganti, atau hitboxnya lebih besar dari imagenya
    //setInteractive buat bisa interactable

    // ballPipet = this.add.image(740, 800, 'ballPipet').setInteractive().setScale(0.5);
    // beaker = this.add.image(940, 400, 'beaker').setInteractive({ draggable: true }).setScale(0.5);
    beaker = this.add.image(940, 400, 'beaker').setInteractive().setScale(0.5);
    this.input.setDraggable(beaker);

    
    // burner = this.add.image(490, 500, 'burner').setInteractive().setScale(0.4);
    // dripBoard = this.add.image(340, 100, 'dripBoard').setInteractive().setScale(0.4);
    // dropper = this.add.image(1430, 850, 'dropper').setInteractive().setScale(0.4);
    // funnel = this.add.image(175, 850, 'funnel').setInteractive().setScale(0.4);
    // measuringCylinder = this.add.image(1300, 125, 'measuringCylinder').setInteractive().setScale(0.3);
    // phMeter = this.add.image(200, 375, 'phMeter').setInteractive().setScale(0.4);
    spatula = this.add.image(1100, 770, 'spatula').setInteractive().setScale(0.4);
    this.input.setDraggable(spatula);
    // sprayBottle = this.add.image(420, 800, 'sprayBottle').setInteractive().setScale(0.4);
    // stirringRod = this.add.image(940, 550, 'stirringRod').setInteractive().setScale(0.4);
    testTube = this.add.image(440, 320, 'testTube').setInteractive().setScale(0.25).setAngle(-90);
    this.input.setDraggable(testTube);
    testTubeRack = this.add.image(1500, 550, 'testTubeRack').setInteractive().setScale(0.4);
    this.input.setDraggable(testTubeRack);
    // thermometer = this.add.image(1500, 230, 'thermometer').setInteractive().setScale(0.4);
    // volumetricFlask = this.add.image(1200, 495, 'volumetricFlask').setInteractive().setScale(0.25);
    // watchGlass = this.add.image(940, 100, 'watchGlass').setInteractive().setScale(0.4);

    rectangleBeaker = this.add.rectangle(300, 750, 100, 100, 0x00f000, .5);
    rectangleSpatula = this.add.rectangle(450, 750, 100, 100, 0x00f000, .5);
    rectangleTestTube = this.add.rectangle(600, 750, 100, 100, 0x00f000, .5);
    rectangleTestTubeRack = this.add.rectangle(750, 750, 100, 100, 0x00f000, .5);

    const beakerZone = this.add.zone(300, 750, 100, 100).setRectangleDropZone(100, 100).setName('beaker');
    const spatulaZone = this.add.zone(450, 750, 100, 100).setRectangleDropZone(100, 100).setName('spatula');
    const testTubeZone = this.add.zone(600, 750, 100, 100).setRectangleDropZone(100, 100).setName('testTube');
    const testTubeRackZone = this.add.zone(750, 750, 100, 100).setRectangleDropZone(100, 100).setName('testTubeRack');

    this.input.on('dragstart', function (pointer, gameObject) {
        this.children.bringToTop(gameObject);
        console.log(gameObject.texture.key);
    }, this);

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    });

    this.input.on('drop', function (pointer, gameObject, dropZone) {
        console.log(dropZone.name);

        if (gameObject.texture.key == dropZone.name) {
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;

            gameObject.input.enabled = false;
        }
        else {
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
            alert("salah anying");
        } 
    });

    this.input.on('dragend', function (pointer, gameObject, dropped) {
        if (!dropped) {
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
        }
    });

    //animations
    // this.tweens.add({
    //     targets: [titleCard],
    //     duration: 1500,
    //     y: 150,
    //     scaleX: 2.5,
    //     scaleY: 1.1,
    //     ease: 'Bounce.easeOut'
    // });

    // this.tweens.add({
    //     targets: [btnStart],
    //     duration: 2000,
    //     x: 620,
    //     scaleX: 2,
    //     scaleY: 2,
    //     ease: 'Bounce.easeIn'
    // });

    // this.tweens.add({
    //     targets: [btnDifficulty],
    //     duration: 2000,
    //     x: 620,
    //     scaleX: 2,
    //     scaleY: 2,
    //     ease: 'Bounce.easeIn'
    // });

    // this.tweens.add({
    //     targets: [btnHowToPlay],
    //     duration: 2000,
    //     x: 620,
    //     scaleX: 2,
    //     scaleY: 2,
    //     ease: 'Bounce.easeIn'
    // });

}

findingObjects1.update = function () {
    
}

