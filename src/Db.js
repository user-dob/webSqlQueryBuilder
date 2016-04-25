import Command from './Command'
import QueryBuilder from './QueryBuilder'

let db, command;

export default class Db {

    static open(shortName, version, displayName, maxSize) {
        db = openDatabase(shortName, version, displayName, maxSize)
        command = new Command(db)
    }

    static get command() {
        return command
    }

    static get query() {
        return new QueryBuilder(command)
    }
}
