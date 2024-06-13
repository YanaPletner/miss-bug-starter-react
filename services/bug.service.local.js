import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'bugDB'
_createBugs()

export const bugService = {
    query,
    getById,
    save,
    remove,
    getEmptyBug,
    getDefaultFilter,
}

function query() {
    return storageService.query(STORAGE_KEY)
}
function getById(bugId) {
    return storageService.get(STORAGE_KEY, bugId)
}
function remove(bugId) {
    return storageService.remove(STORAGE_KEY, bugId)
}
function save(bug) {

    if (bug._id) {
        return storageService.put(STORAGE_KEY, bug)
    } else {
        return storageService.post(STORAGE_KEY, bug)
    }
}

function getEmptyBug() {
    return { title, description, severity }
}

function getDefaultFilter() {
    return { title: '', description: '', severity: '' }
}

function _createBugs() {
    let bugs = utilService.loadFromStorage(BUG_KEY)
    if (!bugs || !bugs.length) {
        bugs = []
        for (var i = 0; i < 10; i++) {
            bugs.push(_createBug())
        }
        utilService.saveToStorage(BUG_KEY, bugs)
    }
}

function _createBug() {
    const bug = getEmptyBug()
    bug._id = utilService.makeId()
    bug.title = utilService.makeLorem(4)
    bug.description = utilService.makeLorem(4)
    bug.severity = utilService.getRandomIntInclusive(0, 10)
    bug.createdAt = new Date()
    return bug
}