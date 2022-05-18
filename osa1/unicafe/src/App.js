import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const StatisticLine = (props) => {
  if (props.stat === "good")
    return (
      <tr>
        <td>Hyvää</td>
        <td>{props.good}</td>
      </tr>
    );
  else if (props.stat === "neutral")
    return (
      <tr>
        <td>Siedettävää</td>
        <td>{props.neutral}</td>
      </tr>
    );
  else if (props.stat === "bad")
    return (
      <tr>
        <td>Kuraa</td>
        <td>{props.bad}</td>
      </tr>
    );
  else if (props.stat === "total")
    return (
      <tr>
        <td>Yhteensä</td>
        <td>{props.good + props.neutral + props.bad}</td>
      </tr>
    );
  else if (props.stat === "ave")
    return (
      <tr>
        <td>Keskiarvo</td>
        <td>
          {(props.good - props.bad) / (props.good + props.neutral + props.bad)}
        </td>
      </tr>
    );
  else if (props.stat === "positives")
    return (
      <tr>
        <td>Positiivisia</td>
        <td>
          {(100 * props.good) / (props.good + props.neutral + props.bad)} %
        </td>
      </tr>
    );
};

const Statistics = ({ good, neutral, bad }) => {
  if (good > 0 || neutral > 0 || bad > 0) {
    return (
      <div>
        <h1>Tilastot</h1>
        <table>
          <tbody>
            <StatisticLine
              stat="good"
              good={good}
              neutral={neutral}
              bad={bad}
            />
            <StatisticLine
              stat="neutral"
              good={good}
              neutral={neutral}
              bad={bad}
            />
            <StatisticLine stat="bad" good={good} neutral={neutral} bad={bad} />
            <StatisticLine
              stat="total"
              good={good}
              neutral={neutral}
              bad={bad}
            />
            <StatisticLine stat="ave" good={good} neutral={neutral} bad={bad} />
            <StatisticLine
              stat="positives"
              good={good}
              neutral={neutral}
              bad={bad}
            />
          </tbody>
        </table>
      </div>
    );
  } else
    return (
      <div>
        <h1>Tilastot</h1>
        <p>Ei vielä arviointeja</p>
      </div>
    );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };
  return (
    <div>
      <h1>Anna palautetta sapuskasta</h1>
      <Button handleClick={handleGood} text="Hyvää" />
      <Button handleClick={handleNeutral} text="Siedettävää" />
      <Button handleClick={handleBad} text="Kuraa" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
