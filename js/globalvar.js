var status; //0: dead 1: alive
var character; //0:male //1:female

// var playerName = 'playerName';
//energy
var energy;
var energyFlaskIcon;
var energyText;

//main menu music
var menuMusic = false;
var isMenuMusicPlaying;

//game canvas width dan height buat ngatur biar responsive
var canvasWidth;
var canvasHeight;

var middleX;
var middleY;

//finding objects done, buat 
var findingObjects1Done = false;
var findingObjects2Done = false;
var findingObjects3Done = false;
var findingObjects4Done = false;
let missionTwoSequence;

let gameObjects = {};
let missionBoxProps = {};
let choices = [];
let selections = [];
let sequence = 0;

let youtubeId = {};
let choicesText = {};
let correctAnswers = {}
let mode = "normal";
