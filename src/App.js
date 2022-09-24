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
    const alphabet = {'A': 'aáâã', 'B':'b', 'C': 'c', 'D': 'd', 'E': 'eéê', 'F': 'f', 'G': 'g', 'H': 'h', 'I': 'ií', 'J': 'j', 'K': 'k', 'L': 'l', 'M': 'm', 'N': 'n', 'O': 'oóôõ', 'P': 'p', 'Q': 'q', 'R': 'r', 'S': 's', 'T': 't', 'U': 'uú', 'V': 'v', 'W': 'w', 'X': 'x', 'Y': 'y', 'Z': 'z'};

    let [gallowsStatus, setGallowsStatus] = useState(0);
    let [toggle, setToggle] = React.useState(true);
    let [word, setWord] = React.useState([]);
    let [challenge, setChallenge] = React.useState([]);
    let [backColor, setBackColor] = React.useState('#9FAAB5');
    let [buttonBorder, setButtonBorder] = React.useState('none');
    let [letterColor, setLetterColor] = React.useState('#80818A');
    let [cursorType, setCursorType] = React.useState('default');
    let [challengeColor, setChallengeColor] = React.useState('');

    function start() {
        setGallowsStatus(0);
        setToggle(false);
        const randomWord = palavras[Math.floor(Math.random()*palavras.length)].split('');
        setWord(randomWord);
        setChallenge(randomWord.map(({}, index) => <span key={index}>_</span>));
        setBackColor('#E1ECF4');
        setButtonBorder('1px solid #397EB4');
        setLetterColor('#397EB4');
        setCursorType('pointer');
    }

    function compare(letter) {
        const newChallenge = [...challenge];

        for (let i = 0; i < word.length; i++) {
            if ( alphabet[letter].includes(word[i]) ) {
                newChallenge[i] = <span key={i} style={{fontWeight: 'bold'}}>{word[i]}</span>;
            }
        }

        if (JSON.stringify(newChallenge) === JSON.stringify(challenge)) {
            console.log('wrong');
            setGallowsStatus(gallowsStatus + 1);

            if (gallowsStatus === 5) {
                setChallenge(word.map((letter, index) => <span key={index}>{letter}</span>));
            }
        } else if ( newChallenge.filter(element => element.props.children === '_').length !== 0 ) {
            console.log('foretell');
            setChallenge(newChallenge);
        } else {
            setChallenge(word.map((letter, index) => <span key={index}>{letter}</span>));
            setChallengeColor('green');
        }
    }

    function GenerateLetters(props) {
        let [off, setOff] = React.useState(false);

        return (
            <li key={props}><button onClick={() => {setOff(true); compare(props)}} disabled={toggle || off} style={{backgroundColor: backColor, border: buttonBorder, color: letterColor, cursor: cursorType}}>{props}</button></li>
        );
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
            <div className="Attempt"><span>Já sei a palavra!</span><input type="text" disabled={toggle}/><button disabled={toggle} style={{cursor: cursorType}}>Chutar</button></div>
        </div>
    );
}