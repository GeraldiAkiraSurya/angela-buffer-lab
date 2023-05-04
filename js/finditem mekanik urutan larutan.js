findItem = new Phaser.Scene('FindItem');

findItem.preload = function () {
    this.load.path = './assets/lab_eq/';
    this.load.image('ballPipet', 'BallPipet.png');
    this.load.image('beaker', 'Beaker.png');
    this.load.image('funnel', 'Funnel.png');
    this.load.image('graduatedCylinderBeaker', 'GraduatedCylinderBeaker.png');
    this.load.image('phMeter', 'pHMeter.png');
    this.load.image('spatula', 'Spatula.png');
    this.load.image('sprayBottle', 'SprayBottle.png');
    this.load.image('stirringRod', 'StirringRod.png');
    this.load.image('thermometer', 'Thermometer.png');
}

var btnStart;
var btnDifficulty;
var btnHowToPlay;
var titleCard;

var ballPipet;
var beaker;
var funnel;
var graduatedCylinderBeaker;
var phMeter;
var spatula;
var sprayBottle;
var stirringRod;
var thermometer;

var correctCombination;
var combinationArray;

findItem.create = function () {

    // console.log(game.canvas.width, game.canvas.height);
    //x 1879 y 1008

    //drop zone buat dragable

    ballPipet = this.add.image(540, 800, 'ballPipet').setInteractive();
    beaker = this.add.image(940, 500, 'beaker').setInteractive();

    funnel = this.add.image(-620, 275, 'funnel').setInteractive();
    graduatedCylinderBeaker = this.add.image(-620, 375, 'graduatedCylinderBeaker').setInteractive();

    phMeter = this.add.image(1600, 675, 'phMeter').setInteractive();

    spatula = this.add.image(-620,575, 'spatula').setInteractive();
    sprayBottle = this.add.image(-620, 675, 'sprayBottle').setInteractive();
    stirringRod = this.add.image(-620, 775, 'stirringRod').setInteractive();
    thermometer = this.add.image(-620, 875, 'thermometer').setInteractive();

    correctCombination = false;
    combinationArray = [];

    beaker.on('pointerup', function () {
        combinationArray.push("beaker");
        console.log(combinationArray);
    });

    ballPipet.on('pointerup', function () {
        combinationArray.push("ballPipet");
        console.log(combinationArray);
    });

    phMeter.on('pointerup', function () {
        combinationArray.push("phMeter");
        console.log(combinationArray);
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