
let index = 0;
let players = [];
let currentWinner = "";

function addPlayer(name) {
	if (name == null || name == "") return -1;

	const table = document.getElementById("players-table");
	let row = table.insertRow(index + 1);

	let cell1 = row.insertCell(0);
	let cell2 = row.insertCell(1);

	cell1.innerText = index + 1;
	cell2.innerText = name;
	players.push(name);

	index++;
}

addPlayer("joão gabriel");
addPlayer("luiz arruda");
addPlayer("dudu");
addPlayer("mago");


function setWinner(winner) {
	currentWinner = winner;
	console.log(currentWinner);
}

function customPrompt() {
	return new Promise((resolve, reject) => {
		document.getElementById("btn1").onclick = () => {
			resolve(1); // returns 1 if choosed player 1
		};

		document.getElementById("btn2").onclick = () => {
			resolve(2); // returns 2 if choosed player 2
		};
	});
}

function renderMatch(player1, player2) {
	// TODO: make query selector stuff
	let gamediv = document.getElementById("game");
	let versus = document.getElementById("versus");
	let maindiv = document.getElementById("main");
	let btn1 = document.getElementById("btn1");
	let btn2 = document.getElementById("btn2");
	maindiv.style.display = "none";
	gamediv.style.display = "initial";

	versus.innerText = 
	`${player1}
	🆚
	${player2}`;
	btn1.innerText = player1;
	btn2.innerText = player2;


}

async function match(player1, player2) {
	renderMatch(player1, player2);
	return customPrompt();
}


async function start() {
	let l = players.length;
	if (l > 1) {
		let player1 = players[0];
		let player2 = players[1];

		for (let n = 0; n < players.length - 1; n++) {
			let winner = await match(player1, player2);
			if (winner == 2)
				// player 1 will be player2 only if the player2 was the winner
				player1 = player2;

			player2 = players[n + 2];

		}
		// console.log(player1)
		
		document.querySelector("#game").innerHTML = `<h1>🏓🏓🏓<br>O grande ganhador foi:<br><span style="color: lightgreen;">${player1}</span><br>🏓🏓🏓<h1>`;
	}
}