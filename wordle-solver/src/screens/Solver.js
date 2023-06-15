import "./Solver.css";
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from "react-router-dom";
import PinField from "react-pin-field"
import cn from "classnames";
const words = require('an-array-of-english-words')


const Solver = () => {
    const { state } = useLocation();
    const { letterOption } = state; // Read values passed on state
    const [pinVal, setPinVal] = useState({})
    const [suggestions, setSuggestions] = useState([]);
    const pinRef = useRef();
    const [hasInited, setHasInited] = useState(false)

    useEffect(() => {
        let temp = {}
        let i = 0;
        while(i < letterOption.value){
            temp[i] = '';
            i++;
        }
        setPinVal(temp)
        setHasInited(true)
    }, [])

    useEffect(() => {
        if(hasInited){
            let wordsWithRightLength = words.filter(d => d.length === letterOption.value)
            let matches = []
            wordsWithRightLength.forEach((item, index) => {
                let chars = item.split('');
                let isMatch = true;
                let i = 0;
                for(let char of chars){
                    if(pinVal[i] && pinVal[i].length && char.toLowerCase() !== pinVal[i].toLowerCase()){
                        isMatch = false
                    }
                    i++;
                }
                if(isMatch){
                    matches.push(item)
                }
            })
            setSuggestions(matches)
        }
    }, [pinVal])

    return (
        <div style={{overflowY: 'hidden', width: '100%', height: '100%', backgroundColor: '#2b436c', padding: 10, display: 'flex', flexDirection: 'column',alignItems: 'center',}}>
            <div style={{width: '100%', display:"flex", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <a href={'/'}>back</a>
                <h1 style={{textAlign: 'center', color: '#fff'}}>Solve for a {letterOption.value} letter puzzle.</h1>
                <div/>
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

            <div>
                <h3 style={{textAlign: 'center', color: '#fff'}}>It Could Be:</h3>
                <div className="scroller">
                    {
                        suggestions && suggestions.length ? suggestions.map((item, index) => {
                                return (
                                    <div key={item + index} className={'item'}>
                                        <p style={{textAlign: 'center', color: '#fff'}}>
                                            {item}
                                        </p>
                                    </div>)
                            })
                            :
                            <p style={{textAlign: 'center', color: '#fff'}}>No matches.</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default Solver;