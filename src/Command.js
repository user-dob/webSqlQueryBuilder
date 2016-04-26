import co from 'co'
import QueryBuilder from './QueryBuilder'

export default class Command {

    constructor(db) {
        this.db = db
    }

    insert(table, params) {

        params = Array.isArray(params) ? params : [params]

        let data = params.map(item => {
            let keys = Object.keys(item),
                fields = keys.join(','),
                values = [...'?'.repeat(keys.length)];

            return {
                query: `INSERT INTO ${table} (${fields}) values(${values})`,
                params: keys.map(key => item[key])
            }
        })

        return this.execute(data)
    }

    static normalize(query, data = {}) {
        let sql, params = []

        sql = query.replace(/\{([^{}]*)\}/g, function(math, name) {
            let value = data[name]

            if(Array.isArray(value)) {
                params = params.concat(value)
                return value.map(v => '?')
            }

            params.push(value)
            return '?';
        });

        return {sql, params}
    }

    getPromise(tx, query, data) {
        let {sql, params} = Command.normalize(query, data)
        return new Promise((res, rej) => {
            tx.executeSql(sql, params, (tx, result) => res(result), (tx, error) => rej(error))
        })
    }

    executeByArray(items) {
        const { db, getPromise } = this

        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                let promises = items.map(item => getPromise(tx, item[0], item[1]))
                resolve(promises)
            })
        }).then(promises => Promise.all(promises))
    }

    executeByGenerator(generator, data) {
        const { db, getPromise } = this

        function execute(tx, generator, data, resolve) {
            let next = generator.next(data);

            if (!next.done) {
                getPromise(tx, next.value[0], next.value[1]).then(
                        result => execute(tx, generator, result, resolve),
                        err => generator.throw(err)
                );
            } else {
                resolve(next.value)
            }
        }

        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                execute(tx, generator, data, resolve)
            })
        })
    }

    executeByQuery(query, data) {
        const { db, getPromise } = this
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                getPromise(tx, query, data).then(resolve, reject)
            })
        })
    }

    execute(query, data = {}) {

        if(Array.isArray(query)) {
            return this.executeByArray(query)
        }

        if(query.constructor && query.constructor.name == 'GeneratorFunction') {
            return this.executeByGenerator(query(), data)
        }

        return this.executeByQuery(query, data)
    }

}
