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
        // mode: Phaser.Scale.FIT,
        // autoCenter: Phaser.Scale.CENTER_BOTH,
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

    //buat youtube video player
    parent: 'angela-buffer-lab',
    dom: {
        createContainer: true
    },
    
    // plugins: {
    //     scene: [{
    //         key: 'rexUI',
    //         plugin: UIPlugin,
    //         mapping: 'rexUI'
    //     },
    //     ]
    // },
    
    canvasStyle: `display: block; width: 100%; height: 100%;`,

    //lengkap
    // scene: [mainMenu, findingObjects1, findingObjects2, question212, selectChara, missionSelection, missionOne, missionThree]

    //development
    // scene: [question214]
    scene: [question212, question214]
    // scene: [missionOne]
    // scene: [findingObjects1]
};

var game = new Phaser.Game(config);

/* LINK VIDEO
alat dan bahan misi 1 : https://youtu.be/qz1XzCmdHAg
misi 1 : https://youtu.be/EJZ8B7NOy2k
misi 2 : https://youtu.be/TdDKvshp6ks
misi 3 : https://youtu.be/vTP3BGnawU4
misi 4 : https://youtu.be/QpCJO6pe5RI
misi 5 : https://youtu.be/pRIrCBToivc 
*/