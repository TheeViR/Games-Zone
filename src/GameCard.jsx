import React from 'react'

function GameCard({title, onClick}) {
  return (
    <div 
        onClick={onClick}
        className='outline-2 outline-black cursor-pointer w-sm flex items-center justify-center bg-black hover:bg-green-300 p-3 rounded-2xl shadow-md text-center text-lg font-semibold text-green-600 transition-all'
    >
        {title}
    </div>
  )
}

export default GameCard