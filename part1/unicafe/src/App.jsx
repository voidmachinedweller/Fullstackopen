import { useState } from "react";

const Header = (props) => <h1>{props.name}</h1>;

const Statisticline = (props) => {
  return (
    <p>
      {props.text} {props.value}
    </p>
  );
};

const Button = (props) => {
  return <button onClick={props.action}>{props.text}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + bad + neutral;

  if (total !== 0) {
    return (
      <>
        <Header name="Statistics" />

        <table>
          <thead>
            <tr>
              <th>Statistic</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Good </td>
              <td>{good}</td>
            </tr>
            <tr>
              <td>Neutral </td>
              <td>{neutral}</td>
            </tr>
            <tr>
              <td>Bad </td>
              <td>{bad}</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>{good + neutral + bad}</td>
            </tr>
            <tr>
              <td>Positive (%)</td>
              <td>{Math.ceil((good / (neutral + bad + good)) * 100)}%</td>
            </tr>
            <tr>
              <td>Average score</td>
              <td>
                {(
                  (1 * good + neutral * 0 + bad * -1) /
                  (neutral + bad + good)
                ).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  } else
    return (
      <>
        <Header name="Statistics" />
        <h3>There is no feedback right now</h3>
      </>
    );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addgood = () => {
    setGood(good + 1);
  };

  const addneutral = () => {
    setNeutral(neutral + 1);
  };

  const addbad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header name="Feedback" />

      <Button action={addgood} text="Good" />

      <Button action={addneutral} text="Neutral" />

      <Button action={addbad} text="Bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
