import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    console.log('personService.getAll()')
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    console.log('personService.create()')
    return request.then(response => response.data)
}

const remove = (id) => {
    console.log('personService.remove() id:', id)
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = person => {
    const url = baseUrl + "/" + person.id
    console.log('personService.update() person:', person)
    const request = axios.put(url, person)
    return request.then(response => response.data)
}

const personService = { getAll, create, remove, update }

export default personService