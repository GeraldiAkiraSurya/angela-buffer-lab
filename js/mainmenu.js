mainMenu = new Phaser.Scene('MainMenu');

mainMenu.preload = function () {
    this.load.path = './assets/';
    this.load.image('menuBackground', 'scenes/science_lab.jpg');
    this.load.image('startButton', 'buttons/Start Button.png');
    this.load.image('optionsButton', 'buttons/Options Button.png');

    this.load.audio('mainMenuBGM', 'music/main_menu_music.mp3');

    this.load.image('sora', 'characters/female.png');
    this.load.image('shin', 'characters/male.png');

    //video player plugin
    this.load.plugin('rexyoutubeplayerplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexyoutubeplayerplugin.min.js', true);
}

var btnStart;
var btnOptions;

var youtubePlayer;

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

    canvasWidth = game.canvas.width;
    canvasHeight = game.canvas.height;

    //background main menu
    this.add.image(canvasWidth/2, canvasHeight/2, 'menuBackground').setScale(0.65, 0.52);

    //add characters
    shin = this.add.image(canvasWidth/2 - 400, canvasHeight/2 - 150, 'shin').setScale(0.56).setVisible(false);
    sora = this.add.image(canvasWidth/2 + 400, canvasHeight/2 - 150, 'sora').setScale(0.56).setFlipX(true).setVisible(false);

    // console.log(character);

    if (character == 'male') {
        shin.setVisible(true);
    }
    else if (character == 'female') {
        sora.setVisible(true);
    }

    //video player
    // video = this.add.video(canvasWidth/2, canvasHeight/2);
    // let url = 'https://www.youtube.com/embed/tgbNymZ7vqY';
    // video.loadURL('https://www.youtube.com/embed/tgbNymZ7vqY');

    // video.play();

    //pake plugins tapi blm berhasil
    // youtubePlayer = this.add.rexYoutubePlayer(0, 0, 600, 450, {
    //     videoId: 'wDOym-mXxO4'
    // }).on('ready', function () {
    //     youtubePlayer.setPosition(canvasWidth/2, canvasHeight/2);
    // });    

    //buttons
    btnStart = this.add.image(canvasWidth/2, canvasHeight/2, 'startButton').setInteractive().setScale(0.5);
    btnOptions = this.add.image(canvasWidth/2, canvasHeight/2 + 125, 'optionsButton').setInteractive().setScale(0.5);

    btnStart.on('pointerup', function () {        
        console.log(energy);
        mainMenu.scene.start('MissionSelection');
    });

    btnOptions.on('pointerup', function () {
        mainMenu.scene.start('SelectChara');
    });

    // this.tweens.add({
    //     targets: [btnStart],
    //     duration: 1000,
    //     x: canvasWidth/2,
    //     scaleX: 2,
    //     scaleY: 2,
    //     ease: 'Bounce.easeIn'
    // });
}

mainMenu.update = function () {
    
}