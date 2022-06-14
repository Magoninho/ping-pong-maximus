
let index = 0;
let players = [];
let currentWinner = "";

function addPlayer(name) {
	if (name == null || name == "") return -1;

	if (players.includes(name)) {
		alert("Não pode nome repetido pq o desenvolvedor está com preguiça de implementar o programa do jeito certo\nTente novamente");
		return -1;
	}
	const table = document.querySelector("#players-table");
	let removebtn = document.createElement("button");

	removebtn.classList.add("rm-btn");
	removebtn.innerText = "❌";

	let row = table.insertRow(index + 1);

	let cell1 = row.insertCell(0);
	let cell2 = row.insertCell(1);
	let cell3 = row.insertCell(2);

	cell1.innerText = index + 1;
	cell2.innerText = name;
	cell3.style.border = "none"
	cell3.appendChild(removebtn);
	removebtn.onclick = () => {
		removePlayer(name);
	};
	players.push(name);
	index++;
}


addPlayer("dudu")
addPlayer("mago")
addPlayer("arruda")
addPlayer("gabriel")

function removePlayer(playerName) {
	let del_index = players.indexOf(playerName);
	if (del_index > -1) {
		players.splice(del_index, 1); // 2nd parameter means remove one item only
	}

	document.querySelector("#players-table").deleteRow(del_index + 1);

	index--; // remove this line and you won't be able to add players again
}

function setWinner(winner) {
	currentWinner = winner;
	console.log(currentWinner);
}

function customPrompt() {
	return new Promise((resolve, reject) => {
		document.querySelector("#btn1").onclick = () => {
			resolve(1); // returns 1 if choosed player 1
		};

		document.querySelector("#btn2").onclick = () => {
			resolve(2); // returns 2 if choosed player 2
		};
	});
}

function renderMatch(player1, player2) {
	// TODO: make query selector stuff
	let gamediv = document.querySelector("#game");
	let versus = document.querySelector("#versus");
	let maindiv = document.querySelector("#main");
	let btn1 = document.querySelector("#btn1");
	let btn2 = document.querySelector("#btn2");
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

		let p1index = 0;
		let p2index = 1;



		// for (let n = 0; n < players.length - 1; n++) {
		// 	let player1 = players[p1index];
		// 	let player2 = players[p2index];

		// 	if (player1 === player2) {
		// 		p2index++;
		// 		continue;
		// 	}
		// 	let winner = await match(player1, player2);
		// 	if (winner == 2)
		// 		p1index = p2index;

		// 	p2index = (p2index + 1) % players.length;

		// }


		// ENDLESS MODE
		while (true) {
			let player1 = players[p1index];
			let player2 = players[p2index];

			if (player1 === player2) {
				p2index++;
				continue;
			}
			let winner = await match(player1, player2);
			if (winner == 2)
				p1index = p2index;

			p2index = (p2index + 1) % players.length;
		}

		console.log(players[p1index])

		document.querySelector("#game").innerHTML = `<h1>🏓🏓🏓<br>O grande ganhador foi:<br><span style="color: lightgreen;">${players[p1index]}</span><br>🏓🏓🏓<h1>`;
	}
}