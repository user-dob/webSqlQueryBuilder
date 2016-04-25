import Db from './Db'
import Schema from './Schema'


export default class Model {

    static get table() {
        return this.name.toLocaleLowerCase()
    }

    static query() {
        return Db.query.select().from(this.table)
    }
}
