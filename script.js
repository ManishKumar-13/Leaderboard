let players = [];
let isPopupOpen = false;

function openAddPlayerWindow() {
    if (isPopupOpen) {
        return; // Don't open a new pop-up if one is already open
    }

    isPopupOpen = true;
    
    const popup = document.createElement('div');
    popup.classList.add('popup');

    popup.innerHTML = `
        <div class="popup-header">
            <h2>Add Player</h2>
            <span class="close-icon" onclick="closePopup()">X</span>
        </div>
        <div class="popup-body">
            <input type="text" id="playerName" placeholder="Player Name">
            <input type="number" id="playerScore" placeholer="Player Score">
            <button onclick="addPlayer()">ADD</button>
        </div>
    `;

    console.log(popup);
    console.log('3');
    document.body.appendChild(popup);
}

function closePopup() {
    isPopupOpen = false;
    document.querySelector('.popup').remove();
}


function addPlayer() {
    console.log("hi");
    const playerName = document.getElementById('playerName').value;
    const playerScore = parseInt(document.getElementById('playerScore').value);
    if (playerName && !isNaN(playerScore)) {
        players.push({ name: playerName, score: playerScore });
        updateLeaderboard();
        closePopup();
    } else {
        alert('Please enter a valid player name and score.');
    }
}

function updateScore(index, points) {
    players[index].score += points;
    updateLeaderboard();
}

function deletePlayer(index, points) {
    players.splice(index, 1);
    updateLeaderboard();
}

function updateLeaderboard() {
    players.sort((a, b) => b.score - a.score); // Sort players array by score in descending order
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = '';

    var block = document.getElementById("heading");
    block.style.display = "block";

    players.forEach((player, index) => {
        const row = document.createElement('tr');
        const heading = document.createElement('h1');
        row.innerHTML = `
            <td>${index + 1}</td> <!-- Add 1 to index to start from 1 instead of 0 -->
            <td>${player.name}</td>
            <td>${player.score}</td>
            <td>
                <button onclick="updateScore(${index}, 1)">+1</button>
                <button onclick="updateScore(${index}, -1)">-1</button>
                <button onclick="updateScore(${index}, 5)">+5</button>
                <button onclick="updateScore(${index}, -5)">-5</button>
                <button onclick="deletePlayer(${index})"><i class="fas fa-trash delete-icon"></i></button>
            </td>
        `;
        playerList.appendChild(row);
    });
}