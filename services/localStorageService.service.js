// noinspection EqualityComparisonWithCoercionJS

export default class LocalStorageService {
    "use strict"

    constructor(model, key) {
        this.origModel = model
        this.key = key

        if (!this.retrieve()) {
            this.model = this.cloneObject(model) //get copy of data
        }
    }

    //Getters - Setters
    get sortCol() {
        return this.model.list.options.sortCol
    }

    set sortCol(col) {
        this.model.list.options.sortCol = col
    }

    get sortDir() {
        return this.model.list.options.sortDir
    }

    set sortDir(dir) {
        this.model.list.options.sortDir = dir
    }

    get filterStr() {
        return this.model.list.options.filterStr
    }

    set filterStr(filterStr) {
        this.model.list.options.filterStr = filterStr
    }

    get filterCol() {
        return this.model.list.options.filterCol
    }

    set filterCol(filterColName) {
        this.model.list.options.filterCol = filterColName
    }

    get size() {
        return this.model.data.length
    }

    async list() {
        this.sort(this.sortCol, this.sortDir)
        let filterObj = {}
        if (this.filterStr) {
            filterObj[this.filterCol] = this.filterStr
            return this.filter(filterObj)
        }
        return this.model.data
    }

    //CRUD FUNCTIONS
    async create(obj) {
        this.model.data.push(obj)
        this.store()
    }

    async read(getId) {
        let index = this.getItemIndex(Number(getId))
        if (index === -1) {
            return null
        }
        return this.model.data[index]
    }

    async update(obj) {
        let index = this.getItemIndex(obj.id)
        this.model.data[index] = obj
        this.store()
    }

    async delete(removeId) {
        let index = this.getItemIndex(removeId)
        this.model.data.splice(index, 1)
        this.store()
    }

    //LocalStorage Functions
    reset() {
        this.clear()
        this.model = this.cloneObject(this.origModel)
    }

    clear() {
        localStorage.clear()
    }

    store() {
        localStorage.setItem(this.key, JSON.stringify(this.model))
    }

    retrieve() {
        let localStgValue = localStorage.getItem(this.key)
        if (localStgValue) {
            this.model = JSON.parse(localStgValue)
            return true
        }
        return false
    }

    //Sorting and Filtering Functions
    sort(col, direction) {
        if (direction === 'asc') {
            if (typeof this.model.data[0][col] === 'number') {
                this.model.data.sort((a, b) => a[col] - b[col])
            } else {
                this.model.data.sort((a, b) => a[col].toLowerCase().localeCompare(b[col].toLowerCase()))
            }
        } else {
            if (typeof this.model.data[0][col] === 'number') {
                this.model.data.sort((a, b) => b[col] - a[col])
            } else {
                this.model.data.sort((a, b) => b[col].toLowerCase().localeCompare(a[col].toLowerCase()))
            }
        }
        this.store()
        this.model.list.options["sortCol"] = col
        this.model.list.options["sortDir"] = direction
    }

    filter(filterObj) {
        return this.model.data
            .filter(entity => Object.entries(filterObj)
                .every(
                    ([key, value]) => String(entity[key]).toLowerCase().includes(String(value).toLowerCase()))
                )

    }

    // Utility functions
    getItemIndex(id) {
        return this.model.data.findIndex(entity => entity.id === id)
    }

    async getLookup(entity) {
        return this.model.data.map(item => {
            return {
                [`${entity}Name`]: item[`${entity}Name`],
                [`${entity}Id`]: item[`${entity}Id`]
            }
        })
    }

    cloneObject(obj) {
        return JSON.parse(JSON.stringify(obj))
    }
}