import Db from './Db'
import Schema, { toLowerCase } from './Schema'


export default class Model {

    constructor(data) {
        Object.assign(this, data)
    }

    static get table() {
        return toLowerCase(this.name)
    }

    static select(...params) {
        return Db.queryModel(this).select(params).from(this.table)
    }
}
