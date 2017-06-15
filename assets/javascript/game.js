var bank = ["enrique", "ariana", "pitbull", "adele", "chainsmokers"];
var wins = 0;
var usedWords = [];


function updateChar(str,index,char) {
	if(index > str.length-1) return str;
	return str.substr(0,index) + char + str.substr(index+1);
}

function reset() {
	lives = 12;
	screen = "";
	guessed = [];
	failed = [];

	answer = bank[Math.floor(Math.random() * bank.length)];
	console.log(answer);

	// check if word has already been used
	if (usedWords.includes(answer)) {
		console.log("Word used")
		reset();
		return
	}

	// add word to usedWords
	usedWords.push(answer);
	console.log(usedWords);

	// create display
	for (var i = 0; i < answer.length; i++) {
		screen += "_ "
	};
	console.log(screen)
}

function refresh() {
	document.getElementById('lives').textContent = lives
	document.getElementById('display').textContent = screen
	document.getElementById('failed').textContent = failed
}

reset();
refresh();

// Images for left panel

function selectPic() {
	if (answer === "enrique") {
		return "assets/images/enrique.jpg"
	} else if (answer === "ariana") {
		return "assets/images/ariana.jpg"
	} else if (answer === "pitbull") {
		return "assets/images/pitbull.jpg"
	} else if (answer === "adele") {
		return "assets/images/adele.jpg"
	} else {
		return "assets/images/chainsmokers.jpg"
	}
}

function changePic(img_name) {
	document.getElementById('pic').innerHTML = "<img src='" + img_name + "' style='width: 100%;'>"
}

function endGame() {
	alert("Congratulations, you beat the game!")
	usedWords = []
	wins = 0
	document.getElementById('score').textContent = wins
	document.getElementById('pic').innerHTML = "<img class='img70' src='assets/images/popstar.jpg'>"
}
// game logic

document.onkeyup = function(event) {
	var key = event.key
	if (guessed.includes(key)) {
		console.log("guessed")
		return
	} else {
		guessed.push(key)
		if (answer.includes(key)) {
			for (var i = 0; i < answer.length; i++) {
				if (key === answer[i]) {
					screen = updateChar(screen,i*2,key)
				}
			}
			if (screen.includes("_") === false) {
				// When word is guessed
				wins++
				document.getElementById('score').textContent = wins
				changePic(selectPic())
				answer = answer.toUpperCase()
				console.log(answer)
				// document.getElementById('display').textContent = screen
				document.getElementById('display').innerHTML = "<strong>" + answer + "!</strong>"
				document.getElementById('lives').textContent = wins

				// alert("You Win! Answer: " + answer)

	
				// End game
				if (usedWords.length === bank.length) {
					setTimeout(endGame,2000)
				}

				setTimeout(reset, 2000)
				setTimeout(refresh, 2000)
				// reset()
				// refresh()

				return
			}
		} else {
			lives--
			failed.push(key)
			// document.getElementById('lives').textContent = lives
			// document.getElementById('failed').textContent = failed
			refresh()
			if (lives === 0) {
				alert("Game Over")
				reset()
				refresh()
				return
			}
		}

		// document.getElementById('display').textContent = screen
		refresh()
	}
};