function hintObject (object) {
    object.setTint(0x08F26E);
}

function drainEnergy (amount, energyText) {
    energy -= amount;
    energyText.setText(energy + '%');
}

//pertama kali show objective
function showObjective(scene, object1, object2, object3, object4, btnHint) {
    var descriptionBox = scene.add.rectangle(scene.cameras.main.width / 2, scene.cameras.main.height / 2, scene.cameras.main.width / 2, scene.cameras.main.height * 3 / 4, 0x000000, 0.7);
    var descBoxTopX = middleX - (descriptionBox.width / 2);
    var descBoxTopY = middleY - (descriptionBox.height / 2);
    var title = scene.add.text(middleX, descBoxTopY + 100, "FINDING OBJECTS MINIGAME")
        .setOrigin(0.5)
        .setFontSize(40);

    var text = 
`[b]OBJECTIVE:[/b] TEMUKAN OBJEK DAN PINDAHKAN KE BOX YANG SESUAI

[b]BATAS WAKTU:[/b] 15 DETIK PER OBJEK

[b]HADIAH:[/b] BUKU RAMUAN OBAT

[b]JIKA GAGAL:[/b] MINIGAME DIULANG DARI AWAL`;

    var missionDesc = scene.add.rexBBCodeText(middleX-descBoxTopX+50, descBoxTopY+250, text, {
        fontSize: '30px',
        align: 'left',
        wrap: {
            mode: 'word',
            width: descriptionBox.width-100
        },
    });

    var nextBtn = createNextButton(scene, 'LANJUT', () => {
        title.destroy();
        missionDesc.destroy();
        nextBtn.destroy();
        descriptionBox.destroy();

        startFindingObject(scene, object1, object2, object3, object4, btnHint);
    }, middleX, middleY + (descriptionBox.height / 2) - 50);    
}

//buat pop up
function showObjective2(scene, object1, object2, object3, object4, btnHint) {
    var descriptionBox = scene.add.rectangle(scene.cameras.main.width / 2, scene.cameras.main.height / 2, scene.cameras.main.width / 2, scene.cameras.main.height * 3 / 4, 0x000000, 0.7);
    var descBoxTopX = middleX - (descriptionBox.width / 2);
    var descBoxTopY = middleY - (descriptionBox.height / 2);
    var title = scene.add.text(middleX, descBoxTopY + 100, "FINDING OBJECTS MINIGAME")
        .setOrigin(0.5)
        .setFontSize(40);

    var text = 
`[b]OBJECTIVE:[/b] TEMUKAN OBJEK DAN PINDAHKAN KE BOX YANG SESUAI

[b]BATAS WAKTU:[/b] 15 DETIK PER OBJEK

[b]HADIAH:[/b] RAMUAN OBAT HIJAU

[b]JIKA GAGAL:[/b] MINIGAME DIULANG DARI AWAL`;

    var missionDesc = scene.add.rexBBCodeText(middleX-descBoxTopX+50, descBoxTopY+250, text, {
        fontSize: '30px',
        align: 'left',
        wrap: {
            mode: 'word',
            width: descriptionBox.width-100
        },
    });

    var nextBtn = createNextButton(scene, 'LANJUT', () => {
        title.destroy();
        missionDesc.destroy();
        nextBtn.destroy();
        descriptionBox.destroy();

        startFindingObject(scene, object1, object2, object3, object4, btnHint);
    }, middleX, middleY + (descriptionBox.height / 2) - 50);    
}

//buat pop up
function showObjective3(scene, object1, object2, object3, object4, btnHint) {
    var descriptionBox = scene.add.rectangle(scene.cameras.main.width / 2, scene.cameras.main.height / 2, scene.cameras.main.width / 2, scene.cameras.main.height * 3 / 4, 0x000000, 0.7);
    var descBoxTopX = middleX - (descriptionBox.width / 2);
    var descBoxTopY = middleY - (descriptionBox.height / 2);
    var title = scene.add.text(middleX, descBoxTopY + 100, "FINDING OBJECTS MINIGAME")
        .setOrigin(0.5)
        .setFontSize(40);

    var text = 
`[b]OBJECTIVE:[/b] TEMUKAN OBJEK DAN PINDAHKAN KE BOX YANG SESUAI

[b]BATAS WAKTU:[/b] 15 DETIK PER OBJEK

[b]HADIAH:[/b] BUAH AJAIB

[b]JIKA GAGAL:[/b] MINIGAME DIULANG DARI AWAL`;

    var missionDesc = scene.add.rexBBCodeText(middleX-descBoxTopX+50, descBoxTopY+250, text, {
        fontSize: '30px',
        align: 'left',
        wrap: {
            mode: 'word',
            width: descriptionBox.width-100
        },
    });

    var nextBtn = createNextButton(scene, 'LANJUT', () => {
        title.destroy();
        missionDesc.destroy();
        nextBtn.destroy();
        descriptionBox.destroy();

        startFindingObject(scene, object1, object2, object3, object4, btnHint);
    }, middleX, middleY + (descriptionBox.height / 2) - 50);    
}

//pop-up kalau energi abis
function showObjectiveOutOfEnergy(scene) {
    var descriptionBox = scene.add.rectangle(scene.cameras.main.width / 2, scene.cameras.main.height / 2, scene.cameras.main.width / 2, scene.cameras.main.height * 3 / 4, 0x000000, 0.7);
    var descBoxTopX = middleX - (descriptionBox.width / 2);
    var descBoxTopY = middleY - (descriptionBox.height / 2);
    var title = scene.add.text(middleX, descBoxTopY + 100, "OUT OF ENERGY")
        .setOrigin(0.5)
        .setFontSize(40);

    var text = 
`[b]OBJECTIVE:[/b] TEMUKAN ENERGY FLASK UNTUK MELANJUTKAN. TERDAPAT 2 BUAH ENERGY FLASK YANG TERSEMBUNYI.`;

    var missionDesc = scene.add.rexBBCodeText(middleX-descBoxTopX+50, descBoxTopY+250, text, {
        fontSize: '30px',
        align: 'left',
        wrap: {
            mode: 'word',
            width: descriptionBox.width-100
        },
    });

    var nextBtn = createNextButton(scene,'LANJUT', () => {
        title.destroy();
        missionDesc.destroy();
        nextBtn.destroy();
        descriptionBox.destroy();

        //munculin energy flask
        if (!energyFlask1Found) {
            energyFlask1.setVisible(true);
        }
        if (!energyFlask2Found) {
            energyFlask2.setVisible(true);
        }
    },  middleX, middleY + (descriptionBox.height / 2) - 50);
}

//pop-up kalau game over
function showGameOver(scene) {
    isGameOverRendered = true;
    var descriptionBox = scene.add.rectangle(scene.cameras.main.width / 2, scene.cameras.main.height / 2, scene.cameras.main.width / 2, scene.cameras.main.height * 3 / 4, 0x000000, 0.7);
    var descBoxTopX = middleX - (descriptionBox.width / 2);
    var descBoxTopY = middleY - (descriptionBox.height / 2);
    var title = scene.add.text(middleX, descBoxTopY + 100, "GAME OVER")
        .setOrigin(0.5)
        .setFontSize(40);

    var text = 
`KLIK LANJUTKAN UNTUK MENGULANG DARI AWAL`;

    var missionDesc = scene.add.rexBBCodeText(middleX-descBoxTopX+50, descBoxTopY+250, text, {
        fontSize: '30px',
        align: 'left',
        wrap: {
            mode: 'word',
            width: descriptionBox.width-100
        },
    });

    var nextBtn = createNextButton(scene, 'LANJUT', () => {
        title.destroy();
        missionDesc.destroy();
        nextBtn.destroy();
        descriptionBox.destroy();

        scene.scene.start()
    }, middleX, middleY + (descriptionBox.height / 2) - 50);    
}

//dari missionOne
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

function startFindingObject(scene, object1, object2, object3, object4, btnHint) {
    scene.time.addEvent(findTimer);
    object1.setVisible(true);
    object2.setVisible(true);
    object3.setVisible(true);
    object4.setVisible(true);
    btnHint.input.enabled = true;
}


//function buat misi 2.1 & 2.2 pertanyaan 1-8 start
//check answer
function checkAnswerDraggable(answerArray, playerAnswerArray) {
    if (playerAnswerArray.length == answerArray.length) {
        return playerAnswerArray.every(element => {
          if (answerArray.includes(element)) {
            return true;
          }
    
          return false;
        });
    }
    
    return false;
}

//function buat misi 2.1 & 2.2 pertanyaan 1-8 finished
function hideObject(objectsArrayToHide) {
    for (let i = 0; i < objectsArrayToHide.length; i++) {
        objectsArrayToHide[i].setVisible(false);
    }    
}

function showObject(objectsArrayToShow) {
    for (let i = 0; i < objectsArrayToShow.length; i++) {
        objectsArrayToShow[i].setVisible(true);
    }    
}

function destroyObject(objectsArrayToDestroy) {
    for (let i = 0; i < objectsArrayToDestroy.length; i++) {
        objectsArrayToDestroy[i].destroy();
    }    
}