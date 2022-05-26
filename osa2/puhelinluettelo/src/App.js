import { useEffect, useState } from "react";
import axios from 'axios';

const FilterForm = ({ handler }) => {
  return (
    <div>
      Filter shown with <input onChange={handler} />
    </div>
  );
};

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.savePerson}>
        <div>
          name: <input onChange={props.handleNameChange} />
        </div>
        <div>
          number: <input onChange={props.handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const Persons = (props) => {
  return props.persons
    .filter((person) =>
      person["name"].toLowerCase().includes(props.filterPhrase.toLowerCase())
    )
    .map((person,ix) => (
      <p key={ix}>
        {person.name}, {person.number}
      </p>
    ));
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterPhrase, setFilterPhrase] = useState("");

  useEffect(()=>{
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data);
    })
  },[])

  const savePerson = (event) => {
    event.preventDefault();
    if (persons.some((person) => person["name"] === newName)) {
      alert(`${newName} already exists`);
    } else {
      let personObject = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(personObject));
    }
  };

  const handleNameChange = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    event.preventDefault();
    setFilterPhrase(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm handler={handleFilterChange} />

      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        savePerson={savePerson}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filterPhrase={filterPhrase} />
    </div>
  );
};

export default App;
