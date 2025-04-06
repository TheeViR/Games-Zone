import React, { useState } from "react";

const choices = [
  { name: "rock", icon: "✊" },
  { name: "paper", icon: "✋" },
  { name: "scissors", icon: "✌️" },
];

function getResult(user, computer) {
  if (user === computer) return "It's a Draw!";
  if (
    (user === "rock" && computer === "scissors") ||
    (user === "scissors" && computer === "paper") ||
    (user === "paper" && computer === "rock")
  ) {
    return "You Win!";
  }
  return "You Lose!";
}

export default function Game() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [score, setScore] = useState({ user: 0, computer: 0 });

  const play = (choice) => {
    const computer = choices[Math.floor(Math.random() * choices.length)].name;
    const res = getResult(choice, computer);

    setUserChoice(choice);
    setComputerChoice(computer);
    setResult(res);

    if (res === "You Win!") setScore({ ...score, user: score.user + 1 });
    else if (res === "You Lose!") setScore({ ...score, computer: score.computer + 1 });
  };

  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-xl w-full max-w-full h-140 text-white text-center">
      <h1 className="text-3xl font-bold text-green-500">Rock Paper Scissors ✊✋✌️</h1>

      <div className="flex justify-around text-4xl  px-2">
        {choices.map((c) => (
          <button
            key={c.name}
            className="hover:border-blue-800 hover:scale-105 hover:cursor-pointer transition-transform mt-20 text-6xl p-6 border-2 rounded-full"
            onClick={() => play(c.name)}
          >
            {c.icon}
          </button>
        ))}
      </div>

      {result && (
        <div className="my-4 text-xl">
          <p className="font-semibold">Result: {result}</p>
          <p>You: {userChoice} {choices.find(c => c.name === userChoice)?.icon}</p>
          <p>Computer: {computerChoice} {choices.find(c => c.name === computerChoice)?.icon}</p>
        </div>
      )}

      <div className="mt-4">
        <p className="font-semibold">Score</p>
        <p>You: {score.user} | Computer: {score.computer}</p>
      </div>

      <div className="flex mt-10 items-center justify-center gap-6">
        <button
        onClick={() => {
          setUserChoice(null);
          setComputerChoice(null);
          setResult("");
        }}
        className="mt-6 bg-white text-indigo-600 font-bold py-2 px-4 rounded-full shadow hover:bg-indigo-100 transition"
      >
        Reset Round
      </button>
      <button
        onClick={() => {
          setScore({user: 0, computer:0});
        }}
        className="mt-6  bg-white text-red-600 font-bold py-2 px-4 rounded-full shadow hover:bg-red-200 transition"
      >
        Reset Score
      </button>
      </div>
      
    </div>
  );
}
