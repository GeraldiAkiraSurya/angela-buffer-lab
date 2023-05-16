function foundObject (objectName) {
    switch (objectName) {
        case 'beaker':
            return true;
        case 'spatula':
            return true;
        case 'testTube':
            return true;
        case 'testTubeRack':
            return true;
        case 'sprayBottle':
            return true;
        case 'dropper':
            return true;
        case 'measuringCylinder':
            return true;
        case 'stirringRod':
            return true;
    }
}

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

    var nextBtn = createNextBtn(scene, middleX, middleY + (descriptionBox.height / 2) - 50, 'LANJUT', () => {
        title.destroy();
        missionDesc.destroy();
        nextBtn.destroy();
        descriptionBox.destroy();

        startFindingObject(scene, object1, object2, object3, object4, btnHint);
    });    
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

    var nextBtn = createNextBtn(scene, middleX, middleY + (descriptionBox.height / 2) - 50, 'LANJUT', () => {
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
    });
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

    var nextBtn = createNextBtn(scene, middleX, middleY + (descriptionBox.height / 2) - 50, 'LANJUT', () => {
        title.destroy();
        missionDesc.destroy();
        nextBtn.destroy();
        descriptionBox.destroy();

        scene.scene.start()
    });    
}

function startFindingObject(scene, object1, object2, object3, object4, btnHint) {
    scene.time.addEvent(findTimer);
    object1.setVisible(true);
    object2.setVisible(true);
    object3.setVisible(true);
    object4.setVisible(true);
    btnHint.input.enabled = true;
}

// function foundObject (objectName, objectFound) {
//     switch (objectName) {
//         case 'beaker':
//             beakerFound = true;
//             break;
//         case 'spatula':
//             spatulaFound = true;
//             break;
//         case 'testTube':
//             testTubeFound = true;
//             break;
//         case 'testTubeRack':
//             testTubeRackFound = true;
//             break;
//         case 'sprayBottle':
//             sprayBottleFound = true;
//             break;
//         case 'dropper':
//             dropperFound = true;
//             break;
//         case 'measuringCylinder':
//             measuringCylinderFound = true;
//             break;
//         case 'stirringRod':
//             stirringRodFound = true;
//             break;
//     }
// }

// function hintObject (objectName) {
//     switch (objectName) {
//         case 'beaker':
//             beaker.setTint(0x08F26E);
//             break;
//         case 'spatula':
//             spatula.setTint(0x08F26E);
//             break;
//         case 'testTube':
//             testTube.setTint(0x08F26E);
//             break;
//         case 'testTubeRack':
//             testTubeRack.setTint(0x08F26E);
//             break;
//     }
// }