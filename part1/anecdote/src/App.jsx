import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.action}>{props.text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);

  const entries = anecdotes.length;
  const [points, setPoints] = useState(Array(entries).fill(0));

  const randomIndex = () => {
    const newIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(newIndex);
  };

  const vote = () => {
    const updatedPoints = [...points];
    updatedPoints[selected] += 1;
    setPoints(updatedPoints);
  };

  const mostVoted = points.indexOf(Math.max(...points));
  return (
    <>
      <div>{anecdotes[selected]}</div>

      <Button action={randomIndex} text="new stat" />
      <Button action={vote} text="vote" />

      <h1>most voted anecdote is</h1>

      <p>{anecdotes[mostVoted]}</p>

      <h5>with total {points[mostVoted]} votes</h5>
    </>
  );
};

export default App;
