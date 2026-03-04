function filterGames() {
    const term = document.getElementById('gameSearch').value.toLowerCase();
    const filtered = games.filter(g => g.name.toLowerCase().includes(term));
    const grid = document.getElementById('gameGrid');
    grid.innerHTML = filtered.map(game => createCard(game)).join('');
}

const games = [
    { id: 1, name: "Asteroid Avoidance", file: "Asteroid.html", icon: "☄️" },
    { id: 2, name: "Brick Breaker", file: "BrickBreaker.html", icon: "🧱" },
    { id: 3, name: "Cyberpunk Runner", file: "Cyberpunk.html", icon: "🌃" },
    { id: 4, name: "Falling Blocks", file: "FallingBlocks.html", icon: "📦" },
    { id: 5, name: "Neon Brawler", file: "fight.html", icon: "🥊" },
    { id: 6, name: "Cyber Strike", file: "fight2.html", icon: "⚔️" },
    { id: 7, name: "Flappy Bird", file: "FlappyBird.html", icon: "🐦" },
    { id: 8, name: "Helicopter Sim", file: "helicopter.html", icon: "🚁" },
    { id: 9, name: "Neon Jump", file: "Jump.html", icon: "🏃" },
    { id: 10, name: "Maze Hacker", file: "Maze.html", icon: "🕵️" },
    { id: 11, name: "Tactical Breach 1", file: "Maze3.html", icon: "🧩" },
    { id: 12, name: "Tactical Breach 2", file: "Maze4.html", icon: "🧩" },
    { id: 13, name: "Mobile Breach", file: "Maze5.html", icon: "📱" },
    { id: 14, name: "Master Memory", file: "MemoryCard.html", icon: "🧠" },
    { id: 15, name: "Neon Whack", file: "Mole.html", icon: "🔨" },
    { id: 16, name: "Retro Pong", file: "Pong.html", icon: "🏓" },
    { id: 17, name: "Elite Puzzle", file: "puzzle.html", icon: "🧩" },
    { id: 18, name: "Aim Trainer", file: "Shooting.html", icon: "🎯" },
    { id: 19, name: "Neon Snake", file: "Snake.html", icon: "🐍" },
    { id: 20, name: "Space Shooter", file: "SpaceShooter.html", icon: "🚀" }
];

let favorites = JSON.parse(localStorage.getItem('favGames')) || [];

function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
    if(sectionId === 'games') renderGames();
    if(sectionId === 'favorites') renderFavorites();
}

function renderGames() {
    const grid = document.getElementById('gameGrid');
    grid.innerHTML = games.map(game => createCard(game)).join('');
}

function createCard(game) {
    const isFav = favorites.includes(game.id) ? 'fas' : 'far';
    return `
        <div class="game-card">
            <div style="font-size: 50px;">${game.icon}</div>
            <h3>${game.name}</h3>
            <button class="play-btn" onclick="playGame('${game.file}')">PLAY NOW</button>
            <i class="${isFav} fa-heart" onclick="toggleFav(${game.id})" style="margin-left:10px; cursor:pointer; color:red"></i>
        </div>
    `;
}

function playGame(file) {
    document.getElementById('gameFrame').src = file;
    document.getElementById('gameModal').style.display = 'block';
}

function closeGame() {
    document.getElementById('gameModal').style.display = 'none';
    document.getElementById('gameFrame').src = '';
}

function toggleFav(id) {
    if(favorites.includes(id)) {
        favorites = favorites.filter(favId => favId !== id);
    } else {
        favorites.push(id);
    }
    localStorage.setItem('favGames', JSON.stringify(favorites));
    renderGames();
    renderFavorites();
}

function renderFavorites() {
    const grid = document.getElementById('favoriteGrid');
    const favList = games.filter(g => favorites.includes(g.id));
    if(favList.length === 0) {
        grid.innerHTML = '<p>No favorites yet. Go to Games and click the heart!</p>';
    } else {
        grid.innerHTML = favList.map(game => createCard(game)).join('');
    }
}

// Initialize

renderGames();