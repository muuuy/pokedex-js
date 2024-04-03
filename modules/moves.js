import { capitalize } from "../script.js";
import { types, fontTypes } from './types.js';

export const fetchMoves = async (formattedName, url, table) => {
    try {
        let moves = await fetch(url);
        let movesData = await moves.json();

        let tempRow = document.createElement('tr');

        let tempName = document.createElement('td');
        tempName.textContent = formattedName;
        let tempType = document.createElement('td');
        tempType.textContent = capitalize(movesData.type.name);

        tempRow.appendChild(tempName);
        tempRow.appendChild(tempType);

        tempType.style.backgroundColor = types[movesData.type.name];
        tempType.style.color = fontTypes[movesData.type.name];

        table.appendChild(tempRow)

    } catch (error) {
        console.log('something went wrong w/ moves');
        console.log(error)
    }
}