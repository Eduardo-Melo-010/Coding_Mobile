const API_KEY = "d37d6bee-2ac1-45fe-9c49-eab0c5c6a191"; 

const form = document.getElementById("search");
const playerNameInput = document.getElementById("player_name");

const playerNameEl = document.getElementById("player-name");
const teamEl = document.getElementById("team");
const positionEl = document.getElementById("position");
const draftNumberEl = document.getElementById("draft_number");
const draftYearEl = document.getElementById("draft_year");
const alertEl = document.getElementById("alert");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const playerName = playerNameInput.value.trim();

    if (!playerName) {
        alertEl.textContent = "Digite o nome de um jogador!";
        return;
    }

    alertEl.textContent = "Buscando...";
    document.getElementById("player-info").style.display = "none";

    try {
        const response = await fetch(`https://api.balldontlie.io/v1/players?search=${playerName}`, {
            headers: { "Authorization": API_KEY }
        });

        if (!response.ok) throw new Error(`Erro na API: ${response.status}`);

        const data = await response.json();

        if (data.data.length === 0) {
            alertEl.textContent = "Nenhum jogador encontrado.";
            return;
        }

        const player = data.data[0];

       
        playerNameEl.textContent = `${player.first_name} ${player.last_name}`;
        teamEl.textContent = player.team.full_name;
        positionEl.textContent = player.position || "Desconhecido";

       
        draftNumberEl.textContent = player.draft_number || "Desconhecido"; // placeholder
        draftYearEl.textContent = player.draft_year || "Desconhecido";

        alertEl.textContent = "";
        document.getElementById("player-info").style.display = "block";

    } catch (err) {
        console.error(err);
        alertEl.textContent = "Ocorreu um erro ao buscar o jogador.";
        document.getElementById("player-info").style.display = "none";
    }
});
