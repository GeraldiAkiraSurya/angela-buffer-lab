missionThree = new Phaser.Scene('Misi3');

missionThree.preload = function () {
    this.load.path = './assets/';
    this.load.image('menuBackground', 'scenes/science_lab.jpg');
    this.load.image('missionBackground', 'scenes/lab_desk.jpg')


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

missionThree.create = function() {
    middleX = this.cameras.main.width / 2;
    middleY = this.cameras.main.height / 2;

    youtubeId = {
        intro: 'qz1XzCmdHAg',
        problem: 'vTP3BGnawU4',
    };

    /**
     * Isi variable choicesText dengan pilihan-pilihan jawaban untuk suatu soal.
     * Key pada choicesText adalah nomor pertanyaan, dan value nya merupakan array yang berisi text-text pilihan jawaban.
     * 
     * Isi variable correctAnswer dengan jawaban yang benar untuk pertanyaan pada nomor sekian.
     */

    choicesText = {
        1: [
            "pH pada semua system/ campuran berubah drastis",
            "campuran 20 mL CH3COOH 0,1 M + 10 mL NaOH 0,1 M tidak mengalami perubahan pH",
            "campuran 15 mL CH3COOH 0,1 + 15 mL NaOH 0,1 M tidak mengalami perubahan pH",
            "campuran 10 mL CH3COOH 0,1 M + 20 mL NaOH 0,1 M mengalami perubahan pH yang drastis",
            "campuran 15 mL HCl 0,1 M + 15 mL NaOH 0,1 M tidak mengalami perubahan pH"
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

    correctAnswers = {
        1: [0,1,0,1,0],
        2: [1,0,0,0],
        3: [1,0,0],
        4: [1,0,0],
        5: [1,1,1,1,1,1,0,0,0,0],
        6: [1,0,0,0,0],
        7: [1,0,0,0,0]

    };

    loadSequence3(this,  0);
}

missionThree.update = function() {
    
}

function loadSequence3(scene, sequence) {
    console.log("Start sequence " + sequence);

    console.log(gameObjects3);
    destroyAllGameObjects3();
    createMissionBackgroundObjects3 (scene3, 'missionBackground');

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
        createDialog(scene, dialogs, () => {loadSequence3(scene, 1)});
    } else if (sequence == 1) { // Sequence yang muncul prompt mau lanjut atau tidak
        // destroyAllGameObjects3();
        createMissionBackgroundObjects3 (scene3, 'menuBackground');
        gameObjects3.missionBox.setSize(scene3.cameras.main.width * 3 / 4, scene3.cameras.main.height * 3 / 4);
        let text = "Anda dapat memulai penelitian di laboratorium X!";
        gameObjects.announcement = createAnnouncementText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence3(scene, sequence+1);
        }, middleX - 150, middleY + (missionBoxProps.height/2) - 100);
        gameObjects.exitBtn = createExitButton(scene, middleX+150, middleY + (missionBoxProps.height/2) - 100);

    } else if (sequence == 2) { // Sequence deskripsi misi

        gameObjects.title = scene.add.text(middleX, missionBoxProps.lowestY + 50, "MISI III")
            .setOrigin(0.5)
            .setFontSize(40);
        let text = "[b]SYARAT PENYELESAIAN KHUSUS:[/b] AMATILAH VIDEO DENGAN SEKSAMA DAN PILIHLAH JAWABAN YANG BENAR DARI PERTANYAAN YANG DIBERIKAN\n\n\
[b]BATAS WAKTU:[/b] TIDAK ADA\n\n\
[b]HADIAH:[/b] ENERGI DAN BUKU RAMUAN OBAT\n\n\
[b]JIKA GAGAL:[/b] KEMBALI KE AWAL\n";
        gameObjects3.missionDesc = createDescText3(scene3, text);

        // Button untuk load sequence selanjutnya
        gameObjects.nextBtn = createNextButton(scene, 'TERIMA', () => {
            loadSequence3(scene, sequence+1);
        });

    } else if (sequence == 3) { // Sequence youtube vid

        gameObjects.youtubePlayer = createYoutubeVideo(scene, youtubeId['intro']);
        // Button untuk load sequence selanjutnya
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence3(scene, sequence+1);
        });

    } else if (sequence == 4) { // Sequence youtube vid

        gameObjects.youtubePlayer = createYoutubeVideo(scene, youtubeId['problem']);
        // Button untuk load sequence selanjutnya
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence3(scene, sequence+1);
        });

    } else if (sequence == 5) { // Sequence soal pertanyaan SOAL 1
        start("3",1)
        let text = 'Berdasarkan tayangan video tersebut, coba bandingkan perubahan pH pada sistem 1 sampai 4 sebelum dan sesudah ditambah sedikit asam maupun basa. Manakah pernyataan yang benar?';
        gameObjects3.question = createDescText3(scene3, text);
        // Button untuk load sequence selanjutnya
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence3(scene, sequence+1);
        });

    } else if (sequence == 6) { // Sequence milih jawaban

        let questionNumber = 1; // ISI DENGAN NOMOR PERTANYAAN!
        createChoices3(scene3, questionNumber);
        gameObjects3.nextBtn = createNextButton3(scene3, 'KONFIRMASI', () => {
            console.log("Final answer: \n" + selections3);
            if (checkAnswer3(questionNumber) == true) {
                done("3",1)
                // Kalo jawaban bener, langsung load sequence selanjutnya
                loadSequence3(scene, sequence+1);
            } else {
                // Kalo jawaban salah, suruh tonton video dulu terus nanti bakal ke pertanyaan lagi
                destroyAllGameObjects();
                createMissionBackgroundObjects(scene, 'missionBackground');
                gameObjects.youtubePlayer = createYoutubeVideo(scene, youtubeId['problem']);
                gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
                    loadSequence3(scene, sequence-1);
                });
            }
        });
        
    } else if (sequence == 7) { // Sequence jawaban bener

        let text = "Bagus sekali, pilihan Anda benar.";
        gameObjects.announcement = createAnnouncementText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence3(scene, sequence+1);
        }, middleX - 150, middleY + (missionBoxProps.height/2) - 100);
        gameObjects.exitBtn = createExitButton(scene, middleX+150, middleY + (missionBoxProps.height/2) - 100);

    } else if (sequence == 8) { // Sequence pertanyaan
        start("3",2)
        let text = 'Dari pengukuran pH pada video, maka yang merupakan larutan penyangga adalah';
        gameObjects.question = createDescText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence3(scene, sequence+1);
        });

    } else if (sequence == 9) { // Sequence milih jawaban

        let questionNumber = 2; // ISI DENGAN NOMOR PERTANYAAN!
        createChoices3(scene3, questionNumber);
        gameObjects3.nextBtn = createNextButton3(scene3, 'KONFIRMASI', () => {
            console.log("Final answer: \n" + selections3);
            if (checkAnswer3(questionNumber) == true) {
                done("3",2)
                loadSequence3(scene, sequence+1);
            } else {
                // Kalo jawaban salah, suruh tonton video dulu terus nanti bakal ke pertanyaan lagi
                destroyAllGameObjects();
                createMissionBackgroundObjects(scene, 'missionBackground');
                gameObjects.youtubePlayer = createYoutubeVideo(scene, youtubeId['problem']);
                gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
                    loadSequence3(sequence-1);
                });
            }
        });

    } else if (sequence == 10) { // Sequence jawaban bener

        let text = "Bagus sekali, pilihan Anda benar."
        gameObjects.announcement = createAnnouncementText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence3(scene, sequence+1);
        }, middleX - 150, middleY + (missionBoxProps.height/2) - 100);
        gameObjects.exitBtn = createExitButton(scene, middleX+150, middleY + (missionBoxProps.height/2) - 100);

    } else if (sequence == 11) {
        start("3",3)
        let text = 'Nah... coba tentukan reaksi yang terjadi dalam larutan penyangga tesebut, yaitu: 20 mL asam asetat 0,1 M dengan 10 mL natrium hidroksida 0,1 M ';
        gameObjects.question = createDescText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence3(scene, sequence+1);
        });

    }

    else if (sequence == 12) { // Sequence milih jawaban
        let questionNumber = 3; // ISI DENGAN NOMOR PERTANYAAN!
        createChoices3(scene3, questionNumber);
        gameObjects3.nextBtn = createNextButton3(scene3, 'KONFIRMASI', () => {
            console.log("Final answer: \n" + selections3);
            if (checkAnswer3(questionNumber) == true) {
                done("3",questionNumber)
                // Kalo jawaban bener, langsung load sequence selanjutnya
                loadSequence3(scene, sequence+1);
            } else {
                // Kalo jawaban salah, suruh tonton video dulu terus nanti bakal ke pertanyaan lagi
                destroyAllGameObjects();
                createMissionBackgroundObjects(scene, 'missionBackground');
                gameObjects.youtubePlayer = createYoutubeVideo(scene, youtubeId['problem']);
                gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
                    loadSequence3(scene, sequence-1);
                });
            }
        });
        
    }

    else if (sequence == 13) {
        start("3",4)
        let text = 'Dari reaksi asam basa yang terjadi, tentukan reaktan yang habis bereaksi';
        gameObjects.question = createDescText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence3(scene, sequence+1);
        });

    }

    else if (sequence == 14) { // Sequence milih jawaban
        let questionNumber = 4; // ISI DENGAN NOMOR PERTANYAAN!
        createChoices3(scene3, questionNumber);
        gameObjects3.nextBtn = createNextButton3(scene3, 'KONFIRMASI', () => {
            console.log("Final answer: \n" + selections3);
            if (checkAnswer3(questionNumber) == true) {
                done("3",questionNumber)
                // Kalo jawaban bener, langsung load sequence selanjutnya
                loadSequence3(scene, sequence+1);
            } else {
                // Kalo jawaban salah, suruh tonton video dulu terus nanti bakal ke pertanyaan lagi
                destroyAllGameObjects();
                createMissionBackgroundObjects(scene, 'missionBackground');
                gameObjects.youtubePlayer = createYoutubeVideo(scene, youtubeId['problem']);
                gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
                    loadSequence3(scene, sequence-1);
                });
            }
        });
        
    }


    else if (sequence == 15) {
        start("3",5)
        let text = 'Nah…sekarang pilih spesi yang terdapat dalam larutan setelah terjadi reaksi';
        gameObjects.question = createDescText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence3(scene, sequence+1);
        });

    }

    else if (sequence == 16) { // Sequence milih jawaban
        let questionNumber = 5; // ISI DENGAN NOMOR PERTANYAAN!
        createChoices3(scene3, questionNumber);
        gameObjects3.nextBtn = createNextButton3(scene3, 'KONFIRMASI', () => {
            console.log("Final answer: \n" + selections3);
            if (checkAnswer3(questionNumber) == true) {
                done("3",questionNumber)
                // Kalo jawaban bener, langsung load sequence selanjutnya
                loadSequence3(scene, sequence+1);
            } else {
                // Kalo jawaban salah, suruh tonton video dulu terus nanti bakal ke pertanyaan lagi
                destroyAllGameObjects();
                createMissionBackgroundObjects(scene, 'missionBackground');
                gameObjects.youtubePlayer = createYoutubeVideo(scene, youtubeId['problem']);
                gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
                    loadSequence3(scene, sequence-1);
                });
            }
        });
        
    }

    else if (sequence == 17) {
        start("3",5)
        let text = 'spesi yang terdapat dalam larutan setelah terjadi reaksi ke dalam gelas kimia kosong';
        gameObjects.question = createDescText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence3(scene, sequence+1);
        });

    }

    else if (sequence == 18) { // Sequence milih jawaban
        let questionNumber = 5; // ISI DENGAN NOMOR PERTANYAAN!
        createChoices3(scene3, questionNumber);
        gameObjects3.nextBtn = createNextButton3(scene3, 'KONFIRMASI', () => {
            console.log("Final answer: \n" + selections3);
            if (checkAnswer3(questionNumber) == true) {
                done("3",questionNumber)
                // Kalo jawaban bener, langsung load sequence selanjutnya
                loadSequence3(scene, sequence+1);
            } else {
                // Kalo jawaban salah, suruh tonton video dulu terus nanti bakal ke pertanyaan lagi
                destroyAllGameObjects();
                createMissionBackgroundObjects(scene, 'missionBackground');
                gameObjects.youtubePlayer = createYoutubeVideo(scene, youtubeId['problem']);
                gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
                    loadSequence3(scene, sequence-1);
                });
            }
        });
        
    }

    else if (sequence == 19) {
        start("3",6)
        let text = 'Pilih komponen penyangga yang terdapat dalam campuran';
        gameObjects.question = createDescText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence3(scene, sequence+1);
        });

    }

    else if (sequence == 20) { // Sequence milih jawaban
        let questionNumber = 6; // ISI DENGAN NOMOR PERTANYAAN!
        createChoices3(scene3, questionNumber);
        gameObjects3.nextBtn = createNextButton3(scene3, 'KONFIRMASI', () => {
            console.log("Final answer: \n" + selections3);
            if (checkAnswer3(questionNumber) == true) {
                done("3",questionNumber)
                // Kalo jawaban bener, langsung load sequence selanjutnya
                loadSequence3(scene, sequence+1);
            } else {
                // Kalo jawaban salah, suruh tonton video dulu terus nanti bakal ke pertanyaan lagi
                destroyAllGameObjects();
                createMissionBackgroundObjects(scene, 'missionBackground');
                gameObjects.youtubePlayer = createYoutubeVideo(scene, youtubeId['problem']);
                gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
                    loadSequence3(scene, sequence-1);
                });
            }
        });
        
    }

    else if (sequence == 21) {
        start("3",7)
        let text = 'Setelah melewati permainan, tentukan alasan mengapa campuran 20 mL CH3COOH 0,1 M + 10 mL NaOH 0,1 M dapat menyangga pH setelah penambahan sedikit asam/ basa, sedangkan campuran yang lainnya tidak… ';
        gameObjects.question = createDescText(scene, text);
        gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
            loadSequence3(scene, sequence+1);
        });

    }

    else if (sequence == 22) { // Sequence milih jawaban
        let questionNumber = 7; // ISI DENGAN NOMOR PERTANYAAN!
        createChoices3(scene3, questionNumber);
        gameObjects3.nextBtn = createNextButton3(scene3, 'KONFIRMASI', () => {
            console.log("Final answer: \n" + selections3);
            if (checkAnswer3(questionNumber) == true) {
                done("3",questionNumber)
                // Kalo jawaban bener, langsung load sequence selanjutnya
                loadSequence3(scene, sequence+1);
            } else {
                // Kalo jawaban salah, suruh tonton video dulu terus nanti bakal ke pertanyaan lagi
                destroyAllGameObjects();
                createMissionBackgroundObjects(scene, 'missionBackground');
                gameObjects.youtubePlayer = createYoutubeVideo(scene, youtubeId['problem']);
                gameObjects.nextBtn = createNextButton(scene, 'LANJUT', () => {
                    loadSequence3(scene, sequence-1);
                });
            }
        });
        
    }

}

/*

function createExitButton3(scene3, x, y) {
    let button = scene3.add.text(x, y, 'KELUAR')
        .setOrigin(0.5)
        .setFontSize(30)
        // .setOrigin(10)
        .setPadding(12)
        .setStyle({ backgroundColor: '#000000', color: '#ffffff' })
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => button.setStyle({ color: '#0000ff' }))
        .on('pointerout', () => button.setStyle({ color: '#ffffff' }))
        .on('pointerdown', () => scene3.scene3.start('MainMenu'));
}


function createMissionBackgroundObjects3(scene3, imageName) {
    // bikin background image
    gameObjects3.backgroundImage = createBackgroundImage3(scene3, imageName);

    // bikin exit button
    gameObjects3.exitBtn = createExitButton3(scene3, 100, 50);

    // bikin kotak abu transparan
    gameObjects3.missionBox = createMissionBox3(scene3);
    missionBoxProps3 = {
        width: gameObjects3.missionBox.width, 
        height: gameObjects3.missionBox.height, 
        lowestX: middleX - (gameObjects3.missionBox.width / 2), 
        lowestY: middleY - (gameObjects3.missionBox.height / 2)
    };

    // console.log(missionBoxProps3);
}

function destroyAllGameObjects3() {
    let keys = Object.keys(gameObjects3);
    // console.log("List of keys:");
    // console.log(keys);
    keys.forEach((key, index) => {
        // console.log("Destroying " + key);
        gameObjects3[key].destroy();
        // delete gameObjects3[key];
    });
}



function createChoices3(scene3, questionNumber) {
    // buat nyimpen si tombol pilihan jawaban
    choices3 = [];
    console.log("Choices Resetted!");
    // buat nyimpen tombol jawaban mana aja yg dipilih, contoh isinya nanti kayak [1,1,0,0,0]
    selections = new Array(choicesText[questionNumber].length).fill(0); 
    console.log("choicesText[questionNumber].length: " + choicesText[questionNumber].length);
    console.log("Selections resetted!");
    console.log("Current selections3:\n" + selections3);

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

    // Object.assign(state, {choices3: choices3, selections3: selections3});
}

function checkAnswer(questionNumber) {
    return arraysEqual(selections, correctAnswers[questionNumber]);
}

function showChoices3(choices3) {
    for (let i = 0; i < choices3.length; i++) {
        choices3[i].setVisible(true);
    }
}

function createDialog3(scene3, dialogs, callback) {
    //awal mula text
    let content = dialogs[0];
    //penghitung baris keberapa
    let lineCounter = 1;
    // console.log(content);
    gameObjects3.textBox = createTextBox3(scene3, middleX, middleY + 200, {
        wrapWidth: 900,
        fixedWidth: 900,
        fixedHeight: 250,
    })
    .start(content, 50); // yang integer tuh speed muncul speednya

    // console.log(gameObjects3.textBox);

    // gameObjects3.exitBtn  = createExitButton3(scene3, 50, 50);

    let isDialogScene = true;
    
    scene3.input.on('pointerdown', () => {

        if (isDialogScene) {

            //kalo lg typing, beresin dlu (munculin smua)

            if (gameObjects3.textBox.isTyping) {
                gameObjects3.textBox.stop(true);
                console.log('lagi ngetik: ' + gameObjects3.textBox.isTyping);

                //ngatur panah next
                let nextIcon = gameObjects3.textBox.getElement('action').setVisible(true);
                gameObjects3.textBox.resetChildVisibleState(nextIcon);

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
                let nextIcon = gameObjects3.textBox.getElement('action').setVisible(false);
                gameObjects3.textBox.resetChildVisibleState(nextIcon);

                //cek page terakhir
                //kalo udah halaman terakhir dari current line, bakal next line
                //soalnya kalo panjang, bakal displit per berapa halaman tergantung maxLine
                if (gameObjects3.textBox.isLastPage) {
                    console.log('akhir page');
                    console.log(lineCounter);
        
                    //pergantian line
                    if (lineCounter < dialogs.length) {
                        content = dialogs[lineCounter];
                        // console.log('next line: ' + content); 
                        lineCounter += 1;
            
                        gameObjects3.textBox.start(content);
                    }

                    // kalo udah dialog paling terakhir bakal ngejalanin perintah callback
                    if(lineCounter >= dialogs.length) {
                        callback();
                        isDialogScene = false;
                    }
                }
                else {
                    console.log('bukan akhir page cuy');
                    gameObjects3.textBox.typeNextPage();
                }
            }
        }
        // console.log('clicked!');
    }, scene3);
}

function createTextBox3(scene3, x, y, config) {
    // var wrapWidth = GetValue(config, 'wrapWidth', 0);
    // var fixedWidth = GetValue(config, 'fixedWidth', 0);
    // var fixedHeight = GetValue(config, 'fixedHeight', 0);

    var wrapWidth = config.wrapWidth;
    var fixedWidth = config.fixedWidth;
    var fixedHeight = config.fixedHeight;
    var textBox = scene3.rexUI.add.textBox({
            x: x,
            y: y,

            background: scene3.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY)
                .setStrokeStyle(2, COLOR_LIGHT),

            icon: scene3.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_DARK),

            // text: getBuiltInText3(scene3, wrapWidth, fixedWidth, fixedHeight),
            text: getBBcodeText3(scene3, wrapWidth, fixedWidth, fixedHeight),

            action: scene3.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false),

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
    //         var tween = scene3.tweens.add({
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

function getBuiltInText3(scene3, wrapWidth, fixedWidth, fixedHeight) {
    return scene3.add.text(0, 0, '', {
            fontSize: '20px',
            wordWrap: {
                width: wrapWidth
            },
            //max line dalam sekali textbox
            maxLines: 10
        })
        .setFixedSize(fixedWidth, fixedHeight);
}

function getBBcodeText3(scene3, wrapWidth, fixedWidth, fixedHeight) {
    return scene3.rexUI.add.BBCodeText(0, 0, '', {
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

function createBackgroundImage3(scene3, imageName) {
    console.log(middleX);
    console.log(middleY);
    console.log(imageName);

    let backgroundImage = scene3.add.image(middleX, middleY, imageName);
    let scaleX = scene3.cameras.main.width / backgroundImage.width;
    let scaleY = scene3.cameras.main.height / backgroundImage.height;
    let scale = Math.max(scaleX, scaleY);
    backgroundImage.setScale(scale).setScrollFactor(0);

    return backgroundImage;
}

function createMissionBox3(scene3) {
    let grayRectangle = scene3.add.rectangle(
        scene3.cameras.main.width / 2, 
        scene3.cameras.main.height / 2, 
        scene3.cameras.main.width / 2, 
        scene3.cameras.main.height * 3 / 4, 
        0x000000, 
        0.7
    );

    return grayRectangle;
}

function createDescText3(scene3, text, x = middleX-missionBoxProps3.lowestX+50, y = missionBoxProps3.lowestY+100) {
    let t = scene3.add.rexBBCodeText(x, y, text, {
        fontSize: '30px',
        align: 'left',
        wrap: {
            mode: 'word',
            width: gameObjects3.missionBox.width-100
        },
    });

    return t;
}

function createNextButton3(
        scene3, 
        label, 
        callback, 
        x = middleX, 
        y = middleY+(missionBoxProps3.height/2)-50
    ) {
    let button = scene3.add.text(x, y, label)
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

function createExitButton3(scene3, x, y) {
    let button = scene3.add.text(x, y, 'KELUAR')
        .setOrigin(0.5)
        .setFontSize(30)
        // .setOrigin(10)
        .setPadding(12)
        .setStyle({ backgroundColor: '#000000', color: '#ffffff' })
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => button.setStyle({ color: '#0000ff' }))
        .on('pointerout', () => button.setStyle({ color: '#ffffff' }))
        .on('pointerdown', () => scene3.scene3.start('MainMenu'));

    return button;
}

function createChoiceButton3(scene3, x, y, label, container) {
    var button = scene3.add.rexBBCodeText({
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

function createAnnouncementText3(scene3, text) {
    let t = scene3.add.text(middleX, middleY, text)
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
