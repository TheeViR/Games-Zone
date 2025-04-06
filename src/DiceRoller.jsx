import React, { useState } from 'react'
import { motion } from "framer-motion";

function DiceRoller() {
    const [diceNumber, setDiceNumber] = useState(1);
    const [isRolling, setIsRolling] = useState(false);

    const rollDice = ()=>{
        setIsRolling(true);
        setTimeout(() => {
            const randomNumber = Math.floor(Math.random()*6)+1;
            setDiceNumber(randomNumber);
            setIsRolling(false);
        }, 700);
        
    };
  return (
    <div className='flex flex-col items-center justify-center h-140 gap-8'>
        <h1 className='text-3xl font-bold'>🎲 Dice Roller 🎲</h1>
        <motion.div
        animate={{rotate: isRolling ? 180 :0}}
        transition={{duration: 0.5, ease: "easeInOut"}}
        className='text-6xl font-bold p-6 border-4 border-gray-500 rounded-4xl'>
            {diceNumber}
        </motion.div>
        <button onClick={rollDice} 
        disabled={isRolling}
        className='px-6 py-3 text-lg font-semibold border bg-blue-500 rounded-4xl hover:bg-blue-300 hover:cursor-pointer'>
            {isRolling? "Rolling..." : "Roll Dice"}
        </button>
    </div>
  )
}

export default DiceRoller