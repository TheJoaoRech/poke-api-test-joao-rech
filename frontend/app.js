const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const pokemonGrid = document.getElementById('pokemonGrid');
const errorBanner = document.getElementById('errorBanner');
const errorMessage = document.getElementById('errorMessage');
const pokemonModal = document.getElementById('pokemonModal');
const pokemonDetails = document.getElementById('pokemonDetails');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentOffset = 0;
const LIMIT = 24;

document.addEventListener('DOMContentLoaded', () => {
    loadPokemons();
    setupEventListeners();
});

function setupEventListeners() {
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentOffset = Math.max(0, currentOffset - LIMIT);
            loadPokemons();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentOffset += LIMIT;
            loadPokemons();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    if (pokemonModal) {
        pokemonModal.addEventListener('click', (e) => {
            if (e.target === pokemonModal) closeModal();
        });
    }
}

async function loadPokemons() {
    try {
        pokemonGrid.innerHTML = '<div class="loading">Loading Pokémons...</div>';
        hideError();

        const data = await api.getList(LIMIT, currentOffset);
        renderPokemonGrid(data);
    } catch (error) {
        pokemonGrid.innerHTML = '';
    }
}

function renderPokemonGrid(pokemons) {
    if (!pokemonGrid) {
        return;
    }

    pokemonGrid.innerHTML = pokemons
        .map((pokemon) => {
            const id = getPokemonId(pokemon.url);
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
            return `
        <div class="pokemon-item" onclick="loadPokemonDetails('${pokemon.name}')">
          <img src="${imageUrl}" alt="${pokemon.name}" class="pokemon-image" onerror="this.style.display='none'">
          <span class="pokemon-name">${pokemon.name}</span>
        </div>
      `;
        })
        .join('');
}

async function handleSearch(e) {
    e.preventDefault();
    const term = searchInput.value.trim();

    if (!term) return;

    try {
        hideError();
        let pokemon;

        if (/^\d+$/.test(term)) {
            pokemon = await api.getById(parseInt(term));
        } else {
            pokemon = await api.getByName(term.toLowerCase());
        }

        displayPokemonModal(pokemon);
        searchInput.value = '';
    } catch (error) {
        showError(`Pokémon "${term}" not found!`);
    }
}

async function loadPokemonDetails(name) {
    try {
        hideError();
        const pokemon = await api.getByName(name);
        displayPokemonModal(pokemon);
    } catch (error) {
        showError('Failed to load Pokémon details');
    }
}

function displayPokemonModal(pokemon) {
    const typesHTML = pokemon.types
        .map((t) => `<span class="type-badge">${t.type.name}</span>`)
        .join('');

    const abilitiesHTML = pokemon.abilities
        .map((a) => `<li>${a.ability.name}${a.is_hidden ? ' (hidden)' : ''}</li>`)
        .join('');

    pokemonDetails.innerHTML = `
    <h2>${pokemon.name}</h2>
    ${pokemon.sprites.front_default
            ? `<img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="pokemon-detail-image">`
            : ''
        }

    <div class="detail-section">
      <p><strong>ID:</strong> #${pokemon.id}</p>
      <p><strong>Height:</strong> ${(pokemon.height / 10).toFixed(1)} m</p>
      <p><strong>Weight:</strong> ${(pokemon.weight / 10).toFixed(1)} kg</p>
      <p><strong>Base Experience:</strong> ${pokemon.base_experience}</p>
    </div>

    <div class="detail-section">
      <strong>Types:</strong>
      <div class="types-container">${typesHTML}</div>
    </div>

    <div class="detail-section">
      <strong>Abilities:</strong>
      <ul class="abilities-list">${abilitiesHTML}</ul>
    </div>
  `;

    openModal();
}

function openModal() {
    pokemonModal.classList.remove('hidden');
}

function closeModal() {
    pokemonModal.classList.add('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    errorBanner.classList.remove('hidden');
}

function hideError() {
    errorBanner.classList.add('hidden');
}

function getPokemonId(url) {
    return url.split('/').filter(Boolean).pop();
}
