import Db from './Db'
import Schema from './Schema'


export default class Model {

    constructor(data) {
        Object.assign(this, data)
    }

    static get table() {
        return this.name.toLocaleLowerCase()
    }

    static query() {
        return Db.queryModel(this).select().from(this.table)
    }
}
