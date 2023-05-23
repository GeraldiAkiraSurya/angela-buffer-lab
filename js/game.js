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
    // scene: [mainMenu, findingObjects1, findingObjects2, 
    //     question211, question212, question213, question214, question215, question216, question217, question218, question219, question2110, question2111, question2112,
    //     question221, question222, question223, question224, question225, question226, question227, question228, question229, question2210, question2211, question2212, question2213, question2214,
    //     selectChara, missionSelection, missionOne, missionThree
    // ]

    //development
    // scene: [question211, question212, question213, question214, question215, question216, question217, question218, question219, question2110, question2111, question2112]
    scene: [question221, question222, question223, question224, question225, question226, question227, question228, question229, question2210, question2211, question2212, question2213, question2214]
    // scene: [question228]
    // scene: [mainMenu, findingObjects1, selectChara, missionSelection, missionOne, missionThree]
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