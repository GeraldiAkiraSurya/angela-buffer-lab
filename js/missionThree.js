missionThree = new Phaser.Scene('Misi3');

missionThree.preload = function () {
    this.load.path = './assets/';
    this.load.image('menuBackground', 'scenes/science_lab.jpg');
    this.load.image('missionBackground', 'scenes/lab_desk.jpg')
    this.load.image('textBoxBackground', 'scenes/textbox_background.png');
    this.load.image('beaker', 'lab_eq/Beaker.png');

    //pluginsnya pindahin ke game?

    this.load.scenePlugin({
        key: 'rexuiplugin',
        url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
        sceneKey: 'rexUI'
    });
    this.load.plugin('rexyoutubeplayerplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexyoutubeplayerplugin.min.js', true);
    this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);

    this.load.image('nextPage', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png');


}

// GLOBAL VARIABLE pada file ini

let youtubeId3 = {
    intro: 'qz1XzCmdHAg',
    problem: 'vTP3BGnawU4',
};

let choicesText3;
let correctAnswers3;


missionThree.create = function() {

    canvasWidth = game.canvas.width;
    canvasHeight = game.canvas.height;
    middleX = this.cameras.main.width / 2;
    middleY = this.cameras.main.height / 2;


/**
 * Isi variable choicesText3 dengan pilihan-pilihan jawaban untuk suatu soal.
 * Key pada choicesText3 adalah nomor pertanyaan, dan value nya merupakan array yang berisi text-text pilihan jawaban.
 * 
 * Isi variable correctAnswer dengan jawaban yang benar untuk pertanyaan pada nomor sekian.
 */

choicesText3 = {
    1: [
        "pH pada semua system/ campuran berubah drastis",
        "campuran 20 mL CH3COOH 0,1 M + 10 mL NaOH 0,1 M tidak mengalami perubahan pH",
        "campuran 15 mL CH3COOH 0,1 + 15 mL NaOH 0,1 M tidak mengalami perubahan pH",
        "campuran 10 mL CH3COOH 0,1 M + 20 mL NaOH 0,1 M mengalami perubahan pH yang drastis",
        "campuran 15 mL HCl 0,1 M + 15 mL NaOH 0,1 M tidak mengalami perubahan pH",
        beaker = this.add.image(200, 200 , 'beaker').setInteractive().setScale(0.5)
    ],
    2: [
        "20 mL CH3COOH 0,1 M + 10 mL NaOH 0,1 M ",
        "15 mL HCl 0,1 M + 15 mL NaCl 0,1 M",
        "10 mL CH3COOH 0,1 M + 20 mL NaOH 0,1 M ",
        "15 mL HCl 0,1 M + 15 mL NaOH 0,1 M "
    ],
    3: [
        "CH3COOH(aq) + NaOH(aq) → CH3COONa(aq) + H2O(l) ",
        "CH3COO-(aq) + Na+(aq) → CH3COONa(aq)",
        "H+(aq) + OH-(aq) →  H2O(l)"
    ],
    4: [
        "CH3COOH",
        "NaOH"
    ],
    5: [
        "CH3COOH",
        "H2O",
        "CH3COO-",
        "H+",
        "OH-",
        "Na+",
        "NaOH",
        "CH3COONa",
        "H2",
        "O2 "
    ],
    6: [
        "CH3COOH dengan CH3COO-",
        "CH3COOH saja",
        "CH3COONa saja",
        "CH3COO- dengan H+",
        "CH3COONa dengan Na+"
    ],
    7: [
        "karena setelah bereaksi terdapat sisa asam lemah dengan produk basa konjugasinya",
        "karena setelah bereaksi terdapat sisa basa lemah dengan produk asam konjugasinya",
        "karena setelah bereaksi terdapat sisa basa kuat dengan produk garam dan air",
        "karena setelah bereaksi terdapat sisa basa kuat dengan produk asam konjugasinya",
        "karena setelah bereaksi terdapat sisa asam kuat dengan produk basa konjugasinya"
    ],
};

correctAnswers3 = {
    1: [0,1,0,1,0,0],
    2: [1,0,0,0],
    3: [1,0,0],
    4: [1,0,0],
    5: [1,1,1,1,1,1,0,0,0,0],
    6: [1,0,0,0,0],
    7: [1,0,0,0,0]

};






    loadSequence(this,  0);
}

missionThree.update = function() {
    
}

function loadSequence(scene, sequence) {
    console.log("Start sequence " + sequence);

    console.log(gameObjects);
    destroyAllGameObjects();
    createMissionBackgroundObjects(scene, 'missionBackground');

    if (sequence == 0) { // Sequence dialog
        destroyAllGameObjects();
        gameObjects.backgroundImage = createBackgroundImage(scene, 'menuBackground');
        let dialogs = [
            "Allison adalah seorang profesor yang ditugaskan di Laboratorium X untuk mencari obat dari penyakit yang tidak diketahui asal-usulnya.",
            `Untuk itu Prof. Allison bekerjasama dengan ilmuan kimia ${playerName} untuk melakukan penelitian untuk mengumpulkan ramuan obat yang sedang dicari.`,
            "Seluruh ramuan obat dapat dikumpulkan setelah ilmuan kimia menyelesaikan tantangan pada setiap misi.",
            `Prof. Allison: ${playerName}, Anda harus mengambil buku ramuan obat yang tertinggal di laboratorium pusat.`,
            `${playerName}: Siap meluncur prof...`,
            "Prof. Allison: Sebelum berangkat Anda harus menyelesaikan tantangan di laboratorium X, tiap tantangan yang dilewati akan menambah energi Anda untuk memperoleh buku ramuan obat...",
            `${playerName}: Penemuan ini akan menjadi gebrakan hebat di dunia penelitian...`,
            "Prof. Allison: Semoga berhasil!!!"
        ];
        createDialog(scene, dialogs, () => {loadSequence(scene, 1)});
    } else if (sequence == 1) { // Sequence yang muncul prompt mau lanjut atau tidak
        // destroyAllGameObjects();
        createMissionBackgroundObjects(scene, 'menuBackground');
        gameObjects.missionBox.setSize(scene.cameras.main.width * 3 / 4, scene.cameras.main.height * 3 / 4);
        let text = "Anda dapat memulai penelitian di laboratorium X!";
        gameObjects.announcement = createAnnouncementText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence(scene, sequence+1);
        }, middleX - 150, middleY + (missionBoxProps.height/2) - 100);
        gameObjects.exitBtn = createExitButton(scene, middleX+150, middleY + (missionBoxProps.height/2) - 100);

    } else if (sequence == 2) { // Sequence deskripsi misi

        gameObjects.title = scene.add.text(middleX, missionBoxProps.lowestY + 50, "MISI I")
            .setOrigin(0.5)
            .setFontSize(40);
        let text = "[b]SYARAT PENYELESAIAN KHUSUS:[/b] AMATILAH VIDEO DENGAN SEKSAMA DAN PILIHLAH JAWABAN YANG BENAR DARI PERTANYAAN YANG DIBERIKAN\n\n\
[b]BATAS WAKTU:[/b] TIDAK ADA\n\n\
[b]HADIAH:[/b] ENERGI DAN BUKU RAMUAN OBAT\n\n\
[b]JIKA GAGAL:[/b] KEMBALI KE AWAL\n";
        gameObjects.missionDesc = createDescText(scene, text);

        // Button untuk load sequence selanjutnya
        gameObjects.nextBtn = createNextButton(scene, 'TERIMA', () => {
            loadSequence(scene, sequence+1);
        });

    } else if (sequence == 3) { // Sequence youtube vid

        gameObjects.youtubePlayer = createYoutubeVideo(scene, youtubeId3['intro']);
        // Button untuk load sequence selanjutnya
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence(scene, sequence+1);
        });

    } else if (sequence == 4) { // Sequence youtube vid

        gameObjects.youtubePlayer = createYoutubeVideo(scene, youtubeId3['problem']);
        // Button untuk load sequence selanjutnya
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence(scene, sequence+1);
        });

    } else if (sequence == 5) { // Sequence soal pertanyaan SOAL 1
        start("3",1)
        let text = 'Berdasarkan tayangan video tersebut, coba bandingkan perubahan pH pada sistem 1 sampai 4 sebelum dan sesudah ditambah sedikit asam maupun basa. Manakah pernyataan yang benar?';
        gameObjects.question = createDescText(scene, text);
        // Button untuk load sequence selanjutnya
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence(scene, sequence+1);
        });

    } else if (sequence == 6) { // Sequence milih jawaban

        let questionNumber = 1; // ISI DENGAN NOMOR PERTANYAAN!
        createChoices(scene, questionNumber);
        gameObjects.nextBtn = createNextButton(scene, 'KONFIRMASI', () => {
            console.log("Final answer: \n" + selections);
            if (checkAnswer(questionNumber) == true) {
                done("3",1)
                // Kalo jawaban bener, langsung load sequence selanjutnya
                loadSequence(scene, sequence+1);
            } else {
                // Kalo jawaban salah, suruh tonton video dulu terus nanti bakal ke pertanyaan lagi
                destroyAllGameObjects();
                createMissionBackgroundObjects(scene, 'missionBackground');
                gameObjects.youtubePlayer = createYoutubeVideo(scene, youtubeId3['problem']);
                gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
                    loadSequence(scene, sequence-1);
                });
            }
        });
        
    } else if (sequence == 7) { // Sequence jawaban bener

        let text = "Bagus sekali, pilihan Anda benar.";
        gameObjects.announcement = createAnnouncementText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence(scene, sequence+1);
        }, middleX - 150, middleY + (missionBoxProps.height/2) - 100);
        gameObjects.exitBtn = createExitButton(scene, middleX+150, middleY + (missionBoxProps.height/2) - 100);

    } else if (sequence == 8) { // Sequence pertanyaan
        start("3",2)
        let text = 'Dari pengukuran pH pada video, maka yang merupakan larutan penyangga adalah';
        gameObjects.question = createDescText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence(scene, sequence+1);
        });

    } else if (sequence == 9) { // Sequence milih jawaban

        let questionNumber = 2; // ISI DENGAN NOMOR PERTANYAAN!
        createChoices(scene, questionNumber);
        gameObjects.nextBtn = createNextButton(scene, 'KONFIRMASI', () => {
            console.log("Final answer: \n" + selections);
            if (checkAnswer(questionNumber) == true) {
                done("3",2)
                loadSequence(scene, sequence+1);
            } else {
                // Kalo jawaban salah, suruh tonton video dulu terus nanti bakal ke pertanyaan lagi
                destroyAllGameObjects();
                createMissionBackgroundObjects(scene, 'missionBackground');
                gameObjects.youtubePlayer = createYoutubeVideo(scene, youtubeId3['problem']);
                gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
                    loadSequence(sequence-1);
                });
            }
        });

    } else if (sequence == 10) { // Sequence jawaban bener

        let text = "Bagus sekali, pilihan Anda benar."
        gameObjects.announcement = createAnnouncementText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence(scene, sequence+1);
        }, middleX - 150, middleY + (missionBoxProps.height/2) - 100);
        gameObjects.exitBtn = createExitButton(scene, middleX+150, middleY + (missionBoxProps.height/2) - 100);

    } else if (sequence == 11) {
        start("3",3)
        let text = 'Nah... coba tentukan reaksi yang terjadi dalam larutan penyangga tesebut, yaitu: 20 mL asam asetat 0,1 M dengan 10 mL natrium hidroksida 0,1 M ';
        gameObjects.question = createDescText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence(scene, sequence+1);
        });

    }

    else if (sequence == 12) { // Sequence milih jawaban
        let questionNumber = 3; // ISI DENGAN NOMOR PERTANYAAN!
        createChoices(scene, questionNumber);
        gameObjects.nextBtn = createNextButton(scene, 'KONFIRMASI', () => {
            console.log("Final answer: \n" + selections);
            if (checkAnswer(questionNumber) == true) {
                done("3",questionNumber)
                // Kalo jawaban bener, langsung load sequence selanjutnya
                loadSequence(scene, sequence+1);
            } else {
                // Kalo jawaban salah, suruh tonton video dulu terus nanti bakal ke pertanyaan lagi
                destroyAllGameObjects();
                createMissionBackgroundObjects(scene, 'missionBackground');
                gameObjects.youtubePlayer = createYoutubeVideo(scene, youtubeId3['problem']);
                gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
                    loadSequence(scene, sequence-1);
                });
            }
        });
        
    }

    else if (sequence == 13) {
        start("3",4)
        let text = 'Dari reaksi asam basa yang terjadi, tentukan reaktan yang habis bereaksi';
        gameObjects.question = createDescText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence(scene, sequence+1);
        });

    }

    else if (sequence == 14) { // Sequence milih jawaban
        let questionNumber = 4; // ISI DENGAN NOMOR PERTANYAAN!
        createChoices(scene, questionNumber);
        gameObjects.nextBtn = createNextButton(scene, 'KONFIRMASI', () => {
            console.log("Final answer: \n" + selections);
            if (checkAnswer(questionNumber) == true) {
                done("3",questionNumber)
                // Kalo jawaban bener, langsung load sequence selanjutnya
                loadSequence(scene, sequence+1);
            } else {
                // Kalo jawaban salah, suruh tonton video dulu terus nanti bakal ke pertanyaan lagi
                destroyAllGameObjects();
                createMissionBackgroundObjects(scene, 'missionBackground');
                gameObjects.youtubePlayer = createYoutubeVideo(scene, youtubeId3['problem']);
                gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
                    loadSequence(scene, sequence-1);
                });
            }
        });
        
    }


    else if (sequence == 15) {
        start("3",5)
        let text = 'Nah…sekarang pilih spesi yang terdapat dalam larutan setelah terjadi reaksi';
        gameObjects.question = createDescText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence(scene, sequence+1);
        });

    }

    else if (sequence == 16) { // Sequence milih jawaban
        let questionNumber = 5; // ISI DENGAN NOMOR PERTANYAAN!
        createChoices(scene, questionNumber);
        gameObjects.nextBtn = createNextButton(scene, 'KONFIRMASI', () => {
            console.log("Final answer: \n" + selections);
            if (checkAnswer(questionNumber) == true) {
                done("3",questionNumber)
                // Kalo jawaban bener, langsung load sequence selanjutnya
                loadSequence(scene, sequence+1);
            } else {
                // Kalo jawaban salah, suruh tonton video dulu terus nanti bakal ke pertanyaan lagi
                destroyAllGameObjects();
                createMissionBackgroundObjects(scene, 'missionBackground');
                gameObjects.youtubePlayer = createYoutubeVideo(scene, youtubeId3['problem']);
                gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
                    loadSequence(scene, sequence-1);
                });
            }
        });
        
    }

    else if (sequence == 17) {
        start("3",5)
        let text = 'spesi yang terdapat dalam larutan setelah terjadi reaksi ke dalam gelas kimia kosong';
        gameObjects.question = createDescText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence(scene, sequence+1);
        });

    }

    else if (sequence == 18) { // Sequence milih jawaban
        let questionNumber = 5; // ISI DENGAN NOMOR PERTANYAAN!
        createChoices(scene, questionNumber);
        gameObjects.nextBtn = createNextButton(scene, 'KONFIRMASI', () => {
            console.log("Final answer: \n" + selections);
            if (checkAnswer(questionNumber) == true) {
                done("3",questionNumber)
                // Kalo jawaban bener, langsung load sequence selanjutnya
                loadSequence(scene, sequence+1);
            } else {
                // Kalo jawaban salah, suruh tonton video dulu terus nanti bakal ke pertanyaan lagi
                destroyAllGameObjects();
                createMissionBackgroundObjects(scene, 'missionBackground');
                gameObjects.youtubePlayer = createYoutubeVideo(scene, youtubeId3['problem']);
                gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
                    loadSequence(scene, sequence-1);
                });
            }
        });
        
    }

    else if (sequence == 19) {
        start("3",6)
        let text = 'Pilih komponen penyangga yang terdapat dalam campuran';
        gameObjects.question = createDescText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence(scene, sequence+1);
        });

    }

    else if (sequence == 20) { // Sequence milih jawaban
        let questionNumber = 6; // ISI DENGAN NOMOR PERTANYAAN!
        createChoices(scene, questionNumber);
        gameObjects.nextBtn = createNextButton(scene, 'KONFIRMASI', () => {
            console.log("Final answer: \n" + selections);
            if (checkAnswer(questionNumber) == true) {
                done("3",questionNumber)
                // Kalo jawaban bener, langsung load sequence selanjutnya
                loadSequence(scene, sequence+1);
            } else {
                // Kalo jawaban salah, suruh tonton video dulu terus nanti bakal ke pertanyaan lagi
                destroyAllGameObjects();
                createMissionBackgroundObjects(scene, 'missionBackground');
                gameObjects.youtubePlayer = createYoutubeVideo(scene, youtubeId3['problem']);
                gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
                    loadSequence(scene, sequence-1);
                });
            }
        });
        
    }

    else if (sequence == 21) {
        start("3",7)
        let text = 'Setelah melewati permainan, tentukan alasan mengapa campuran 20 mL CH3COOH 0,1 M + 10 mL NaOH 0,1 M dapat menyangga pH setelah penambahan sedikit asam/ basa, sedangkan campuran yang lainnya tidak… ';
        gameObjects.question = createDescText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence(scene, sequence+1);
        });

    }

    else if (sequence == 22) { // Sequence milih jawaban
        let questionNumber = 7; // ISI DENGAN NOMOR PERTANYAAN!
        createChoices(scene, questionNumber);
        gameObjects.nextBtn = createNextButton(scene, 'KONFIRMASI', () => {
            console.log("Final answer: \n" + selections);
            if (checkAnswer(questionNumber) == true) {
                done("3",questionNumber)
                // Kalo jawaban bener, langsung load sequence selanjutnya
                loadSequence(scene, sequence+1);
            } else {
                // Kalo jawaban salah, suruh tonton video dulu terus nanti bakal ke pertanyaan lagi
                destroyAllGameObjects();
                createMissionBackgroundObjects(scene, 'missionBackground');
                gameObjects.youtubePlayer = createYoutubeVideo(scene, youtubeId3['problem']);
                gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
                    loadSequence(scene, sequence-1);
                });
            }
        });
        
    }






}

function createMissionBackgroundObjects(scene, imageName) {
    // bikin background image
    gameObjects.backgroundImage = createBackgroundImage(scene, imageName);

    // bikin exit button
    gameObjects.exitBtn = createExitButton(scene, 100, 50);

    // bikin kotak abu transparan
    gameObjects.missionBox = createMissionBox(scene);
    missionBoxProps = {
        width: gameObjects.missionBox.width, 
        height: gameObjects.missionBox.height, 
        lowestX: middleX - (gameObjects.missionBox.width / 2), 
        lowestY: middleY - (gameObjects.missionBox.height / 2)
    };

    // console.log(missionBoxProps);
}

function destroyAllGameObjects() {
    let keys = Object.keys(gameObjects);
    // console.log("List of keys:");
    // console.log(keys);
    keys.forEach((key, index) => {
        // console.log("Destroying " + key);
        gameObjects[key].destroy();
        // delete gameObjects[key];
    });
}

function createYoutubeVideo(scene, videoId) {
    return scene.add.rexYoutubePlayer(middleX, middleY, 600, 450, {
        videoId: videoId,
        autoPlay: false
    });
}

function createChoices(scene, questionNumber) {
    // buat nyimpen si tombol pilihan jawaban
    choices = [];
    console.log("Choices Resetted!");
    // buat nyimpen tombol jawaban mana aja yg dipilih, contoh isinya nanti kayak [1,1,0,0,0]
    selections = new Array(choicesText3[questionNumber].length).fill(0); 
    console.log("choicesText3[questionNumber].length: " + choicesText3[questionNumber].length);
    console.log("Selections resetted!");
    console.log("Current selections:\n" + selections);

    let deltaY = 80; // jarak antar masing-masing tombol jawaban
    
    for (let i = 0; i < choicesText3[questionNumber].length; i++) {
        if( typeof choicesText3[questionNumber][i] !== 'object'){
        // var choice = createChoiceButton(scene, middleX, descBoxTopY+150+(deltaY*i), choicesText3[i]);
            let choice = createChoiceButton(scene, middleX, missionBoxProps.lowestY+150+(deltaY*i), choicesText3[questionNumber][i], missionBoxProps);
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
            console.log(typeof choicesText3[questionNumber][i])
        }
    }

    // Object.assign(state, {choices: choices, selections: selections});
}

function checkAnswer(questionNumber) {
    return arraysEqual(selections, correctAnswers3[questionNumber]);
}

function showChoices(choices) {
    for (let i = 0; i < choices.length; i++) {
        choices[i].setVisible(true);
    }
}

function createDialog(scene, dialogs, callback) {
    //awal mula text
    let content = dialogs[0];
    //penghitung baris keberapa
    let lineCounter = 1;
    // console.log(content);
    gameObjects.textBox = createTextBox(scene, middleX, middleY + 200, {
        wrapWidth: 900,
        fixedWidth: 900,
        fixedHeight: 250,
    })
    .start(content, 50); // yang integer tuh speed muncul speednya

    // console.log(gameObjects.textBox);

    // gameObjects.exitBtn  = createExitButton(scene, 50, 50);

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

function createTextBox(scene, x, y, config) {
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

            // text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
            text: getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight),

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

function getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight) {
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

function getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight) {
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

function createBackgroundImage(scene, imageName) {
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

function createMissionBox(scene) {
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

function createDescText(scene, text, x = middleX-missionBoxProps.lowestX+50, y = missionBoxProps.lowestY+100) {
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
        y = middleY+(missionBoxProps.height/2)-50
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

function createExitButton(scene, x, y) {
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

function createChoiceButton(scene, x, y, label, container) {
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

function createAnnouncementText(scene, text) {
    let t = scene.add.text(middleX, middleY, text)
        .setOrigin(0.5)
        .setFontSize('30px');

    console.log("Ini t: ");
    console.log(t);

    return t;
}

function arraysEqual(a, b) {
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