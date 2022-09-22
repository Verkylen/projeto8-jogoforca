import React from "react";
import forca0 from "./img/forca0.png";
import forca1 from "./img/forca1.png";
import forca2 from "./img/forca2.png";
import forca3 from "./img/forca3.png";
import forca4 from "./img/forca4.png";
import forca5 from "./img/forca5.png";
import forca6 from "./img/forca6.png";
import palavras from "./palavras";

export default function App() {
    const lettersPartOne = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
    const lettersPartTwo = ['N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    return (
        <div className="App">
            <div className="FigureAndWord">
                <img src={forca0} alt="Forca"/>
                <div>
                    <button>Escolher Palavra</button>
                    <span></span>
                </div>
            </div>
            <div className="Letters">
                <ul>
                    {lettersPartOne.map((letter, index) => <li key={index}><button>{letter}</button></li>)}
                </ul>
                <ul>
                    {lettersPartTwo.map((letter, index) => <li key={index + 13}><button>{letter}</button></li>)}
                </ul>
            </div>
            <div className="Attempt"><span>Já sei a palavra!</span><input type="text"/><button>Chutar</button></div>
        </div>
    );
}