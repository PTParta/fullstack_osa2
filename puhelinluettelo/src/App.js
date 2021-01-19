import React, { useEffect, useState } from 'react'
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="notification">
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const Filter = ({ handleFilterChange }) => {
  return (
    <div>filter shown with <input onChange={handleFilterChange} /></div>
  )
}

const PersonForm = ({ handleNameChange, handleNumberChange, addPerson, newName, newNumber }) => {
  return (
    <form onSubmit={addPerson}>
      <div>name: <input value={newName} onChange={handleNameChange} /></div>
      <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, filter, handleRemove }) => {
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    < div >
      {filteredPersons.map(person =>
        <div key={person.name} >
          <table>
            <tbody>
              <tr>
                <td>{person.name} {person.number}</td>
                <td>
                  <button onClick={() => {
                    if (window.confirm(`Delete ${person.name} ?`)) {
                      handleRemove(person.id)
                    }
                  }}>delete</button>
                </td>
              </tr>
            </tbody>

          </table>
        </div>
      )}
    </div >
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const names = persons.map(person => person.name)
    if (!names.includes(newName)) {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))

          setNotification(`Added ${newName}`)
          setTimeout(() => {
            setNotification(null)
          }, 3000);
        })
    } else {
      if (window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)) {
        handleUpdate(newName)

      } else return
      //window.alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const handleRemove = id => {
    console.log('handleRemove', id)
    personService
      .remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))

        setNotification(`Deleted ${persons.find(p => p.id === id).name}`)
        setTimeout(() => {
          setNotification(null)
        }, 3000);
      })
  }

  const handleUpdate = name => {
    const person = persons.find(p => p.name === name)
    const changedPerson = { ...person, number: newNumber }
    console.log('changed person', changedPerson)
    //handleUpdate(person.id)
    personService
      .update(changedPerson)
      .then(returnedPerson => {
        //console.log(returnedPerson)
        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))

        setNotification(`Updated ${name}`)
        setTimeout(() => {
          setNotification(null)
        }, 3000);
      })
      .catch(error => {
        setError(`Information of ${name} has already been removed from server`)
        setPersons(persons.filter(p => p.id !== person.id))
        setTimeout(() => {
          setError(null)
        }, 3000);
      })
  }

  return (


    <div>
      <Notification message={notification} />
      <Error message={error} />

      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />

      <h3>add a new</h3>
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber} />

      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} handleRemove={handleRemove} />
    </div>
  )
}
export default App