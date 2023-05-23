missionFive = new Phaser.Scene('mission5');

missionFive.preload = function () {
    this.load.path = './assets/';
    this.load.image('menuBackground', 'scenes/science_lab.jpg');
    this.load.image('missionBackground', 'scenes/bg_kayu.png')


    //pluginsnya pindahin ke game?

    this.load.scenePlugin({
        key: 'rexuiplugin',
        url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
        sceneey: 'rexUI'
    });
    this.load.plugin('rexyoutubeplayerplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexyoutubeplayerplugin.min.js', true);
    this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);

    this.load.image('nextPage', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png');
    
}

missionFive.create = function() {
    middleX = this.cameras.main.width / 2;
    middleY = this.cameras.main.height / 2;

    gameObjects = {};
    missionBoxProps = {};
    choices = [];
    selections = [];
    sequence = 0;

    youtubeId = {
        intro: 'qz1XzCmdHAg',
        problem: 'pRIrCBToivc',
    };

    /**
     * Isi variable choicesText dengan pilihan-pilihan jawaban untuk suatu soal.
     * Key pada choicesText adalah nomor pertanyaan, dan value nya merupakan array yang berisi text-text pilihan jawaban.
     * 
     * Isi variable correctAnswer dengan jawaban yang benar untuk pertanyaan pada nomor sekian.
     */

    choicesText = {
        1: [
            "4,97",
            "4",
            "6"
        ],
        2: [
            "[CH3COOH] = 0,05 M \n [CH3COO-] = 0,05 M",
            "[CH3COOH] = 0,5 M \n [CH3COO-] = 0,5 M",
            "[CH3COOH] = 0,1 M \n [CH3COO-] = 0,1 M",
            "15 mL HCl 0,1 M + 15 mL NaOH 0,1 M "
        ],
        3: [
            "Kc =[H+][CH3COO-] / [CH3COOH] ",
            "Kc =[CH3COOH] / [H+][CH3COO-]",
            "Kc =[H+][CH3COOH] / [CH3COO-]",
            "Kc =[CH3COOH][CH3COO-] / [h+]"
        ],
        4: [
            "[H+] = Ka ( [CH3COOH]/ [CH3COO-])",
            "[H+] = Ka ( [CH3COO-]/ [CH3COOH])",
            "[H+] = ( [CH3COO-]/  Ka[CH3COOH])",
        ],
        5: [
            "[H+] = 1 x 10-5 M",
            "[H+] = 1,07 x 10-5 M",
            "[H+] = 5 x 10-5 M"
        ],
        6: [
            "pH=5",
            "pH=4,97",
            "pH=4,3"
        ],
        7: [
            "konsentrasi asam lemah setelah pencampuran",
            "konsentrasi basa konjugasi setelah pencampuran",
            "nilai Ka",
            "jenis alat yang digunakan dalam percobaan",
            "nilai Kb"
        ],
    };

    correctAnswers = {
        1: [1,0,0],
        2: [1,0,0,0],
        3: [1,0,0,0],
        4: [1,0,0],
        5: [0,1,0],
        6: [0,1,0],
        7: [1,1,1,0,0]

    };

    loadSequence5(this, 1);
}

missionFive.update = function() {
    
}

function loadSequence5(scene, sequence) {
    console.log("Start sequence " + sequence);

    console.log(gameObjects);
    destroyAllGameObjects();
    createMissionBackgroundObjects(scene, 'missionBackground');

    if (sequence == 0) { // Sequence dialog
        // MISI 3 GA ADA DIALOG
    } else if (sequence == 1) { // Sequence yang muncul prompt mau lanjut atau tidak
        // destroyAllGameObjects3();
        createMissionBackgroundObjects (scene, 'menuBackground');
        gameObjects.missionBox.setSize(scene.cameras.main.width * 3 / 4, scene.cameras.main.height * 3 / 4);
        let text = "Selamat datang di laboratorium Z!";
        gameObjects.announcement = createAnnouncementText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence5(scene, sequence+1);
        }, middleX - 150, middleY + (missionBoxProps.height/2) - 100);
        gameObjects.exitBtn = createExitButton(scene, middleX+150, middleY + (missionBoxProps.height/2) - 100);

    } else if (sequence == 2) { // Sequence deskripsi misi

        gameObjects.title = scene.add.text(middleX, missionBoxProps.lowestY + 50, "MISI V")
            .setOrigin(0.5)
            .setFontSize(40);
        let text = "[b]SYARAT PENYELESAIAN KHUSUS:[/b] PERHATIKAN VIDEO DENGAN SEKSAMA DAN PILIHLAH JAWABAN YANG BENAR DARI PERTANYAAN YANG DIBERIKAN\n\n\
[b]BATAS WAKTU:[/b] TIDAK ADA\n\n\
[b]HADIAH:[/b] ENERGI DAN BUAH AJAIB\n\n\
[b]JIKA GAGAL:[/b] KEMBALI KE AWAL MISI V\n";
        gameObjects.missionDesc = createDescText(scene, text);

        // Button untuk load sequence selanjutnya
        gameObjects.nextBtn = createNextButton(scene, 'TERIMA', () => {
            loadSequence5(scene, sequence+1);
        });

    } else if (sequence == 3) { // Sequence youtube vid

        gameObjects.youtubePlayer = createYoutubeVideo(scene, youtubeId['intro']);
        // Button untuk load sequence selanjutnya
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence5(scene, sequence+1);
        });

    } else if (sequence == 4) { // Sequence youtube vid

        gameObjects.youtubePlayer = createYoutubeVideo(scene, youtubeId['problem']);
        // Button untuk load sequence selanjutnya
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence5(scene, sequence+1);
        });

    } else if (sequence == 5) { // Sequence soal pertanyaan SOAL 1
        start("5",1)
        let text = 'Berdasarkan tayangan video tersebut, berapakah pH larutan yang dibuat?';
        gameObjects.question = createDescText(scene, text);
        // Button untuk load sequence selanjutnya
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence5(scene, sequence+1);
        });

    } else if (sequence == 6) { // Sequence milih jawaban

        let questionNumber = 1; // ISI DENGAN NOMOR PERTANYAAN!
        createChoices(scene, questionNumber);
        gameObjects.nextBtn = createNextButton(scene, 'KONFIRMASI', () => {
            console.log("Final answer: \n" + selections);
            if (checkAnswer(questionNumber) == true) {
                done("5",1)
                // Kalo jawaban bener, langsung load sequence selanjutnya
                loadSequence5(scene, sequence+1);
            } else {
                // Kalo jawaban salah, suruh tonton video dulu terus nanti bakal ke pertanyaan lagi
                destroyAllGameObjects();
                createMissionBackgroundObjects(scene, 'missionBackground');
                gameObjects.youtubePlayer = createYoutubeVideo(scene, youtubeId['problem']);
                gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
                    loadSequence5(scene, sequence-1);
                });
            }
        });
        
        
    } else if (sequence == 7) { // Sequence jawaban bener

        let text = "Bagus sekali, pilihan Anda benar.";
        gameObjects.announcement = createAnnouncementText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence5(scene, sequence+1);
        }, middleX - 150, middleY + (missionBoxProps.height/2) - 100);
        gameObjects.exitBtn = createExitButton(scene, middleX+150, middleY + (missionBoxProps.height/2) - 100);

    } else if (sequence == 8) { // Sequence pertanyaan
        start("5",2)
        let text = 'Setelah pencampuran, coba hitung konsentrasi asam asetat dan ion asetat (yang berasal dari garam). Pilih jawaban yang benar!';
        gameObjects.question = createDescText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence5(scene, sequence+1);
        });

    } else if (sequence == 9) { // Sequence milih jawaban

        let questionNumber = 2; // ISI DENGAN NOMOR PERTANYAAN!
        createChoices(scene, questionNumber);
        gameObjects.nextBtn = createNextButton(scene, 'KONFIRMASI', () => {
            console.log("Final answer: \n" + selections);
            if (checkAnswer(questionNumber) == true) {
                done("5",2)
                loadSequence5(scene, sequence+1);
            } else {
                // Kalo jawaban salah, suruh tonton video dulu terus nanti bakal ke pertanyaan lagi
                destroyAllGameObjects();
                createMissionBackgroundObjects(scene, 'missionBackground');
                gameObjects.youtubePlayer = createYoutubeVideo(scene, youtubeId['problem']);
                gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
                    loadSequence5(sequence-1);
                });
            }
        });

    } else if (sequence == 10) { // Sequence jawaban bener

        let text = "Bagus sekali, pilihan Anda benar."
        gameObjects.announcement = createAnnouncementText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence5(scene, sequence+1);
        }, middleX - 150, middleY + (missionBoxProps.height/2) - 100);
        gameObjects.exitBtn = createExitButton(scene, middleX+150, middleY + (missionBoxProps.height/2) - 100);

    } else if (sequence == 11) {
        start("5",3)
        let text = 'Sekarang pilih tetapan kesetimbangan yang benar untuk reaksi disosiasi asam asetat ';
        gameObjects.question = createDescText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence5(scene, sequence+1);
        });

    }

    else if (sequence == 12) { // Sequence milih jawaban
        let questionNumber = 3; // ISI DENGAN NOMOR PERTANYAAN!
        createChoices(scene, questionNumber);
        gameObjects.nextBtn = createNextButton(scene, 'KONFIRMASI', () => {
            console.log("Final answer: \n" + selections);
            if (checkAnswer(questionNumber) == true) {
                done("5",3)
                // Kalo jawaban bener, langsung load sequence selanjutnya
                loadSequence5(scene, sequence+1);
            } else {
                // Kalo jawaban salah, suruh tonton video dulu terus nanti bakal ke pertanyaan lagi
                destroyAllGameObjects();
                createMissionBackgroundObjects(scene, 'missionBackground');
                gameObjects.youtubePlayer = createYoutubeVideo(scene, youtubeId['problem']);
                gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
                    loadSequence5(scene, sequence-1);
                });
            }
        });
        
    }

    else if (sequence == 13) { // Sequence jawaban bener

        let text = "Bagus sekali, pilihan Anda benar."
        gameObjects.announcement = createAnnouncementText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence5(scene, sequence+1);
        }, middleX - 150, middleY + (missionBoxProps.height/2) - 100);
        gameObjects.exitBtn = createExitButton(scene, middleX+150, middleY + (missionBoxProps.height/2) - 100);
    }

    else if (sequence == 14) {
        start("5",4)
        let text = 'Dari persamaan kesetimbangan tersebut, dengan Ka = Kc, pilih persamaan yang tepat untuk [H+]';
        gameObjects.question = createDescText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence5(scene, sequence+1);
        });

    }

    else if (sequence == 15) { // Sequence milih jawaban
        let questionNumber = 4; // ISI DENGAN NOMOR PERTANYAAN!
        createChoices(scene, questionNumber);
        gameObjects.nextBtn = createNextButton(scene, 'KONFIRMASI', () => {
            console.log("Final answer: \n" + selections);
            if (checkAnswer(questionNumber) == true) {
                done("5",4)
                // Kalo jawaban bener, langsung load sequence selanjutnya
                loadSequence5(scene, sequence+1);
            } else {
                // Kalo jawaban salah, suruh tonton video dulu terus nanti bakal ke pertanyaan lagi
                destroyAllGameObjects();
                createMissionBackgroundObjects(scene, 'missionBackground');
                gameObjects.youtubePlayer = createYoutubeVideo(scene, youtubeId['problem']);
                gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
                    loadSequence5(scene, sequence-1);
                });
            }
        });
        
    }

    else if (sequence == 16) { // Sequence jawaban bener

        let text = "Bagus sekali, pilihan Anda benar."
        gameObjects.announcement = createAnnouncementText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence5(scene, sequence+1);
        }, middleX - 150, middleY + (missionBoxProps.height/2) - 100);
        gameObjects.exitBtn = createExitButton(scene, middleX+150, middleY + (missionBoxProps.height/2) - 100);
    }




    else if (sequence == 17) {
        start("5",5)
        let text = 'Dengan Ka = 1,07 x 10^-5 Hitunglah [H+] yang tepat sesuai persamaan sebelumnya';
        gameObjects.question = createDescText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence5(scene, sequence+1);
        });

    }

    else if (sequence == 18) { // Sequence milih jawaban
        let questionNumber = 5; // ISI DENGAN NOMOR PERTANYAAN!
        createChoices(scene, questionNumber);
        gameObjects.nextBtn = createNextButton(scene, 'KONFIRMASI', () => {
            console.log("Final answer: \n" + selections);
            if (checkAnswer(questionNumber) == true) {
                done("5",5)
                // Kalo jawaban bener, langsung load sequence selanjutnya
                loadSequence5(scene, sequence+1);
            } else {
                // Kalo jawaban salah, suruh tonton video dulu terus nanti bakal ke pertanyaan lagi
                destroyAllGameObjects();
                createMissionBackgroundObjects(scene, 'missionBackground');
                gameObjects.youtubePlayer = createYoutubeVideo(scene, youtubeId['problem']);
                gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
                    loadSequence5(scene, sequence-1);
                });
            }
        });
        
    }


    else if (sequence == 19) { // Sequence jawaban bener

        let text = "Bagus sekali, pilihan Anda benar."
        gameObjects.announcement = createAnnouncementText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence5(scene, sequence+1);
        }, middleX - 150, middleY + (missionBoxProps.height/2) - 100);
        gameObjects.exitBtn = createExitButton(scene, middleX+150, middleY + (missionBoxProps.height/2) - 100);
    }

    else if (sequence == 20) {
        start("5",6)
        let text = 'Nah… dari konsentrasi H+ yang sudah dihitung, pilih pH larutan yang tepat…';
        gameObjects.question = createDescText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence5(scene, sequence+1);
        });

    }

    else if (sequence == 21) { // Sequence milih jawaban
        let questionNumber = 6; // ISI DENGAN NOMOR PERTANYAAN!
        createChoices(scene, questionNumber);
        gameObjects.nextBtn = createNextButton(scene, 'KONFIRMASI', () => {
            console.log("Final answer: \n" + selections);
            if (checkAnswer(questionNumber) == true) {
                done("5",6)
                // Kalo jawaban bener, langsung load sequence selanjutnya
                loadSequence5(scene, sequence+1);
            } else {
                // Kalo jawaban salah, suruh tonton video dulu terus nanti bakal ke pertanyaan lagi
                destroyAllGameObjects();
                createMissionBackgroundObjects(scene, 'missionBackground');
                gameObjects.youtubePlayer = createYoutubeVideo(scene, youtubeId['problem']);
                gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
                    loadSequence5(scene, sequence-1);
                });
            }
        });
        
    }

    else if (sequence == 22) { // Sequence jawaban bener

        let text = "Bagus sekali, pilihan Anda benar."
        gameObjects.announcement = createAnnouncementText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence5(scene, sequence+1);
        }, middleX - 150, middleY + (missionBoxProps.height/2) - 100);
        gameObjects.exitBtn = createExitButton(scene, middleX+150, middleY + (missionBoxProps.height/2) - 100);
    }

    else if (sequence == 23) {
        start("5",7)
        let text = 'Setelah melewati permainan, dapat disimpulkan bahwa pH larutan penyangga tersebut dipengaruhi oleh';
        gameObjects.question = createDescText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence5(scene, sequence+1);
        });

    }

    else if (sequence == 24) { // Sequence milih jawaban
        let questionNumber = 7; // ISI DENGAN NOMOR PERTANYAAN!
        createChoices(scene, questionNumber);
        gameObjects.nextBtn = createNextButton(scene, 'KONFIRMASI', () => {
            console.log("Final answer: \n" + selections);
            if (checkAnswer(questionNumber) == true) {
                done("5",7)
                // Kalo jawaban bener, langsung load sequence selanjutnya
                loadSequence5(scene, sequence+1);
            } else {
                // Kalo jawaban salah, suruh tonton video dulu terus nanti bakal ke pertanyaan lagi
                destroyAllGameObjects();
                createMissionBackgroundObjects(scene, 'missionBackground');
                gameObjects.youtubePlayer = createYoutubeVideo(scene, youtubeId['problem']);
                gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
                    loadSequence5(scene, sequence-1);
                });
            }
        });
        
    }

    else if (sequence == 25) { // Sequence jawaban bener

        let text = "Bagus sekali, pilihan Anda benar."
        gameObjects.announcement = createAnnouncementText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence5(scene, sequence+1);
        }, middleX - 150, middleY + (missionBoxProps.height/2) - 100);
        gameObjects.exitBtn = createExitButton(scene, middleX+150, middleY + (missionBoxProps.height/2) - 100);
    }

    else if (sequence == 26) { // Sequence MISI SELESAI

        let text = "Selamat... Anda berhasil menyelesaikan misi V!!\n\n\
        Energi Anda dapat ditukarkan dengan pembakar yang dibutuhkan prof. Allison";
        gameObjects.missionDesc = createDescText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            scene.scene.start('MainMenu');
        }, middleX - 150, middleY + (missionBoxProps.height/2) - 100);
        gameObjects.exitBtn = createExitButton(scene, middleX+150, middleY + (missionBoxProps.height/2) - 100);

    } 
}

/*

function createExitButton3(scene, x, y) {
    let button = scene.add.text(x, y, 'KELUAR')
        .setOrigin(0.5)
        .setFontSize(30)
        // .setOrigin(10)
        .setPadding(12)
        .setStyle({ backgroundColor: '#000000', color: '#ffffff' })
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => button.setStyle({ color: '#0000ff' }))
        .on('pointerout', () => button.setStyle({ color: '#ffffff' }))
        .on('pointerdown', () => scene.scene.start('MainMenu'));
}


function createMissionBackgroundObjects(scene, imageName) {
    // bikin background image
    gameObjects.backgroundImage = createBackgroundImage3(scene, imageName);

    // bikin exit button
    gameObjects.exitBtn = createExitButton3(scene, 100, 50);

    // bikin kotak abu transparan
    gameObjects.missionBox = createMissionBox3(scene);
    missionBoxProps3 = {
        width: gameObjects.missionBox.width, 
        height: gameObjects.missionBox.height, 
        lowestX: middleX - (gameObjects.missionBox.width / 2), 
        lowestY: middleY - (gameObjects.missionBox.height / 2)
    };

    // console.log(missionBoxProps3);
}

function destroyAllGameObjects3() {
    let keys = Object.keys(gameObjects);
    // console.log("List of keys:");
    // console.log(keys);
    keys.forEach((key, index) => {
        // console.log("Destroying " + key);
        gameObjects[key].destroy();
        // delete gameObjects[key];
    });
}



function createChoices(scene, questionNumber) {
    // buat nyimpen si tombol pilihan jawaban
    choices3 = [];
    console.log("Choices Resetted!");
    // buat nyimpen tombol jawaban mana aja yg dipilih, contoh isinya nanti kayak [1,1,0,0,0]
    selections = new Array(choicesText[questionNumber].length).fill(0); 
    console.log("choicesText[questionNumber].length: " + choicesText[questionNumber].length);
    console.log("Selections resetted!");
    console.log("Current selections:\n" + selections);

    let deltaY = 80; // jarak antar masing-masing tombol jawaban
    
    for (let i = 0; i < choicesText[questionNumber].length; i++) {
        if( typeof choicesText[questionNumber][i] !== 'object'){
        // var choice = createChoiceButton(scene, middleX, descBoxTopY+150+(deltaY*i), choicesText[i]);
            let choice = createChoiceButton(scene, middleX, missionBoxProps.lowestY+150+(deltaY*i), choicesText[questionNumber][i], missionBoxProps);
            // console.log(choice);
            choices.push(choice);
            // choice.setVisible(false);
            choices[i].on('pointerdown', () => {
                if (selections[i] == 0) {
                    choices[i].setStyle({ backgroundColor: "#FFBF00" });
                    selections[i] = 1;
                } else if (selections[i] == 1) {
                    choices[i].setStyle({ backgroundColor: "#e6e6e6" });
                    selections[i] = 0;
                }
                console.log("You clicked choice " + i);
                console.log("Selections Updated!");
                console.log("Current selections:\n" + selections);
                // console.log(selections);
            });
            // var selections.append(0);
        }else{
            console.log(typeof choicesText[questionNumber][i])
        }
    }

    // Object.assign(state, {choices3: choices3, selections: selections});
}

function checkAnswer(questionNumber) {
    return arraysEqual(selections, correctAnswers[questionNumber]);
}

function showChoices3(choices3) {
    for (let i = 0; i < choices3.length; i++) {
        choices3[i].setVisible(true);
    }
}

function createDialog3(scene, dialogs, callback) {
    //awal mula text
    let content = dialogs[0];
    //penghitung baris keberapa
    let lineCounter = 1;
    // console.log(content);
    gameObjects.textBox = createTextBox3(scene, middleX, middleY + 200, {
        wrapWidth: 900,
        fixedWidth: 900,
        fixedHeight: 250,
    })
    .start(content, 50); // yang integer tuh speed muncul speednya

    // console.log(gameObjects.textBox);

    // gameObjects.exitBtn  = createExitButton3(scene, 50, 50);

    let isDialogScene = true;
    
    scene.input.on('pointerdown', () => {

        if (isDialogScene) {

            //kalo lg typing, beresin dlu (munculin smua)

            if (gameObjects.textBox.isTyping) {
                gameObjects.textBox.stop(true);
                console.log('lagi ngetik: ' + gameObjects.textBox.isTyping);

                //ngatur panah next
                let nextIcon = gameObjects.textBox.getElement('action').setVisible(true);
                gameObjects.textBox.resetChildVisibleState(nextIcon);

            }
            //kalo ga lagi typing, gas ae masbro
            else {
                // KALO PENGEN SKIP DIALOG, Isi global variable mode dengan 'misi'
                // Nanti program bakal munculin dialog pertama doang terus jalanin callback
                if (mode == 'misi') {
                    callback();
                    isDialogScene = false;
                }

                //ngatur panah next
                let nextIcon = gameObjects.textBox.getElement('action').setVisible(false);
                gameObjects.textBox.resetChildVisibleState(nextIcon);

                //cek page terakhir
                //kalo udah halaman terakhir dari current line, bakal next line
                //soalnya kalo panjang, bakal displit per berapa halaman tergantung maxLine
                if (gameObjects.textBox.isLastPage) {
                    console.log('akhir page');
                    console.log(lineCounter);
        
                    //pergantian line
                    if (lineCounter < dialogs.length) {
                        content = dialogs[lineCounter];
                        // console.log('next line: ' + content); 
                        lineCounter += 1;
            
                        gameObjects.textBox.start(content);
                    }

                    // kalo udah dialog paling terakhir bakal ngejalanin perintah callback
                    if(lineCounter >= dialogs.length) {
                        callback();
                        isDialogScene = false;
                    }
                }
                else {
                    console.log('bukan akhir page cuy');
                    gameObjects.textBox.typeNextPage();
                }
            }
        }
        // console.log('clicked!');
    }, scene);
}

function createTextBox3(scene, x, y, config) {
    // var wrapWidth = GetValue(config, 'wrapWidth', 0);
    // var fixedWidth = GetValue(config, 'fixedWidth', 0);
    // var fixedHeight = GetValue(config, 'fixedHeight', 0);

    var wrapWidth = config.wrapWidth;
    var fixedWidth = config.fixedWidth;
    var fixedHeight = config.fixedHeight;
    var textBox = scene.rexUI.add.textBox({
            x: x,
            y: y,

            background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY)
                .setStrokeStyle(2, COLOR_LIGHT),

            icon: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_DARK),

            // text: getBuiltInText3(scene, wrapWidth, fixedWidth, fixedHeight),
            text: getBBcodeText3(scene, wrapWidth, fixedWidth, fixedHeight),

            action: scene.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false),

            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
                icon: 10,
                text: 10,
            }
        })
        .setOrigin(0.5)
        .layout();

    //kayanya gaperlu dicek dari funct  ion textboxtnya doang.
    //harus dicek nanti kalo ada pop up video, input downnya, ngaco ga WKWKWKKW
    //sementara diatur dari input left mouse click
    // textBox
    //     .setInteractive()
    //     .on('pointerdown', function () {
    //         var icon = this.getElement('action').setVisible(false);
    //         this.resetChildVisibleState(icon);
    //         if (this.isTyping) {
    //             this.stop(true);
    //         } else {
    //             this.typeNextPage();
    //         }
    //     }, textBox)
    //     .on('pageend', function () {
    //         if (this.isLastPage) {
    //             return;
    //         }

    //         var icon = this.getElement('action').setVisible(true);
    //         this.resetChildVisibleState(icon);
    //         icon.y -= 30;
    //         var tween = scene.tweens.add({
    //             targets: icon,
    //             y: '+=30', // '+=100'
    //             ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
    //             duration: 500,
    //             repeat: 0, // -1: infinity
    //             yoyo: false
    //         });
    //     }, textBox)
    //.on('type', function () {
    //})

    return textBox;
}

function getBuiltInText3(scene, wrapWidth, fixedWidth, fixedHeight) {
    return scene.add.text(0, 0, '', {
            fontSize: '20px',
            wordWrap: {
                width: wrapWidth
            },
            //max line dalam sekali textbox
            maxLines: 10
        })
        .setFixedSize(fixedWidth, fixedHeight);
}

function getBBcodeText3(scene, wrapWidth, fixedWidth, fixedHeight) {
    return scene.rexUI.add.BBCodeText(0, 0, '', {
        fixedWidth: fixedWidth,
        fixedHeight: fixedHeight,

        fontSize: '20px',
        wrap: {
            mode: 'word',
            width: wrapWidth-100
        },
        //max line dalam sekali textbox
        maxLines: 10
    })
}

function createBackgroundImage3(scene, imageName) {
    console.log(middleX);
    console.log(middleY);
    console.log(imageName);

    let backgroundImage = scene.add.image(middleX, middleY, imageName);
    let scaleX = scene.cameras.main.width / backgroundImage.width;
    let scaleY = scene.cameras.main.height / backgroundImage.height;
    let scale = Math.max(scaleX, scaleY);
    backgroundImage.setScale(scale).setScrollFactor(0);

    return backgroundImage;
}

function createMissionBox3(scene) {
    let grayRectangle = scene.add.rectangle(
        scene.cameras.main.width / 2, 
        scene.cameras.main.height / 2, 
        scene.cameras.main.width / 2, 
        scene.cameras.main.height * 3 / 4, 
        0x000000, 
        0.7
    );

    return grayRectangle;
}

function createDescText(scene, text, x = middleX-missionBoxProps3.lowestX+50, y = missionBoxProps3.lowestY+100) {
    let t = scene.add.rexBBCodeText(x, y, text, {
        fontSize: '30px',
        align: 'left',
        wrap: {
            mode: 'word',
            width: gameObjects.missionBox.width-100
        },
    });

    return t;
}

function createNextButton(
        scene, 
        label, 
        callback, 
        x = middleX, 
        y = middleY+(missionBoxProps3.height/2)-50
    ) {
    let button = scene.add.text(x, y, label)
        .setOrigin(0.5)
        .setFontSize('30px')
        .setPadding(12)
        .setStyle({ backgroundColor: '#e6e6e6', color: '#000000' })
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => button.setStyle({ color: '#0000ff' }))
        .on('pointerout', () => button.setStyle({ color: '#000000' }))
        .on('pointerdown', () => callback());

    return button;
}

function createExitButton3(scene, x, y) {
    let button = scene.add.text(x, y, 'KELUAR')
        .setOrigin(0.5)
        .setFontSize(30)
        // .setOrigin(10)
        .setPadding(12)
        .setStyle({ backgroundColor: '#000000', color: '#ffffff' })
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => button.setStyle({ color: '#0000ff' }))
        .on('pointerout', () => button.setStyle({ color: '#ffffff' }))
        .on('pointerdown', () => scene.scene.start('MainMenu'));

    return button;
}

function createChoiceButton3(scene, x, y, label, container) {
    var button = scene.add.rexBBCodeText({
        x: x,
        y: y,
        text: label,
        style: {
            fontSize: '25px',
            backgroundColor: '#e6e6e6',
            color: '#000000',
            backgroundCornerRadius: 20,
            halign: 'center',
            valign: 'center',
            padding: {
                left: 15,
                right: 15,
                top: 12,
                bottom: 12,
            },
            wrap: {
                mode: 'word',
                width: container.width - 50
            }
        } 
    })
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerover', () => {button.setStyle({ color: '#0000ff' })})
    .on('pointerout', () => button.setStyle({ color: '#000000' }));

    return button;
}

function createAnnouncementText3(scene, text) {
    let t = scene.add.text(middleX, middleY, text)
        .setOrigin(0.5)
        .setFontSize('30px');

    console.log("Ini t: ");
    console.log(t);

    return t;
}

function arraysEqual3(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
}

*/
