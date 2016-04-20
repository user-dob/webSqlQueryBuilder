
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

    execute(query, params) {
        const { db } = this

        if(Array.isArray(query)) {
            let items = query

            return new Promise((resolve, reject) => {
                db.transaction(tx => {
                    let promises = items.map(item => {
                        return new Promise((res, rej) => {
                            tx.executeSql(item.query, item.params, (tx, result) => res(result), (tx, error) => rej(error))
                        })
                    })

                    resolve(promises)
                })
            }).then(promises => Promise.all(promises))
        }

        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(query, params, (tx, result) => resolve(result), (tx, error) => reject(error))
            })
        })
    }

    sql(query, data = {}) {
        let params = []

        query = query.replace(/\{([^{}]*)\}/g, function(math, name) {
            let value = data[name]

            if(Array.isArray(value)) {
                params = params.concat(value)
                return value.map(v => '?')
            }

            params.push(value)
            return '?';
        });

        return this.execute(query, params)
    }
}
