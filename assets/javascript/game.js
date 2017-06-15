var bank = ["enrique", "ariana", "pitbull", "adele", "chainsmokers"];
var wins = 0;



function updateChar(str,index,char) {
	if(index > str.length-1) return str;
	return str.substr(0,index) + char + str.substr(index+1);
}

// Begin round
// var lives = 12;
// var screen = "";
// var guessed = [];
// var failed = [];

// var answer = bank[Math.floor(Math.random() * bank.length)];
// console.log(answer);
// for (var i = 0; i < answer.length; i++) {
// 	screen += "_ "
// }

function reset() {
	lives = 12;
	screen = "";
	guessed = [];
	failed = [];

	answer = bank[Math.floor(Math.random() * bank.length)];
	console.log(answer);
	for (var i = 0; i < answer.length; i++) {
		screen += "_ "
	}
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
				// Win script
				console.log("You win!")
				wins++
				alert("You Win! Answer: " + answer)
				changePic(selectPic())
				reset()
				refresh()
				document.getElementById('score').textContent = wins

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