import { useEffect, useState } from "react";
import axios from "axios";
import contactService from "./services/contacts";
import "./index.css";

const Notification = ({ message }) => {
  if (message === null) return;
  return (
    <div>
      {message.includes("404") ? (
        <p className="error404">{message}</p>
      ) : (
        <p className="notification">{message}</p>
      )}
    </div>
  );
};

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
    .map((person) => (
      <p key={person.id}>
        {person.name}, {person.number}{" "}
        <button onClick={() => props.handleDelete({ person })} key={person.id}>
          delete
        </button>
      </p>
    ));
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterPhrase, setFilterPhrase] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    contactService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const handleDelete = ({ person }) => {
    if (!window.confirm("Really want to delete this?")) return;
    console.log(person);
    contactService
      .deletePerson(person)
      .then((resp) => {
        setPersons(persons.filter((n) => n.id !== person.id));
        setNotification(`${person.name} was deleted`);
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      })
      .catch((err) => {
        setNotification(`404: deleting ${person.name} failed`);
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      });
  };

  const savePerson = (event) => {
    event.preventDefault();
    if (persons.some((person) => person["name"] === newName)) {
      if (
        window.confirm(`${newName} already exists, want to replace the number?`)
      ) {
        const updatingPerson = persons.filter((n) => n.name === newName)[0];
        updatingPerson.number = newNumber;
        contactService.updateNumber(updatingPerson).then((response) => {
          console.log("updated");
          setPersons(
            persons.map((person) =>
              person.id !== response.id ? person : response
            )
          );
          setNotification(`${updatingPerson.name} was updated`);
          setTimeout(() => {
            setNotification(null);
          }, 3000);
        });
      }
    } else {
      let personObject = {
        name: newName,
        number: newNumber,
      };
      contactService.addNew(personObject).then((resp) => {
        setPersons(persons.concat(resp));
        setNotification(`${personObject.name} was added`);
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      });
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
      <Notification message={notification} />
      <h2>Phonebook</h2>
      <FilterForm handler={handleFilterChange} />

      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        savePerson={savePerson}
        setNotification={setNotification}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filterPhrase={filterPhrase}
        handleDelete={handleDelete}
        setNotification={setNotification}
      />
    </div>
  );
};

export default App;
