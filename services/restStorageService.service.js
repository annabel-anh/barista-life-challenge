import Utils from "../util/utilities.js"

export default class RestStorageService {
    "use strict";
    constructor(entity, endPoint, options = {}) {
        this.entity = entity;

        this.model = {};
        this.options = options;

        this.endPoint = endPoint;
        this.lookups = {}

    }

    //Getters and Setters
    get sortCol() {
        return this.model.options.sortCol;
    }

    set sortCol(col) {
        this.model.options.sortCol = col;
    }

    get sortDir() {
        return this.model.options.sortDir;
    }

    set sortDir(dir) {
        this.model.options.sortDir = dir;
    }

    get filterCol() {
        return this.model.options.filterCol;
    }

    set filterCol(filterCol) {
        this.model.options.filterCol = filterCol;
    }

    get filterStr() {
        return this.model.options.filterStr;
    }

    set filterStr(filterStr) {
        this.model.options.filterStr = filterStr;
    }

    get limit() {
        return this.model.options.limit;
    }

    set limit(limit) {
        this.model.options.limit = limit;
    }

    get offset() {
        return this.model.options.offset;
    }

    get options() {
        return this.model.options;
    }

    set options(opt) {
        this.model.options = {
            sortCol: null,
            sortDir: 'asc',
            filterCol: '',
            filterStr: '',
            limit: 100,
            offset: null
        };
        //merge any passed in options
        this.model.options = Object.assign(this.model.options, opt);
    }

    get apiName() {
        return `${this.entity}`;
    }

    get hostPrefix() {
        let url = `${this.endPoint.protocol}://${this.endPoint.host}`;
        if (this.endPoint.port) {
            url = `${url}:${this.endPoint.port}`;
        }
        return url;
    }

    get apiUrl() {
        return `${this.hostPrefix}/${this.apiName}`;
    }

    get lookupUrlPrefix() {
        return `${this.hostPrefix}/lookups`;
    }


    async list() {
        let url = `${this.apiUrl}/${Utils.getQueryString(this.options)}`

        //implement 'list' call, returns a sorted/filtered/paged list from the backend
        return await this.doQuery(url, {method: "GET"})

    }

    //CRUD FUNCTIONS
    async create(obj) {
        let url = `${this.apiUrl}/`

        console.log(obj)

        return await this.doQuery(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)
        })

    }

    async read(id) {
        let url = `${this.apiUrl}/${id}`;

        return await this.doQuery(url, {
            method: "GET"
        })
    }

    async update(obj) {
        let url = `${this.apiUrl}/${obj.id}`

        console.log(obj)

        return await this.doQuery(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)
        })
    }

    async delete(id) {
        let url = `${this.apiUrl}/${id}`
        return await this.doQuery(url, {
            method: "DELETE"
        })
    }

    async getLookup(lookupName) {
        let url = `${this.lookupUrlPrefix}/${lookupName}`;

        return await this.doQuery(url, {
            method: "GET"
        })
    }

    async doQuery(url, options) {
        try {
            const response = await fetch(url, options);
            return await response.json();
        } catch (err) {
            throw err;
        }
    }
}