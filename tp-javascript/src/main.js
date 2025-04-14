const searchInput = document.getElementById('search');
const characterList = document.getElementById('character-list');
const errorMessage = document.getElementById('error-message');

let allCharacters = [];

async function getCharacters() {
    try {
        const response = await fetch('https://rickandmortyapi.com/api/character');
        if (!response.ok) throw new Error('Error en la respuesta de la API');

        const data = await response.json();
        allCharacters = data.results;
        renderCharacters(allCharacters);
        errorMessage.style.display = 'none';
    } catch (error) {
        handleError('Error al cargar los personajes. Intenta recargar la página.');
        console.error('Error fetching characters:', error);
    }
}

function renderCharacters(characters) {
    characterList.innerHTML = '';

    if (characters.length === 0) {
        characterList.innerHTML = '<p class="no-results">No se encontraron personajes</p>';
        return;
    }

    characters.forEach(character => {
        const characterCard = document.createElement('div');
        characterCard.className = 'character-card';
        characterCard.innerHTML = `
            <img class="character-image" 
                 src="${character.image}" 
                 alt="${character.name}">
            <div class="character-info">
                <h3 class="character-name">${character.name}</h3>
                <p class="character-species">${character.species}</p>
            </div>
        `;
        characterList.appendChild(characterCard);
    });
}

function handleError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    characterList.innerHTML = '';
}

function filterCharacters(searchTerm) {
    const filtered = allCharacters.filter(character =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    filtered.length > 0 ? renderCharacters(filtered) : renderCharacters([]);
}

searchInput.addEventListener('input', (e) => {
    filterCharacters(e.target.value.trim());
});

document.addEventListener('DOMContentLoaded', () => {
    getCharacters();
});