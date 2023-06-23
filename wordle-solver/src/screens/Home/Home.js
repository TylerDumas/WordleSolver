import './Home.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { Colors } from "../../util/constants";

// The Home page/# of Letters selector
const Home = () => {

    const navigate = useNavigate();
    // possible number of letters in the puzzle (options for select)
    const [selectedOption, setSelectedOption] = useState(null);
    const options = [
        { value: 4, label: 'Four' },
        { value: 5, label: 'Five' },
        { value: 6, label: 'Six' },
        { value: 7, label: 'Seven' },
        { value: 8, label: 'Eight' },
    ];

    return (
        <div className="container">
            <h1 className="header-text">Wordle Solver</h1>
            <h3 className="header-text">Welcome!</h3>
            <h3 className="header-text">How many letters are in the puzzle?</h3>
            <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
                <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 5,
                        colors: {
                            ...theme.colors,
                            primary25: Colors.green,
                            primary: 'black',
                        },
                    })}
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            backgroundColor: Colors.green,
                            borderColor: Colors.black,
                            color: Colors.black,
                        }),
                        placeholder: (baseStyles, state) => ({
                            ...baseStyles,
                            color: Colors.black,
                        }),
                    }}
                />
                <div style={{marginTop: 50}}/>
                <button
                    onClick={() => navigate('/solver', { state: { numLetters: selectedOption } } )}
                    className="button"
                    type="button"
                    style={{width: '200px',height: '50px'}}
                    disabled={!selectedOption}
                >
                    Go
                </button>
            </div>
        </div>
    )
}

export default Home;