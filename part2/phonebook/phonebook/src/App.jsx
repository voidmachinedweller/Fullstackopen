import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/Personform";
import Persons from "./components/Persons";
import personService from "./services/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    isError: false,
  });

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const notifyWith = (message, isError = false) => {
    setNotification({ message, isError });

    setTimeout(() => {
      setNotification({ message: null, isError: false });
    }, 5000);
  };

  const clearForm = () => {
    setNewName("");
    setNewNumber("");
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  const updatePerson = (person) => {
    const ok = window.confirm(
      `${person.name} is already added to the phonebook. Replace the old number?`,
    );

    if (!ok) return;

    const updatedPerson = { ...person, number: newNumber };

    personService
      .update(person.id, updatedPerson)
      .then((returnedPerson) => {
        setPersons((previousPersons) =>
          previousPersons.map((p) => (p.id === person.id ? returnedPerson : p)),
        );

        notifyWith(`Phone number of ${returnedPerson.name} updated!`);
        clearForm();
      })
      .catch(() => {
        notifyWith(
          `Information for ${person.name} has already been removed from the server.`,
          true,
        );

        setPersons((previousPersons) =>
          previousPersons.filter((p) => p.id !== person.id),
        );
      });
  };

  const onAddNew = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.trim().toLowerCase(),
    );

    if (existingPerson) {
      updatePerson(existingPerson);
      return;
    }

    const newPerson = {
      name: newName.trim(),
      number: newNumber.trim(),
    };

    personService
      .create(newPerson)
      .then((createdPerson) => {
        setPersons((previousPersons) => previousPersons.concat(createdPerson));

        notifyWith(`Added ${createdPerson.name}`);
        clearForm();
      })
      .catch(() => {
        notifyWith("Failed to add person.", true);
      });
  };

  const onRemove = (person) => {
    const ok = window.confirm(`Delete ${person.name}?`);

    if (!ok) return;

    personService
      .remove(person.id)
      .then(() => {
        setPersons((previousPersons) =>
          previousPersons.filter((p) => p.id !== person.id),
        );

        notifyWith(`Deleted ${person.name}`);
      })
      .catch(() => {
        notifyWith(`Failed to delete ${person.name}.`, true);
      });
  };

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification notification={notification} />

      <Filter filter={filter} setFilter={setFilter} />

      <h2>Add a new</h2>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onAddNew={onAddNew}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>

      <Persons persons={personsToShow} onRemove={onRemove} />
    </div>
  );
};

export default App;
