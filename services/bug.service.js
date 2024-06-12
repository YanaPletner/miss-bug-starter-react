
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'bugDB'

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
}
function getById(bugId) {
    // return storageService.get(STORAGE_KEY, bugId)
    return bugs = bugs.find(bug => bug._id === bugId)
}
function remove(bugId) {
    // return storageService.remove(STORAGE_KEY, bugId)
    const idx = bugs.findIndex(bug => bug._id === bugId)
    bugs.splice(idx, 1)

    return _saveBugsToFile()
}
function save(bugToSave) {
    if (bugToSave._id) {
        // return storageService.put(STORAGE_KEY, bug)
        const idx = bugs.findIndex(bug => bug._id === bugToSave._id)
        bugs.splice(idx, 1, bugToSave)
    } else {
        // return storageService.post(STORAGE_KEY, bug)
        bugToSave._id = utilService.makeId()
        bugs.push(bugToSave)
    }
    return _saveBugsToFile()
        .then(() => bugToSave)
}

function _saveBugsToFile() {
    return utilService.writeJsonFile('./data/bug.json', bugs)
}