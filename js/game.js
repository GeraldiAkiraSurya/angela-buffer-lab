var config = {
    type: Phaser.AUTO,
    // width: 1240,
    // height: 680,

    //putih
    backgroundColor: '#ffffff',
    
    //ff3838 //a3a0a0 //ffffff

    //abu
    // backgroundColor: '#a3a0a0',

    //nanti scale harus matiin
    scale: {
        mode: Phaser.Scale.ScaleModes.NONE,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    },
    canvasStyle: `display: block; width: 100%; height: 100%;`,
    // scene: [mainMenu, gameplay]
    //lengkap
    // scene: [mainMenu, findingObjects1]

    //development
    scene: [findingObjects1]
};

var game = new Phaser.Game(config);