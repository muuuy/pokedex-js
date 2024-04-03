import { capitalize } from "../script.js";
import { types, fontTypes, status } from './types.js';

export const fetchMoves = async (formattedName, url, table) => {
    try {
        let moves = await fetch(url);
        let movesData = await moves.json();

        let tempRow = document.createElement('tr');

        let tempName = document.createElement('td');
        tempName.textContent = formattedName;
        let tempType = document.createElement('td');
        tempType.textContent = capitalize(movesData.type.name);
        let tempDamage = document.createElement('td');
        tempDamage.textContent = capitalize(movesData.damage_class.name);
        let tempPower = document.createElement('td');
        tempPower.textContent = movesData.power
        let tempPp = document.createElement('td');
        tempPp.textContent = movesData.pp;

        tempRow.appendChild(tempName);
        tempRow.appendChild(tempType);
        tempRow.appendChild(tempDamage);
        tempRow.appendChild(tempPower);
        tempRow.appendChild(tempPp);

        tempType.style.backgroundColor = types[movesData.type.name];
        tempType.style.color = fontTypes[movesData.type.name];
        tempDamage.style.backgroundColor = status[movesData.damage_class.name];

        table.appendChild(tempRow)

    } catch (error) {
        console.log('something went wrong w/ moves');
        console.log(error)
    }
}