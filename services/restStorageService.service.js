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

    /*KJ: Todo add filterStr*/
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
            sortCol: null, sortDir: 'asc', filterCol: '', filterStr: '', limit: 100, //we'll set 100 as limit to start
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
        let url = `${this.apiUrl}/${Utils.getQueryString(this.options)}`;

        //implement 'list' call, returns a sorted/filtered/paged list from the backend
    }

    //CRUD FUNCTIONS
    async create(obj) {
        let url = `${this.apiUrl}/`
        //TODO: implement create method, note that you will want to set your
        //'content-type' header to 'application/json'
        //you will also want to stringify the obj passed in and place in the 'body' of the request

    }

    async read(id) {
        let url = `${this.apiUrl}/${id}`;
        //implement read method
    }

    async update(id, obj) {
        let url = `${this.apiUrl}/${id}`
        //TODO: implement update method, note that you will want to set your
        //'content-type' header to 'application/json'
        //you will also want to stringify the obj passed in and place in the 'body' of the request

    }

    async delete(id) {
        //TODO: implement delete method
    }

    async getLookup(lookupName) {
        let url = `${this.lookupUrlPrefix}/${lookupName}`;

        //implement lookup call.  if you are really clever, you will only call this
        //one time and subsequent calls will pull from a 'cache'
        //I use 'this.lookups' as the object for caching.  not required, but fun
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