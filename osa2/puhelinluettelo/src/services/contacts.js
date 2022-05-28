import axios from 'axios';

const baseUrl = 'http://localhost:3001'

const getAll = () => {
    const req = axios.get(`${baseUrl}/persons`)
    return req.then(response => response.data);
}

const addNew = (person) => {
    const req = axios.post(`${baseUrl}/persons`,person)
    return req.then(response => response.data);
}

const deletePerson = (person) => {
    const req = axios.delete(`${baseUrl}/persons/${person.id}`)
    return req.then(response => response.data);
}

const updateNumber = (person) => {
    const req = axios.put(`${baseUrl}/persons/${person.id}`, person)
    return req.then(response => response.data);
}

export default {getAll, addNew, deletePerson, updateNumber};