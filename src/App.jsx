import React, { useState } from 'react'
import TicTacToe from './TicTacToe'
import DiceRoller from './DiceRoller'
import GuessNumber from './GuessNumber'
import ClickSpeedTest from './ClickSpeedTest'
import EmotionGuess from './EmotionGuess'
import ColorMemory from './ColorMemory'
import RPS from './RPS'
import GameCard from './GameCard'

function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  
  const games = [
    {name: "Rock Paper Scissors", component: <RPS />},
    {name: "Tic Tac Toe", component: <TicTacToe />},
    {name: "Guess Number", component: <GuessNumber />},
    {name: "Click Speed Test", component: <ClickSpeedTest />},
    {name: "Emotion Guess", component: <EmotionGuess />},
    {name: "Color Memory", component: <ColorMemory />},
    {name: "Dice Roller", component: <DiceRoller />},
  ];

  return (
    <div className='min-h-screen bg-gray-700 p-6'>
      
      {selectedGame === null ? (
        <> 
          <h1 className='text-3xl font-bold text-center text-red-500 mb-12 '>Game Zone</h1>
          <div className='grid gap-8 items-center justify-center'>
          {games.map((game, index)=>(
              <GameCard
                  key={index}
                  title={game.name}
                  onClick={()=> setSelectedGame(game.name)}
               />
          ))}
      </div>
     
        </>
    ):( 
      <div className='flex flex-col '>
        <div className='p-4 rounded-xl shadow-xl '>
          {games.find(g => g.name === selectedGame).component}
        </div>

        <div className='flex items-center justify-center'>
          <button 
            onClick={()=> setSelectedGame(null)}
            className='w-sm mt-6 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-full text-black font-semibold transition-all '  
        >
          ⬅️ Back to Home
        </button>
        </div>
        

      </div> 
    )}
      
    </div>
  )
}

export default App