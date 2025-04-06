import React, { useState } from 'react'

function EmotionGuess() {
    const emotions = [
        { emoji: "😃", name: "Happy" },
        { emoji: "😢", name: "Sad" },
        { emoji: "😡", name: "Angry" },
        { emoji: "😱", name: "Surprised" },
        { emoji: "😂", name: "Laughing" },
        { emoji: "😴", name: "Sleepy" },
        { emoji: "🤔", name: "Thinking" },
        { emoji: "😎", name: "Cool" },
        
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState("");

    const getShuffledOptions = ()=>{
        const correctAnswer = emotions[currentIndex].name;
        const wrongAnswers = emotions
            .filter((e)=>e.name !== correctAnswer)
            .sort(()=> Math.random()-0.5)
            .slice(0,3)
            .map((e)=> e.name)
        
            return [...wrongAnswers, correctAnswer].sort(()=> Math.random()-0.5);
    }

    const options = getShuffledOptions();
    
    const handleGuess = (guess) => {
        if(guess === emotions[currentIndex].name){
            setScore(score+1);
            setMessage("✅ Correct!");
        }
        else{
            setMessage("❌ Wrong! Try again.");
        }

        setTimeout(() => {
            setCurrentIndex((prev) => Math.floor(Math.random() * emotions.length));
            setMessage("");
        }, 1000);
    }

  return (
    <div className='flex flex-col items-center justify-center h-140 gap-6 text-center'>
        <h1 className='text-5xl font-bold'>Emotion Guesser</h1>
        <p className='text-8xl'> {emotions[currentIndex].emoji} </p>

        <div className='grid grid-cols-2 gap-6'>
            {options.map((option)=>(
                <button
                className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
                key={option}
                onClick={()=>handleGuess(option)}
                >
                    {option}
                </button>
            ))}
        </div>
        <p className='text-xl font-semibold'>Score: {score}</p>
        <p className='text-lg font-bold'>{message}</p>
    </div>
  )
}

export default EmotionGuess