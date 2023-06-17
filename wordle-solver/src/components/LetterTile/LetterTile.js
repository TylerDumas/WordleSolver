import React from 'react';
import './LetterTile.css'
import { Colors } from "../../util/constants";

const LetterTile = ({letter, eliminated, toggleEliminated}) => {

    return (
        <button
            type="button"
            className={'button'}
            onClick={() => toggleEliminated(letter)}
            style={{
                background: eliminated ? Colors.red : Colors.green,
            }}
        >
            {letter}
        </button>
    )
}

export default LetterTile;