var status; //0: dead 1: alive
var character; //male / female

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

let gameObjects = {};
let missionBoxProps = {};
let choices = [];
let selections = [];
let sequence = 0;

let youtubeId = {};
let choicesText = {};
let correctAnswers = {}
let mode = "normal";