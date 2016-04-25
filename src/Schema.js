let map = new Map()

export function schema(type) {
    return (target, property, descriptor) => {

        let model = target.constructor

        if(!map.has(model)) {
            map.set(model, [])
        }

        map.get(model).push({property, type})
    }
}



class Type {
    constructor(type) {
        this.type = type
    }

    get NotNull() {
        this.type += ' NOT NULL'
        return this
    }

    get PK() {
        this.type += ' PRIMARY KEY'
        return this
    }

    get AutoIncrement() {
        this.type += ' AUTOINCREMENT'
        return this
    }

    toString() {
        return this.type
    }
}

export default class Schema {

    static getSchemaByModel(model) {
        return map.get(model)
    }

    static get Null() {
        return new Type('NULL')
    }

    static get Integer() {
        return new Type('INTEGER')
    }

    static get Real() {
        return new Type('REAL')
    }

    static get String() {
        return new Type('TEXT')
    }

    static get Blob() {
        return new Type('BLOB')
    }

    static OneToMany() {

    }

    static ManyToOne() {

    }

    constructor(name, schema = {}) {
        Object.assign(this, {name, schema})
    }

    add(property, type) {
        this.schema[property] = type
    }

    toString() {
        const { schema, name } = this

        let fields = Object.keys(schema).map(name => {
            return name + ' ' + schema[name]
        })

        return `CREATE TABLE ${name}(${fields})`
    }
}

