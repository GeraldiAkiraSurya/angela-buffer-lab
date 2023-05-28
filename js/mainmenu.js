mainMenu = new Phaser.Scene('MainMenu');

mainMenu.preload = function () {
    this.load.path = './assets/';
    this.load.image('menuBackground', 'scenes/science_lab.jpg');
    this.load.image('startButton', 'buttons/Start Button.png');
    this.load.image('optionsButton', 'buttons/Options Button.png');

    this.load.audio('mainMenuBGM', 'music/main_menu_music.mp3');

    this.load.image('sora', 'characters/female.png');
    this.load.image('shin', 'characters/male.png');

    this.load.image('profile', 'icons/profile.png');
}

var btnStart;
var btnOptions;
var btnProfile

//male
var shin;
//female
var sora;

mainMenu.create = function () {
    // console.log(game.canvas.width, game.canvas.height);
    //x 1879 y 1008

    //BGM
    const musicConf = {
        volume: 0.05,
        loop: true,
    }

    //added the music
    menuMusic = this.sound.add('mainMenuBGM', musicConf);
    //biar ga ke pause kalo ganti tab
    menuMusic.pauseOnBlur = false;

    //prevent the music from being played twice
    if (!isMenuMusicPlaying) {
        //play the music
        menuMusic.play();
        //boolean for checking is music playing between scenes
        //stored in global variable
        isMenuMusicPlaying = true;
    }

    middleX = this.cameras.main.width / 2;
    middleY = this.cameras.main.height / 2;

    //background main menu
    this.add.image(middleX, middleY, 'menuBackground').setScale(0.65, 0.52);

    //judul Buffer Laboratory
    this.add.text(middleX - 630, middleY - 370, "Buffer Laboratory", {font: "900 130px Helvetica", fill: "#000000"}).setStroke('#fff', 5);

    //module character start

    //add characters, nanti pas dialog ganti posisinya aja gas
    shin = this.add.image(middleX - 400, middleY - 150, 'shin').setScale(0.56).setVisible(false);
    sora = this.add.image(middleX + 400, middleY - 150, 'sora').setScale(0.56).setFlipX(true).setVisible(false);

    //global var character dihapus, jadi pake gender
    // console.log('gender ' + gender);

    //0: male
    // if (gender == 0) {
    //     shin.setVisible(true);
    // }
    // //1: female
    // else if (gender == 1) {
    //     sora.setVisible(true);
    // }
    //module character end

    //buttons
    btnProfile = this.add.image(this.cameras.main.width-100, 100, 'profile').setInteractive().setScale(0.5);

    btnStart = this.add.image(middleX, middleY + 150, 'startButton').setInteractive().setScale(0.5);
    btnOptions = this.add.image(middleX, middleY + 275, 'optionsButton').setInteractive().setScale(0.5);
    

    btnStart.on('pointerup', function () {        
        // console.log(energy);
        mainMenu.scene.start('MissionSelection');
    });

    btnOptions.on('pointerup', function () {
        mainMenu.scene.start('SelectChara');
    });

    btnProfile.on('pointerup', function () {
        window.location.href = 'profile';
    });
}

mainMenu.update = function () {
    
}