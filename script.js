import { types, fontTypes } from './modules/types.js';
import { fetchMoves } from './modules/moves.js';

let container = document.querySelector('.container');
let intro = document.querySelector('.intro');

let navHome = document.querySelector('.home');
let navPokedex = document.querySelector('.pokedex');
let navAbout = document.querySelector('.about');

let pokemon_name = document.querySelector('.pokemon_name');
let imgFront = document.querySelector('.front_sprite');
let imgBack = document.querySelector('.back_sprite');

let pokemonSearch = document.querySelector('#pokemon_search');
let pokemonForm = document.querySelector('.input_form');
let curPokemon = 'pikachu';

let typeContainer = document.querySelector('.type_container');
let typeDiv = document.querySelector('.types');

let abilitiesContainer = document.querySelector('.abilities_container');
let abilitiesDiv = document.querySelector('.abilities');

let pokemonInfo = document.querySelector('.info_container');
let pokemonHeight = document.querySelector('.height');
let pokemonWeight = document.querySelector('.weight');

let movesContainer = document.querySelector('.moves_container');
let movesButton = document.querySelector('.moves_button');
let movesTable = document.querySelector('.moves_table');

let statsContainer = document.querySelector('.stats_container');
let statsHp = document.querySelector('.input_hp');
let statsAttack = document.querySelector('.input_attack');
let statsDefense = document.querySelector('.input_defense');
let statsSAttack = document.querySelector('.input_sattack');
let statsSDefense = document.querySelector('.input_sdefense');
let statsSpeed = document.querySelector('.input_speed');

let images = [['', ''], ['', '']];
let currIndex = 0;
const intervalTime = 15000;

navHome.addEventListener("click", () => {
    window.location.href='/home.html';
});

navPokedex.addEventListener("click", () => {
    window.location.href='/index.html';
});

navAbout.addEventListener("click", () => {
    window.location.href = 'about.html';
});

movesButton.addEventListener('click', () => {
    let displayStyle = window.getComputedStyle(movesTable).getPropertyValue('display');
    
    if(displayStyle == 'none') {
        movesTable.style.display = 'flex';
        movesButton.textContent = 'Hide Moves';
    } else {
        movesTable.style.display = 'None';
        movesButton.textContent = 'Show Moves';
    }
});

const fetchPokemon = async () => {
    try {
        const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${curPokemon}/`);
        const data = await pokemon.json();

        abilitiesDiv.textContent = '';
        removeTypes();
        pokemonInfo.style.display = 'flex';
        movesContainer.style.display = 'flex';
        statsContainer.style.display = 'grid';
        container.style.backgroundImage = 'none';
        intro.style.display = 'none';
        
        console.log(data);

        pokemon_name.textContent = data.name.toUpperCase();

        images[0][0] = data.sprites.front_default;
        images[0][1] = data.sprites.back_default;
        images[1][0] = data.sprites.front_shiny;
        images[1][1] = data.sprites.back_shiny;

        imgFront.src = images[0][0];
        imgBack.src = images[0][1];

        checkType(data.types[0].type.name);
        populateTypes(data.types);
        populateMoves(data.moves);
        populateAbilities(data.abilities);
        setHeightWeight(data.weight, data.height);
        populateStats(data.stats)

        // fetchMoves(data.moves[0].move.url, movesTable.getElementsByTagName('tbody')[0]);

    } catch (error) {
        pokemonSearch.style.border = '2px solid red';
    }
}

const populateStats = (stats) => {
    statsHp.textContent = stats[0].base_stat;
    statsAttack.textContent = stats[1].base_stat;
    statsDefense.textContent = stats[2].base_stat;
    statsSAttack.textContent = stats[3].base_stat;
    statsSDefense.textContent = stats[4].base_stat;
    statsSpeed.textContent = stats[5].base_stat;
}

const animateImage = () => {
    currIndex = (currIndex + 1) % images.length;

    imgFront.src = images[currIndex][0]
    imgBack.src = images[currIndex][1]
}
setInterval(animateImage, 10000);

const checkType = (type) => {
    pokemon_name.style.setProperty('--type', types[type])
}

pokemonForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    curPokemon = pokemonSearch.value.trim().toLowerCase();
    fetchPokemon();
})

const populateTypes = (pokeTypes) => {    
    typeContainer.style.display = 'flex';
    
    pokeTypes.map((type) => {
        let tempType = document.createElement('p');
        tempType.textContent = capitalize(type.type.name);
        tempType.classList.add('pokemon_type');
        
        tempType.style.setProperty('--type', types[type.type.name]);
        tempType.style.setProperty('--font-type', fontTypes[type.type.name]);

        typeDiv.appendChild(tempType)
    })
}

const removeTypes = () => {
    typeContainer.style.display = 'none';
    
    while(typeDiv.firstChild != null) {
        typeDiv.removeChild(typeDiv.firstChild);
    }
}

const populateAbilities = (abilities) => {
    abilitiesContainer.style.display = 'flex';
    
    abilities.map((ability) => {
        let currAbility = ability.ability.name;
        currAbility = currAbility.split('-');

        currAbility = currAbility.map((e) => {
            return capitalize(e);
        })

        currAbility = currAbility.join(' ');

        let tempAbility = document.createElement('a');
        tempAbility.textContent = currAbility;
        tempAbility.href = ability.ability.url

        abilitiesDiv.appendChild(tempAbility);
    })
}

const setHeightWeight = (weight, height) => {
    
    weight= (weight * 0.1).toFixed(2);
    height = (height * 0.1).toFixed(2);

    pokemonWeight.textContent = `${weight} kg`;
    pokemonHeight.textContent = `${height} m`;
}

const populateMoves = (moves) => {

    moves.map((move, index) => {

        let currMove = move.move.name;
        currMove = currMove.split('-');

        currMove = currMove.map((e) => {    
            return capitalize(e)
        })
        
        currMove = currMove.join(' ')

        fetchMoves(currMove, move.move.url, movesTable.getElementsByTagName('tbody')[0]);
    })
}

export const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}