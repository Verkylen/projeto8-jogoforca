import React, { useState } from "react";
import forca0 from "./img/forca0.png";
import forca1 from "./img/forca1.png";
import forca2 from "./img/forca2.png";
import forca3 from "./img/forca3.png";
import forca4 from "./img/forca4.png";
import forca5 from "./img/forca5.png";
import forca6 from "./img/forca6.png";
import palavras from "./palavras";

export default function App() {
    const images = [forca0, forca1, forca2, forca3, forca4, forca5, forca6];
    const alphabet = {'A': 'aáâã', 'B':'b', 'C': 'c', 'D': 'd', 'E': 'eéê', 'F': 'f', 'G': 'g', 'H': 'h', 'I': 'ií', 'J': 'j', 'K': 'k', 'L': 'l', 'M': 'm', 'N': 'n', 'O': 'oóôõ', 'P': 'p', 'Q': 'q', 'R': 'r', 'S': 's', 'T': 't', 'U': 'uúü', 'V': 'v', 'W': 'w', 'X': 'x', 'Y': 'y', 'Z': 'z'};

    let [gallowsStatus, setGallowsStatus] = useState(0);
    let [toggle, setToggle] = React.useState(true);
    let [cursorType, setCursorType] = React.useState('default');
    let [word, setWord] = React.useState([]);
    let [challenge, setChallenge] = React.useState([]);
    let [buttonClass, setButtonClass] = React.useState('Deactivated');
    let [challengeColor, setChallengeColor] = React.useState('');

    function start() {
        setGallowsStatus(0);
        setToggle(false);
        setCursorType('pointer');
        const randomWord = palavras[Math.floor(Math.random()*palavras.length)].split('');
        setWord(randomWord);
        setChallenge(randomWord.map(({}, index) => <span key={index}>_</span>));
        setButtonClass('Activated');
    }

    function compare(letter) {
        const newChallenge = [...challenge];

        for (let i = 0; i < word.length; i++) {
            if ( alphabet[letter].includes(word[i]) ) {
                newChallenge[i] = <span key={i} style={{fontWeight: 'bold'}}>{word[i]}</span>;
            }
        }

        if (JSON.stringify(newChallenge) === JSON.stringify(challenge)) {
            setGallowsStatus(gallowsStatus + 1);

            if (gallowsStatus === 5) {
                setChallenge(word.map((letter, index) => <span key={index}>{letter}</span>));
                setChallengeColor('red');
                setToggle(true);
                setButtonClass('Deactivated');
                setCursorType('default');
            }
        } else if ( newChallenge.filter(element => element.props.children === '_').length !== 0 ) {
            setChallenge(newChallenge);
        } else {
            setChallenge(word.map((letter, index) => <span key={index}>{letter}</span>));
            setChallengeColor('green');
            setToggle(true);
            setButtonClass('Deactivated');
            setCursorType('default');
        }
    }

    function GenerateLetters(props) {
        let [off, setOff] = React.useState(false);
        let [buttonStyle, setButtonStyle] = React.useState({});
        const deactivatedButton = {backgroundColor: '#9FAAB5', border: 'none', color: '#80818A', cursor: 'default'};

        return (
            <li key={props}><button onClick={() => {setButtonStyle(deactivatedButton); setOff(true); compare(props)}} className={buttonClass} disabled={toggle || off} style={buttonStyle}>{props}</button></li>
        );
    }

    let typed = '';

    function risk() {
        if (typed !== '') {
            setChallenge(word.map((letter, index) => <span key={index}>{letter}</span>));
            setToggle(true);
            setButtonClass('Deactivated');
            setCursorType('default');

            if (JSON.stringify(typed.split('')) === JSON.stringify(word)) {
                setChallengeColor('green');
            } else {
                setGallowsStatus(6);
                setChallengeColor('red');
            }
        }
    }

    return (
        <div className="App">
            <div className="FigureAndWord">
                <img src={images[gallowsStatus]} alt="Forca"/>
                <div>
                    <button onClick={start}>Escolher Palavra</button>
                    <div style={{color: challengeColor}}>{challenge}</div>
                </div>
            </div>
            <div className="Letters">
                <ul>
                    {Object.keys(alphabet).slice(0, 13).map(GenerateLetters)}
                </ul>
                <ul>
                    {Object.keys(alphabet).slice(13, 26).map(GenerateLetters)}
                </ul>
            </div>
            <div className="Attempt"><span>Já sei a palavra!</span><input onChange={(e) => typed = e.target.value} disabled={toggle} type="text"/><button  onClick={risk} disabled={toggle} style={{cursor: cursorType}}>Chutar</button></div>
        </div>
    );
}