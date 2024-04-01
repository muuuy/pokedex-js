import { types } from './modules/types.js';

let pokemon_name = document.querySelector('.pokemon_name');
let img = document.querySelector('.pokemon_sprite');

let pokemonSearch = document.querySelector('#pokemon_search');
let pokemonForm = document.querySelector('.input_form');
let curPokemon = 'pikachu';

let typeContainer = document.querySelector('.type_container');
let typeDiv = document.querySelector('.types');

let moveContainer = document.querySelector('.moves_container');
let movesHeader = document.querySelector('#moves_header');
let movesContent = document.querySelector('#moves_content');

const fetchPokemon = async () => {
    try {
        const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${curPokemon}/`);
        const data = await pokemon.json();

        movesContent.textContent = '';
        removeTypes();

        console.log(data);

        pokemon_name.textContent = data.name.toUpperCase();
        img.src = data.sprites.front_default

        checkType(data.types[0].type.name);
        populateTypes(data.types);
        populateMoves(data.moves);

    } catch (error) {
        pokemonSearch.style.border = '2px solid red';
    }
}

const checkType = (type) => {
    pokemon_name.style.setProperty('--type', types[type])
}

pokemonForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    curPokemon = pokemonSearch.value.trim().toLowerCase();
    fetchPokemon();
})

const populateTypes = (types) => {    
    typeContainer.style.display = 'flex';
    
    types.map((type) => {
        let tempType = document.createElement('p');
        tempType.textContent = capitalize(type.type.name);
        tempType.classList.add('pokemon_type');

        typeDiv.appendChild(tempType)
    })
}

const removeTypes = () => {
    typeContainer.style.display = 'none';
    
    while(typeDiv.firstChild != null) {
        typeDiv.removeChild(typeDiv.firstChild);
    }
}

const populateMoves = (moves) => {

    movesHeader.style.display = "block";

    moves.map((move, index) => {

        let currMove = move.move.name;
        currMove = currMove.split('-');

        currMove = currMove.map((e) => {    
            return capitalize(e)
        })
        
        currMove = currMove.join(' ')

        if(index !== moves.length - 1) {
            movesContent.textContent += `${currMove}, `;
        } else {
            movesContent.textContent += `and ${currMove}.`;
        }
    })
}

const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}