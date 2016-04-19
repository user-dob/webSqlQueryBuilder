
class Db {

    constructor(name, version, displayName, maxSize) {
        this.db = openDatabase(name, version, displayName, maxSize)

        this.operators = [
            { name: 'select', build: this.buildSelect },
            { name: 'from', build: this.buildFrom },
            { name: 'where', build: this.buildWhere },
            { name: 'orderBy', build: this.buildOrderBy },
            { name: 'limit', build: this.buildLimit },
            { name: 'offset', build: this.buildOffset },
        ]

        this.query = {}
    }

    add(operator, params) {
        let opData = this.query[operator] || []
        this.query[operator] = opData.concat(params)
    }

    buildSelect(params) {
        let select = params.join(',') || '*'
        return `SELECT ${select}`
    }

    buildFrom(params) {
        let from = params.join(',')
        return `FROM ${from}`
    }

    buildWhere(params) {
        let where = params.join(' ')
        return `WHERE ${where}`
    }

    buildOrderBy(params) {
        let orderBy = params.join(',')
        return `ORDER BY ${orderBy}`
    }

    buildLimit(params) {
        let limit = params.pop()
        return `LIMIT ${limit}`
    }

    buildOffset(params) {
        let offset = params.pop()
        return `OFFSET ${offset}`
    }

    resetQuery() {
        this.query = {}
    }

    select(...params) {
        this.add('select', params)
        return this
    }

    from(...params) {
        this.add('from', params)
        return this
    }

    join(table, on) {

    }

    where(where, params = {}) {
        this.add('where', where)
        this.add('params', params)
        return this
    }

    params(params) {
        this.add('params', params)
    }

    orderBy(...params) {
        this.add('orderBy', params)
        return this
    }

    limit(...params) {
        this.add('limit', params)
        return this
    }

    offset(...params) {
        this.add('offset', params)
        return this
    }

    all() {
        let query = this.buildQuery()
        let params = this.buildParams()

        this.resetQuery()

        return this.sql(query, params).then(result => {
            return [...result.rows]
        })
    }

    text() {
        return this.buildQuery()
    }

    buildQuery() {
        let { query } = this

        return this.operators.map(operator => {
            let params = query[operator.name]

            if(params) {
                return operator.build(params)
            }

            return ''
        }).join(' ')
    }

    buildParams() {
        return Object.assign.apply({}, this.query.params)
    }

    sql(query, data = {}) {
        const { db } = this
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

        console.log(query, params)

        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(query, params, (tx, result) => resolve(result), (tx, error) => reject(error))
            })
        })
    }



}