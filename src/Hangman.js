import React, { useState } from "react";
import './Hangman.css'
import img0 from './0.jpg'
import img1 from './1.jpg'
import img2 from './2.jpg'
import img3 from './3.jpg'
import img4 from './4.jpg'
import img5 from './5.jpg'
import img6 from './6.jpg'
import { randomWord } from "./words";

function Hangman(){
    const maxWrong = 6
    const images = [img0, img1, img2, img3, img4, img5, img6]
    // const nWrong = 0
    // const guessed = new Set()
    // const answer = 'apple'

    const [guessed, setGuessed] = useState(new Set());
    const [nWrong , setNWrong] = useState(0);
    const [answer, setAnswer] = useState(randomWord);
    const [sucess, setSucess] = useState(0)
    // console.log(answer) erro no console resolvido

    

    function imgAlt(){
        const ltr = 0
        const alt = guessed.has(ltr) ? ltr : 'Wrong '+nWrong+' out of '+maxWrong
        return alt
    }

    function wrongGuess(){
        const ltr = 0
        const wrong = guessed.has(ltr) ? ltr : 'Guessing Wrong: '+ nWrong;
        return wrong
    }

    function guessedWord(){
        const lines = answer.split('').map(ltr => (guessed.has(ltr) ? ltr : '_'))
       return lines
        
    }

    function handleGuess(evt){
        let ltr = evt.target.value;
        setGuessed(guessed.add(ltr))
        setNWrong(nWrong + (answer.includes(ltr) ? 0 : 1))
        setSucess( sucess + (answer.includes(ltr) ? 1 : 0))
    }


    function generateButtons(){
        const keyboard = 'abcdefghijklmnopqrstuvwxyz'.split('').map(ltr => (
            <button
            className='button'
            onClick={handleGuess}
            disabled={guessed.has(ltr)}
            value={ltr}
            key={ltr}
            >
                {ltr}
            </button>
        ))
        return keyboard
    }

    function loser(){
        const lost = nWrong < maxWrong ? <p className='Hangman-btns'>{generateButtons()}</p>
        : <h1 className='loser'>You Lost!</h1>
        return lost
    }

    function winner(){
        const won = guessedWord().join('') === answer ? <h1 className='win'>You won!</h1>
        : <p className='Hangman-btns'>{generateButtons()}</p>
        return won
    }

    function winnerOrLoser(){
        const wonOrLost = guessedWord().join('') === answer ?
        winner()
        : loser()
        return wonOrLost
    }

    function clickRestart(){
        setGuessed(new Set());
        setNWrong(0);
        setAnswer(randomWord);
    }

    function restartButton(){
        if(guessedWord().join('') === answer){
            return <button className='restart' onClick={clickRestart} type='submit'>Restart</button>
            // console.log('button ganhador');
            
        }else if(nWrong >= maxWrong){
            return <button className='restart' onClick={clickRestart} type='submit'>Restart</button>
            // console.log('button perdedor');
        }   
    }

    return(
        <>
            <div className='Hangman'>
                <h1>Hangman</h1>
                <img src={images[nWrong]} alt={imgAlt()} />
                <p>{wrongGuess()}</p>
                {nWrong < maxWrong ? <p className='Hangman-word'>{guessedWord()}</p> : <h2>{answer}</h2> }
                <div className='container-btn'>
                    {winnerOrLoser()}
                    {restartButton()}
                </div>
            </div>
                
        </>
    )
}

export default Hangman;