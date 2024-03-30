let tester = document.querySelector('.test');
let img = document.querySelector('.test2');

let pokemonSearch = document.querySelector('#pokemon-search');
let pokemonForm = document.querySelector('.input-form');
let curPokemon = 'pikachu';

const fetchPokemon = async () => {
    try {
        const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${curPokemon}/`);
        const data = await pokemon.json();

        console.log(data);

        tester.textContent = data.name
        img.src=data.sprites.front_default
        
    } catch (error) {
        pokemonSearch.style.border = '2px solid red';
    }
}

pokemonForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    curPokemon = pokemonSearch.value.trim().toLowerCase();
    fetchPokemon();
})