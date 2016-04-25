import Command from './Command'
import QueryBuilder from './QueryBuilder'
import QueryModelBuilder from './QueryModelBuilder'


let db, command;

export default class Db {

    static open(shortName, version, displayName, maxSize) {
        db = openDatabase(shortName, version, displayName, maxSize)
        command = new Command(db)
    }

    static get command() {
        return command
    }

    static query() {
        return new QueryBuilder(command)
    }

    static queryModel(model) {
        return new QueryModelBuilder(command, model)
    }
}
