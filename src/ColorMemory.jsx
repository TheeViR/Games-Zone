import React, { useEffect, useMemo, useState } from "react";

function ColorMemory() {
  const colors = [
    { color: "🔴", name: "red" },
    { color: "🟢", name: "green" },
    { color: "🟠", name: "orange" },
    { color: "🟡", name: "yellow" },
    { color: "🔵", name: "blue" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    setIsVisible(true);

    const colorTimer = setTimeout(() => {
      setIsVisible(false);
      const nextColorTimer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % colors.length);
      }, 2000);

      return () => clearTimeout(nextColorTimer); // Cleanup nextColorTimer
    }, 2000);

    return () => clearTimeout(colorTimer); // Cleanup colorTimer
  }, [currentIndex]);

  const getShuffledOptions = () => {
    const correctAnswer = colors[currentIndex].name;
    const wrongAnswers = colors
      .filter((e) => e.name !== correctAnswer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((e) => e.name);

    return [...wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5);
  };

  const options = useMemo(() => getShuffledOptions(), [currentIndex, colors]);

  const handleGuess = (guess) => {
    if (guess === colors[currentIndex].name) {
      setMessage("✅ Correct!");
      setScore((prev) => prev + 1);
    } else {
      setMessage("❌ Wrong! Try again.");
    }

    setTimeout(() => setMessage(""), 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-140 gap-6">
      <h1 className="text-4xl border px-4 py-2 border-green-400">
        Color Memory Game
      </h1>
      <div className="h-24 w-sm text-6xl flex items-center justify-center">
        {isVisible ? (
          <span className="text-6xl">{colors[currentIndex].color}</span>
        ) : (
          <span className="text-xl text-gray-500">Select the Correct Color</span>
        )}
      </div>
      <div className="grid grid-cols-2 gap-6">
        {options.map((option) => (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            key={option}
            onClick={() => handleGuess(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
        onClick={() => setCurrentIndex((prev) => (prev + 1) % colors.length)}
      >
        Next Color
      </button>

      <p className="text-2xl font-bold mt-4">
        Score: <span className="text-green-500">{score}</span>
      </p>
      <p
        className={`text-xl font-semibold transition duration-200 ${
          message.includes("❌") ? "text-red-500" : "text-green-500"
        }`}
      >
        {message}
      </p>
    </div>
  );
}

export default ColorMemory;
