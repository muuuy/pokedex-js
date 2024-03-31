let pokemon_name = document.querySelector('.pokemon_name');
let img = document.querySelector('.pokemon_sprite');

let pokemonSearch = document.querySelector('#pokemon_search');
let pokemonForm = document.querySelector('.input_form');
let curPokemon = 'pikachu';

const types = {
    fire: '#e63946',
    electric: '#ffbe0b',
    water: '#0077b6',
    grass: '#588157',
    ground: '#d4a373',
    fighting: '#eb5e28',
    ice: '#caf0f8',
    ghost: '#8f2d56',
    psychic: '#f15bb5',
    rock: '#6c584c',
    poison: '#6d597a',
    flying: '#5e4ae3',
    dragon: '#05299e',
    bug: '#ecf39e',
    normal: '#e0e1dd',
    steel: '#c0c0c0',
    fairy: '#ffc6ff',
    dark: '#000000'
};

const fetchPokemon = async () => {
    try {
        const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${curPokemon}/`);
        const data = await pokemon.json();

        console.log(data);

        pokemon_name.textContent = data.name.toUpperCase();
        img.src = data.sprites.front_default
        checkType(data.types[0].type.name);

    } catch (error) {
        pokemonSearch.style.border = '2px solid red';
    }
}

const checkType = (type) => {
    console.log(type)
    pokemon_name.style.setProperty('--type', types[type])
}

pokemonForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    curPokemon = pokemonSearch.value.trim().toLowerCase();
    fetchPokemon();
})