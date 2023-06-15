import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import Select from 'react-select';

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
        <div style={{width: '100%', height: '100%', backgroundColor: '#2b436c', padding: 10, justifyContent: 'center'}}>
            <h1 style={{color: '#fff', textAlign: 'center'}}>Wordle Solver</h1>
            <h3 style={{color: '#fff', textAlign: 'center'}}>Welcome!</h3>
            <h3 style={{color: '#fff', textAlign: 'center'}}>How many letters are in the puzzle?</h3>
            <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
                <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                />
                <div style={{marginTop: 50}}/>
                <button
                    onClick={() => navigate('/solver', { state: { letterOption: selectedOption } } )}
                    style={{
                        border:"none",
                        color:'#87b4ff',
                        height : "50px",
                        borderRadius : "5%",
                        width : "200px",
                    }}
                >
                    <h4 style={{fontWeight: 'bold', color: '#000'}}>Go</h4>
                </button>
            </div>
        </div>
    )
}

export default Home;