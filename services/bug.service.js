import axios from 'axios'

import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

// const STORAGE_KEY = 'bugDB'
const BASE_URL = '/api/bug'

export const bugService = {
    query,
    getById,
    save,
    remove,
}

var bugs = utilService.readJsonFile('./data/bug.json')

function query() {
    // return storageService.query(STORAGE_KEY)
    return Promise.resolve(bugs)
    //     return axios.get(BASE_URL)
    //         .then(res => res.data)
}
function getById(bugId) {
    // return storageService.get(STORAGE_KEY, bugId)
    // const bug = bugs.find(bug => bug._id === bugId)
    // return Promise.resolve(bug)
    return axios.get(BASE_URL + '/' + bugId)
        .then(res => res.data)
}
function remove(bugId) {
    // return storageService.remove(STORAGE_KEY, bugId)
    // const idx = bugs.findIndex(bug => bug._id === bugId)
    // bugs.splice(idx, 1)

    // return _saveBugsToFile()
    return axios.get(BASE_URL + '/' + bugId + '/remove')
        .then(res => res.data)
}
function save(bugToSave) {
    // if (bugToSave._id) {
    // return storageService.put(STORAGE_KEY, bug)
    //     const idx = bugs.findIndex(bug => bug._id === bugToSave._id)
    //     bugs.splice(idx, 1, bugToSave)
    // } else {
    //     // return storageService.post(STORAGE_KEY, bug)
    //     bugToSave._id = utilService.makeId()
    //     bugToSave.title = utilService.makeLorem(4)
    //     bugToSave.description = utilService.makeLorem(5)
    //     bugToSave.severity = utilService.getRandomIntInclusive(0, 10)
    //     bugToSave.createdAt = new Date()
    //     bugs.push(bugToSave)
    // }
    // return _saveBugsToFile()
    //     .then(() => bugToSave)
    const queryStr = `/save?title=${bugToSave.title}&severity=${bugToSave.severity}&_id=${bugToSave._id || ''}`
    return axios.get(BASE_URL + queryStr)
        .then(res => res.data)
}

// function _saveBugsToFile() {
//     return utilService.writeJsonFile('./data/bug.json', bugs)
// }