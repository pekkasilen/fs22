import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(
    {
      0:0,
      1:0,
      2:0,
      3:0,
      4:0,
      5:0,
      6:0
    }
  )
  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random()*6))
  }

  const voteThis = () => {
    const copyOfVotes = {...votes};
    copyOfVotes[selected] +=1;
    setVotes(
      copyOfVotes
    );
  }

  const Winner = () => {
    const winner = Object.keys(votes).reduce((a,b)=> votes[a]>votes[b] ? a : b)
    return(
      <p>{anecdotes[winner]}</p>
    )
  }

  return (
    <div>
      <h1>Anecdote of the day:</h1>
      {anecdotes[selected]}
      <br/>
      <button onClick={voteThis}>Vote This Anecdote!</button>
      <button onClick={nextAnecdote}>Next anecdote, please</button>
      <h1>Winner anecdote:</h1>
      <Winner/>
    </div>
  )
}

export default App