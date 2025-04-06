import React, { useRef, useState } from 'react'

function ClickSpeedTest() {
    const [clicks, setClicks] = useState(0);
    const [timeLeft, setTimeLeft] = useState(5);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const timerRef = useRef(null);

    const startGame = ()=>{
        setClicks(0);
        setTimeLeft(5);
        setIsPlaying(true);
        setShowResult(false);

        timerRef.current = setInterval(()=>{
            setTimeLeft((prev)=>{
                if(prev<=1){
                    clearInterval(timerRef.current);
                    setIsPlaying(false);
                    setShowResult(true);
                    return 0;
                }
                return prev-1;
            });
        },1000);
    };

    const handleClick = ()=>{
        if(isPlaying){
            setClicks((prev)=> prev+1);
        }
    };

  return (
    <div className='flex flex-col bg-zinc-800 items-center justify-center h-140 gap-8 select-none'>
        <h1 className='text-3xl font-bold outline-2 outline-green-400 px-4 py-2 text-green-800'>Click Speed Test</h1>
        <p className='text-lg text-red-700'>Time left: {timeLeft}s</p>
        <p className='text-xl font-semibold text-yellow-300'>Clicks: {clicks}</p>
        { isPlaying ? (
            <button
                onClick={handleClick}
                className='px-6 py-3 text-lg font-semibold bg-blue-500 text-white border-3 border-gray-400 rounded-lg hover:bg-blue-600 hover:cursor-pointer'
            >
                Click Me!
            </button>
        ):(
            <button
                onClick={startGame}
                className='px-6 py-3 text-lg font-semibold rounded-lg text-center mt-4 border-3 border-gray-600 bg-green-700 text-black hover:bg-green-400 hover:cursor-pointer'
            >
                Start Test
            </button>
        )}
        {showResult && (
            <div className='w-50 p-4  border-4 border-gray-400 text-black font-bold rounded-lg text-center mt-10'>
                <p className='text-2xl font-bold text-red-600'>Game Over!</p>
                <p className='text-xl text-yellow-300'>Total Clicks: {clicks}</p>
            </div>
            
            
        )}
    </div>
  )
}

export default ClickSpeedTest