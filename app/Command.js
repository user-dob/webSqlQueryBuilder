
export default class Command {

    constructor(db) {
        this.db = db
    }

    transaction(cb) {

    }

    insert(table, params) {
        let keys = Object.keys(params),
            fields = keys.join(','),
            values = '{'+keys.join('},{')+'}',
            query = `INSERT INTO ${table} (${fields}) values(${values})`;

        return this.sql(query, params)
    }

    insertAll(table, fields, params) {

        const { db } = this

        db.transaction(tx => {
            for(let i=0; i<100; i++) {
                tx.executeSql('INSERT INTO user (name,age) VALUES (?,?)', [`mame ${i}`, i])
            }
        })


        return




        let values = [...'?'.repeat(fields.length)].toString()
        values = `(${values}),`.repeat(params.length).slice(0,-1)

        fields = fields.join(',')

        let query = `INSERT INTO ${table} (${fields}) values ${values}`

        return this.execute(query, [].concat.apply([], params))
    }

    execute(query, params) {
        const { db } = this

        console.log(query, params)

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
