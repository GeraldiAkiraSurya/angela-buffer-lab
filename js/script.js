/* global monogatari */

// Define the messages used in the game.
monogatari.action ('message').messages ({
	'Help': {
		title: 'Help',
		subtitle: 'Some useful Links',
		body: `
			<p><a href='https://developers.monogatari.io/documentation/'>Documentation</a> - Everything you need to know.</p>
			<p><a href='https://monogatari.io/demo/'>Demo</a> - A simple Demo.</p>
		`
	},
	'Narration1-1': {
		title: '',
		subtitle: '',
		body: 'Allison adalah seorang profesor yang ditugaskan di Laboratorium X untuk mencari obat dari penyakit yang tidak diketahui asal-usulnya.',
	},
	'Narration1-2': {
		title: '',
		subtitle: '',
		body: 'Untuk itu Prof. Allison bekerjasama dengan ilmuan kimia (pemain) untuk melakukan penelitian untuk mengumpulkan ramuan obat yang sedang dicari.',
	},
	'Narration1-3': {
		title: '',
		subtitle: '',
		body: 'Seluruh ramuan obat dapat dikumpulkan setelah ilmuan kimia menyelesaikan tantangan pada setiap misi.',
	},
	'NarrMiss1-1': {
		title: 'Misi 1',
		subtitle: '',
		body: `
			<p><b>SYARAT PENYELESAIAN KHUSUS:</b> AMATILAH VIDEO DENGAN SEKSAMA DAN PILIHLAH JAWABAN YANG BENAR DARI PERTANYAAN YANG DIBERIKAN</p>
			<p><b>BATAS WAKTU:</b> TIDAK ADA</p>
			<p><b>HADIAH:</b> ENERGI DAN BUKU RAMUAN OBAT</p>
			<p><b>JIKA GAGAL:</b> KEMBALI KE AWAL</p>
		`,
	},

	//video
	'Video1-1-1': {
		title: 'Pertanyaan 1 Video 1',
		subtitle: '',
		body: `
			<iframe width="420" height="315"
				src="https://www.youtube.com/embed/tgbNymZ7vqY" allowFullScreen="true">
			</iframe>
		`
	},
	'Video1-1-2': {
		title: 'Pertanyaan 1 Video 2',
		subtitle: '',
		body: `
			<iframe width="420" height="315"
				src="https://www.youtube.com/embed/tgbNymZ7vqY" allowFullScreen="true">
			</iframe>
		`
	},
	'Video1-3-1': {
		title: 'Pertanyaan 3 Video 1',
		subtitle: '',
		body: `
			<iframe width="420" height="315"
				src="https://www.youtube.com/embed/tgbNymZ7vqY" allowFullScreen="true">
			</iframe>
		`
	},
	'Video1-3-2': {
		title: 'Pertanyaan 3 Video 2',
		subtitle: '',
		body: `
			<iframe width="420" height="315"
				src="https://www.youtube.com/embed/tgbNymZ7vqY" allowFullScreen="true">
			</iframe>
		`
	},

	//clues
	'Clue1-1': {
		title: 'Clue',
		subtitle: '',
		body: `
			<p>Mempertahankan pH berarti tidak mengalami perubahan pH atau hanya mengalami sedikit perubahan akibat penambahan sedikit asam maupun basa</p>
		`,
	},
});

// Define the notifications used in the game
monogatari.action ('notification').notifications ({
	'Welcome': {
		title: 'Welcome',
		body: 'This is the Monogatari VN Engine',
		icon: ''
	}
});

// Define the Particles JS Configurations used in the game
monogatari.action ('particles').particles ({

});

// Define the canvas objects used in the game
monogatari.action ('canvas').objects ({

});

// Credits of the people involved in the creation of this awesome game
monogatari.configuration ('credits', {

});


// Define the images that will be available on your game's image gallery
monogatari.assets ('gallery', {

});

// Define the music used in the game.
monogatari.assets ('music', {

});

// Define the voice files used in the game.
monogatari.assets ('voices', {

});

// Define the sounds used in the game.
monogatari.assets ('sounds', {

});

// Define the videos used in the game.
monogatari.assets ('videos', {

});

// Define the images used in the game.
monogatari.assets ('images', {

});

// Define the backgrounds for each scene.
monogatari.assets ('scenes', {
	'lab1': 'science_lab.jpg',
	'desk': 'lab_desk.jpg'
});


// Define the Characters
monogatari.characters ({
	'p': {
		name: 'Prof. Allison',
		color: '#5bcaff',
		sprites: {
			normal: 'professor.png'
		}
	},
	'u': {
		name: '{{player.name}}',
		color: '#FFFFFF'
	}
});

monogatari.script ({
	// The game starts here.
	'Start': [
		'show scene lab1 with fadeIn',
		'show message Narration1-1',
		'show message Narration1-2',
		'show message Narration1-3',
		'show character p normal with fadeIn',
		'p Hai selamat datang di Buffer Laboratory!!!',
		'show notification Welcome',
		{
			'Input': {
				'Text': 'Siapa namamu?',
				'Validation': function (input) {
					return input.trim ().length > 0;
				},
				'Save': function (input) {
					this.storage ({
						player: {
							name: input
						}
					});
					return true;
				},
				'Revert': function () {
					this.storage ({
						player: {
							name: ''
						}
					});
				},
				'Peringatan': 'Kamu harus menuliskan namamu!'
			}
		},
		'p Hi {{player.name}} perkenalkan aku adalah professor Allison!',
		'p {{player.name}}… Anda harus mengambil buku ramuan obat yang tertinggal di laboratorium pusat!',
		'u Siap meluncur prof...',
		'p Sebelum berangkat Anda harus menyelesaikan tantangan di laboratorium X, tiap tantangan yang dilewati akan menambah energi Anda untuk memperoleh buku ramuan obat..',
		'u Penemuan ini akan menjadi gebrakan hebat di dunia penelitian…',
		'p Semoga berhasil!!!',
		'Anda dapat memulai penelitian di laboratorium X',
		{
			'Choice': {
				// 'Dialog': 'Anda dapat memulai penelitian di laboratorium X',
				'Yes': {
					'Text': 'Terima',
					'Do': 'jump Misi1-1'
				},
				'No': {
					'Text': 'Tidak',
					'Do': 'jump No'
				},
			}
		},
	],

	//misi 1 pertanyaan 1
	'Misi1-1': [
		'show scene desk with FadeIn',
		'show message NarrMiss1-1',
		'show message Video1-1-1',
		'show message Video1-1-2',
		'Berdasarkan tayangan video tersebut, coba bandingkan perubahan pH pada sistem 1 sampai 4 sebelum dan sesudah ditambah sedikit asam maupun basa. Manakah pernyataan yang benar?',
		{
			'Choice': {
				'1': {
					'Text': 'pH pada semua system/ campuran berubah drastis',
					'Do': 'jump Misi1-1-wrong'
				},
				'2': {
					'Text': 'pH pada Campuran 15 mL CH3COOH 0,1 M + 15 mL CH3COONa 15 M tidak berubah secara signifikan',
					'Do': 'jump Misi1-2'
				},
				'3': {
					'Text': 'pH pada campuran 15 mL HCl 0,1 M + 15 mL NaCl 0,1 M tidak berubah secara signifikan',
					'Do': 'jump Misi1-1-wrong'
				},
				'4': {
					'Text': 'pH pada larutan asam asetat 0,1 M berubah drastis',
					'Do': 'jump Misi1-2'
				},
				'5': {
					'Text': 'pH pada larutan natrium asetat 0,1 M berubah drastis',
					'Do': 'jump Misi1-2'
				},
			}
		}
	],

	'Misi1-1-wrong': [
		'show message Video1-1-2',
		'Berdasarkan tayangan video tersebut, coba bandingkan perubahan pH pada sistem 1 sampai 4 sebelum dan sesudah ditambah sedikit asam maupun basa. Manakah pernyataan yang benar?',
		{
			'Choice': {
				'1': {
					'Text': 'pH pada semua system/ campuran berubah drastis',
					'Do': 'jump Misi1-1-wrong'
				},
				'2': {
					'Text': 'pH pada Campuran 15 mL CH3COOH 0,1 M + 15 mL CH3COONa 15 M tidak berubah secara signifikan',
					'Do': 'jump Misi1-2'
				},
				'3': {
					'Text': 'pH pada campuran 15 mL HCl 0,1 M + 15 mL NaCl 0,1 M tidak berubah secara signifikan',
					'Do': 'jump Misi1-1-wrong'
				},
				'4': {
					'Text': 'pH pada larutan asam asetat 0,1 M berubah drastis',
					'Do': 'jump Misi1-2'
				},
				'5': {
					'Text': 'pH pada larutan natrium asetat 0,1 M berubah drastis',
					'Do': 'jump Misi1-2'
				},
			}
		}
	],

	'Misi1-2': [
		'Nah..berdasarkan perubahan pH yang terjadi pada larutan – larutan dalam video, manakah sistem yang dapat mempertahankan pHnya setelah penambahan 5 tetes asam atau basa kuat?',

	],

	// Baris di bawah ini buat ditambahin ke kode ivan

	'Misi1-4': [
		'Berdasarkan perubahan pH yang terjadi pada larutan–larutan dalam video, manakah campuran yang dapat mempertahankan pHnya?',
		{
			'Choice': {
				'1': {
					'Text': 'Campuran larutan NH3 + NH4ClpH pada semua system/ campuran berubah drastis',
					'Do': 'jump Misi1-5'
				},
				'2': {
					'Text': 'Campuran larutan NaOH + NaCl',
					'Do': 'jump Misi1-4'
				},
				'3': {
					'Text': 'Larutan NH3 saja',
					'Do': 'jump Misi1-4'
				},
				'4': {
					'Text': 'Larutan NH4Cl saja',
					'Do': 'jump Misi1-4'
				},
			}
		}
	],

	'Misi1-5': [
		'Setelah melewati permainan, mengapa larutan (CH3COOH + CH3COONa dan NH3 + NH4Cl) termasuk larutan penyangga?',
		{
			'Choice': {
				'1': {
					'Text': 'Karena ketika ditambahkan sedikit asam ataupun basa hanya terjadi sedikit perubahan pH atau bahkan tidak mengalami perubahan',
					'Do': 'jump Game1'
				},
				'2': {
					'Text': 'Karena ketika ditambahkan sedikit asam ataupun basa terjadi perubahan pH yang drastis',
					'Do': 'jump Game1'
				}
			}
		}
	],

	'Game1': [
		'Demo telah selesai!!!',
		'End'
	],

	//misi 1 pertanyaan 2
	'Misi1-2': [
		'Nah..berdasarkan perubahan pH yang terjadi pada larutan – larutan dalam video, manakah campuran yang dapat mempertahankan pHnya?',
		{
			'Choice': {
				'1': {
					'Text': 'campuran larutan CH3COOH + CH3COONa',
					'Do': 'jump Misi1-3'
				},
				'2': {
					'Text': 'campuran larutan HCl + NaCl',
					'Do': 'jump Misi1-2-wrong'
				},
				'3': {
					'Text': 'Larutan CH3COOH saja',
					'Do': 'jump Misi1-3'
				},
				'4': {
					'Text': 'Larutan CH3COONa saja',
					'Do': 'jump Misi1-2-wrong'
				},
			}
		}
	],

	'Misi1-2-wrong': [
		'show message Clue1-1',
		'Nah..berdasarkan perubahan pH yang terjadi pada larutan – larutan dalam video, manakah campuran yang dapat mempertahankan pHnya?',
		{
			'Choice': {
				'1': {
					'Text': 'campuran larutan CH3COOH + CH3COONa',
					'Do': 'jump Misi1-3'
				},
				'2': {
					'Text': 'campuran larutan HCl + NaCl',
					'Do': 'jump Misi1-2-wrong'
				},
				'3': {
					'Text': 'Larutan CH3COOH saja',
					'Do': 'jump Misi1-3'
				},
				'4': {
					'Text': 'Larutan CH3COONa saja',
					'Do': 'jump Misi1-2-wrong'
				},
			}
		}
	],

	//misi 1 pertanyaan 3
	'Misi1-3': [
		'show message Video1-3-1',
		'show message Video1-3-2',
		'Berdasarkan tayangan video tersebut, bagaimana perubahan pH pada larutan setelah ditambah sedikit asam maupun basa?',
		{
			'Choice': {
				'1': {
					'Text': 'pH pada semua campuran berubah drastis',
					'Do': 'jump Misi1-3-wrong'
				},
				'2': {
					'Text': 'Campuran NH3 + NH4Cl tidak mengalami perubahan pH',
					'Do': 'jump Misi1-4'
				},
				'3': {
					'Text': 'Larutan NaOH + NaCl mengalami tidak perubahan pH',
					'Do': 'jump Misi1-3-wrong'
				},
				'4': {
					'Text': 'pH pada larutan amonia berubah drastis',
					'Do': 'jump Misi1-4'
				},
				'5': {
					'Text': 'pH pada larutan ammonium klorida berubah drastis',
					'Do': 'jump Misi1-4'
				},
			}
		}
	],

	'Misi1-3-wrong': [
		'show message Video1-3-2',
		'Berdasarkan tayangan video tersebut, bagaimana perubahan pH pada larutan setelah ditambah sedikit asam maupun basa?',
		{
			'Choice': {
				'1': {
					'Text': 'pH pada semua campuran berubah drastis',
					'Do': 'jump Misi1-3-wrong'
				},
				'2': {
					'Text': 'Campuran NH3 + NH4Cl tidak mengalami perubahan pH',
					'Do': 'jump Misi1-4'
				},
				'3': {
					'Text': 'Larutan NaOH + NaCl mengalami tidak perubahan pH',
					'Do': 'jump Misi1-3-wrong'
				},
				'4': {
					'Text': 'pH pada larutan amonia berubah drastis',
					'Do': 'jump Misi1-4'
				},
				'5': {
					'Text': 'pH pada larutan ammonium klorida berubah drastis',
					'Do': 'jump Misi1-4'
				},
			}
		}
	],

	//misi 1 pertanyaan 4
	'Misi1-4': [
		'Berdasarkan perubahan pH yang terjadi pada larutan–larutan dalam video, manakah campuran yang dapat mempertahankan pHnya?',
		{
			'Choice': {
				'1': {
					'Text': 'Campuran larutan NH3 + NH4ClpH pada semua system/ campuran berubah drastis',
					'Do': 'jump Misi1-5'
				},
				'2': {
					'Text': 'Campuran larutan NaOH + NaCl',
					'Do': 'jump Misi1-4'
				},
				'3': {
					'Text': 'Larutan NH3 saja',
					'Do': 'jump Misi1-4'
				},
				'4': {
					'Text': 'Larutan NH4Cl saja',
					'Do': 'jump Misi1-4'
				},
			}
		}
	],

	//misi 1 pertanyaan 5
	'Misi1-5': [
		'Setelah melewati permainan, mengapa larutan (CH3COOH + CH3COONa dan NH3 + NH4Cl) termasuk larutan penyangga?',
		{
			'Choice': {
				'1': {
					'Text': 'Karena ketika ditambahkan sedikit asam ataupun basa hanya terjadi sedikit perubahan pH atau bahkan tidak mengalami perubahan',
					'Do': 'jump Game1'
				},
				'2': {
					'Text': 'Karena ketika ditambahkan sedikit asam ataupun basa terjadi perubahan pH yang drastis',
					'Do': 'jump Misi1-5-wrong'
				}
			}
		}
	],

	'Misi1-5-wrong': [
		'show message Video1-3-2',
		'Setelah melewati permainan, mengapa larutan (CH3COOH + CH3COONa dan NH3 + NH4Cl) termasuk larutan penyangga?',
		{
			'Choice': {
				'1': {
					'Text': 'Karena ketika ditambahkan sedikit asam ataupun basa hanya terjadi sedikit perubahan pH atau bahkan tidak mengalami perubahan',
					'Do': 'jump Game1'
				},
				'2': {
					'Text': 'Karena ketika ditambahkan sedikit asam ataupun basa terjadi perubahan pH yang drastis',
					'Do': 'jump Game1'
				}
			}
		}
	],

	//end misi 1
	'Game1': [
		'Demo telah selesai!!!',
		'End'
	],

	'No': [
		// 'y You can do it now.',
		// 'show message Help',
		// 'y Go ahead and create an amazing Game!',
		// 'y I can’t wait to see what story you’ll tell!',
		// 'end'
	]
});