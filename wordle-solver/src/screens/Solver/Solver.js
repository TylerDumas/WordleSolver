import "./Solver.css";
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from "react-router-dom";
import PinField from "react-pin-field"
import cn from "classnames";
import LetterTile from "../../components/LetterTile/LetterTile";
import { alphabet } from "../../util/alphabet";
import { ReactComponent as BackButton } from "../../assets/images/back-button.svg";
import { Colors } from "../../util/constants";
const words = require('an-array-of-english-words')

// The Main Puzzle Solving page.
const Solver = () => {
    const { state } = useLocation();    // Read values passed on state
    const { letterOption } = state; // How many letters are we solving for?
    const [pinVal, setPinVal] = useState({});    // value of the pin input (puzzle solver)
    const [suggestions, setSuggestions] = useState([]); // possible matches
    const [hasInitialized, setHasInitialized] = useState(false);
    const [possibleLetters, setPossibleLetters] = useState({...alphabet})
    const pinRef = useRef();

    // Called on initialization
    useEffect(() => {
        let temp = {}
        let i = 0;
        while(i < letterOption.value){  // set pin val to empty strings
            temp[i] = '';
            i++;
        }
        setPinVal(temp);
        setHasInitialized(true);
    }, [])

    // Called whenever a letter is typed.
    useEffect(() => {
        if(hasInitialized){ // this runs only from the 2nd render onwards.
            let matches = []
            words.filter(d => d.length === letterOption.value).forEach((word, index) => {
                let chars = word.split(''); // Split the word into a char array
                let isMatch = true; // If any character is wrong, it's not a match
                let i = 0;
                for(let [letter, toggled] of Object.entries(possibleLetters)){
                    if(toggled && String(word).toLowerCase().includes(letter.toLowerCase())){   // check if word contains eliminated letter
                        isMatch = false;
                        break;
                    }
                }
               if(isMatch){
                   for(let char of chars){
                       if(pinVal[i] && pinVal[i].length && char.toLowerCase() !== pinVal[i].toLowerCase()){
                           isMatch = false
                           break;
                       }
                       i++;
                   }
               }
                if(isMatch){
                    matches.push(word)
                }
            })
            setSuggestions(matches)
        }
    }, [pinVal, possibleLetters])

    const toggleEliminated = (char) => {
        let temp = {...possibleLetters}
        temp[char] = !temp[char]
        setPossibleLetters(temp)
    }

    return (
        <div className="container">
            <div className="header">
                <a href={'/'} className={"back-button"}>
                    <BackButton style={{width: 40, height: 40}} />
                </a>
                <h1
                    style={{
                        textAlign: 'center',
                        color: Colors.black,
                        fontFamily: "\"Trebuchet MS\", serif, sans-serif"
                    }}
                >
                    Solve for a {letterOption.value} letter Puzzle
                </h1>
                <div /> {/* empty div for flex spacing*/}
            </div>
            <div className="pin-field-container">
                <PinField
                    ref={pinRef}
                    length={letterOption.value}
                    onChange={(code) => {
                        let temp = {...pinVal}
                        pinRef.current.forEach((input, index) => temp[index] = input.value)
                        setPinVal(temp)
                    }}
                    format={k => k.toUpperCase()}
                    autoFocus
                    validate={/^[A-Za-z]*$/}
                    className={cn("pin-field")}
                />
            </div>
            <div className="letter-tile-container">
                {
                    Object.entries(possibleLetters).map(([k,v], index) => {
                        return (
                            <LetterTile key={index} letter={k} eliminated={v} toggleEliminated={toggleEliminated} />
                        )
                    })
                }
            </div>

            <h3 style={{textAlign: 'center', color: Colors.black, fontFamily: '"Trebuchet MS", serif, sans-serif'}}>It Could Be:</h3>
            <div className="scroller">
                {
                    suggestions.length ? suggestions.map((item, index) => {
                            if(item){
                                return (
                                    <div key={item + index} className={'item'}>
                                        <p style={{textAlign: 'center', color: Colors.black}}>
                                            {String(item).toUpperCase()}
                                        </p>
                                    </div>)
                            }else{
                                return null
                            }
                        })
                        :
                        <p style={{textAlign: 'center', color: Colors.red}}>No matches.</p>
                }
            </div>
        </div>
    )
}

export default Solver;