let pokemon_name = document.querySelector('.pokemon_name');
let img = document.querySelector('.pokemon_sprite');

let pokemonSearch = document.querySelector('#pokemon_search');
let pokemonForm = document.querySelector('.input_form');
let curPokemon = 'pikachu';

const fetchPokemon = async () => {
    try {
        const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${curPokemon}/`);
        const data = await pokemon.json();

        console.log(data);

        pokemon_name.textContent = data.name.toUpperCase();
        img.src = data.sprites.front_default
        
    } catch (error) {
        pokemonSearch.style.border = '2px solid red';
    }
}


pokemonForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    curPokemon = pokemonSearch.value.trim().toLowerCase();
    fetchPokemon();
})