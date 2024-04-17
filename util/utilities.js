export default class Utilities {
    static getQueryString(options) {
        let queryStr = '?'

        for (let key in options) {
            queryStr += `${key}=${options[key]}&`
        }

        return queryStr
    }

    static cloneObject(obj) {
        return JSON.parse(JSON.stringify(obj))
    }
}