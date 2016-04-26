
export default class QueryBuilder {

    constructor(command) {
        this.command = command

        this.operators = [
            { name: 'select', build: this.buildSelect },
            { name: 'from', build: this.buildFrom },
            { name: 'join', build: this.buildJoin },
            { name: 'where', build: this.buildWhere },
            { name: 'orderBy', build: this.buildOrderBy },
            { name: 'groupBy', build: this.buildGroupBy },
            { name: 'having', build: this.buildHaving },
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

    buildJoin(params) {
        return params.map(join => {
            return `${join.method} ${join.table} ON ${join.on}`
        }).join(' ')
    }

    buildWhere(params) {
        let where = params.join(' AND ')
        return `WHERE ${where}`
    }

    buildOrderBy(params) {
        let orderBy = params.join(',')
        return `ORDER BY ${orderBy}`
    }

    buildGroupBy(params) {
        let groupBy = params.join(',')
        return `GROUP BY ${groupBy}`
    }

    buildHaving(params) {
        let having = params.join(' AND ')
        return `HAVING ${having}`
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
        this.add('join', {method: 'JOIN', table, on})
        return this
    }

    leftJoin(table, on) {
        this.add('join', {method: 'LEFT JOIN', table, on})
        return this
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

    groupBy(...params) {
        this.add('groupBy', params)
        return this
    }

    having(having, params = {}) {
        this.add('having', having)
        this.add('params', params)
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

    getQuery() {
        let { query } = this

        return this.operators.map(operator => {
            let params = query[operator.name]

            if(params) {
                return operator.build(params)
            }

            return ''
        }).join(' ')
    }

    getData() {
        return Object.assign.apply({}, this.query.params || [{}])
    }

    execute() {
        let query = this.getQuery()
        let params = this.getData()

        this.resetQuery()

        return this.command.execute(query, params)
    }

    all() {
        return this.execute().then(result => {
            return Array.from(result.rows)
        })
    }
}
