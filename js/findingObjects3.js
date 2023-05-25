//Finding Objects 3
findingObjects3 = new Phaser.Scene('FindingObjects3');

findingObjects3.preload = function () {
    this.load.path = './assets/';
    this.load.image('funnel', 'lab_eq/Funnel.png');
    this.load.image('volumetricFlask', 'lab_eq/VolumetricFlask.png');
    this.load.image('burner', 'lab_eq/Burner.png');
    this.load.image('thermometer', 'lab_eq/Thermometer.png');

    this.load.image('findingObjects3BG', 'scenes/bg_hutan2.png');

    this.load.image('dropZoneBG', 'icons/finding_object_dropzone_background.png');
    this.load.image('energyFlask', 'icons/energy_flask.png');
    this.load.image('magnifyingGlass', 'icons/MagnifyingGlass.png');
    this.load.image('giftBox', 'icons/gift_box.png');
    this.load.image('buahAjaib', 'icons/buahAjaib.png');

    this.load.image('backButton', 'buttons/Back Button.png');

    this.load.plugin('rexyoutubeplayerplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexyoutubeplayerplugin.min.js', true);
    this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
}

var funnel;
var volumetricFlask;
var burner;
var thermometer;

var funnelIndicator;
var volumetricFlaskIndicator;
var burnerIndicator;
var thermometerIndicator;

//drop zone destinasi
var dropZoneFunnelBG;
var dropZoneVolumetricFlaskBG;
var dropZoneBurnerBG;
var dropZoneThermometerBG;

//boolean: object found or not
var funnelFound;
var volumetricFlaskFound;
var burnerFound;
var thermometerFound;
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
var buahAjaib;

var energyFlask1;
var energyFlask2;

var findTimer;
//keperluan debugging
var timerText;
var correctAnswer;

var btnHint;

findingObjects3.create = function () {
    //x 1879 y 1008
    //halve value: 940, 504
    //comment nanti, keperluan debugging doang. harusnya di initiate dari main menu.
    middleX = this.cameras.main.width / 2;
    middleY = this.cameras.main.height / 2;

    //background
    this.add.image(middleX, middleY, 'findingObjects3BG').setScale(1.19, 0.94);

    //energy debugger, disable pas udah siap dirangkai
    energy = 100;

    //start timer ke DB
    //ganti habis 2.2 beres
    start("1", 6);

    //variable initialization
    correctAnswer = false;
    isGameOverRendered = false;
    outOfEnergy = false;
    lookingForEnergyFlask = false;
    funnelFound = false;
    volumetricFlaskFound = false;
    burnerFound = false;
    thermometerFound = false;
    energyFlask1Found = false;
    energyFlask2Found = false;

    //setAngle buat rotation in degree
    //setScale buat skala imagenya, belum tau hitboxnya keganti ato engga. kayanya ga keganti, atau hitboxnya lebih besar dari imagenya
    //setInteractive buat bisa interactable
    //load image to scene
    // funnel = this.add.image(650, 840, 'funnel').setInteractive().setScale(0.5);
    funnel = this.add.image(middleX - 845, middleY - 305, 'funnel').setInteractive().setScale(0.2).setVisible(false).setAngle(-33);
    //biar bisa di-drag
    this.input.setDraggable(funnel);    

    // volumetricFlask = this.add.image(1655, 165, 'volumetricFlask').setInteractive().setScale(0.2).setAngle(17);
    volumetricFlask = this.add.image(middleX - 785, middleY + 399, 'volumetricFlask').setInteractive().setScale(0.15).setAngle(-170).setVisible(false);
    this.input.setDraggable(volumetricFlask);

    // burner = this.add.image(500, 565, 'burner').setInteractive().setScale(0.12).setAngle(-7);
    burner = this.add.image(middleX - 5, middleY + 150, 'burner').setInteractive().setAngle(-7).setScale(0.19).setVisible(false).setFlipX(true);
    this.input.setDraggable(burner);

    // thermometer = this.add.image(1110, 100, 'thermometer').setInteractive().setScale(0.2).setAngle(7);
    thermometer = this.add.image(middleX + 875, middleY + 176, 'thermometer').setInteractive().setScale(0.2).setVisible(false).setAngle(13);
    this.input.setDraggable(thermometer);

    //gift box & buahAjaib
    giftBox = this.add.image(middleX, middleY + 50, 'giftBox').setVisible(false);
    buahAjaib = this.add.image(middleX, middleY - 100, 'buahAjaib').setInteractive().setScale(1.2).setVisible(false);

    //ketrigger kalo udah beres
    buahAjaib.on('pointerup', function () {
        // console.log('clicked buahAjaib!');

        findingObjects3Done = true;

        findingObjects3.scene.start('MissionSelection');
    });

    energyFlaskIcon = this.add.image(50, 50, 'energyFlask').setScale(0.5);
    energyText = this.add.text(energyFlaskIcon.x - 15, energyFlaskIcon.y + 5, energy + '%', {font: "700 16px Helvetica", fill: "#000000"});

    //hint
    btnHint = this.add.image(middleX - 800, middleY - 455, 'magnifyingGlass').setInteractive().setScale(0.8);
    //disabled pas showObjective on, re-enabled by startFindingObject
    btnHint.input.enabled = false;

    btnHint.on('pointerup', function () {
        let objectsArray = [];
        if (!funnelFound) {
            objectsArray.push(funnel);
        }
        if (!volumetricFlaskFound) {
            objectsArray.push(volumetricFlask);
        }
        if (!burnerFound) {
            objectsArray.push(burner);
        }
        if (!thermometerFound) {
            objectsArray.push(thermometer);
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
    dropZoneFunnelBG = this.add.image(middleX - 560, middleY - 439, 'dropZoneBG');
    dropZoneVolumetricFlaskBG = this.add.image(middleX - 410, middleY - 439, 'dropZoneBG');
    dropZoneBurnerBG = this.add.image(middleX - 260, middleY - 439, 'dropZoneBG');
    dropZoneThermometerBG = this.add.image(middleX - 110, middleY - 439, 'dropZoneBG');

    //drop zone. set name buat id. samain kaya nama texturenya
    //kenapa di set 128? biar sama dengan asset
    const funnelZone = this.add.zone(middleX - 560, middleY - 439, 128, 128).setRectangleDropZone(128, 128).setName('funnel');
    const volumetricFlaskZone = this.add.zone(middleX - 410, middleY - 439, 128, 128).setRectangleDropZone(128, 128).setName('volumetricFlask');
    const burnerZone = this.add.zone(middleX - 260, middleY - 439, 128, 128).setRectangleDropZone(128, 128).setName('burner');
    const thermometerZone = this.add.zone(middleX - 110, middleY - 439, 128, 128).setRectangleDropZone(128, 128).setName('thermometer');

    //text dalam dropZone
    this.add.text(middleX - 596, middleY - 454, "Corong", {font: "900 20px Helvetica", fill: "#000000"});
    this.add.text(middleX - 435, middleY - 464, "Labu\nUkur", {font: "900 20px Helvetica", fill: "#000000"});
    this.add.text(middleX - 315, middleY - 464, "Pembakar\n  Spirtus", {font: "900 20px Helvetica", fill: "#000000"});
    this.add.text(middleX - 163, middleY - 464, "   Termo-\n    meter", {font: "900 20px Helvetica", fill: "#000000"});

    //timer 15 detik per objek
    //keperluan debugging
    timerText = this.add.text(1640, 25);
    timerText.setStyle({
        fontSize: '900 40px',
        fontFamily: 'Helvetica',
        color: '#ffffff',
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

            switch (dropZone.name) {
                case 'funnel':
                    //tandain objeknya ketemu
                    funnelFound = true;
                    funnel.setVisible(false);
                    dropZoneFunnelBG.setTint(0x08F26E);
                    //destroy the zone biar yg lain ga dicoba di drag lagi kesini
                    funnelZone.destroy();
                    // console.log(funnelFound);
                    break;
                case 'volumetricFlask':
                    volumetricFlaskFound = true;
                    volumetricFlask.setVisible(false);
                    dropZoneVolumetricFlaskBG.setTint(0x08F26E);

                    volumetricFlaskZone.destroy();
                    // console.log(volumetricFlaskFound);
                    break;
                case 'burner':
                    burnerFound = true;
                    burner.setVisible(false);
                    dropZoneBurnerBG.setTint(0x08F26E);

                    burnerZone.destroy();
                    // console.log(burnerFound);
                    break;
                case 'thermometer':
                    thermometerFound = true;
                    thermometer.setVisible(false);
                    dropZoneThermometerBG.setTint(0x08F26E);

                    thermometerZone.destroy();
                    // console.log(thermometerFound);
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
    energyFlask2 = this.add.image(middleX - 440, middleY + 51, 'energyFlask').setInteractive().setScale(0.4).setName('energyFlask2').setVisible(false);

    energyFlask1.on('pointerup', function () {
        energy = 20;
        energyFlask1Found = true;
        outOfEnergy = false;
        lookingForEnergyFlask = false;
        // isGameOverRendered = false;

        funnel.input.enabled = true;
        volumetricFlask.input.enabled = true;
        burner.input.enabled = true;
        thermometer.input.enabled = true;

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

        funnel.input.enabled = true;
        volumetricFlask.input.enabled = true;
        burner.input.enabled = true;
        thermometer.input.enabled = true;

        // console.log('outOfEnergy: ' + outOfEnergy);
        // console.log('lookingForEnergyFlask: ' + lookingForEnergyFlask);
        // console.log('energyFlask2Found: ' + energyFlask2Found);

        energyFlask2.setVisible(false);
        energyText.setText(energy + '%');
        findTimer.paused = !findTimer.paused;
    });

    //alur game
    showObjective3(this, funnel, volumetricFlask, burner, thermometer, btnHint);
    // startFindingObject(this, funnel, volumetricFlask, burner, thermometer, btnHint);
}

findingObjects3.update = function () {
    //out of energy
    //kalo energi abis, disable smua objek interactivenya, dropZone nya
    //yg enabled cmn energyFlask
    if (energy == 0) {
        // console.log("energimu telah habis!");

        funnel.input.enabled = false;
        volumetricFlask.input.enabled = false;
        burner.input.enabled = false;
        thermometer.input.enabled = false;

        if (!lookingForEnergyFlask) {
            outOfEnergy = true;
        }

        if (energyFlask1Found && energyFlask2Found && !isGameOverRendered) {
            showGameOver(this);
        }
    }

    //completion
    if (funnelFound && volumetricFlaskFound && burnerFound && thermometerFound) {
        // console.log('horeee beres');
        findTimer.paused = true;

        //manggil method done buat record time di DB
        //ganti habis 2.2 beres
        done("1", 6);

        giftBox.setVisible(true);
        buahAjaib.setVisible(true);
    }

    let correctTime = findTimer.getProgress().toString().substr(0, 4) * 15;

    //keperluan debugging
    timerText.setText(`Time: ${correctTime.toString().substr(0, 2)}`);
    // timerText.setText(`Event.progress: ${findTimer.getProgress().toString().substr(0, 4)}\nPaused?: ${findTimer.paused}`);

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