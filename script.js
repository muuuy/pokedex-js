let tester = document.querySelector('.test');
let img = document.querySelector('.test2');

const fetchPokemon = async () => {
    const pokemon = await fetch('https://pokeapi.co/api/v2/pokemon/1/');
    const data = await pokemon.json();

    console.log(data);

    tester.textContent = data.name
    img.src=data.sprites.front_default
}

fetchPokemon();