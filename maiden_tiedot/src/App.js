
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

const Filter = ({ handleFilterChange }) => {
  return (
    <div>
      <p>find countries <input onChange={handleFilterChange} /></p>
    </div>
  )
}

const Countries = ({ countries, filter }) => {

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(filter.toLowerCase()))

  if (filteredCountries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if (filteredCountries.length === 1) {
    return (
      <div>
        <h2>{filteredCountries[0].name}</h2>
        <p>capital {filteredCountries[0].capital}</p>
        <p>population {filteredCountries[0].population}</p>
        <h3>languages</h3>
        <div>{filteredCountries[0].languages.map(language =>
          <ul key={language.name}>
            <li>{language.name}</li>
          </ul>)}
        </div>
        <img src={filteredCountries[0].flag} width="20%" height="auto" alt="flag" />
      </div>
    )

  }

  else {
    return (
      <div>
        {filteredCountries.map(country =>
          < p key={country.name} >{country.name}</p>
        )}
      </div>
    )
  }
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://restcountries.eu/rest/v2/all').then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  console.log('render', countries.length, 'countries')

  return (
    <div>
      <Filter handleFilterChange={handleFilterChange} filter={filter} />
      <Countries countries={countries} filter={filter} />
    </div >
  )
}

export default App

