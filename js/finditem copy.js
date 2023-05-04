findItem = new Phaser.Scene('FindItem');

findItem.preload = function () {
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

findItem.create = function () {

    // console.log(game.canvas.width, game.canvas.height);
    //x 1879 y 1008

    //objek yang akan disembunyikan
    //setAngle buat rotation in degree
    //setScale buat skala imagenya, belum tau hitboxnya keganti ato engga
    //setInteractive buat bisa interactable
    ballPipet = this.add.image(740, 800, 'ballPipet').setInteractive().setScale(0.5);
    beaker = this.add.image(940, 400, 'beaker').setInteractive().setScale(0.5);
    burner = this.add.image(490, 500, 'burner').setInteractive().setScale(0.4);
    dripBoard = this.add.image(340, 100, 'dripBoard').setInteractive().setScale(0.4);
    dropper = this.add.image(1430, 850, 'dropper').setInteractive().setScale(0.4);
    funnel = this.add.image(175, 850, 'funnel').setInteractive().setScale(0.4);
    measuringCylinder = this.add.image(1300, 125, 'measuringCylinder').setInteractive().setScale(0.3);
    phMeter = this.add.image(200, 375, 'phMeter').setInteractive().setScale(0.4);
    spatula = this.add.image(1100, 770, 'spatula').setInteractive().setScale(0.4);
    sprayBottle = this.add.image(420, 800, 'sprayBottle').setInteractive().setScale(0.4);
    stirringRod = this.add.image(940, 550, 'stirringRod').setInteractive().setScale(0.4);
    testTube = this.add.image(640, 220, 'testTube').setInteractive().setScale(0.25).setAngle(-90);
    testTubeRack = this.add.image(1500, 550, 'testTubeRack').setInteractive().setScale(0.4);
    thermometer = this.add.image(1500, 230, 'thermometer').setInteractive().setScale(0.4);
    volumetricFlask = this.add.image(1200, 495, 'volumetricFlask').setInteractive().setScale(0.25);
    watchGlass = this.add.image(940, 100, 'watchGlass').setInteractive().setScale(0.4);

    //icon indicator object found
    ballPipetIndicator = this.add.image(1825, 165, 'ballPipet').setScale(0.15);
    beakerIndicator = this.add.image(1825, 100, 'beaker').setScale(0.2);
    
    phMeterIndicator = this.add.image(1825, 285, 'phMeter').setScale(0.2);


    beaker.on('pointerup', function () {
        beakerIndicator.setTint(0x808080);
        console.log('beaker');
        beaker.disableInteractive();
    });

    ballPipet.on('pointerup', function () {
        ballPipetIndicator.setTint(0x808080);
    });

    burner.on('pointerup', function () {
        burnerIndicator.setTint(0x808080);
    });

    dripBoard.on('pointerup', function () {
        dripBoardIndicator.setTint(0x808080);
    });

    dropper.on('pointerup', function () {
        dropperIndicator.setTint(0x808080);
    });

    funnel.on('pointerup', function () {
        funnelIndicator.setTint(0x808080);
    });

    measuringCylinder.on('pointerup', function () {
        measuringCylinderIndicator.setTint(0x808080);
    });

    phMeter.on('pointerup', function () {
        phMeterIndicator.setTint(0x808080);
    });

    spatula.on('pointerup', function () {
        spatulaIndicator.setTint(0x808080);
    });

    sprayBottle.on('pointerup', function () {
        sprayBottleIndicator.setTint(0x808080);
    });

    stirringRod.on('pointerup', function () {
        stirringRodIndicator.setTint(0x808080);
    });

    testTube.on('pointerup', function () {
        testTubeIndicator.setTint(0x808080);
    });

    testTubeRack.on('pointerup', function () {
        testTubeRackIndicator.setTint(0x808080);
    });

    thermometer.on('pointerup', function () {
        thermometerIndicator.setTint(0x808080);
    });

    volumetricFlask.on('pointerup', function () {
        volumetricFlaskIndicator.setTint(0x808080);
    });    

    watchGlass.on('pointerup', function () {
        watchGlassIndicator.setTint(0x808080);
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

findItem.update = function () {
    
}