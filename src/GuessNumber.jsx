import React, { useState } from 'react'

function GuessNumber() {
    const [count, setCount] = useState(0);
    const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random()*100)+1);
    const [guess, setGuess] = useState("");
    const [message, setMessage] = useState("Guess a number between 1 and 100");
   

    const handleGuess = ()=>{
        const num = parseInt(guess, 10);
        if(isNaN(num) || num<1 || num>100){
            setMessage("Please enter a valid number between 1 and 100");
            return;
        }

        if(num===targetNumber){
            setMessage("🎉 Correct! You guessed the number!");
        }
        else if(num>targetNumber){
            setMessage("Too High! Try again.")
        }
        else{
            setMessage("Too Low! Try again.");
        }
        setCount(count+1);
    };

    const restartGame = ()=>{
        setTargetNumber(Math.floor(Math.random()*100) +1);
        setGuess("");
        setMessage("Guess a number between 1 and 100");
        setCount(0);
    }
  return (
    <div className='flex flex-col items-center justify-center h-140 gap-8'>
        <h1 className='text-3xl font-bold text-red-300'>Guess the Number 🎯</h1>
        <p className='text-lg text-green-600'>{message}</p>

        <input 
        type="number"
        value={guess}
        onChange={(e)=> setGuess(e.target.value)}
        placeholder='Enter your guess'
        className='text-center text-lg p-2 border rounded-lg w-50'
         />
         <button
         className='px-6 py-3 text-lg font-semibold bg-blue-400 text-white rounded-lg hover:bg-blue-600'
         onClick={handleGuess}>
            Submit Guess
        </button>
        <button 
        className='px-4 py-2 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600'
        onClick={restartGame}>  
            Restart Game
        </button>
        <p className='text-gray-300 text-2xl border-2 border-gray-600 px-4 py-1 rounded hover:bg-zinc-700'>
           Move {count}
        </p>
    </div>
  )
}

export default GuessNumber